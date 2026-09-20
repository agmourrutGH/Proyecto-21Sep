import { forwardRef } from 'react';
import './Flower.css';

const Flower = forwardRef(function Flower(
  { size = 96, color = '#FFD23F', className = '', style, onClick },
  ref
) {
  return (
    <div
      ref={ref}
      className={`flower-wrap ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      <svg
        className="flower-svg"
        viewBox="0 0 120 120"
        width={size}
        height={size}
        style={{ color }}
      >
        <use href="#flowerShape" xlinkHref="#flowerShape" />
      </svg>
    </div>
  );
});

export default Flower;
