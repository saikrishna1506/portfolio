// ---------- Starfield ----------
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let w, h;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.min(180, Math.floor((w * h) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.3,
    baseAlpha: Math.random() * 0.6 + 0.25,
    speed: Math.random() * 0.6 + 0.15,
    phase: Math.random() * Math.PI * 2,
  }));
}
resize();
window.addEventListener('resize', resize);

let parallaxX = 0, parallaxY = 0;
window.addEventListener('mousemove', (e) => {
  parallaxX = (e.clientX / window.innerWidth - 0.5) * 14;
  parallaxY = (e.clientY / window.innerHeight - 0.5) * 14;
});

let t = 0;
function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(parallaxX, parallaxY);
  for (const s of stars) {
    const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t * s.speed + s.phase);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 235, 255, ${s.baseAlpha * twinkle})`;
    ctx.fill();
  }
  ctx.restore();
  t += 0.02;
  requestAnimationFrame(draw);
}
draw();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open-mobile');
  if (navLinks.classList.contains('open-mobile')) {
    navLinks.style.cssText = 'display:flex; flex-direction:column; position:absolute; top:100%; left:0; right:0; background:#0d1128; padding:20px; border-bottom:1px solid #232a54; gap:16px;';
  } else {
    navLinks.style.cssText = '';
  }
});
navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open-mobile');
    navLinks.style.cssText = '';
  });
});

// ---------- Scroll cue ----------
document.getElementById('scrollCue').addEventListener('click', () => {
  document.getElementById('log').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});
