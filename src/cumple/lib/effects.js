import { gsap } from 'gsap';
import { HEART_PATH } from '../components/Heart/Heart.jsx';

const HEART_SVG = `<svg viewBox="0 0 24 22" aria-hidden="true"><path fill="currentColor" d="${HEART_PATH}"/></svg>`;

const BURST_COLORS = ['#c8102e', '#e8a3ae', '#f3d58b', '#fff1d6', '#e0243c'];
const CONFETTI_COLORS = ['#c8102e', '#e8a3ae', '#f3d58b', '#ffffff', '#9e0f2a', '#f6c1c7'];

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const isSmall = () => window.matchMedia('(max-width:600px)').matches;

function spawn(className, styles, html = '') {
  const el = document.createElement('span');
  el.className = className;
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, styles);
  el.innerHTML = html;
  document.body.appendChild(el);
  return el;
}

// Corazoncitos y destellos que salen de un punto (la boca de la caja).
export function burstFrom(x, y) {
  const count = isSmall() ? 16 : 24;
  for (let i = 0; i < count; i++) {
    const heart = i % 3 !== 0;
    const size = heart ? rand(10, 20) : rand(8, 16);
    const el = spawn(
      heart ? 'fx-heart' : 'fx-sparkle',
      { left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px', color: pick(BURST_COLORS) },
      heart ? HEART_SVG : ''
    );

    // abanico hacia arriba
    const angle = rand(-Math.PI * 0.92, -Math.PI * 0.08);
    const dist = rand(90, isSmall() ? 190 : 280);

    gsap
      .timeline({ onComplete: () => el.remove() })
      .fromTo(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 1 }, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 1,
        rotation: rand(-40, 40),
        duration: rand(0.9, 1.4),
        ease: 'power3.out',
      })
      .to(el, { y: '+=40', opacity: 0, duration: rand(0.7, 1.1), ease: 'sine.in' }, '-=0.35');
  }
}

// Confeti discreto que cae desde arriba de la pantalla.
export function confetti() {
  const count = isSmall() ? 34 : 60;
  const vh = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const round = Math.random() < 0.3;
    const w = round ? rand(6, 9) : rand(6, 10);
    const el = spawn('fx-confetti', {
      left: rand(0, 100) + 'vw',
      top: '-16px',
      width: w + 'px',
      height: (round ? w : w * 1.6) + 'px',
      background: pick(CONFETTI_COLORS),
      borderRadius: round ? '50%' : '2px',
    });
    gsap.to(el, {
      y: vh + 40,
      x: '+=' + rand(-90, 90),
      rotation: rand(-540, 540),
      duration: rand(2.6, 4.2),
      delay: rand(0, 0.7),
      ease: 'power1.in',
      onComplete: () => el.remove(),
    });
  }
}
