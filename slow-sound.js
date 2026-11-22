// ===== SLOW SOUND MAI DAUKE HANKALI - UGAS CRYPTO AMBIENT =====

let audioCtx = null;
let slowEnabled = true;
let slowOscillators = [];

// Init
function initSlow(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

// ===== 1. SLOW PAD - Mai dauke hankali (Base) ===
function startSlowPad(){
  if(!slowEnabled) return;
  initSlow();
  stopSlowPad();

  // Layer 1 - Deep Bass (60Hz) - Slow breathing
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  const filter1 = audioCtx.createBiquadFilter();
  
  osc1.type = 'sine';
  osc1.frequency.value = 55; // Deep A
  filter1.type = 'lowpass';
  filter1.frequency.value = 400;
  gain1.gain.value = 0.08;
  
  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start();
  
  // Slow volume breathing - 6 seconds in/out
  gain1.gain.setValueAtTime(0.02, audioCtx.currentTime);
  gain1.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 3);
  gain1.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 6);
  
  // Loop breathing
  setInterval(()=>{
    if(!slowEnabled) return;
    gain1.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 3);
    gain1.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 6);
  }, 6000);

  // Layer 2 - Mid Crystal (220Hz) - Slow shimmer
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.value = 110;
  gain2.gain.value = 0.04;
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start();
  
  // Layer 3 - High Sparkle (440Hz) - Very slow
  const osc3 = audioCtx.createOscillator();
  const gain3 = audioCtx.createGain();
  osc3.type = 'sine';
  osc3.frequency.value = 220;
  gain3.gain.value = 0.02;
  osc3.connect(gain3);
  gain3.connect(audioCtx.destination);
  osc3.start();
  
  slowOscillators = [osc1, osc2, osc3, gain1, gain2, gain3];
}

// Stop
function stopSlowPad(){
  slowOscillators.forEach(o=>{
    try{ o.stop ? o.stop() : o.disconnect(); }catch(e){}
  });
  slowOscillators = [];
}

// ===== 2. SLOW HEARTBEAT - 60 BPM - Mai dauke hankali ===
function slowHeartbeat(){
  if(!slowEnabled) return;
  initSlow();
  // Kick
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 50;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
}

// Start heartbeat every 1.2 seconds (slow, calm)
let heartbeatInterval = null;
function startSlowHeartbeat(){
  heartbeatInterval = setInterval(()=> slowHeartbeat(), 1200);
}
function stopSlowHeartbeat(){
  if(heartbeatInterval) clearInterval(heartbeatInterval);
}

// ===== 3. SLOW CHIME - Every 8 seconds - Focus ===
function slowChime(){
  if(!slowEnabled) return;
  initSlow();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 523.25; // C5 - Calm
  gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 3);
  
  // Second harmonic
  setTimeout(()=>{
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.frequency.value = 659.25; // E5
    gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start();
    osc2.stop(audioCtx.currentTime + 3);
  }, 200);
}

let chimeInterval = null;
function startSlowChime(){
  slowChime(); // first immediate
  chimeInterval = setInterval(()=> slowChime(), 8000); // every 8 sec
}
function stopSlowChime(){
  if(chimeInterval) clearInterval(chimeInterval);
}

// ===== 4. MASTER CONTROL =====
function startAllSlowSounds(){
  startSlowPad();
  startSlowHeartbeat();
  startSlowChime();
  console.log("🔊 Slow Sound mai dauke hankali ON");
}

function stopAllSlowSounds(){
  stopSlowPad();
  stopSlowHeartbeat();
  stopSlowChime();
  console.log("🔇 Slow Sound OFF");
}

// ===== 5. AUTO START - Idan user ya danna Connect ===
document.addEventListener('DOMContentLoaded', ()=>{
  // Fara da low volume idan user ya interact
  document.body.addEventListener('click', ()=>{
    if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    // Fara slow sound bayan first click
    if(slowOscillators.length === 0){
      startAllSlowSounds();
    }
  }, {once: true});
  
  // Toggle button
  const toggle = document.createElement('button');
  toggle.textContent = '🔊 Slow Sound ON';
  toggle.style.cssText = 'position:fixed;bottom:20px;left:20px;padding:8px 14px;background:#000;color:#60a5fa;border:1px solid #3b82f6;border-radius:20px;cursor:pointer;z-index:100;font-size:12px;box-shadow:0 0 15px rgba(59,130,246,.5)';
  toggle.onclick = ()=>{
    if(slowOscillators.length > 0){
      stopAllSlowSounds();
      toggle.textContent = '🔇 Slow Sound OFF';
    } else {
      startAllSlowSounds();
      toggle.textContent = '🔊 Slow Sound ON';
    }
  };
  document.body.appendChild(toggle);
});

// Export
window.UGASSlowSound = { startAllSlowSounds, stopAllSlowSounds, slowChime, slowHeartbeat };
