import { cn } from '../../lib/cn.js';

/** Small frosted chip used for tech-stack tags and role metadata. */
export default function Pill({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={cn(
        'glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-ink',
        className
      )}
    >
      {children}
    </Tag>
  );
}
