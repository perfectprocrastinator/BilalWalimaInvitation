import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { wedding } from '../config/wedding';
import AtelierLogo from './AtelierLogo';

const sections = [['invitation', 'Invitation'], ['celebration', 'Celebration'], ['blessings', 'Blessings']];

export default function Header() {
  const ref = useRef(null);
  const [active, setActive] = useState('invitation');
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useLayoutEffect(() => {
    const measure = () => document.documentElement.style.setProperty('--header-height', `${ref.current.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--header-height'); };
  }, []);

  useMotionValueEvent(scrollY, 'change', current => {
    setScrolled(current > 24);
    const threshold = (ref.current?.offsetHeight || 90) + window.innerHeight * 0.25;
    const visible = sections.filter(([id]) => document.getElementById(id)?.getBoundingClientRect().top <= threshold);
    setActive(visible.at(-1)?.[0] || 'invitation');
  });

  return <header ref={ref} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="brand-link" href="#invitation" aria-label={`${wedding.monogram.replace(/[^\p{L}]/gu, '')} ${wedding.shortNames} The ${wedding.occasion} — back to invitation`}><AtelierLogo /></a>
    <p className="eyebrow header-date">{wedding.occasion} <span aria-hidden="true">·</span> {wedding.dateLabel}</p>
    <nav aria-label="Invitation sections">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
        {label}
        {active === id && <motion.span className="nav-underline" layoutId="active-section" transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />}
      </a>)}
    </nav>
    <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : progress, originX: 0 }} />
  </header>;
}
