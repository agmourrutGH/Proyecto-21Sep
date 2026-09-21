export default function FlowerDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="centerGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8a5a24" />
          <stop offset="100%" stopColor="#4a2f12" />
        </radialGradient>
        <radialGradient id="sunflowerCenterGrad" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#9a6a2e" />
          <stop offset="100%" stopColor="#4a2f12" />
        </radialGradient>
        <pattern id="seedPattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <rect width="6" height="6" fill="#5c3a16" />
          <circle cx="3" cy="3" r="1.3" fill="#2e1c0a" />
        </pattern>

        <symbol id="flowerShape" viewBox="0 0 120 120">
          <g fill="currentColor" stroke="rgba(0,0,0,.08)" strokeWidth="1">
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(60 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(120 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(180 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(240 60 60)" />
            <path d="M60,60 C48,45 46,18 60,4 C74,18 72,45 60,60 Z" transform="rotate(300 60 60)" />
          </g>
          <circle cx="60" cy="60" r="16" fill="url(#centerGrad)" />
        </symbol>

        {/* girasol: dos capas de petalos + centro con textura de semillas */}
        <symbol id="flowerShapeSunflower" viewBox="0 0 120 120">
          <g fill="currentColor" opacity=".55">
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(45 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(90 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(135 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(180 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(225 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(270 60 60)" />
            <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(315 60 60)" />
          </g>
          <g fill="currentColor" stroke="rgba(0,0,0,.1)" strokeWidth="1">
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(22.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(67.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(112.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(157.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(202.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(247.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(292.5 60 60)" />
            <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(337.5 60 60)" />
          </g>
          <circle cx="60" cy="60" r="18" fill="url(#sunflowerCenterGrad)" />
          <circle cx="60" cy="60" r="16" fill="url(#seedPattern)" />
        </symbol>

        {/* margarita asimetrica: 7 petalos con variacion de escala + veta */}
        <symbol id="flowerShapeAsymmetric" viewBox="0 0 120 120">
          <g transform="rotate(0 60 60) translate(60 60) scale(1.00) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(50 60 60) translate(60 60) scale(0.93) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(107 60 60) translate(60 60) scale(1.05) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(154 60 60) translate(60 60) scale(0.96) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(206 60 60) translate(60 60) scale(1.03) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(252 60 60) translate(60 60) scale(0.90) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <g transform="rotate(309 60 60) translate(60 60) scale(1.06) translate(-60 -60)">
            <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor" />
            <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" strokeWidth="1" />
          </g>
          <circle cx="60" cy="60" r="15" fill="url(#centerGrad)" />
        </symbol>
      </defs>
    </svg>
  );
}
