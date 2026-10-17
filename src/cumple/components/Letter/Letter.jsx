import { TEXTS } from '../../content.js';
import { useReveal } from '../../hooks/useReveal.js';
import Heart from '../Heart/Heart.jsx';
import './Letter.css';

function Paragraph({ text, index }) {
  const ref = useReveal(0.3);
  return (
    <p ref={ref} className="reveal letter__p" style={{ '--delay': `${0.15 + index * 0.25}s` }}>
      {text}
    </p>
  );
}

export default function Letter() {
  const cardRef = useReveal(0.15);
  const { eyebrow, paragraphs, signature } = TEXTS.letter;

  return (
    <section className="letter-section" id="carta" aria-labelledby="carta-titulo">
      <article className="letter reveal" ref={cardRef}>
        <span className="letter__seal" aria-hidden="true">
          <Heart />
        </span>
        <h2 className="eyebrow" id="carta-titulo">{eyebrow}</h2>
        {paragraphs.map((t, i) => (
          <Paragraph key={i} text={t} index={i} />
        ))}
        {signature && <p className="letter__signature">{signature}</p>}
      </article>
    </section>
  );
}
