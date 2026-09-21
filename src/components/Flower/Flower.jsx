import { forwardRef } from 'react';
import './Flower.css';

const VARIANT_IDS = {
  default: 'flowerShape',
  sunflower: 'flowerShapeSunflower',
  asymmetric: 'flowerShapeAsymmetric',
};

const Flower = forwardRef(function Flower(
  { size = 96, color = '#FFD23F', variant = 'default', className = '', style, onClick },
  ref
) {
  const shapeId = VARIANT_IDS[variant] || VARIANT_IDS.default;
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
        <use href={`#${shapeId}`} xlinkHref={`#${shapeId}`} />
      </svg>
    </div>
  );
});

export default Flower;
