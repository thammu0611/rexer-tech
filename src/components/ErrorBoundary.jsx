import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { CONTACT_INFO } from '../data/site.js';

/**
 * Last line of defence. A render error anywhere below this boundary shows a
 * usable fallback with a way to recover and a way to reach a human, instead of
 * a blank white page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Replace with your error reporting service (Sentry, Rollbar, ...).
    if (import.meta.env?.DEV) {
      console.error('Unhandled render error:', error, info);
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div role="alert" className="gutter flex min-h-dvh items-center justify-center py-20">
        <div className="glass-strong w-full max-w-lg rounded-3xl p-8 shadow-glass sm:p-10">
          <AlertTriangle className="mb-4 text-rose" size={26} aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ink">Something broke on our side</h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted">
            This page hit an unexpected error. Reloading usually clears it. If it keeps happening, tell us at{' '}
            <a className="text-teal underline" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </a>
            .
          </p>
          {import.meta.env?.DEV && (
            <pre className="mt-5 max-h-40 overflow-auto rounded-xl bg-line/5 p-4 font-mono text-xs text-muted">
              {String(error?.stack || error)}
            </pre>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-teal px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-teal-strong dark:text-[#04131a]"
            >
              Reload the page
            </button>
            <a
              href="/"
              className="glass rounded-full border border-teal/40 px-6 py-3 font-body text-sm font-medium text-teal"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </div>
    );
  }
}
