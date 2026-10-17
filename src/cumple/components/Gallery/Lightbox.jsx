import { useEffect, useRef } from 'react';

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// Vista ampliada con <dialog> nativo: atrapa el foco, cierra con Esc
// y devuelve el foco a la foto que la abrió.
export default function Lightbox({ photos, index, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const photo = photos[index];
  const many = photos.length > 1;

  const go = (step) => onNavigate((index + step + photos.length) % photos.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, []);

  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null || !many) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={photo.caption || photo.alt}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <figure className="lightbox__figure" key={photo.name}>
        <img src={photo.src} alt={photo.alt} />
        {(photo.caption || many) && (
          <figcaption>
            {photo.caption && <span>{photo.caption}</span>}
            {many && <span className="lightbox__count">{index + 1} / {photos.length}</span>}
          </figcaption>
        )}
      </figure>

      <button type="button" className="lightbox__btn lightbox__close" onClick={() => dialogRef.current.close()} aria-label="Cerrar" autoFocus>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      {many && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Foto anterior">
            <Arrow dir="prev" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Foto siguiente">
            <Arrow dir="next" />
          </button>
        </>
      )}
    </dialog>
  );
}
