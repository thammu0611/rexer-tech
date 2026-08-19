import { Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/cn.js';
import { useTheme } from '../../hooks/useTheme.js';

/**
 * Light/dark switch. It is a real button with an accessible name and
 * aria-pressed state, so it is operable and announced correctly without
 * relying on the icon alone to convey meaning.
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-full border border-line/15',
        'text-muted transition-colors hover:border-teal/50 hover:text-teal',
        className
      )}
    >
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
      {isDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
}
