import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isMobile } from '../../lib/gsapSetup';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import Flower from '../Flower/Flower.jsx';
import './Message.css';

// EDITÁ EL MENSAJE ACÁ ⬇️
const FINAL_MESSAGE = 'Feliz 21 de septiembre 🌻';

const SHADOW = {
  back: '0 2px 4px rgba(0,0,0,.15)',
  mid: '0 5px 10px rgba(0,0,0,.25)',
  front: '0 10px 18px rgba(0,0,0,.4)',
};

// atrás (chicas, bordes) -> medio -> adelante (grandes, centro).
// el orden acá es también el orden en el DOM = orden de apilado.
const BOUQUET = [
  // atrás
  { size: 60, color: '#FFC93C', rot: -38, x: -140, y: -10, depth: 'back' },
  { size: 65, color: '#FFC93C', rot: 35, x: 140, y: -6, depth: 'back' },
  { size: 58, color: '#FFD23F', rot: -10, x: 0, y: -70, depth: 'back', mobile: false },
  // medio
  { size: 95, color: '#FFB627', rot: -30, x: -115, y: 40, depth: 'mid' },
  { size: 100, color: '#FFB627', rot: 26, x: 118, y: 44, depth: 'mid' },
  { size: 90, color: '#FFC93C', rot: -18, x: -70, y: -55, depth: 'mid', mobile: false },
  { size: 92, color: '#FFC93C', rot: 20, x: 75, y: -58, depth: 'mid', mobile: false },
  { size: 105, color: '#FFB627', rot: -42, x: -40, y: 75, depth: 'mid' },
  { size: 100, color: '#FFB627', rot: 38, x: 45, y: 78, depth: 'mid' },
  // adelante
  { size: 130, color: '#FFD23F', rot: -15, x: -85, y: 10, depth: 'front' },
  { size: 135, color: '#FFD23F', rot: 14, x: 88, y: 8, depth: 'front' },
  { size: 150, color: '#FFD23F', rot: -5, x: -30, y: -20, depth: 'front' },
  { size: 160, color: '#FFD23F', rot: 6, x: 32, y: -18, depth: 'front' },
  { size: 170, color: '#FFD23F', rot: 0, x: 0, y: 5, depth: 'front' },
  { size: 120, color: '#FFB627', rot: -25, x: -10, y: 55, depth: 'front', mobile: false },
  { size: 125, color: '#FFB627', rot: 22, x: 15, y: 58, depth: 'front' },
];

// hojas de relleno, asoman detrás de las flores en los bordes del ramo.
// mismo path del pétalo de Flower (viewBox 0 0 120 120), reutilizado como hoja.
const PETAL_D = 'M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z';
const BOUQUET_VARIANTS = ['default', 'sunflower', 'asymmetric'];

const LEAVES = [
  { size: 80, rot: -70, x: -175, y: 55 },
  { size: 80, rot: 70, x: 175, y: 60 },
  { size: 65, rot: -12, x: -35, y: -100 },
  { size: 60, rot: 135, x: 55, y: 105 },
];

export default function Message() {
  const sectionRef = useRef(null);
  const bouquetRef = useRef(null);
  const flowerRefs = useRef([]);
  const leafRefs = useRef([]);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const bouquet = useMemo(
    () =>
      (isMobile() ? BOUQUET.filter((f) => f.mobile !== false) : BOUQUET).map((f) => ({
        ...f,
        variant: BOUQUET_VARIANTS[Math.floor(Math.random() * BOUQUET_VARIANTS.length)],
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leaves = leafRefs.current;
      const flowers = flowerRefs.current;

      // seteado imperativo: así GSAP es dueño del transform desde el arranque
      // y no tiene que "adivinar" rotation/x/y decomponiendo una matriz con
      // scale 0 (que es indeterminada: pierde el ángulo de rotación).
      gsap.set(leaves, {
        x: (i) => LEAVES[i].x,
        y: (i) => LEAVES[i].y,
        rotation: (i) => LEAVES[i].rot,
        scale: 0,
      });
      gsap.set(flowers, {
        x: (i) => bouquet[i].x,
        y: (i) => bouquet[i].y,
        rotation: (i) => bouquet[i].rot,
        scale: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
      // las hojas se asoman primero, después el ramo florece encima
      tl.to(leaves, { scale: 1, stagger: 0.08, duration: 0.7, ease: 'back.out(1.5)' })
        .to(
          flowers,
          { scale: 1, stagger: 0.06, duration: 0.7, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      if (!prefersReducedMotion) {
        gsap.to(bouquetRef.current, {
          y: -10,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4,
        });
      }

      let interval;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        once: true,
        onEnter: () => {
          let i = 0;
          interval = setInterval(() => {
            if (i < FINAL_MESSAGE.length) {
              setTypedText(FINAL_MESSAGE.slice(0, i + 1));
              i++;
            } else {
              clearInterval(interval);
              setTypingDone(true);
            }
          }, 60);
        },
      });

      return () => clearInterval(interval);
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion, bouquet]);

  return (
    <section id="message" ref={sectionRef}>
      <div className="bouquet" ref={bouquetRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="bouquetLeafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7CB342" />
              <stop offset="100%" stopColor="#3E8E41" />
            </linearGradient>
          </defs>
        </svg>

        {LEAVES.map((l, i) => (
          <svg
            key={i}
            ref={(el) => (leafRefs.current[i] = el)}
            className="bouquet-leaf"
            viewBox="0 0 120 120"
            width={l.size}
            height={l.size}
            style={{ left: '50%', top: '50%', marginLeft: -l.size / 2, marginTop: -l.size / 2 }}
          >
            <path d={PETAL_D} fill="url(#bouquetLeafGrad)" />
          </svg>
        ))}

        {bouquet.map((f, i) => (
          <Flower
            key={i}
            ref={(el) => (flowerRefs.current[i] = el)}
            size={f.size}
            color={f.color}
            variant={f.variant}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -f.size / 2,
              marginTop: -f.size / 2,
              filter: `drop-shadow(${SHADOW[f.depth]})`,
            }}
          />
        ))}
        <div className="bouquet-wrap" />
      </div>
      <h2>
        {typedText}
        <span className={`cursor ${typingDone ? 'no-motion' : ''}`} />
      </h2>
    </section>
  );
}
