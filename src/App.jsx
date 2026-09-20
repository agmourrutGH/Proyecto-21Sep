import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsapSetup';
import FlowerDefs from './components/FlowerDefs.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar.jsx';
import Intro from './components/Intro/Intro.jsx';
import Growth from './components/Growth/Growth.jsx';
import Bloom from './components/Bloom/Bloom.jsx';
import Field from './components/Field/Field.jsx';
import Message from './components/Message/Message.jsx';
import PetalsFalling from './components/PetalsFalling/PetalsFalling.jsx';
import SoundToggle from './components/SoundToggle/SoundToggle.jsx';

export default function App() {
  useEffect(() => {
    const onOrientation = () => setTimeout(() => ScrollTrigger.refresh(), 300);
    window.addEventListener('orientationchange', onOrientation);
    ScrollTrigger.refresh();
    return () => window.removeEventListener('orientationchange', onOrientation);
  }, []);

  return (
    <>
      <FlowerDefs />
      <ProgressBar />
      <div className="vignette" />

      <Intro />
      <Growth />
      <Bloom />
      <Field />
      <Message />

      <PetalsFalling />
      <SoundToggle />
    </>
  );
}
