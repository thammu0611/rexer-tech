import { cn } from '../../lib/cn.js';

/**
 * The frosted panel every section is built from.
 *
 * `as` keeps the semantics correct (article / li / section) while the visual
 * treatment stays identical, and `interactive` adds hover lift only where a
 * card is genuinely clickable.
 */
export default function GlassCard({
  tag,
  children,
  className = '',
  strong = false,
  interactive = false,
  as: Tag = 'div',
  ...rest
}) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-glass',
        strong ? 'glass-strong' : 'glass',
        interactive &&
          'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-glass-lg focus-within:-translate-y-1',
        className
      )}
      {...rest}
    >
      {/* specular highlight arc across the top edge, simulating light on glass */}
      <span
        aria-hidden="true"
        className="glass-highlight pointer-events-none absolute -top-1/2 left-0 right-0 h-full rounded-[100%] opacity-60"
      />
      {tag && (
        <span className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-widest text-teal/80">
          {tag}
        </span>
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}
