import { wedding } from '../config/wedding';
import './AtelierLogo.css';

/** Decorative identity: the containing link or button supplies its accessible name. */
export default function AtelierLogo({ className = '', compact = false }) {
  const initials = wedding.monogram.match(/\p{L}/gu) ?? [wedding.groom[0], wedding.bride[0]];

  return (
    <span className={`atelier-logo${compact ? ' atelier-logo--compact' : ''}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg className="atelier-logo__crest" viewBox="0 0 64 80" fill="none" aria-hidden="true" focusable="false">
        <g className="atelier-logo__gold" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path className="atelier-logo__outline" d="M7 58V32C7 25 11 20 17 18C17 13 22 10 27 9L32 3L37 9C42 10 47 13 47 18C53 20 57 25 57 32V58C57 65 52 70 44 72L32 77L20 72C12 70 7 65 7 58Z" />
          <path className="atelier-logo__inset" d="M11 55V33C11 27 15 23 21 21C20 16 26 14 29 13L32 9L35 13C38 14 44 16 43 21C49 23 53 27 53 33V55M12 62C15 67 22 68 26 70M38 70C42 68 49 67 52 62" />
          <path className="atelier-logo__moon" d="M37 19C33 18 30 21 30 24C30 27 32 29 35 29C31 31 27 28 27 24C27 20 32 17 37 19Z" />
          <path className="atelier-logo__botanical" d="M24 66C28 66 30 68 32 71C34 68 36 66 40 66M28 67C23 68 20 65 21 62C25 62 28 64 28 67ZM36 67C41 68 44 65 43 62C39 62 36 64 36 67ZM32 70V65M32 65C29 62 30 59 32 58C34 59 35 62 32 65Z" />
        </g>
        <text className="atelier-logo__initial atelier-logo__initial--first" x="15" y="51">{initials[0]}</text>
        <text className="atelier-logo__initial atelier-logo__initial--second" x="33" y="59">{initials.at(-1)}</text>
        <path className="atelier-logo__joining-stroke" d="M19 54C27 49 36 47 44 48" />
      </svg>{' '}
      <span className="atelier-logo__wordmark">
        <span className="atelier-logo__names">{wedding.shortNames}</span>{' '}
        <span className="atelier-logo__occasion">The {wedding.occasion}</span>
      </span>
    </span>
  );
}
