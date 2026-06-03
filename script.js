const DATA_URL = './data/works.json';
const queryInput = document.querySelector('#archive-query');
const eraButtons = [...document.querySelectorAll('.filter-chip')];
const topicButtons = [...document.querySelectorAll('.topic-chip')];
const resultCount = document.querySelector('.result-count');
const visibleCount = document.querySelector('[data-visible-count]');
const workCountNodes = [...document.querySelectorAll('[data-work-count]')];
const randomButton = document.querySelector('.random-entry');
const navLinks = [...document.querySelectorAll('.main-links a')];
const workGrid = document.querySelector('#work-grid');
const caseList = document.querySelector('#case-list');
const deepTimeline = document.querySelector('#deep-timeline');
const heroTimeline = document.querySelector('#hero-timeline');
const progressBar = document.querySelector('.site-progress span');
const nodeButtons = [...document.querySelectorAll('.cosmic-map .node')];
const nodeReadout = document.querySelector('#node-readout');
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let works = [];
let sources = [];
let activeEra = 'all';
let activeTopic = 'all';

const eraLabels = {
  early: '早期恐惧',
  middle: '中期实验',
  dreamlands: '梦境国度',
  cthulhu: '神话成形',
  late: '晚期深潜'
};

const sealByEra = {
  early: './assets/seal-book.png',
  middle: './assets/seal-star.png',
  dreamlands: './assets/seal-wave.png',
  cthulhu: './assets/seal-star.png',
  late: './assets/seal-mountain.png'
};

