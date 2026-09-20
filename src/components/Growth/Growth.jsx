import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';
import './Growth.css';

export default function Growth() {
  const sectionRef = useRef(null);
  const stemRef = useRef(null);
  const leaf1Ref = useRef(null);
  const leaf2Ref = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stem = stemRef.current;
      const stemLength = stem.getTotalLength();
      stem.style.strokeDasharray = stemLength;
      stem.style.strokeDashoffset = stemLength;

      gsap.to(stem, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinType: 'transform',
        },
      });
      gsap.to(leaf1Ref.current, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '40% top',
          end: '60% top',
          scrub: true,
        },
      });
      gsap.to(leaf2Ref.current, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: '75% top',
          scrub: true,
        },
      });
      gsap.to(captionRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '70% top',
          end: '95% top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="growth" ref={sectionRef}>
      <svg className="stem-svg" viewBox="0 0 200 500" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7CB342" />
            <stop offset="100%" stopColor="#3E8E41" />
          </linearGradient>
        </defs>
        <path
          ref={stemRef}
          fill="none"
          stroke="#5aa15a"
          strokeWidth="6"
          strokeLinecap="round"
          d="M100,500 C93,410 108,330 98,240 C93,180 105,130 100,55"
        />
        <path
          ref={leaf1Ref}
          fill="url(#leafGrad)"
          opacity="0"
          style={{ transformOrigin: '100px 380px' }}
          d="M98,382 C55,376 34,344 40,308 C88,316 108,350 98,382 Z"
        />
        <path
          ref={leaf2Ref}
          fill="url(#leafGrad)"
          opacity="0"
          style={{ transformOrigin: '100px 300px' }}
          d="M100,298 C145,286 164,252 156,220 C108,232 92,266 100,298 Z"
        />
      </svg>
      <p id="growth-caption" ref={captionRef}>
        algo está creciendo...
      </p>
    </section>
  );
}
