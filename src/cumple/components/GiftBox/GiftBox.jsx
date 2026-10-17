import { forwardRef } from 'react';
import './GiftBox.css';

// Cinta horizontal en dos mitades: al abrir se separan desde el centro.
const RibbonCross = () => (
  <>
    <i className="rb-h rb-h--l" />
    <i className="rb-h rb-h--r" />
    <i className="rb-v" />
  </>
);

function Bow() {
  return (
    <svg className="gift__bow" viewBox="0 0 200 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bowGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdeab4" />
          <stop offset="45%" stopColor="#f0c96e" />
          <stop offset="100%" stopColor="#b9822b" />
        </linearGradient>
        <linearGradient id="bowKnot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbe3a2" />
          <stop offset="100%" stopColor="#c08a33" />
        </linearGradient>
      </defs>
      <g className="bow-l">
        <path d="M100 84C78 40 40 4 16 22C-2 38 16 78 100 84Z" fill="url(#bowGold)" />
        <path d="M100 84C80 58 50 34 34 40C24 46 40 72 100 84Z" fill="#a8741f" opacity=".5" />
        <path d="M28 27C48 18 68 34 82 58" fill="none" stroke="#fff6dc" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="bow-r">
        <path d="M100 84C122 40 160 4 184 22C202 38 184 78 100 84Z" fill="url(#bowGold)" />
        <path d="M100 84C120 58 150 34 166 40C176 46 160 72 100 84Z" fill="#a8741f" opacity=".5" />
        <path d="M172 27C152 18 132 34 118 58" fill="none" stroke="#fff6dc" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="bow-k">
        <rect x="85" y="66" width="30" height="30" rx="10" fill="url(#bowKnot)" />
        <path d="M92 72c4-2 10-2 15 0" fill="none" stroke="#fff6dc" strokeOpacity=".75" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const Tails = () => (
  <svg className="tails-svg" viewBox="0 0 60 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <polygon points="22,0 32,0 18,94 12,86 4,96" fill="url(#bowGold)" />
    <polygon points="28,0 38,0 56,96 48,86 42,94" fill="url(#bowGold)" />
  </svg>
);

// Caja de regalo 3D. Las animaciones de apertura las maneja GiftHero
// (GSAP) apuntando a estas clases.
const GiftBox = forwardRef(function GiftBox({ label, disabled, onOpen }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="gift"
      onClick={onOpen}
      disabled={disabled}
      aria-label={label}
    >
      <span className="gift__shadow" />
      <span className="gift__float">
        <span className="gift__halo" />
        <span className="gift__light">
          <span className="gift__rays" />
          <span className="gift__beam" />
        </span>
        <span className="gift__pop">
          <span className="gift__scene">
            <span className="gift__tilt">
            <span className="gift__rig">
              {/* interior (se ve cuando sale la tapa) */}
              <span className="face b-floor" />
              <span className="face b-in-back" />
              <span className="face b-in-left" />
              <span className="face b-in-right" />

              {/* caja */}
              <span className="face b-front">
                <RibbonCross />
                <i className="shine" />
                <i className="lid-shade" />
              </span>
              <span className="face b-right">
                <RibbonCross />
                <i className="lid-shade" />
              </span>
              <span className="face b-left">
                <RibbonCross />
              </span>

              {/* tapa */}
              <span className="gift__lid-pos">
                <span className="gift__lid">
                  <span className="face l-under" />
                  <span className="face l-back"><i className="rb-v" /></span>
                  <span className="face l-left"><i className="rb-v" /></span>
                  <span className="face l-right"><i className="rb-v" /></span>
                  <span className="face l-front"><i className="rb-v" /></span>
                  <span className="face l-top">
                    <i className="rb-v" />
                    <i className="rb-hz" />
                  </span>
                  <span className="l-tails"><Tails /></span>
                  <span className="gift__bow-pos"><Bow /></span>
                </span>
              </span>
            </span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
});

export default GiftBox;
