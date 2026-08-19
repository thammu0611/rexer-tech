import { cn } from '../../lib/cn.js';

const CONTROL =
  'w-full rounded-xl border bg-line/[0.03] px-4 py-3 font-body text-sm text-ink ' +
  'placeholder:text-muted/80 outline-none transition-colors ' +
  'focus:border-teal focus:bg-teal/5 disabled:opacity-60';

/**
 * Labelled form control with wired-up accessibility:
 * label ↔ control via htmlFor/id, errors announced through aria-describedby +
 * aria-invalid, and hint text linked the same way. Renders an input, textarea
 * or select depending on `as`.
 */
export default function Field({
  id,
  label,
  icon: Icon,
  error,
  hint,
  required = false,
  as = 'input',
  className = '',
  children,
  ...rest
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  const controlClass = cn(CONTROL, error ? 'border-rose/70' : 'border-line/20', className);
  const controlProps = {
    id,
    name: id,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: controlClass,
    ...rest,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted"
      >
        {Icon && <Icon size={13} aria-hidden="true" />}
        {label}
        {!required && <span className="normal-case tracking-normal text-muted/70">(optional)</span>}
      </label>

      {as === 'textarea' ? (
        <textarea {...controlProps} />
      ) : as === 'select' ? (
        <select {...controlProps}>{children}</select>
      ) : (
        <input {...controlProps} />
      )}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 font-body text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 font-body text-xs text-rose">
          {error}
        </p>
      )}
    </div>
  );
}
