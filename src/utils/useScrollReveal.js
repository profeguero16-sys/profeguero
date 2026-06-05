import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook que devuelve { ref, inView } para usar con Framer Motion.
 * @param {object} options - opciones de useInView (amount, once, etc.)
 */
export function useScrollReveal(options = { amount: 0.15, once: true }) {
  const ref = useRef(null);
  const inView = useInView(ref, options);
  return { ref, inView };
}
