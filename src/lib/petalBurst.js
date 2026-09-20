import { gsap } from './gsapSetup';

export function burstPetals(x, y, color) {
  const count = 7;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal-burst';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 70;

    gsap.to(p, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 20,
      rotation: Math.random() * 360,
      opacity: 0,
      duration: 0.6 + Math.random() * 0.4,
      ease: 'power2.out',
      onComplete: () => p.remove(),
    });
  }
}
