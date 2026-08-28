const video = document.getElementById('rickroll');
const status = document.getElementById('status');
const soundHint = document.getElementById('soundHint');
const videoWrap = document.getElementById('videoWrap');
const copyButton = document.getElementById('copy');
const shareText = document.getElementById('shareText');

let soundEnabled = false;
let userInteracted = false;

function setStatus(text) {
  status.textContent = text;
}

async function startImmediately() {
  // This follows the same basic HTML5 video approach as the Oracle project:
  // load the local MP4, reset it, and call play(). The important browser rule
  // is that audible autoplay may be rejected without a user gesture.
  video.currentTime = 0;
  video.muted = true;
  video.volume = 1;
  setStatus('PLAYING');

  try {
    await video.play();
    if (!userInteracted) soundHint.hidden = false;
  } catch (error) {
    setStatus('TAP TO PLAY');
    soundHint.hidden = false;
  }
}

async function enableSound() {
  userInteracted = true;
  soundEnabled = true;
  soundHint.hidden = true;
  video.muted = false;
  video.volume = 1;

  try {
    await video.play();
    setStatus('PLAYING');
  } catch (error) {
    setStatus('TAP TO PLAY');
  }
}

// First load: begin immediately, using muted autoplay when the browser requires it.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startImmediately, { once: true });
} else {
  startImmediately();
}

// A normal user interaction is the only reliable way to unlock audio on browsers
// that prohibit audible autoplay. No extra page/continue step is introduced.
document.addEventListener('pointerdown', enableSound, { once: true, passive: true });
document.addEventListener('keydown', enableSound, { once: true });
soundHint.addEventListener('click', enableSound);

// Keep the prank video ready if the browser temporarily suspends playback.
video.addEventListener('ended', () => {
  video.currentTime = 0;
  if (soundEnabled) video.muted = false;
  video.play().catch(() => {});
});

video.addEventListener('playing', () => setStatus('PLAYING'));
video.addEventListener('waiting', () => setStatus('BUFFERING'));
video.addEventListener('error', () => setStatus('VIDEO ERROR'));

copyButton.addEventListener('click', async () => {
  const text = shareText.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }
  copyButton.textContent = 'Copied';
  setTimeout(() => { copyButton.textContent = 'Copy'; }, 1600);
});
