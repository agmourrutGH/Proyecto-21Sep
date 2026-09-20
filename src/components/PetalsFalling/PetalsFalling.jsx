import { useEffect, useRef } from 'react';
import { gsap, isMobile } from '../../lib/gsapSetup';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './PetalsFalling.css';

export default function PetalsFalling() {
  const boxRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const spawnEvery = isMobile() ? 1300 : 700;

    function spawnPetal() {
      const p = document.createElement('div');
      p.className = 'petal-fall';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-20px';
      p.style.opacity = 0.45 + Math.random() * 0.45;
      boxRef.current.appendChild(p);
      gsap.to(p, {
        y: window.innerHeight + 40,
        x: '+=' + (Math.random() * 120 - 60),
        rotation: Math.random() * 360,
        duration: 6 + Math.random() * 5,
        ease: 'none',
        onComplete: () => p.remove(),
      });
    }

    const id = setInterval(spawnPetal, spawnEvery);
    return () => {
      clearInterval(id);
      gsap.killTweensOf(boxRef.current?.children);
    };
  }, [prefersReducedMotion]);

  return <div className="petals-falling" ref={boxRef} />;
}
