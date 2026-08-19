import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn.js';

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-medium ' +
  'transition-all duration-200 ease-smooth select-none ' +
  'disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0';

const VARIANTS = {
  primary:
    'bg-teal text-paper shadow-glass hover:bg-teal-strong hover:-translate-y-0.5 active:translate-y-0 dark:text-[#04131a]',
  glass:
    'glass text-teal border border-teal/40 hover:border-teal hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-muted hover:text-ink hover:bg-line/5',
};

const SIZES = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

/**
 * One button, three presentations, four possible elements.
 *
 * Renders as <button> by default, <Link> when given `to`, <a> when given
 * `href`, and stays a real focusable control in every case — so keyboard and
 * screen-reader users get correct semantics instead of a clickable <div>.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon = ArrowUpRight,
    showIcon = true,
    loading = false,
    disabled = false,
    className = '',
    to,
    href,
    type = 'button',
    ...rest
  },
  ref
) {
  const classes = cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className);

  const inner = (
    <>
      <span className={cn(loading && 'opacity-0')}>{children}</span>
      {showIcon && !loading && (
        <Icon
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={17} className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Working…</span>
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} aria-disabled={disabled || undefined} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {inner}
    </button>
  );
});

export default Button;
