import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';
import Flower from '../Flower/Flower.jsx';
import './Searching.css';

const FIELD = [
  { left: '12%', bottom: '2vh', size: 42, color: '#FFD23F' },
  { left: '30%', bottom: '5vh', size: 48, color: '#FFB627' },
  { left: '50%', bottom: '3vh', size: 60, color: '#FFD23F' }, // la que encuentra la mano
  { left: '68%', bottom: '6vh', size: 46, color: '#FFC93C' },
  { left: '86%', bottom: '1vh', size: 40, color: '#FFB627' },
];
const TARGET_INDEX = 2;

export default function Searching() {
  const sectionRef = useRef(null);
  const handRef = useRef(null);
  const glowRef = useRef(null);
  const captionRef = useRef(null);
  const flowerRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(handRef.current, { x: 0, y: 0, rotation: -12, opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0 });

      // pineada, igual que Growth: así el movimiento de la mano queda
      // 100% atado al progreso del scroll dentro de la sección, en vez de
      // competir con el scroll normal de la página (que "gana" y hace que
      // cualquier elemento animado por transform salga disparado de cuadro).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          pin: true,
          pinType: 'transform',
        },
      });

      tl.to(flowerRefs.current, {
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out(2)',
      })
        .to(handRef.current, { opacity: 1, duration: 0.4 }, '<')
        .to(handRef.current, { x: '30vw', y: '85vh', rotation: 8, duration: 1.6 }, '<0.2')
        .to(flowerRefs.current[TARGET_INDEX], { scale: 1.3, duration: 0.4 }, '-=0.3')
        .to(glowRef.current, { opacity: 1, duration: 0.4 }, '<')
        .to(captionRef.current, { opacity: 0, duration: 0.3 }, '<');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="searching" ref={sectionRef}>
      <p id="searching-caption" ref={captionRef}>
        buscando entre las flores...
      </p>

      <div
        className="target-glow"
        ref={glowRef}
        style={{ left: FIELD[TARGET_INDEX].left, bottom: '7vh' }}
      />
      <svg className="hand" ref={handRef} viewBox="0 0 190 270" style={{ left: '16%', top: '8vh' }}>
        <defs>
          {/* userSpaceOnUse: mismo campo de degradé para todos los subpaths,
              así no se ve "cortado" entre palma/dedos. Luz arriba-izq (dedos),
              sombra abajo-der (muñeca) para dar volumen con 3 tonos de piel. */}
          <linearGradient id="handSkinGrad" x1="20" y1="40" x2="170" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F0C79A" />
            <stop offset="55%" stopColor="#D9A06B" />
            <stop offset="100%" stopColor="#A8703F" />
          </linearGradient>
        </defs>

        {/* palma + pulgar + 4 dedos de largo desigual (mayor > anular > índice > meñique),
            todos inclinados hacia la izquierda a medida que suben: da el escorzo de una
            mano entrando en cuadro desde abajo a la derecha. */}
        <g fill="url(#handSkinGrad)">
          <path d="M78,258 C64,230 58,200 70,178 C90,163 138,161 158,180 C168,200 164,230 150,258 C128,266 100,266 78,258 Z" />
          <path d="M76,182 C54,180 30,190 16,208 C10,217 15,226 25,224 C42,220 62,206 76,190 C79,186 80,182 76,182 Z" />
          <path d="M78,160 C72,130 68,98 72,72 C74,64 82,64 84,72 C90,100 96,132 100,160 C93,166 85,166 78,160 Z" />
          <path d="M100,160 C95,124 90,84 92,46 C93,37 103,37 105,46 C112,86 118,128 124,160 C117,167 107,167 100,160 Z" />
          <path d="M124,160 C119,128 112,96 110,68 C109,59 118,58 121,66 C130,98 138,132 148,160 C141,166 131,166 124,160 Z" />
          <path d="M148,160 C143,140 136,120 132,102 C130,95 138,93 141,100 C148,116 156,138 164,160 C158,165 151,165 148,160 Z" />
        </g>

        {/* sombra de contacto sutil donde los dedos se unen a la palma */}
        <path
          d="M70,150 C90,170 140,170 160,150 C165,165 160,182 150,190 C120,200 90,198 72,186 C64,178 66,162 70,150 Z"
          fill="#5A3A1E"
          opacity=".25"
        />

        {/* nudillos: curvas suaves, no líneas rectas */}
        <g fill="none" stroke="#6B4423" strokeWidth="2" strokeLinecap="round" opacity=".35">
          <path d="M74,118 Q88,124 96,116" />
          <path d="M96,110 Q112,117 120,108" />
          <path d="M116,108 Q134,114 142,104" />
          <path d="M136,124 Q152,128 158,120" />
        </g>

        {/* highlight sutil en el dedo mayor para dar volumen */}
        <path
          d="M97,52 C101,74 103,102 100,128"
          fill="none"
          stroke="#F6DDBB"
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".25"
        />
      </svg>

      <div className="searching-field">
        {FIELD.map((f, i) => (
          <Flower
            key={i}
            ref={(el) => (flowerRefs.current[i] = el)}
            size={f.size}
            color={f.color}
            className="searching-flower"
            style={{ left: f.left, bottom: f.bottom }}
          />
        ))}
      </div>
    </section>
  );
}
