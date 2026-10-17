import { useState } from 'react';
import { TEXTS } from '../../content.js';
import { photos } from '../../media.js';
import { useReveal } from '../../hooks/useReveal.js';
import Heart from '../Heart/Heart.jsx';
import Lightbox from './Lightbox.jsx';
import './Gallery.css';

function PhotoFrame({ photo, index, onOpen, onFail }) {
  const ref = useReveal(0.2);
  const ready = Boolean(photo.src);

  return (
    <figure
      ref={ref}
      className={`polaroid polaroid--${index + 1} reveal`}
      style={{ '--delay': `${index * 0.12}s` }}
    >
      <span className="polaroid__tape" aria-hidden="true" />
      {ready ? (
        <button
          type="button"
          className="polaroid__photo"
          onClick={() => onOpen(photo.name)}
          aria-label={`${TEXTS.gallery.openLabel}: ${photo.caption || photo.alt}`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            style={photo.focus ? { objectPosition: photo.focus } : undefined}
            loading="lazy"
            decoding="async"
            onError={() => onFail(photo.name)}
          />
        </button>
      ) : (
        <div className="polaroid__photo polaroid__placeholder">
          <Heart className="polaroid__ph-heart" outline />
          <span>{TEXTS.gallery.placeholder}</span>
        </div>
      )}
      <figcaption className="polaroid__caption">
        {photo.caption || <Heart className="polaroid__mini-heart" />}
      </figcaption>
    </figure>
  );
}

export default function Gallery() {
  const headRef = useReveal(0.4);
  const [failed, setFailed] = useState([]);
  const [openName, setOpenName] = useState(null);

  // si una foto existe pero no se puede cargar, se muestra el marco vacío
  const list = photos.map((p) => (failed.includes(p.name) ? { ...p, src: null } : p));
  const viewable = list.filter((p) => p.src);
  const openIndex = viewable.findIndex((p) => p.name === openName);

  return (
    <section className="gallery" id="fotos" aria-labelledby="fotos-titulo">
      <header className="gallery__head reveal" ref={headRef}>
        <p className="eyebrow">{TEXTS.gallery.eyebrow}</p>
        <h2 id="fotos-titulo" tabIndex={-1}>{TEXTS.gallery.title}</h2>
      </header>

      <div className="album">
        <span className="album__deco album__deco--a" aria-hidden="true"><Heart /></span>
        <span className="album__deco album__deco--b" aria-hidden="true"><Heart /></span>
        <span className="album__deco album__deco--c" aria-hidden="true" />
        {list.map((p, i) => (
          <PhotoFrame
            key={p.name}
            photo={p}
            index={i}
            onOpen={setOpenName}
            onFail={(name) => setFailed((f) => [...f, name])}
          />
        ))}
      </div>

      {openIndex >= 0 && (
        <Lightbox
          photos={viewable}
          index={openIndex}
          onNavigate={(i) => setOpenName(viewable[i].name)}
          onClose={() => setOpenName(null)}
        />
      )}
    </section>
  );
}
