export function Icon({ name, className = '', ...props }) {
  const paths = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    down: <><path d="M12 4v15M5 13l7 7 7-7" /></>,
    pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4m8-4v4M4 11h16m-12 4h2m4 0h2" /></>,
    envelope: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}
