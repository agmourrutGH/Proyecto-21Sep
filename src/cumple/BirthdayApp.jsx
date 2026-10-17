import { useState } from 'react';
import { musicSrc } from './media.js';
import FloatingHearts from './components/FloatingHearts/FloatingHearts.jsx';
import GiftHero from './components/GiftHero/GiftHero.jsx';
import Letter from './components/Letter/Letter.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import FinalCard from './components/FinalCard/FinalCard.jsx';
import MusicToggle from './components/MusicToggle/MusicToggle.jsx';

export default function BirthdayApp() {
  // 'closed' → 'opening' → 'open'
  const [phase, setPhase] = useState('closed');
  // cambia para volver a montar el regalo cerrado ("Abrir el regalo otra vez")
  const [round, setRound] = useState(0);

  const replay = () => {
    window.scrollTo(0, 0);
    setPhase('closed');
    setRound((r) => r + 1);
  };

  return (
    <>
      <FloatingHearts />
      <main className="birthday">
        <GiftHero
          key={round}
          phase={phase}
          autoFocus={round > 0}
          onOpenStart={() => setPhase('opening')}
          onOpenEnd={() => setPhase('open')}
        />
        {phase === 'open' && (
          <>
            <Letter />
            <Gallery />
            <FinalCard onReplay={replay} />
          </>
        )}
      </main>
      {musicSrc && <MusicToggle src={musicSrc} />}
    </>
  );
}
