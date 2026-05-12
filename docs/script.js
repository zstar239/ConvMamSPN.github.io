const owner='zstar239', repo='ConvMamSPN.github.io', branch='main', path='docs/assets/visual';
const domains=['speed','synthetic','sunlamp','lightbox'];
const aliases={speed:['speed'],synthetic:['synthetic','synth'],sunlamp:['sunlamp','sun_lamp','sunlamp_'],lightbox:['lightbox','light_box']};
const manual={
  speed:['speed_best_img000192.jpg.png','speed_best_img001079.jpg.png'],
  synthetic:['synthetic_best_img000001.jpg.png'],
  sunlamp:['sunlamp_best_img000001.jpg.png'],
  lightbox:['lightbox_best_img000848.jpg.png','lightbox_best_img000884.jpg.png']
};
const manifest={speed:[],synthetic:[],sunlamp:[],lightbox:[]};
const state={};

async function fetchFiles(){
  const url=`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res=await fetch(url); if(!res.ok) throw new Error('fetch failed');
  const files=await res.json();
  files.filter(f=>f.type==='file').forEach(f=>{
    const n=f.name.toLowerCase();
    domains.forEach(d=>{ if(aliases[d].some(k=>n.includes(k))) manifest[d].push(f.name); });
  });
}

function uniqueMerge(){ domains.forEach(d=>{ manifest[d]=Array.from(new Set([...manifest[d],...manual[d]])).sort(); }); }
function buildDomainCard(domain){
  const el=document.createElement('article'); el.className='domain';
  el.innerHTML=`<h3>${domain}</h3><div class='viewer'><button class='nav prev'>‹</button><img><button class='nav next'>›</button></div><div class='cap'></div><div class='dots'></div>`;
  const img=el.querySelector('img'), cap=el.querySelector('.cap'), dots=el.querySelector('.dots'); state[domain]={idx:0,img,cap,dots};
  el.querySelector('.prev').onclick=()=>show(domain,state[domain].idx-1); el.querySelector('.next').onclick=()=>show(domain,state[domain].idx+1); return el;
}
function renderDots(domain){const s=state[domain],list=manifest[domain]; s.dots.innerHTML=''; list.forEach((_,i)=>{const d=document.createElement('span');d.className='dot'+(i===s.idx?' active':''); d.onclick=()=>show(domain,i); s.dots.appendChild(d);});}
function show(domain,i){const list=manifest[domain], s=state[domain]; if(!list.length){s.img.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420"><rect width="100%" height="100%" fill="white"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="%2364758b" font-size="24">No '+domain+' images found</text></svg>'; s.cap.textContent='No files matched yet.'; s.dots.innerHTML=''; return;} s.idx=(i+list.length)%list.length; s.img.src=`assets/visual/${list[s.idx]}`; s.cap.textContent=list[s.idx]; renderDots(domain);}

async function init(){const quad=document.getElementById('quad'); domains.forEach(d=>quad.appendChild(buildDomainCard(d))); try{await fetchFiles();}catch(e){console.warn('GitHub API unavailable, fallback to manual list.');} uniqueMerge(); domains.forEach(d=>show(d,0)); setInterval(()=>domains.forEach(d=>show(d,state[d].idx+1)),3500);} init();
