const v=document.getElementById("rickroll"),b=document.getElementById("copy");

async function startVideo(){
  if(!v) return;
  v.muted=true;
  v.setAttribute("muted","");
  try{await v.play();}catch(e){}
  // Try sound immediately. Browsers may reject this without a user gesture.
  try{v.muted=false;v.removeAttribute("muted");await v.play();}catch(e){
    v.muted=true;
    v.setAttribute("muted","");
  }
}
window.addEventListener("load",startVideo,{once:true});

// If the browser requires interaction, the first natural tap/click/key press
// turns sound on. There is no separate "Continue" screen.
async function enableSound(){
  try{v.muted=false;v.removeAttribute("muted");await v.play();}catch(e){}
  window.removeEventListener("pointerdown",enableSound);
  window.removeEventListener("touchstart",enableSound);
  window.removeEventListener("keydown",enableSound);
}
window.addEventListener("pointerdown",enableSound,{passive:true});
window.addEventListener("touchstart",enableSound,{passive:true});
window.addEventListener("keydown",enableSound);

b.onclick=async()=>{
 const t="# [Discord Nitro Gift](https://iam-steveee.github.io/freenitro)[.](https://discord.gift/PZ76qKbfX8G8hjTKUKYjZntk)";
 try{await navigator.clipboard.writeText(t)}
 catch(e){const x=document.createElement("textarea");x.value=t;document.body.appendChild(x);x.select();document.execCommand("copy");x.remove()}
 b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1600)
};