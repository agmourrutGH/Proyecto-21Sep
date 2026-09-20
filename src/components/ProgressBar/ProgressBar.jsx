import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div id="progressBar" ref={barRef} />;
}
