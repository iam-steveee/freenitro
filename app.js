const v=document.getElementById('rickroll');
const status=document.getElementById('status');
const hint=document.getElementById('soundHint');
const b=document.getElementById('copy');
const shareText=document.getElementById('shareText');

async function startVideo(){
  status.textContent='STARTING';
  try{
    v.muted=false;
    await v.play();
    status.textContent='PLAYING';
  }catch(e){
    // Browsers may block autoplay with sound. Start muted so the video still begins immediately.
    try{
      v.muted=true;
      await v.play();
      status.textContent='PLAYING · SOUND OFF';
      hint.hidden=false;
    }catch(err){
      status.textContent='TAP TO PLAY';
      hint.hidden=false;
    }
  }
}

function enableSound(){
  if(v.paused) v.play().catch(()=>{});
  v.muted=false;
  status.textContent='PLAYING';
  hint.hidden=true;
}

window.addEventListener('load',startVideo,{once:true});
document.addEventListener('pointerdown',enableSound,{once:true,passive:true});
hint.addEventListener('click',enableSound);

b.addEventListener('click',async()=>{
  const text=shareText.textContent;
  try{await navigator.clipboard.writeText(text)}
  catch(e){const x=document.createElement('textarea');x.value=text;document.body.appendChild(x);x.select();document.execCommand('copy');x.remove()}
  b.textContent='Copied';
  setTimeout(()=>b.textContent='Copy',1600);
});
