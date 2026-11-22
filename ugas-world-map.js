// ===== UGAS WORLD DOMINATION MAP =====

const UGAS_CITIES = [
  {name:"Abuja", x:52, y:48, country:"NG"}, {name:"Lagos", x:51, y:52, country:"NG"},
  {name:"Dubai", x:62, y:45, country:"AE"}, {name:"London", x:49, y:30, country:"UK"},
  {name:"New York", x:22, y:35, country:"US"}, {name:"Tokyo", x:85, y:38, country:"JP"},
  {name:"Singapore", x:75, y:62, country:"SG"}, {name:"Berlin", x:53, y:31, country:"DE"},
  {name:"São Paulo", x:32, y:70, country:"BR"}, {name:"Sydney", x:88, y:78, country:"AU"},
  {name:"Johannesburg", x:56, y:72, country:"ZA"}, {name:"Istanbul", x:57, y:36, country:"TR"}
];

let mapCanvas, ctx, domination = 0, electronicGrowth = 0;

function initUGASMap(){
  mapCanvas = document.getElementById('ugasMapCanvas');
  if(!mapCanvas) return;
  ctx = mapCanvas.getContext('2d');
  resizeMap();
  window.addEventListener('resize', resizeMap);
  drawWorld();
  startDominationAnimation();
  startFutureDisplay();
}

function resizeMap(){
  const rect = mapCanvas.parentElement.getBoundingClientRect();
  mapCanvas.width = rect.width * window.devicePixelRatio;
  mapCanvas.height = rect.height * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio,0,0,window.devicePixelRatio,0,0);
}

function drawWorld(){
  const w = mapCanvas.width / window.devicePixelRatio;
  const h = mapCanvas.height / window.devicePixelRatio;
  ctx.clearRect(0,0,w,h);
  
  // Simple world grid
  ctx.strokeStyle = 'rgba(59,130,246,.12)';
  ctx.lineWidth = 0.5;
  for(let i=0;i<20;i++){
    ctx.beginPath(); ctx.moveTo(0, i*h/20); ctx.lineTo(w, i*h/20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i*w/20, 0); ctx.lineTo(i*w/20, h); ctx.stroke();
  }
  
  // Continents (simplified blobs) - Illustration only, not accurate map
  ctx.fillStyle = 'rgba(30,58,138,.25)';
  ctx.strokeStyle = 'rgba(59,130,246,.4)';
  // Africa
  ctx.beginPath(); ctx.ellipse(w*0.53, h*0.55, w*0.06, h*0.18, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Europe
  ctx.beginPath(); ctx.ellipse(w*0.52, h*0.32, w*0.08, h*0.08, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Asia
  ctx.beginPath(); ctx.ellipse(w*0.70, h*0.38, w*0.18, h*0.15, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // North America
  ctx.beginPath(); ctx.ellipse(w*0.20, h*0.35, w*0.15, h*0.18, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // South America
  ctx.beginPath(); ctx.ellipse(w*0.28, h*0.68, w*0.06, h*0.16, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Australia
  ctx.beginPath(); ctx.ellipse(w*0.85, h*0.75, w*0.07, h*0.06, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  
  // Draw UGAS nodes
  UGAS_CITIES.forEach(city=>{
    const px = w * city.x / 100;
    const py = h * city.y / 100;
    // Connection lines to Abuja (center)
    if(city.name !== 'Abuja'){
      ctx.strokeStyle = `rgba(96,165,250,${0.2 + domination/200})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4,4]);
      ctx.beginPath();
      ctx.moveTo(w*0.52, h*0.48);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    // Node glow
    ctx.fillStyle = '#60a5fa';
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 15;
    ctx.beginPath(); ctx.arc(px, py, 4 + domination/50, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    // Label
    ctx.fillStyle = '#93c5fd'; ctx.font = '10px Rajdhani'; ctx.fillText(city.name, px+8, py-4);
  });
}

function startDominationAnimation(){
  setInterval(()=>{
    if(domination < 100) domination += 0.15;
    document.getElementById('dominationPct').textContent = domination.toFixed(1) + '%';
    document.getElementById('dominationBar').style.width = domination + '%';
    document.getElementById('citiesCount').textContent = Math.floor(domination/8) + '/12 Cities';
    document.getElementById('totalUsers').textContent = (domination * 125000).toLocaleString();
    drawWorld();
  }, 80);
}

function startFutureDisplay(){
  const futures = [
    {label:"Electronic Money Adoption", target:92},
    {label:"UGAS Payment in Shops", target:78},
    {label:"Cashless Transactions", target:85},
    {label:"World Digital Growth", target:88}
  ];
  
  setInterval(()=>{
    if(electronicGrowth < 92) electronicGrowth += 0.2;
    futures.forEach((f,i)=>{
      const el = document.getElementById('future-'+i);
      if(el){
        const cur = Math.min(f.target, electronicGrowth + Math.random()*10);
        el.style.width = cur + '%';
        el.parentElement.nextElementSibling.textContent = cur.toFixed(0)+'%';
      }
    });
  }, 100);
  
  // Display change text rotation
  const changes = [
    "2026: Cash → UGAS Digital",
    "2027: Shops accept UGAS worldwide",
    "2028: Banks integrate UGAS",
    "2029: 1B users on UGAS Network",
    "2030: World fully electronic money"
  ];
  let idx=0;
  setInterval(()=>{
    const el = document.getElementById('changeText');
    if(el){ el.textContent = changes[idx % changes.length]; idx++; }
  }, 2500);
}

document.addEventListener('DOMContentLoaded', initUGASMap);
