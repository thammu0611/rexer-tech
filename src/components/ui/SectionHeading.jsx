import { cn } from '../../lib/cn.js';

export function Eyebrow({ children, className = '' }) {
  return (
    <div className={cn('mb-4 flex items-center gap-2', className)}>
      <span aria-hidden="true" className="h-px w-6 bg-teal" />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal">{children}</span>
    </div>
  );
}

/**
 * Eyebrow + heading + description block.
 *
 * `as` lets a page keep a correct heading order (h1 on a hero, h2 on the
 * sections below it) without forking the component.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  size = 'h2',
  id,
  className = '',
}) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={cn('flex max-w-2xl flex-col', alignClass, className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          'text-balance font-display font-semibold text-ink',
          size === 'hero' ? 'text-fluid-hero' : 'text-fluid-h2'
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="text-pretty mt-3 font-body text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
