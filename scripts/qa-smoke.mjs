import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = ['index.html', 'styles.css', 'script.js', 'README.md', 'LICENSE', '.nojekyll', 'data/works.json'];
const assetRequired = [
  'assets/eldritch-bg.png',
  'assets/hero-cinematic.png',
  'assets/atlas-wall.png',
  'assets/reading-desk.png',
  'assets/relationship-observatory.png',
  'assets/parchment.png',
  'assets/seal-book.png',
  'assets/seal-mountain.png',
  'assets/seal-wave.png',
  'assets/seal-star.png',
  'assets/sigil.svg'
];
const failures = [];
const warnings = [];

function fail(message) { failures.push(message); }
function warn(message) { warnings.push(message); }
function relPath(file) { return path.join(root, file); }
function relExists(file) { return existsSync(relPath(file)); }

for (const file of required) {
  if (!relExists(file)) fail(`Missing required file: ${file}`);
}
for (const file of assetRequired) {
  if (!relExists(file)) fail(`Missing required asset: ${file}`);
}

const index = readFileSync(relPath('index.html'), 'utf8');
const styles = readFileSync(relPath('styles.css'), 'utf8');
const script = readFileSync(relPath('script.js'), 'utf8');
let data = { meta: { sources: [] }, works: [] };
try {
  data = JSON.parse(readFileSync(relPath('data/works.json'), 'utf8'));
} catch (error) {
  fail(`Invalid works JSON: ${error.message}`);
}

for (const term of ['思考过程', '模型', 'agent', 'Agent', 'OpenAI', 'Codex']) {
  if (index.includes(term)) fail(`Public index contains internal or tool-facing wording: ${term}`);
}

const ids = new Set([...index.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
for (const match of index.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(match[1])) fail(`Broken anchor href: #${match[1]}`);
}

for (const match of index.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
  const target = match[1].split(/[?#]/)[0];
  if (target.startsWith('#')) continue;
  if (!relExists(target)) fail(`Broken local reference: ${target}`);
}

const cssRefs = [...styles.matchAll(/url\("?\.\/([^"\)]+)"?\)/g)].map((match) => match[1].split(/[?#]/)[0]);
for (const target of cssRefs) {
  if (!relExists(target)) fail(`Broken CSS asset reference: ${target}`);
}

const requiredSelectors = [
  'archive-stage', 'library-console', 'library-grid', 'deep-timeline', 'cosmic-map', 'relationship-lab',
  'search-panel', 'case-list', 'site-progress', 'abyss-canvas', 'source-panel'
];
for (const selector of requiredSelectors) {
  if (!index.includes(selector) && !styles.includes(selector)) fail(`Expected selector not found: ${selector}`);
}

if (!script.includes('fetch(DATA_URL)')) fail('Data-driven works fetch missing');
if (!script.includes('applyFilters')) fail('Search/filter interaction function missing');
if (!script.includes('IntersectionObserver')) warn('Reveal/navigation observer missing');
if (!script.includes('startCanvas')) warn('Ambient canvas motion missing');
if (!index.includes('styles.css?v=20260604a') || !index.includes('script.js?v=20260604a')) fail('Cache-busted CSS/JS version not updated');

if (!Array.isArray(data.works) || data.works.length < 30) fail('Expected at least 30 works in data/works.json');
if (!Array.isArray(data.meta?.sources) || data.meta.sources.length < 6) fail('Expected at least six literature/data sources');
if (!Array.isArray(data.network?.edges) || data.network.edges.length < 25) fail('Expected curated relationship network edges');
for (const work of data.works || []) {
  for (const key of ['id', 'compositionYear', 'publicationYear', 'titleZh', 'titleEn', 'summary']) {
    if (!work[key]) fail(`Work ${work.id || '(missing id)'} missing ${key}`);
  }
  if (!work.publication?.venue) fail(`Work ${work.id || '(missing id)'} missing publication venue`);
  if (!work.fullTextLinks?.length) fail(`Work ${work.id || '(missing id)'} missing fullTextLinks`);
  if (!work.titleAliases?.zh?.length || !work.titleAliases?.en?.length) fail(`Work ${work.id || '(missing id)'} missing titleAliases`);
  const thumb = `assets/work-thumbs/${work.id}.png`;
  if (!relExists(thumb)) fail(`Missing generated thumbnail: ${thumb}`);
  else if (statSync(relPath(thumb)).size < 20000) warn(`Thumbnail may be too small: ${thumb}`);
}

mkdirSync(relPath('docs/qa'), { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  filesChecked: [...required, ...assetRequired].length,
  worksChecked: data.works?.length || 0,
  sourceCount: data.meta?.sources?.length || 0,
  failures,
  warnings
};
writeFileSync(relPath('docs/qa/smoke-report.json'), JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(report, null, 2));
