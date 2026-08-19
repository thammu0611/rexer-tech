import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

/**
 * Makes client-side navigation behave like a real page load.
 *
 * - Scrolls to the top (or to the #hash target, retrying briefly because the
 *   destination route is code-split and may still be resolving).
 * - Moves focus to the new <main> so screen-reader and keyboard users land on
 *   the new page instead of staying parked where the old page used to be.
 *
 * Both are skipped on the very first render: on a cold load the browser has
 * already put the visitor at the top, and stealing focus into <main> would push
 * the skip link and the whole navigation behind the content in tab order.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const reduced = usePrefersReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    const behavior = reduced ? 'auto' : 'smooth';
    let frame = 0;

    // A hash target may belong to a lazily-loaded route: look for it across a
    // few frames before giving up and going to the top.
    if (hash) {
      let attempts = 0;
      const tryScroll = () => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior, block: 'start' });
          return;
        }
        if (attempts < 40) {
          attempts += 1;
          frame = requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
      return () => cancelAnimationFrame(frame);
    }

    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    window.scrollTo({ top: 0, behavior });
    document.getElementById('main')?.focus({ preventScroll: true });

    return undefined;
  }, [pathname, hash, reduced]);

  return null;
}
