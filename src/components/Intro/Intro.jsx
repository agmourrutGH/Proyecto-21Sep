import { useEffect, useMemo, useRef } from 'react';
import { gsap, isMobile } from '../../lib/gsapSetup';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './Intro.css';

export default function Intro() {
  const seedRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const stars = useMemo(() => {
    const count = isMobile() ? 45 : 80;
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      delay: Math.random() * 3 + 's',
    }));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(seedRef.current, {
        scale: 1.1,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="intro">
      <div className={`stars ${prefersReducedMotion ? 'no-motion' : ''}`}>
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{ left: s.left, top: s.top, animationDelay: s.delay }}
          />
        ))}
      </div>
      <div className="seed-glow" ref={seedRef} />
      <h1>18 de septiembre</h1>
      <p className={`hint ${prefersReducedMotion ? 'no-motion' : ''}`}>
        Scrolleá para ver qué pasa ↓
      </p>
    </section>
  );
}
