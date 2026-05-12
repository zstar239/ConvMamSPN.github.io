const owner='zstar239', repo='ConvMamSPN.github.io', branch='main', path='docs/assets/visual';
const domains=['speed','synthetic','sunlamp','lightbox'];
const manifest={speed:[],synthetic:[],sunlamp:[],lightbox:[]};
const state={};

async function fetchFiles(){
  const url=`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res=await fetch(url); if(!res.ok) throw new Error('fetch failed');
  const files=await res.json();
  files.filter(f=>f.type==='file').forEach(f=>{
    const n=f.name.toLowerCase();
    domains.forEach(d=>{ if(n.includes(d)) manifest[d].push(f.name); });
  });
  domains.forEach(d=>manifest[d].sort());
}

function buildDomainCard(domain){
  const el=document.createElement('article'); el.className='domain';
  el.innerHTML=`<h3>${domain}</h3><div class='viewer'><button class='nav prev'>‹</button><img><button class='nav next'>›</button></div><div class='cap'></div><div class='dots'></div>`;
  const img=el.querySelector('img'), cap=el.querySelector('.cap'), dots=el.querySelector('.dots');
  state[domain]={idx:0,img,cap,dots};

  const renderDots=()=>{dots.innerHTML='';(manifest[domain]||[]).forEach((_,i)=>{const d=document.createElement('span');d.className='dot';if(i===state[domain].idx)d.classList.add('active');d.onclick=()=>show(domain,i);dots.appendChild(d);});};
  el.querySelector('.prev').onclick=()=>show(domain,state[domain].idx-1);
  el.querySelector('.next').onclick=()=>show(domain,state[domain].idx+1);
  renderDots();
  return el;
}

function show(domain,i){
  const list=manifest[domain]||[]; const s=state[domain];
  if(!list.length){s.img.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420"><rect width="100%" height="100%" fill="white"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="%2364758b" font-size="24">No '+domain+' images found</text></svg>'; s.cap.textContent='No files matched domain name.'; s.dots.innerHTML=''; return;}
  s.idx=(i+list.length)%list.length; s.img.src=`assets/visual/${list[s.idx]}`; s.cap.textContent=list[s.idx];
  [...s.dots.children].forEach((d,n)=>d.classList.toggle('active',n===s.idx));
}

async function init(){
  const quad=document.getElementById('quad');
  domains.forEach(d=>quad.appendChild(buildDomainCard(d)));
  try{await fetchFiles();}catch(e){console.warn(e);} 
  domains.forEach(d=>show(d,0));
  setInterval(()=>domains.forEach(d=>show(d,state[d].idx+1)),3500);
}

init();
