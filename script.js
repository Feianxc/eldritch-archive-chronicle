const queryInput = document.querySelector('#archive-query');
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const caseItems = [...document.querySelectorAll('.case-item')];
const resultCount = document.querySelector('.result-count');
const randomButton = document.querySelector('.random-entry');
const navLinks = [...document.querySelectorAll('.main-links a')];
let activeFilter = 'all';

function normalize(value) {
  return value.trim().toLowerCase();
}

function applyFilters() {
  const query = normalize(queryInput?.value || '');
  let visible = 0;

  caseItems.forEach((item) => {
    const tokens = item.dataset.filter || '';
    const haystack = normalize(`${item.dataset.search || ''} ${item.textContent || ''}`);
    const filterMatch = activeFilter === 'all' || tokens.split(/\s+/).includes(activeFilter);
    const queryMatch = !query || haystack.includes(query);
    const shouldShow = filterMatch && queryMatch;
    item.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  if (resultCount) {
    resultCount.textContent = visible === caseItems.length ? '显示全部档案' : `显示 ${visible} 条档案`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    applyFilters();
  });
});

queryInput?.addEventListener('input', applyFilters);

randomButton?.addEventListener('click', () => {
  const visibleItems = caseItems.filter((item) => !item.hidden);
  const pool = visibleItems.length ? visibleItems : caseItems;
  const item = pool[Math.floor(Math.random() * pool.length)];
  item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  item.classList.add('is-picked');
  window.setTimeout(() => item.classList.remove('is-picked'), 1600);
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

['top', 'timeline', 'library', 'mythos', 'research', 'about'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

applyFilters();