const nodeCopy = {
  '克苏鲁': '核心神话节点，连接梦境、深海、拉莱耶和集体证词。',
  '梦境': '梦境不是逃避现实，而是另一套地理、历史和身份系统。',
  '禁书': '知识以手稿、译本和大学馆藏流动，危险也随之流动。',
  '古城': '城市遗迹把恐惧从个人遭遇推向文明之前的深时尺度。',
  '深海': '深海让达贡、拉莱耶、印斯茅斯和未知生物学互相连通。',
  '血统': '家族谱系把宇宙恐惧压进身份本身，无法从自我中逃离。'
};

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function esc(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function workHaystack(work) {
  return normalize([
    work.titleZh,
    work.titleEn,
    work.author,
    work.era,
    ...(work.themes || []),
    ...(work.locations || []),
    ...(work.motifs || []),
    ...(work.atlasNodes || []),
    work.summary,
    work.compositionYear,
    work.publicationYear
  ].join(' '));
}

function thumbFor(work) {
  return `./assets/work-thumbs/${work.id}.png`;
}

function sourceText(work) {
  if (!work.sourceRefs?.length) return '来源待补充';
  return work.sourceRefs.map((id) => {
    const source = sources.find((item) => item.id === id);
    return source?.label || id;
  }).join(' · ');
}

function renderLibrary() {
  if (!workGrid) return;
  const sorted = [...works].sort((a, b) => a.compositionYear - b.compositionYear || a.publicationYear - b.publicationYear);
  workGrid.innerHTML = sorted.map((work, index) => `
    <article class="work-card" id="work-${esc(work.id)}" data-era="${esc(work.era)}" data-work-id="${esc(work.id)}" data-search="${esc(workHaystack(work))}" style="--i:${index % 12}">
      <div class="work-thumb-wrap">
        <img class="work-thumb" src="${thumbFor(work)}" alt="${esc(work.titleZh)} 的生成式档案缩略图" loading="lazy" />
        <img class="entry-seal" src="${sealByEra[work.era] || './assets/seal-star.png'}" alt="" aria-hidden="true" />
      </div>
      <p class="card-meta">${work.compositionYear} 创作 · ${work.publicationYear} 发表 · ${esc(eraLabels[work.era] || work.era)}</p>
      <h3>${esc(work.titleZh)}</h3>
      <p class="latin-title">${esc(work.titleEn)}</p>
      <p>${esc(work.summary)}</p>
      <dl>
        <div><dt>地点</dt><dd>${esc((work.locations || []).slice(0, 2).join(' / '))}</dd></div>
        <div><dt>线索</dt><dd>${esc((work.motifs || []).slice(0, 2).join(' / '))}</dd></div>
      </dl>
      <div class="card-tags" aria-label="主题标签">${(work.themes || []).slice(0, 3).map((tag) => `<button type="button" data-topic-jump="${esc(tag)}">${esc(tag)}</button>`).join('')}</div>
    </article>
  `).join('');
}

function renderCases() {
  if (!caseList) return;
  const sorted = [...works].sort((a, b) => a.compositionYear - b.compositionYear || a.publicationYear - b.publicationYear);
  caseList.innerHTML = sorted.map((work, index) => `
    <article class="case-item" data-era="${esc(work.era)}" data-work-id="${esc(work.id)}" data-search="${esc(workHaystack(work))}" style="--i:${index % 14}">
      <span>${work.compositionYear}</span>
      <div>
        <h3>${esc(work.titleZh)} <em>${esc(work.titleEn)}</em></h3>
        <p>${esc(work.summary)}</p>
        <small>${esc((work.themes || []).join(' · '))} ｜ ${esc(sourceText(work))}</small>
      </div>
      <a href="#work-${esc(work.id)}" data-locate="${esc(work.id)}">定位文献</a>
    </article>
  `).join('');
}

function renderTimeline() {
  if (!deepTimeline) return;
  const sorted = [...works].sort((a, b) => a.compositionYear - b.compositionYear || a.publicationYear - b.publicationYear);
  deepTimeline.innerHTML = sorted.map((work, index) => `
    <li data-work-id="${esc(work.id)}" data-search="${esc(workHaystack(work))}" style="--i:${index % 12}">
      <time>${work.compositionYear}</time>
      <div>
        <h3>${esc(work.titleZh)} <span>${esc(work.titleEn)}</span></h3>
        <p>${esc(work.summary)}</p>
        <button type="button" data-locate="${esc(work.id)}">在文献库中查看</button>
      </div>
    </li>
  `).join('');

  if (heroTimeline) {
    const ids = ['dagon', 'the-nameless-city', 'the-call-of-cthulhu', 'at-the-mountains-of-madness'];
    const focus = ids.map((id) => works.find((work) => work.id === id)).filter(Boolean);
    heroTimeline.innerHTML = focus.map((work) => `
      <li data-work-id="${esc(work.id)}">
        <time>${work.compositionYear}<em>年</em></time>
        <div class="entry-copy"><h3>${esc(work.titleZh)}</h3><p>${esc(work.summary)}</p><a href="#work-${esc(work.id)}" data-locate="${esc(work.id)}">查看详情 <span>→</span></a></div>
        <img class="entry-seal" src="${sealByEra[work.era] || './assets/seal-star.png'}" alt="" aria-hidden="true" />
      </li>
    `).join('');
  }
}

function renderCounts() {
  workCountNodes.forEach((node) => { node.textContent = String(works.length); });
}

function renderAll() {
  renderCounts();
  renderLibrary();
  renderCases();
  renderTimeline();
  bindDynamicInteractions();
  applyFilters();
  observeReveals();
}

function matchesWork(work, query) {
  const text = workHaystack(work);
  const eraMatch = activeEra === 'all' || work.era === activeEra;
  const topicMatch = activeTopic === 'all' || text.includes(normalize(activeTopic));
  const queryMatch = !query || text.includes(query);
  return eraMatch && topicMatch && queryMatch;
}

function applyFilters() {
  const query = normalize(queryInput?.value || '');
  let visible = 0;
  const visibleIds = new Set();

  works.forEach((work) => {
    if (matchesWork(work, query)) {
      visible += 1;
      visibleIds.add(work.id);
    }
  });

  document.querySelectorAll('[data-work-id]').forEach((item) => {
    const id = item.getAttribute('data-work-id');
    const shouldShow = visibleIds.has(id);
    if (item.classList.contains('work-card') || item.classList.contains('case-item') || item.closest('#deep-timeline')) {
      item.hidden = !shouldShow;
    }
  });

  if (resultCount) {
    const label = visible === works.length ? '显示全部档案' : `显示 ${visible} 条档案`;
    resultCount.textContent = label;
  }
  if (visibleCount) visibleCount.textContent = String(visible);
}

function setEra(era) {
  activeEra = era;
  eraButtons.forEach((item) => item.classList.toggle('active', (item.dataset.filter || 'all') === activeEra));
  applyFilters();
}

function setTopic(topic) {
  activeTopic = topic;
  topicButtons.forEach((item) => item.classList.toggle('active', (item.dataset.topic || 'all') === activeTopic));
  applyFilters();
}

function locateWork(id) {
  const card = document.querySelector(`#work-${CSS.escape(id)}`);
  if (!card) return;
  if (card.hidden) {
    setEra('all');
    setTopic('all');
    if (queryInput) queryInput.value = '';
    applyFilters();
  }
  card.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'center' });
  card.classList.add('is-picked');
  window.setTimeout(() => card.classList.remove('is-picked'), 1800);
}

