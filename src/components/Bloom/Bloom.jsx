import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';
import Flower from '../Flower/Flower.jsx';
import './Bloom.css';

const FLOWERS = [
  { size: 96, color: '#FFD23F', rot: 15 },
  { size: 110, color: '#FFB627', rot: -10 },
  { size: 96, color: '#FFD23F', rot: 8 },
];

export default function Bloom() {
  const sectionRef = useRef(null);
  const flowerRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      FLOWERS.forEach((f, i) => {
        gsap.to(flowerRefs.current[i], {
          scale: 1,
          rotation: f.rot,
          duration: 0.85,
          delay: i * 0.15,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="bloom" ref={sectionRef}>
      {FLOWERS.map((f, i) => (
        <Flower
          key={i}
          ref={(el) => (flowerRefs.current[i] = el)}
          size={f.size}
          color={f.color}
        />
      ))}
    </section>
  );
}
