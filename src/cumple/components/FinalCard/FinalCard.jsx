import { TEXTS } from '../../content.js';
import { useReveal } from '../../hooks/useReveal.js';
import Heart from '../Heart/Heart.jsx';
import './FinalCard.css';

export default function FinalCard({ onReplay }) {
  const ref = useReveal(0.25);
  const { eyebrow, text, seePhotos, replay } = TEXTS.final;

  const goToPhotos = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('fotos')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('fotos-titulo')?.focus({ preventScroll: true });
  };

  return (
    <section className="final" aria-labelledby="final-titulo">
      <div className="final__card reveal" ref={ref}>
        <Heart className="final__heart" />
        <h2 className="eyebrow final__eyebrow" id="final-titulo">{eyebrow}</h2>
        <p className="final__text">{text}</p>
        <div className="final__actions">
          <button type="button" className="btn btn--solid" onClick={goToPhotos}>
            {seePhotos}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReplay}>
            {replay}
          </button>
        </div>
      </div>
    </section>
  );
}
