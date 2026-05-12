const owner = 'zstar239';
const repo = 'ConvMamSPN.github.io';
const branch = 'main';
const path = 'docs/assets/visual';
const domains = ['speed', 'synthetic', 'sunlamp', 'lightbox'];
const manifest = { speed: [], synthetic: [], sunlamp: [], lightbox: [] };
let currentDomain = 'speed';
let idx = 0;

const select = document.getElementById('domain');
const slide = document.getElementById('slide');
const caption = document.getElementById('caption');
const dots = document.getElementById('dots');

domains.forEach(d => { const o = document.createElement('option'); o.value=d; o.textContent=d; select.appendChild(o); });

async function fetchFiles() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch visual file list');
  const files = await res.json();
  files.filter(f => f.type === 'file').forEach(f => {
    const name = f.name.toLowerCase();
    for (const d of domains) {
      if (name.startsWith(`${d}_`) || name.includes(`${d}_best_`)) manifest[d].push(f.name);
    }
  });
  domains.forEach(d => manifest[d].sort());
}

function srcOf(file) { return `assets/visual/${file}`; }
function renderDots(list) {
  dots.innerHTML = '';
  list.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = () => show(i);
    dots.appendChild(dot);
  });
}
function show(i) {
  const list = manifest[currentDomain];
  if (!list || list.length === 0) {
    slide.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="white"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-size="24">No images found for this domain</text></svg>';
    caption.textContent = `${currentDomain}: no files detected`;
    dots.innerHTML = '';
    return;
  }
  idx = (i + list.length) % list.length;
  slide.src = srcOf(list[idx]);
  slide.alt = list[idx];
  caption.textContent = `${currentDomain} — ${list[idx]}`;
  [...dots.children].forEach((d, n) => d.classList.toggle('active', n === idx));
}
function changeDomain(d) { currentDomain = d; idx = 0; renderDots(manifest[d]); show(0); }

select.addEventListener('change', e => changeDomain(e.target.value));
document.getElementById('prev').onclick = () => show(idx - 1);
document.getElementById('next').onclick = () => show(idx + 1);
setInterval(() => show(idx + 1), 3500);

fetchFiles().then(() => changeDomain('speed')).catch(() => changeDomain('speed'));
