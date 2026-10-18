import { useEffect, useState } from 'react';
import { wedding } from '../config/wedding';
import { getTimeRemaining } from '../lib/event';
import { RevealGroup, RevealItem } from './ScrollReveal';

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeRemaining(wedding.dateISO));
  useEffect(() => {
    const update = () => setTime(getTimeRemaining(wedding.dateISO));
    const id = setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', update); };
  }, []);

  return <RevealGroup as="section" className="countdown-section" aria-labelledby="countdown-heading">
    <RevealItem as="p" className="eyebrow gold-ink">Every moment brings us closer</RevealItem>
    <RevealItem as="h2" id="countdown-heading">Until we celebrate together</RevealItem>
    {time.hasStarted ? <p className="celebration-message" role="status">{wedding.copy.celebration}</p> :
      <div className="countdown-shell"><div className="countdown" role="timer" aria-live="off" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds until the Walima`}>
        {['days', 'hours', 'minutes', 'seconds'].map(unit => <RevealItem className="countdown-unit" key={unit} aria-hidden="true">
          <span className="countdown-number">{String(time[unit]).padStart(2, '0')}</span>
          <span className="eyebrow">{unit}</span>
        </RevealItem>)}
      </div></div>}
    <RevealItem as="p" className="countdown-note">A winter evening. A warm gathering. A cherished beginning.</RevealItem>
  </RevealGroup>;
}
