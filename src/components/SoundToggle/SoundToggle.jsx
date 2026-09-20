import { useEffect, useRef, useState } from 'react';
import './SoundToggle.css';

export default function SoundToggle() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }
  }, [enabled]);

  return (
    <>
      <audio ref={audioRef} loop muted preload="none">
        {/* Poné acá tu archivo: /public/audio/ambient.mp3 (ver public/audio/README.txt) */}
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
        <source src="/audio/ambient.ogg" type="audio/ogg" />
      </audio>
      <button
        className="sound-toggle"
        onClick={() => setEnabled((v) => !v)}
        aria-label={enabled ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente'}
        aria-pressed={enabled}
      >
        {enabled ? '🔊' : '🔇'}
      </button>
    </>
  );
}
