import { useCountUp } from '../../hooks/useCountUp.js';

/**
 * A single animated metric. The number counts up once, when it scrolls into
 * view, and is skipped entirely for reduced-motion visitors.
 */
export default function Stat({ value, suffix = '', prefix = '', label, decimals = 0 }) {
  const [current, ref] = useCountUp(value, { decimals });
  const formatted = current.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref}>
      <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {prefix}
        {formatted}
        {suffix}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}
