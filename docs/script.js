const candidates = [
  {key:'speed', files:['assets/visual/speed.jpg','assets/visual/speed.png','assets/visual/speed.jpeg']},
  {key:'synthetic', files:['assets/visual/synthetic.jpg','assets/visual/synthetic.png','assets/visual/synthetic.jpeg']},
  {key:'sunlamp', files:['assets/visual/sunlamp.jpg','assets/visual/sunlamp.png','assets/visual/sunlamp.jpeg']},
  {key:'lightbox', files:['assets/visual/lightbox.jpg','assets/visual/lightbox.png','assets/visual/lightbox.jpeg']}
];

const slide = document.getElementById('slide');
const caption = document.getElementById('caption');
const dots = document.getElementById('dots');
let items = [];
let idx = 0;

function probe(src){
  return new Promise((resolve)=>{const i=new Image();i.onload=()=>resolve(src);i.onerror=()=>resolve(null);i.src=src;});
}

async function loadItems(){
  for (const c of candidates){
    let found=null;
    for (const f of c.files){found = await probe(f); if(found) break;}
    if(found) items.push({name:c.key, src:found});
  }
  if(items.length===0){
    items=[{name:'No images found',src:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="white"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-size="32">Put images in docs/assets/visual/ as speed|synthetic|sunlamp|lightbox</text></svg>'}];
  }
  renderDots();
  show(0);
}

function show(i){idx=(i+items.length)%items.length; slide.src=items[idx].src; slide.alt=items[idx].name; caption.textContent=items[idx].name; [...dots.children].forEach((d,n)=>d.classList.toggle('active',n===idx));}
function renderDots(){dots.innerHTML=''; items.forEach((_,i)=>{const d=document.createElement('span');d.className='dot';d.onclick=()=>show(i);dots.appendChild(d);});}

document.getElementById('prev').onclick=()=>show(idx-1);
document.getElementById('next').onclick=()=>show(idx+1);
setInterval(()=>show(idx+1), 3500);
loadItems();
