import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to `target` once its element scrolls into view.
 * Returns [displayValue, ref]. Reduced-motion users get the final value
 * immediately, with no animation frames scheduled at all.
 */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return undefined;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    let start = 0;

    const step = (now) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(Number((target * easeOut(progress)).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, decimals, reduced]);

  return [value, ref];
}
