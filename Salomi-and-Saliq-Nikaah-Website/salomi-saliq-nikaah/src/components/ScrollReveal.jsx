import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: 0.12, margin: '0px 0px -24px 0px' };

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: reduced ? 0 : 0.95, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

export function RevealGroup({ children, className = '', as = 'div', ...props }) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return <Component {...props} className={className} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.11 } } }}>{children}</Component>;
}

export function RevealItem({ children, className = '', as = 'div', ...props }) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return <Component {...props} className={className} variants={{ hidden: { opacity: 0, y: reduced ? 0 : 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.85, ease } } }}>{children}</Component>;
}

export function DrawDivider() {
  const reduced = useReducedMotion();
  const line = { hidden: { scaleX: reduced ? 1 : 0 }, visible: { scaleX: 1, transition: { duration: reduced ? 0 : 1.1, ease } } };
  return <motion.div className="little-divider" aria-hidden="true" initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
    <motion.span variants={line} style={{ originX: 1 }} />✧<motion.span variants={line} style={{ originX: 0 }} />
  </motion.div>;
}