function bindDynamicInteractions() {
  document.querySelectorAll('[data-topic-jump]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setTopic(button.dataset.topicJump || 'all');
      document.querySelector('#research')?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
    });
  });

  document.querySelectorAll('[data-locate]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      locateWork(link.dataset.locate);
    });
  });

  if (motionOK) {
    document.querySelectorAll('.work-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
        card.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }
}

eraButtons.forEach((button) => {
  button.addEventListener('click', () => setEra(button.dataset.filter || 'all'));
});

topicButtons.forEach((button) => {
  button.addEventListener('click', () => setTopic(button.dataset.topic || 'all'));
});

queryInput?.addEventListener('input', applyFilters);

randomButton?.addEventListener('click', () => {
  const visibleCards = [...document.querySelectorAll('.work-card')].filter((item) => !item.hidden && !item.classList.contains('skeleton-card'));
  const pool = visibleCards.length ? visibleCards : [...document.querySelectorAll('.work-card:not(.skeleton-card)')];
  const item = pool[Math.floor(Math.random() * pool.length)];
  item?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'center' });
  item?.classList.add('is-picked');
  window.setTimeout(() => item?.classList.remove('is-picked'), 1800);
});

nodeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const node = button.dataset.node || '克苏鲁';
    nodeButtons.forEach((item) => item.classList.toggle('active', item === button));
    if (nodeReadout) {
      const related = works.filter((work) => workHaystack(work).includes(normalize(node))).slice(0, 4).map((work) => work.titleZh).join('、');
      nodeReadout.innerHTML = `<p>当前节点</p><strong>${esc(node)}</strong><span>${esc(nodeCopy[node] || '该节点连接多条作品线索。')}${related ? ` 相关作品：${esc(related)}` : ''}</span>`;
    }
    setTopic(node);
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const id = visible.target.id;
  navLinks.forEach((link) => {
    const target = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', target === id || (target === 'timeline' && id === 'top'));
  });
}, { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] });

['top', 'timeline', 'library', 'mythos', 'research', 'sources', 'about'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

let revealObserver;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();
  const targets = [
    ...document.querySelectorAll('[data-reveal]'),
    ...document.querySelectorAll('.work-card, .case-item, .deep-timeline li')
  ];
  if (!motionOK) {
    targets.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach((item) => revealObserver.observe(item));
}

function updateProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
  progressBar.style.transform = `scaleX(${ratio})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

function startCanvas() {
  const canvas = document.querySelector('.abyss-canvas');
  if (!canvas || !motionOK) return;
  const ctx = canvas.getContext('2d');
  const particles = [];
  const count = Math.min(90, Math.floor(window.innerWidth / 18));
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const seed = () => {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.35,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.04 - Math.random() * 0.16,
        a: 0.16 + Math.random() * 0.38
      });
    }
  };
  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -8) p.y = window.innerHeight + 8;
      if (p.x < -8) p.x = window.innerWidth + 8;
      if (p.x > window.innerWidth + 8) p.x = -8;
      ctx.beginPath();
      ctx.fillStyle = `rgba(211, 170, 91, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize();
  seed();
  window.addEventListener('resize', () => { resize(); seed(); });
  draw();
}

async function boot() {
  document.documentElement.classList.add('is-booting');
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`data status ${response.status}`);
    const payload = await response.json();
    works = payload.works || [];
    sources = payload.meta?.sources || [];
    renderAll();
  } catch (error) {
    console.error('文献数据读取失败', error);
    workGrid?.querySelector('.skeleton-card')?.classList.add('is-error');
    if (resultCount) resultCount.textContent = '文献数据读取失败';
  } finally {
    document.documentElement.classList.add('is-ready');
    startCanvas();
    observeReveals();
  }
}

boot();
