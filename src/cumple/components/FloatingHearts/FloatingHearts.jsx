import Heart from '../Heart/Heart.jsx';
import './FloatingHearts.css';

// corazones de fondo: posición (vw), tamaño (px), duración y retardo (s)
const HEARTS = [
  [6, 12, 19, 0], [17, 9, 23, 6], [29, 15, 21, 12], [44, 8, 25, 3],
  [58, 13, 20, 9], [71, 10, 24, 15], [83, 16, 22, 5], [94, 9, 26, 11],
];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {HEARTS.map(([x, size, dur, delay], i) => (
        <span
          key={i}
          className="floating-hearts__item"
          style={{ left: `${x}vw`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `-${delay}s` }}
        >
          <Heart />
        </span>
      ))}
    </div>
  );
}
