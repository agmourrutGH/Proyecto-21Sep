import { useRef, useState } from 'react';
import { TEXTS } from '../../content.js';
import './MusicToggle.css';

// Solo se monta si existe public/audio/cumple.mp3 (ver media.js).
// Nunca suena sola: arranca únicamente al tocar el botón.
export default function MusicToggle({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`music-toggle ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? TEXTS.music.pause : TEXTS.music.play}
        aria-pressed={playing}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          {playing ? (
            <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          ) : (
            <path d="M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm10-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          )}
        </svg>
      </button>
    </>
  );
}
