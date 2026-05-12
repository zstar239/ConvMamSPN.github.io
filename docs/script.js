const manifest = {
  speed: [
    'speed_best_img000192.jpg.png','speed_best_img001079.jpg.png','speed_best_img005589.jpg.png','speed_best_img006658.jpg.png','speed_best_img006732.jpg.png'
  ],
  lightbox: [
    'lightbox_best_img000848.jpg.png','lightbox_best_img000884.jpg.png','lightbox_best_img001483.jpg.png','lightbox_best_img002371.jpg.png','lightbox_best_img003360.jpg.png','lightbox_best_img003905.jpg.png','lightbox_best_img006309.jpg.png','lightbox_best_img006487.jpg.png','lightbox_best_img006638.jpg.png','lightbox_best_img006739.jpg.png'
  ],
  synthetic: [],
  sunlamp: []
};

const domainSelect = document.getElementById('domain');
const slide = document.getElementById('slide');
const caption = document.getElementById('caption');
const dots = document.getElementById('dots');
let files = []; let idx = 0;

Object.keys(manifest).forEach(d => { const op=document.createElement('option'); op.value=d; op.textContent=d; domainSelect.appendChild(op);});

function srcOf(name){ return `assets/visual/${name}`; }
function show(i){
  if(!files.length){
    slide.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520"><rect width="100%" height="100%" fill="white"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="%23475569" font-size="28">No files listed for this domain yet</text></svg>';
    caption.textContent = `${domainSelect.value}: please add filenames in docs/script.js manifest`;
    dots.innerHTML='';
    return;
  }
  idx=(i+files.length)%files.length;
  slide.src = srcOf(files[idx]);
  slide.alt = files[idx];
  caption.textContent = files[idx];
  [...dots.children].forEach((d,n)=>d.classList.toggle('active',n===idx));
}
function renderDots(){ dots.innerHTML=''; files.forEach((_,i)=>{const d=document.createElement('span');d.className='dot';d.onclick=()=>show(i);dots.appendChild(d);}); }
function changeDomain(){ files = manifest[domainSelect.value] || []; idx=0; renderDots(); show(0); }

domainSelect.addEventListener('change', changeDomain);
document.getElementById('prev').onclick = ()=>show(idx-1);
document.getElementById('next').onclick = ()=>show(idx+1);
setInterval(()=>show(idx+1), 3000);
changeDomain();
