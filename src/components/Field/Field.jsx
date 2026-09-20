import { useEffect, useMemo, useRef } from 'react';
import { gsap, isMobile } from '../../lib/gsapSetup';
import { burstPetals } from '../../lib/petalBurst';
import Flower from '../Flower/Flower.jsx';
import './Field.css';

const FIELD_COLORS = ['#FFD23F', '#FFB627', '#FFC93C'];

export default function Field() {
  const sectionRef = useRef(null);
  const flowerRefs = useRef([]);

  const flowers = useMemo(() => {
    const mobile = isMobile();
    const total = mobile ? 9 : 14;
    const size = mobile ? 40 : 56;
    return Array.from({ length: total }, (_, i) => ({
      left: 4 + i * (92 / (total - 1)) + (Math.random() * 3 - 1.5) + '%',
      bottom: 2 + Math.random() * 8 + 'vh',
      size,
      color: FIELD_COLORS[i % FIELD_COLORS.length],
    }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(flowerRefs.current, {
        scale: 1,
        stagger: 0.05,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleFlowerClick(e, color) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    gsap
      .timeline()
      .to(el, { scale: 1.3, duration: 0.15, ease: 'power2.out' })
      .to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.4)' });
    burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
  }

  return (
    <section id="field" ref={sectionRef}>
      <div className="sun" />
      <div id="fieldFlowers">
        {flowers.map((f, i) => (
          <Flower
            key={i}
            ref={(el) => (flowerRefs.current[i] = el)}
            size={f.size}
            color={f.color}
            className="field-flower"
            style={{ left: f.left, bottom: f.bottom }}
            onClick={(e) => handleFlowerClick(e, f.color)}
          />
        ))}
      </div>
      <div className="grass" />
    </section>
  );
}
