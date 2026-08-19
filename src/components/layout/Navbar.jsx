import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../data/site.js';
import { cn } from '../../lib/cn.js';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';
import Button from '../ui/Button.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useLockBodyScroll(open);

  // Close the menu on navigation — otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [location.pathname]);

  // Slightly tighten the bar once the page has scrolled, for a sense of depth.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu and returns focus to the button that opened it;
  // Tab is kept inside the panel while it is open.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a, button')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const linkClass = ({ isActive }) =>
    cn(
      'relative py-1 font-body text-sm transition-colors',
      isActive ? 'text-ink' : 'text-muted hover:text-ink'
    );

  return (
    <header className="gutter sticky top-3 z-50 sm:top-4">
      <div
        className={cn(
          'glass-strong container-fluid relative flex h-14 items-center justify-between overflow-hidden rounded-full px-4 shadow-glass transition-all duration-300 ease-smooth xs:h-16 xs:px-5 md:px-6',
          scrolled && 'shadow-glass-lg'
        )}
      >
        <span
          aria-hidden="true"
          className="glass-highlight pointer-events-none absolute -top-1/2 left-0 right-0 h-full opacity-70"
        />

        <Link to="/" className="relative flex min-w-0 items-center gap-2" aria-label={`${SITE.name} — home`}>
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-teal to-teal-soft"
          />
          <span className="truncate font-display text-base font-semibold tracking-tight text-ink xs:text-lg">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Main" className="relative hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-teal transition-transform duration-300 ease-smooth',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
          <ThemeToggle />
          <Button to="/contact" size="sm">
            Start a project
          </Button>
        </nav>

        <div className="relative flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line/15 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          ref={panelRef}
          aria-label="Main"
          className="glass-strong container-fluid mt-3 flex flex-col gap-1 rounded-3xl px-4 py-4 shadow-glass-lg md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors',
                  isActive ? 'bg-teal/10 text-teal' : 'text-muted hover:text-ink'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/contact" className="mt-2 w-full">
            Start a project
          </Button>
        </nav>
      )}
    </header>
  );
}
