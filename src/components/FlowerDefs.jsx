export default function FlowerDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="centerGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8a5a24" />
          <stop offset="100%" stopColor="#4a2f12" />
        </radialGradient>
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
      </defs>
    </svg>
  );
}
