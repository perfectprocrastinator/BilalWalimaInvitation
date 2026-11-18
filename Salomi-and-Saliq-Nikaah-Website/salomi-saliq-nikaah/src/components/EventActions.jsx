import { motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import { wedding } from '../config/wedding';
import { getMapsUrl } from '../lib/event';
import { Icon } from './Icons';

export default function EventActions({ onSave, saved, compact = false }) {
  const reduceMotion = useReducedMotion();
  const barRef = useRef(null);
  useLayoutEffect(() => {
    if (!compact) return;
    const measure = () => {
      const bar = barRef.current;
      const height = getComputedStyle(bar).position === 'fixed' ? bar.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--mobile-actions-height', `${height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(barRef.current);
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); document.documentElement.style.removeProperty('--mobile-actions-height'); };
  }, [compact]);
  const interaction = { whileHover: reduceMotion ? {} : { y: -2 }, whileTap: reduceMotion ? {} : { scale: 0.98 } };
  return <nav ref={barRef} className={compact ? 'mobile-actions' : 'event-actions'} aria-label={compact ? 'Quick celebration actions' : 'Celebration actions'}>
    <motion.a className={`button ${compact ? '' : 'button-primary'}`} href={getMapsUrl(wedding)} target="_blank" rel="noopener noreferrer" {...interaction}>
      <Icon name="pin" /> <span>{compact ? 'Directions' : 'Get Directions'}</span> {!compact && <span aria-hidden="true">↗</span>}<span className="sr-only"> (opens the venue location in a new tab)</span>
    </motion.a>
    <motion.button className={`button ${compact ? '' : 'button-outline'}`} onClick={onSave} {...interaction}>
      <Icon name={saved ? 'check' : 'calendar'} /> <span>{saved ? 'Downloaded' : 'Save the Date'}</span>
    </motion.button>
  </nav>;
}
