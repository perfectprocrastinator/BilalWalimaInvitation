import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '../config/wedding';
import { EmbroideryCorner, FloralFlourish, JasmineSprig } from './Ornaments';
import { Icon } from './Icons';
import AtelierLogo from './AtelierLogo';

export default function InvitationOpening({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const reduceMotion = useReducedMotion();
  const timer = useRef();
  const openButton = useRef();

  useEffect(() => {
    openButton.current?.focus({ preventScroll: true });
    return () => clearTimeout(timer.current);
  }, []);

  function open() {
    if (opening) return;
    if (reduceMotion) return onOpen();
    setOpening(true);
    timer.current = setTimeout(onOpen, 1650);
  }

  return (
    <motion.div className="opening paper" initial={false} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
      <div className="opening-border" aria-hidden="true"><EmbroideryCorner className="cover-corner top-left" /><EmbroideryCorner className="cover-corner bottom-right" /></div>
      <header className="cover-header flex items-center justify-between">
        <span className="cover-brand" role="img" aria-label={wedding.shortNames}><AtelierLogo /></span>
        <span className="eyebrow hidden sm:block">A celebration of togetherness</span>
        <span className="eyebrow">{wedding.city} · {wedding.dateISO.slice(0, 4)}</span>
      </header>

      <main className="opening-content">
        <motion.div className="cover-intro" animate={opening ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.25 }}>
          <p className="eyebrow gold-ink">With love & duas</p>
          <h1>A beautiful beginning.<br /><em>An invitation for you.</em></h1>
        </motion.div>

        <div className="envelope-scene" aria-hidden="true">
          <JasmineSprig className="envelope-botanical botanical-left" />
          <JasmineSprig className="envelope-botanical botanical-right" mirrored />
          <motion.div className="envelope" animate={opening ? { y: [0, 0, 100], opacity: [1, 1, 0] } : {}} transition={{ duration: 1.6, times: [0, 0.72, 1] }}>
            <div className="envelope-back" />
            <motion.div className="envelope-letter" animate={opening ? { y: -135 } : { y: 0 }} transition={{ delay: 0.65, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
              <FloralFlourish className="letter-flourish" />
              <span className="eyebrow">The Walima of</span>
              <span className="letter-names">{wedding.shortNames}</span>
              <span className="letter-date">{wedding.dateLabel}</span>
            </motion.div>
            <div className="envelope-front"><div className="envelope-embroidery" /><EmbroideryCorner className="envelope-corner" /><EmbroideryCorner className="envelope-corner right" /></div>
            <motion.div className="envelope-flap" animate={opening ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 4 }} transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><div className="flap-liner" /></motion.div>
            <motion.div className="wax-seal" animate={opening ? { y: -38, rotate: -12, scale: 1.08, opacity: 0 } : {}} transition={{ duration: 0.45 }}>
              <span>{wedding.monogram}</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="cover-caption">
          <p className="cover-names">{wedding.groom} <span>&</span> {wedding.bride}</p>
          <p className="eyebrow">{wedding.dateLabel} <span className="caption-dot">·</span> {wedding.city}</p>
        </div>
        <motion.button ref={openButton} className="button button-primary open-button" onClick={open} aria-disabled={opening} whileHover={reduceMotion ? {} : { y: -2 }} whileTap={reduceMotion ? {} : { scale: 0.98 }}>
          <Icon name="envelope" /> {opening ? 'Opening your invitation…' : 'Open Invitation'} <Icon name="arrow" />
        </motion.button>
        <button className="skip-button" onClick={onOpen}>Skip to invitation <span aria-hidden="true">↗</span></button>
        <p className="sr-only" role="status">{opening ? 'Your invitation is opening.' : ''}</p>
      </main>
      <footer className="cover-footer eyebrow">An evening of love, gratitude & new beginnings</footer>
    </motion.div>
  );
}
