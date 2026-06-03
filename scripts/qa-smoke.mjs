import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = ['index.html', 'styles.css', 'script.js', 'README.md', 'LICENSE', '.nojekyll'];
const assetRequired = [
  'assets/eldritch-bg.png',
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
function relExists(file) { return existsSync(path.join(root, file)); }

for (const file of required) {
  if (!relExists(file)) fail(`Missing required file: ${file}`);
}
for (const file of assetRequired) {
  if (!relExists(file)) fail(`Missing required asset: ${file}`);
}

const index = readFileSync(path.join(root, 'index.html'), 'utf8');
const styles = readFileSync(path.join(root, 'styles.css'), 'utf8');
const script = readFileSync(path.join(root, 'script.js'), 'utf8');

for (const term of ['思考过程', '模型', 'agent', 'Agent', 'OpenAI', 'Codex']) {
  if (index.includes(term)) fail(`Public index contains internal or tool-facing wording: ${term}`);
}

const ids = new Set([...index.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
for (const match of index.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(match[1])) fail(`Broken anchor href: #${match[1]}`);
}

for (const match of index.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith('#')) continue;
  if (!relExists(target)) fail(`Broken local reference: ${target}`);
}

const requiredSelectors = [
  'archive-stage', 'library-grid', 'deep-timeline', 'cosmic-map',
  'search-panel', 'case-list', 'site-footer'
];
for (const selector of requiredSelectors) {
  if (!index.includes(selector) && !styles.includes(selector)) fail(`Expected selector not found: ${selector}`);
}

if (!script.includes('applyFilters')) fail('Search/filter interaction function missing');
if (!script.includes('IntersectionObserver')) warn('Navigation active-state observer missing');
if ((index.match(/class="case-item"/g) || []).length < 6) fail('Expected at least six searchable case items');
if ((index.match(/class="work-card"/g) || []).length < 6) fail('Expected at least six work cards');

mkdirSync(path.join(root, 'docs', 'qa'), { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  filesChecked: [...required, ...assetRequired].length,
  failures,
  warnings
};
writeFileSync(path.join(root, 'docs', 'qa', 'smoke-report.json'), JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(report, null, 2));
