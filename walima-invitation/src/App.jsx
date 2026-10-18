import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { wedding } from './config/wedding';
import { downloadCalendar } from './lib/event';
import InvitationOpening from './components/InvitationOpening';
import Countdown from './components/Countdown';
import EventActions from './components/EventActions';
import { ArchFrame, BrandMark, Crescent, CourtyardDrawing, EmbroideryCorner, FloralFlourish, JasmineSprig } from './components/Ornaments';
import { Icon } from './components/Icons';
import Header from './components/Header';
import { Reveal, RevealGroup, RevealItem, DrawDivider } from './components/ScrollReveal';

function Hero({ headingRef }) {
  const reduceMotion = useReducedMotion();
  const enter = index => ({ initial: reduceMotion ? false : { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: index * 0.12 } });
  return <section id="invitation" className="hero" aria-labelledby="couple-heading">
    <div className="hero-particles" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} style={{ '--i': i }} />)}</div>
    <Crescent className="hero-crescent" />
    <div className="hero-side-note left"><span className="tiny-star" aria-hidden="true">✧</span><span>An evening of<br />love & duas</span></div>
    <div className="hero-side-note right"><span className="tiny-star" aria-hidden="true">✧</span><span>In the heart<br />of Lucknow</span></div>
    <div className="arch-composition">
      <ArchFrame className="hero-arch" />
      <JasmineSprig className="hero-jasmine left" /><JasmineSprig className="hero-jasmine right" mirrored />
      <div className="hero-inner">
        {/* Sacred text is intentionally outside every animated element. */}
        <div className="bismillah">
          <p lang="ar" dir="rtl" className="arabic">{wedding.copy.arabic}</p>
          <p className="translation">{wedding.copy.translation}</p>
        </div>
        <motion.p className="eyebrow families" {...enter(0)}>{wedding.copy.families}</motion.p>
        <h1 id="couple-heading" ref={headingRef} tabIndex="-1" className="couple-names">
          <motion.span {...enter(1)}>{wedding.groom}</motion.span>
          <motion.span className="couple-ampersand" {...enter(2)}>&</motion.span>
          <motion.span {...enter(3)}>{wedding.bride}</motion.span>
        </h1>
        <motion.div {...enter(4)}>
          <p className="hero-invitation">{wedding.copy.invitation}</p>
          <div className="little-divider" aria-hidden="true"><span />✧<span /></div>
          <p className="hero-date">{wedding.dateLabel} <span aria-hidden="true">·</span> {wedding.city}</p>
        </motion.div>
      </div>
    </div>
    <a href="#our-invitation" className="scroll-cue"><span className="eyebrow">A celebration close to our hearts</span><Icon name="down" /></a>
  </section>;
}

function InvitationMessage() {
  return <section id="our-invitation" className="message-section section-anchor" aria-labelledby="message-heading">
    <RevealGroup className="message-inner">
      <EmbroideryCorner className="message-corner top-left" /><EmbroideryCorner className="message-corner top-right" />
      <EmbroideryCorner className="message-corner bottom-left" /><EmbroideryCorner className="message-corner bottom-right" />
      <RevealItem as="p" className="eyebrow gold-ink">From our hearts to yours</RevealItem>
      <h2 id="message-heading" className="sr-only">Our invitation</h2>
      <RevealItem as="p" className="invitation-message">{wedding.copy.message}</RevealItem>
      <DrawDivider />
      <RevealItem as="p" className="message-signature">With love, {wedding.shortNames}</RevealItem>
    </RevealGroup>
  </section>;
}

