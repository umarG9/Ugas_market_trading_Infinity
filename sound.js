let audioCtx=null,soundEnabled=true;
function initSound(){if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
function playTone(freq,dur,type='sine',vol=0.3){if(!soundEnabled) return; initSound(); const osc=audioCtx.createOscillator(),gain=audioCtx.createGain(); osc.type=type; osc.frequency.value=freq; osc.connect(gain); gain.connect(audioCtx.destination); gain.gain.setValueAtTime(vol,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+dur); osc.start(); osc.stop(audioCtx.currentTime+dur);}
function soundClick(){playTone(800,0.15); setTimeout(()=>playTone(1200,0.1),50);}
function soundConnect(){playTone(400,0.2); setTimeout(()=>playTone(600,0.2),120); setTimeout(()=>playTone(900,0.4),240);}
function soundFaucet(){playTone(300,0.15,'square'); setTimeout(()=>playTone(500,0.15,'square'),100); setTimeout(()=>playTone(800,0.5),200);}
function soundMint(){playTone(200,0.8,'sawtooth'); setTimeout(()=>playTone(400,0.6,'sawtooth'),150); setTimeout(()=>playTone(800,0.8),300);}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.btn,button').forEach(b=>b.addEventListener('click',()=>soundClick()));});
