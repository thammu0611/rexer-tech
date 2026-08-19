// ---------------------------------------------------------------------------
// Site-level identity, contact details and SEO defaults.
// Everything here is placeholder-safe: swap the values and the whole site,
// its <head> tags, its structured data and its sitemap follow along.
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Rexer Tech Pvt Ltd',
  legalName: 'Rexer Tech Private Limited',
  short: 'Rexer',
  tagline: 'Engineering-led technology partner',
  description:
    'Rexer Tech Private Limited designs, builds and operates cloud infrastructure, data platforms and developer platforms for teams that cannot afford downtime.',
  // Set VITE_SITE_URL in .env to override at build time.
  url: (import.meta.env?.VITE_SITE_URL || 'https://www.rexertech.com').replace(/\/$/, ''),
  founded: '2015',
};

export const CONTACT_INFO = {
  email: 'hello@rexertech.com',
  phone: '+91 44 4000 1200',
  phoneHref: '+914440001200',
  location: 'Chennai, Tamil Nadu, India',
  addressLines: ['Level 4, TIDEL Park', 'Taramani, Chennai 600113', 'Tamil Nadu, India'],
  hours: 'Mon–Fri, 09:30–18:30 IST',
  responseTime: 'within one business day',
};

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rexer-tech' },
  { label: 'GitHub', href: 'https://github.com/rexer-tech' },
];

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

// Per-route <title> / description / canonical path. Consumed by <Seo />.
export const PAGE_META = {
  home: {
    path: '/',
    title: 'Infrastructure & Platform Engineering',
    description:
      'Engineering-led technology partner. Cloud architecture, data platforms and reliability engineering for teams that cannot afford downtime.',
  },
  services: {
    path: '/services',
    title: 'Services — Cloud, Data, Platform & Reliability Engineering',
    description:
      'Six practice areas covering a system end to end: systems engineering, cloud infrastructure, data platforms, security and compliance, platform engineering and reliability.',
  },
  about: {
    path: '/about',
    title: 'About — Built by engineers, still run by engineers',
    description:
      'How Rexer Tech works: a repeatable discover / design / build / operate process, the stack we operate in, and the people behind it.',
  },
  careers: {
    path: '/careers',
    title: 'Careers — Open engineering roles',
    description:
      'Join a small, senior team building the infrastructure other engineers rely on. Current openings in platform, cloud, data and security engineering.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — Tell us about your system',
    description:
      'Talk to Rexer Tech about an architecture review, a migration or an embedded engineering team. We reply within one business day.',
  },
  notFound: {
    path: '/404',
    title: 'Page not found',
    description: 'That page does not exist. Head back to the homepage or get in touch.',
    noindex: true,
  },
};

// schema.org Organization graph, injected once on the homepage.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  description: SITE.description,
  foundingDate: SITE.founded,
  email: CONTACT_INFO.email,
  telephone: CONTACT_INFO.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.addressLines[0],
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600113',
    addressCountry: 'IN',
  },
  sameAs: SOCIAL.map((s) => s.href),
};