function Celebration({ onSave, saved }) {
  const reduced = useReducedMotion();
  return <section id="celebration" className="celebration-section section-anchor" aria-labelledby="celebration-heading">
    <div className="celebration-inner">
      <RevealGroup className="celebration-intro">
        <motion.div className="courtyard-reveal" variants={{ hidden: { clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)', opacity: 0.3 }, visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] } } }}><CourtyardDrawing className="courtyard" /></motion.div>
        <RevealItem as="span" className="eyebrow courtyard-caption">{wedding.city} · A little heritage, a lot of heart</RevealItem>
      </RevealGroup>
      <Reveal className="stationery-wrap" delay={0.12}>
        <article className="stationery paper" aria-label="Walima invitation details">
          <div className="stationery-border" aria-hidden="true" />
          <FloralFlourish className="stationery-flourish" />
          <p className="eyebrow gold-ink">The celebration</p>
          <h2 id="celebration-heading">{wedding.occasion}</h2>
          <div className="stationery-date"><p>{wedding.dateLabel}</p><p>{wedding.timeLabel}</p></div>
          <DrawDivider />
          <address><span>{wedding.venue.name}</span><br />{wedding.venue.locality}, {wedding.venue.city}</address>
          <EventActions onSave={onSave} saved={saved} />
          <p className="stationery-note">Your presence is our greatest joy.</p>
        </article>
      </Reveal>
    </div>
  </section>;
}

function Closing() {
  return <section id="blessings" className="closing-section section-anchor" aria-labelledby="blessing-heading">
    <RevealGroup>
      <RevealItem><FloralFlourish className="closing-flourish" /></RevealItem>
      <RevealItem as="p" className="eyebrow gold-ink">With your love & duas</RevealItem>
      <RevealItem as="h2" id="blessing-heading">{wedding.copy.blessing}</RevealItem>
      <RevealItem as="p" className="closing-message">{wedding.copy.closing}</RevealItem>
      <RevealItem as="p" className="closing-signature">{wedding.shortNames}</RevealItem>
      <RevealItem className="closing-date eyebrow">{wedding.dateLabel} <span aria-hidden="true">·</span> {wedding.city}</RevealItem>
    </RevealGroup>
  </section>;
}

function Invitation() {
  const headingRef = useRef();
  const resetSaved = useRef();
  const [saved, setSaved] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    return () => clearTimeout(resetSaved.current);
  }, []);

  function saveDate() {
    try {
      downloadCalendar(wedding);
      setSaved(true);
      setDownloadStatus('Calendar invitation downloaded. Open the .ics file to add the Walima to your calendar.');
      clearTimeout(resetSaved.current);
      resetSaved.current = setTimeout(() => { setSaved(false); setDownloadStatus(''); }, 7000);
    } catch {
      setDownloadStatus('The calendar file could not be downloaded. Please try Save the Date again.');
      clearTimeout(resetSaved.current);
      resetSaved.current = setTimeout(() => setDownloadStatus(''), 10000);
    }
  }

  return <div className="invitation-page paper">
    <a className="skip-to-content" href="#invitation">Skip to invitation</a>
    <Header />
    <main>
      <Hero headingRef={headingRef} />
      <InvitationMessage />
      <Countdown />
      <Celebration onSave={saveDate} saved={saved} />
      <Closing />
    </main>
    <footer className="site-footer">
      <span className="eyebrow">Made with love & duas</span>
      <a href="#invitation" aria-label={`${wedding.monogram} — back to invitation`}><BrandMark className="footer-monogram" monogram={wedding.monogram} /></a>
      <span className="eyebrow">A beautiful beginning · {wedding.dateISO.slice(0, 4)}</span>
    </footer>
    <EventActions compact onSave={saveDate} saved={saved} />
    <p className="download-status" role="status" aria-live="polite">{downloadStatus}</p>
  </div>;
}

export default function App() {
  const [opened, setOpened] = useState(() => ['#invitation', '#our-invitation', '#celebration', '#blessings'].includes(window.location.hash));
  return <MotionConfig reducedMotion="user">
    <AnimatePresence mode="wait">
      {opened ? <Invitation key="invitation" /> : <InvitationOpening key="opening" onOpen={() => setOpened(true)} />}
    </AnimatePresence>
  </MotionConfig>;
}
