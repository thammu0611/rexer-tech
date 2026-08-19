import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS, SITE, SOCIAL } from '../../data/site.js';
import { SERVICES } from '../../data/content.js';

export default function Footer() {
  return (
    <footer className="gutter pb-6 pt-10 sm:pt-16">
      <div className="glass container-fluid overflow-hidden rounded-3xl shadow-glass">
        <div className="grid gap-8 px-5 py-8 xs:grid-cols-2 sm:gap-10 sm:px-6 sm:py-10 md:grid-cols-4 md:px-10 md:py-12">
          <div className="xs:col-span-2">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-teal to-teal-soft"
              />
              <span className="font-display text-lg font-semibold text-ink">{SITE.name}</span>
            </Link>
            <p className="max-w-sm font-body text-sm leading-relaxed text-muted">
              Engineering-led technology partner for teams that need infrastructure they don&apos;t have to
              think about twice.
            </p>
            <ul className="mt-5 flex flex-wrap gap-4">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-teal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-site">
            <p id="footer-site" className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Site
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <p id="footer-services" className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="font-body text-sm text-muted transition-colors hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="xs:col-span-2 md:col-span-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Contact</p>
            <ul className="flex flex-col gap-3 font-body text-sm text-muted sm:flex-row sm:gap-8">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-teal"
                >
                  <Mail size={14} aria-hidden="true" /> {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneHref}`}
                  className="flex items-center gap-2 transition-colors hover:text-teal"
                >
                  <Phone size={14} aria-hidden="true" /> {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" /> {CONTACT_INFO.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-line/10 px-5 py-5 text-center sm:px-6 md:flex-row md:px-10 md:text-left">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            {CONTACT_INFO.hours} · CIN placeholder — replace before launch
          </p>
        </div>
      </div>
    </footer>
  );
}
