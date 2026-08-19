import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

/**
 * Fades and slides its children in the first time they scroll into view.
 *
 * Degrades safely: with no IntersectionObserver (or with reduced motion
 * requested) the content is simply visible from the start, so nothing is ever
 * hidden behind an animation that never runs.
 */
export default function Reveal({ children, delay = 0, y = 24, className = '', as: Tag = 'div' }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return undefined;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      className={cn('transition-all duration-700 ease-smooth motion-reduce:transition-none', className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${y}px)`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </Tag>
  );
}
