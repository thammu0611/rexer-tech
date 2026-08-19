import { useEffect } from 'react';
import { SITE } from '../data/site.js';

/**
 * Per-route <head> management without pulling in a helmet library.
 *
 * Keeps title, description, canonical URL, robots directive, Open Graph and
 * Twitter tags and an optional JSON-LD block in sync with the active route, and
 * tidies up any tag it created when the route unmounts.
 */

const upsertMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  let created = false;
  if (!el) {
    el = document.createElement('meta');
    created = true;
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  if (created) document.head.appendChild(el);
  return { el, created };
};

export default function Seo({ title, description, path = '/', noindex = false, schema }) {
  const fullTitle = title ? `${title} | ${SITE.legalName}` : SITE.legalName;
  const url = `${SITE.url}${path === '/' ? '/' : path}`;

  useEffect(() => {
    const created = [];

    document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
    }

    // canonical
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
      created.push(canonical);
    }
    canonical.setAttribute('href', url);

    const robots = upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    });
    if (robots.created) created.push(robots.el);

    const og = [
      ['og:title', fullTitle],
      ['og:description', description || SITE.description],
      ['og:url', url],
    ];
    og.forEach(([property, content]) => {
      const { el, created: isNew } = upsertMeta(`meta[property="${property}"]`, { property, content });
      if (isNew) created.push(el);
    });

    const twitter = [
      ['twitter:title', fullTitle],
      ['twitter:description', description || SITE.description],
    ];
    twitter.forEach(([name, content]) => {
      const { el, created: isNew } = upsertMeta(`meta[name="${name}"]`, { name, content });
      if (isNew) created.push(el);
    });

    let ld;
    if (schema) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.dataset.seo = 'route';
      ld.textContent = JSON.stringify(schema);
      document.head.appendChild(ld);
    }

    return () => {
      created.forEach((el) => el.remove());
      ld?.remove();
    };
  }, [fullTitle, description, url, noindex, schema]);

  return null;
}
