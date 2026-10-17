import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TEXTS } from '../../content.js';
import { burstFrom, confetti } from '../../lib/effects.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import GiftBox from '../GiftBox/GiftBox.jsx';
import './GiftHero.css';

// destellos fijos alrededor de la caja (x, y en %, tamaño en px, retardo en s)
const TWINKLES = [
  [14, 30, 14, 0], [84, 26, 10, 1.1], [22, 72, 9, 2.2], [78, 68, 13, 0.6],
  [8, 52, 8, 1.7], [92, 48, 9, 2.8], [32, 16, 7, 3.1], [68, 12, 8, 0.3],
];

// phase: 'closed' → 'opening' → 'open'
export default function GiftHero({ phase, autoFocus, onOpenStart, onOpenEnd }) {
  const rootRef = useRef(null);
  const giftRef = useRef(null);
  const titleRef = useRef(null);
  const ctxRef = useRef(null);
  const busyRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (autoFocus) giftRef.current?.focus({ preventScroll: true });
    return () => ctxRef.current?.revert();
  }, [autoFocus]);

  useEffect(() => {
    if (phase === 'open') titleRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const open = () => {
    // ignora toques repetidos mientras se abre
    if (busyRef.current || phase !== 'closed') return;
    busyRef.current = true;
    onOpenStart();

    ctxRef.current = gsap.context(() => {
      const w = giftRef.current.offsetWidth / 1.7; // ancho de la caja, para escalar los desplazamientos
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: onOpenEnd });
      const lidFaces = '.gift__lid .face, .l-tails';

      // 1 · la caja reacciona
      // (sacamos la animación CSS de entrada para que GSAP pueda desvanecer los textos)
      tl.set('.hero__intro, .hero__hint', { animation: 'none' }, 0)
        .to('.hero__intro', { autoAlpha: 0, y: -14, duration: 0.45 }, 0)
        .to('.hero__hint', { autoAlpha: 0, duration: 0.3 }, 0)
        .to('.gift__pop', { scaleX: 1.08, scaleY: 0.9, duration: 0.14, ease: 'power1.out' }, 0)
        .to('.gift__pop', { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' }, 0.14)

      // 2 · el moño se desata y las cintas se separan
        .to('.bow-k', { scale: 1.25, duration: 0.18, transformOrigin: '50% 50%' }, 0.3)
        .to('.bow-l', { rotation: -38, x: -18, y: 6, transformOrigin: '100% 100%', duration: 0.45 }, 0.34)
        .to('.bow-r', { rotation: 38, x: 18, y: 6, transformOrigin: '0% 100%', duration: 0.45 }, 0.34)
        .to('.bow-l', { x: -70, y: -40, rotation: -90, opacity: 0, duration: 0.55, ease: 'power2.in' }, 0.74)
        .to('.bow-r', { x: 70, y: -40, rotation: 90, opacity: 0, duration: 0.55, ease: 'power2.in' }, 0.74)
        .to('.bow-k', { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(2)' }, 0.78)
        .to('.l-tails', { scaleY: 0, opacity: 0, duration: 0.45, ease: 'power2.in' }, 0.5)
        .to('.rb-h--l, .rb-h--r', { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, 0.6)
        .to('.b-front .rb-v, .b-right .rb-v, .b-left .rb-v', { scaleY: 0, duration: 0.6, ease: 'power3.inOut' }, 0.7)

      // 3 · la tapa se levanta, gira y sale volando
        .to('.gift__lid', { y: -w * 0.26, rotationX: -16, rotationZ: -5, duration: 0.55, ease: 'back.out(2)' }, 1.05)
        .to('.lid-shade', { opacity: 0, duration: 0.4 }, 1.05)
        .to('.gift__lid', {
          x: w * 0.8, y: -w * 0.7, rotationX: -70, rotationZ: 42, rotationY: 40,
          duration: 1, ease: 'power2.in',
        }, 1.6)
        .to(lidFaces, { opacity: 0, duration: 0.45, ease: 'none' }, 2.15)

      // 4 · luz cálida, corazones y destellos desde adentro
        .fromTo('.gift__light', { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, duration: 0.9 }, 1.15)
        .to('.gift__halo', { scale: 1.25, duration: 1.2, ease: 'sine.out' }, 1.15)
        .to('.gift__tilt', { rotationX: -16, duration: 1.3, ease: 'power2.inOut' }, 1.5)
        .call(() => {
          if (reduced) return;
          const r = giftRef.current.querySelector('.gift__light').getBoundingClientRect();
          burstFrom(r.left + r.width / 2, r.bottom - 6);
        }, null, 1.6)
        .to('.gift__light', { opacity: 0.75, duration: 1.2, ease: 'sine.inOut' }, 2.2)

      // 5 · la caja abierta se acomoda debajo del título
        .to('.gift__pop', { scale: 0.86, y: 12, duration: 0.9, ease: 'power2.inOut' }, 2.3)
        .call(() => !reduced && confetti(), null, 2.5);

      if (reduced) {
        tl.progress(1, true);
        onOpenEnd();
      }
    }, rootRef);
  };

  const words = TEXTS.title.split(' ');

  return (
    <section className={`hero is-${phase}`} ref={rootRef} aria-label="Regalo">
      <div className="hero__twinkles" aria-hidden="true">
        {TWINKLES.map(([x, y, s, d], i) => (
          <span
            key={i}
            className="twinkle"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <div className="hero__top">
        <p className="hero__intro">{TEXTS.invitation}</p>
        {phase === 'open' && (
          <h1 className="hero__title" ref={titleRef} tabIndex={-1}>
            {words.map((w, i) => (
              <span key={i} className="hero__word" style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
          </h1>
        )}
      </div>

      <GiftBox
        ref={giftRef}
        label={TEXTS.giftLabel}
        disabled={phase !== 'closed'}
        onOpen={open}
      />

      <div className="hero__bottom">
        <p className="hero__hint">{TEXTS.hint}</p>
        {phase === 'open' && (
          <a className="hero__scroll" href="#carta">
            {TEXTS.scrollHint}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M12 5v14m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
