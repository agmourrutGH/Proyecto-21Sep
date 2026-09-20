import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export const isMobile = () => window.matchMedia('(max-width:700px)').matches;

export { gsap, ScrollTrigger };
