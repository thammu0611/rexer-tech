import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import { CONTACT_INFO, NAV_LINKS, PAGE_META } from '../data/site.js';

const meta = PAGE_META.notFound;

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Seo {...meta} path={pathname} />

      <section className="gutter section">
        <div className="container-fluid">
          <GlassCard strong className="px-5 py-12 sm:px-8 sm:py-16 md:px-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal">Error 404</p>
            <h1 className="text-balance mt-4 font-display text-fluid-hero font-semibold text-ink">
              This page isn&apos;t in production.
            </h1>
            <p className="text-pretty mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              We couldn&apos;t find <code className="font-mono text-sm text-ink">{pathname}</code>. It may
              have moved, or the link may be wrong. Here&apos;s everything that does exist:
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-teal underline decoration-teal/40 underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/" size="lg">
                Back to homepage
              </Button>
              <Button href={`mailto:${CONTACT_INFO.email}`} variant="glass" size="lg" showIcon={false}>
                Report a broken link
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
