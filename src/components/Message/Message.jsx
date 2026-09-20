import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsapSetup';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import Flower from '../Flower/Flower.jsx';
import './Message.css';

// EDITÁ EL MENSAJE ACÁ ⬇️
const FINAL_MESSAGE = 'Feliz 18 de septiembre 🌻';

export default function Message() {
  const sectionRef = useRef(null);
  const finalWrapRef = useRef(null);
  const postalRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(finalWrapRef.current, {
        scale: 1,
        rotation: 360,
        duration: 1.4,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
      if (!prefersReducedMotion) {
        gsap.to(finalWrapRef.current, {
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
  }, [prefersReducedMotion]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      await document.fonts.ready;
      const canvas = await html2canvas(postalRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = 'flor-18-septiembre.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section id="message" ref={sectionRef}>
      <Flower ref={finalWrapRef} size={200} color="#FFB627" />
      <h2>
        {typedText}
        <span className={`cursor ${typingDone ? 'no-motion' : ''}`} />
      </h2>
      <p className="sub">
        {/* EDITÁ ESTE TEXTO si querés un subtítulo o firma, o borrá la línea */}
        Hecho a mano, con código, para este 18 de septiembre.
      </p>
      <button
        className="download-btn"
        disabled={!typingDone || downloading}
        onClick={handleDownload}
      >
        {downloading ? 'Generando...' : 'Descargar postal'}
      </button>

      {/* nodo offscreen usado por html2canvas para generar el PNG.
          La flor va con los paths inline (sin <use>/<symbol> externo):
          html2canvas no resuelve bien referencias a defs fuera del nodo capturado. */}
      <div className="postal-card" ref={postalRef}>
        <svg className="flower-svg" viewBox="0 0 120 120" width={160} height={160} style={{ color: '#FFB627' }}>
          <defs>
            <radialGradient id="postalCenterGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#8a5a24" />
              <stop offset="100%" stopColor="#4a2f12" />
            </radialGradient>
          </defs>
          <g fill="currentColor" stroke="rgba(0,0,0,.08)" strokeWidth="1">
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(60 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(120 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(180 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(240 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(300 60 60)" />
          </g>
          <circle cx="60" cy="60" r="16" fill="url(#postalCenterGrad)" />
        </svg>
        <h2>{FINAL_MESSAGE}</h2>
        <p className="postal-date">18 de septiembre</p>
      </div>
    </section>
  );
}
