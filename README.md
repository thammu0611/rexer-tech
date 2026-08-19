# Rexer Tech Private Limited — marketing site

A five-page marketing site (Home / Services / About / Careers / Contact, plus a real 404) built with
**React 18 + Vite 5 + Tailwind CSS 3** and styled with a "liquid glass" design language: translucent
frosted panels, backdrop blur, and softly drifting gradient orbs behind everything.

Light and dark themes, real per-page URLs, scroll-reveal motion, a validated and wireable contact
form, unit tests, lint and format gates, and deploy configs for Netlify and Vercel.

---

## Quick start

```bash
npm install
npm run dev        # dev server, usually http://localhost:5173
```

| Command                 | What it does                                         |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Vite dev server with hot reload                      |
| `npm run build`         | Production build → `dist/`                           |
| `npm run preview`       | Serve the production build locally                   |
| `npm run lint`          | ESLint (react, hooks, jsx-a11y), zero-warning policy |
| `npm run format`        | Prettier, write mode                                 |
| `npm run format:check`  | Prettier, check only (what CI runs)                  |
| `npm run test`          | Vitest + Testing Library, single run                 |
| `npm run test:watch`    | Vitest in watch mode                                 |
| `npm run test:coverage` | Coverage report → `coverage/`                        |
| `npm run verify`        | lint + test + build — run this before you push       |

Node 18.18+ (20 recommended — see `.nvmrc`).

---

## Project structure

```
.
├─ index.html                  <head> tags, font preconnect, no-flash theme bootstrap
├─ public/
│  ├─ favicon.svg  icons.svg
│  ├─ og-image.svg             1200×630 social preview card
│  ├─ robots.txt  sitemap.xml  site.webmanifest
│  └─ _redirects               SPA fallback for Netlify
├─ src/
│  ├─ main.jsx                 entry: Router + ErrorBoundary
│  ├─ App.jsx                  route table; every route except Home is code-split
│  ├─ index.css                theme tokens, layout primitives, glass, motion
│  ├─ components/
│  │  ├─ Seo.jsx               per-route title/description/canonical/OG/JSON-LD
│  │  ├─ ErrorBoundary.jsx     render-error fallback instead of a white page
│  │  ├─ layout/
│  │  │  ├─ Layout.jsx         shared chrome + the focusable <main> landmark
│  │  │  ├─ Navbar.jsx         glass pill nav, mobile menu with focus trap
│  │  │  ├─ Footer.jsx  BackgroundMesh.jsx  SkipLink.jsx  ScrollToTop.jsx
│  │  ├─ sections/CtaBanner.jsx
│  │  └─ ui/                   Button GlassCard SectionHeading Reveal
│  │                           Accordion Field ThemeToggle Stat Pill
│  ├─ hooks/                   useTheme usePrefersReducedMotion
│  │                           useLockBodyScroll useCountUp
│  ├─ lib/                     cn validate submitContact
│  ├─ data/
│  │  ├─ site.js               identity, contact details, nav, per-page SEO meta
│  │  └─ content.js            every piece of page copy
│  ├─ pages/                   Home Services About Careers Contact NotFound
│  └─ test/                    setup, render helper, route/form/interaction tests
├─ .github/workflows/ci.yml    format → lint → test → build on every push and PR
├─ netlify.toml  vercel.json   build settings, SPA rewrites, security headers
└─ .eslintrc.cjs  .prettierrc  .editorconfig  .env.example
```

---

## Before you launch — the placeholder checklist

Everything below is invented sample content. Replace it and the site is ready to ship.

1. **`src/data/site.js`** — company name, `SITE.url`, email, phone, address, LinkedIn/GitHub links.
2. **`src/data/content.js`** — `CLIENT_LOGOS`, `CASE_STUDIES`, `TESTIMONIALS` and `HERO_STATS` are
   illustrative. Publishing invented client names or metrics is a real problem, so swap them for
   approved ones or delete those sections.
3. **`public/robots.txt` and `public/sitemap.xml`** — the domain is hard-coded in both.
4. **`index.html`** — canonical URL, OG URL and OG image URL.
5. **`src/components/layout/Footer.jsx`** — the CIN placeholder line (Indian private limited
   companies must display their CIN).
6. **Contact form delivery** — see below. Until it is set, the form validates but sends nothing.

---

## Configuration

Copy `.env.example` to `.env` and fill in:

```ini
VITE_SITE_URL=https://www.rexertech.com     # canonical URLs, no trailing slash
VITE_CONTACT_ENDPOINT=                      # JSON POST endpoint for the contact form
```

`VITE_CONTACT_ENDPOINT` accepts any endpoint that takes a JSON `POST` — Formspree, Basin, a Netlify
or Vercel function, or your own API. `src/lib/submitContact.js` posts:

```json
{ "name": "…", "email": "…", "phone": "…", "company": "…", "message": "…", "role": "…", "submittedAt": "…" }
```

It applies a 15-second timeout and returns `{ ok, delivered, error }`. With no endpoint configured
the call resolves as a successful no-op and the UI says so explicitly, so the form is demonstrable
without pretending a message was delivered.

---

## Deploying

The site is a static SPA — any host works, but it **must** rewrite unknown paths to `index.html`,
otherwise a hard reload on `/services` returns a 404.

- **Netlify** — `netlify.toml` and `public/_redirects` are already set up. Connect the repo; build
  `npm run build`, publish `dist`.
- **Vercel** — `vercel.json` handles rewrites, caching and security headers.
- **Anywhere else** — build with `npm run build`, serve `dist/`, and add an SPA fallback rule.

Set `VITE_SITE_URL` (and `VITE_CONTACT_ENDPOINT`, if used) in the host's environment variables.

---

## How things work

### Theming

Every colour is a CSS custom property holding a bare `R G B` triplet, declared on `:root` for light
and `.dark` for dark (`src/index.css`). `tailwind.config.js` maps those variables into Tailwind's
palette via `rgb(var(--token) / <alpha-value>)`, so `text-ink`, `bg-teal/10` and friends keep working
and the whole site flips theme without a single duplicated utility class.

An inline script in `index.html` applies the stored theme **before first paint**, so a returning
dark-mode visitor never sees a white flash. `useTheme` follows the OS preference until the visitor
makes an explicit choice, then remembers it.

### Responsive design

- **Breakpoints**: `xs` (400px) added on top of Tailwind's defaults, so layout steps through small
  phones, phablets, tablets, laptops and ultra-wide monitors instead of jumping mobile → desktop.
- **Fluid type**: `.text-fluid-hero` / `-h2` / `-h3` use `clamp()`, scaling continuously with the
  viewport.
- **Fluid container**: `.container-fluid` is `min(96vw, 1500px)` — close to the screen edges on
  phones, capped so text never gets unreadably wide. Adjust the cap to taste.
- **Consistent rhythm**: `.section` / `.section-tight` set the vertical spacing everywhere, so pages
  can't drift apart.
- **Safe areas**: `viewport-fit=cover` plus `env(safe-area-inset-*)` padding for notched phones.
- `overflow-x: clip` (not `hidden`) on `html`/`body` — `hidden` creates a scroll container that
  silently breaks the sticky navbar.

### Accessibility

- Skip link as the first tab stop; `<main>` is a focusable landmark.
- Route changes scroll to top and move focus into `<main>` — but never on the first paint, which
  would push the skip link and nav behind the content in tab order (there's a regression test).
- Mobile menu traps Tab, closes on `Escape`, and returns focus to the button that opened it.
- Form controls use real `<label for>`; errors are wired through `aria-invalid` and
  `aria-describedby`; submit results announce in a single `aria-live` region; the first invalid field
  receives focus on a failed submit.
- FAQ accordion uses `aria-expanded` / `aria-controls`, and collapsed panels are `hidden` — out of
  the accessibility tree, not just visually clipped.
- One `<h1>` per page, ordered headings below it, `aria-labelledby` on every section.
- All decorative motion respects `prefers-reduced-motion`, including the count-up stats, which skip
  animating entirely rather than animating fast.
- Focus ring is a 2px teal outline that reads on glass in both themes.

### Performance

- Home ships in the main bundle; every other route is `React.lazy` + `Suspense`, with React and the
  router split into their own long-cached chunk.
- Fonts preconnect and load non-blocking, with a `<noscript>` fallback.
- Scroll-reveal uses one `IntersectionObserver` per block and disconnects after firing once.
- Hashed asset filenames plus `immutable` cache headers in both deploy configs.

Current production build: ~54 kB gzip of app code plus a ~54 kB gzip React chunk, ~6 kB gzip CSS.

### SEO

`<Seo>` sets title, description, canonical, robots, Open Graph and Twitter tags per route and cleans
up after itself. Structured data: `Organization` on Home, `FAQPage` on Services (eligible for rich
results), `ContactPage` on Contact. The 404 route is `noindex, nofollow`.

---

## Testing

23 tests across four files:

- `src/lib/validate.test.js` — the validation rules in isolation.
- `src/test/routing.test.jsx` — landmarks, heading structure, navigation, 404, per-route `<head>`,
  and the focus-order regression guard.
- `src/test/contact.test.jsx` — empty submit, on-blur email validation, successful submit and reset,
  and role pre-fill from `/contact?role=…`.
- `src/test/interactions.test.jsx` — theme toggle, accordion state, careers → contact links.

`src/test/setup.js` stubs `matchMedia`, `IntersectionObserver`, `scrollTo` and `scrollIntoView`,
which jsdom doesn't implement.

---

## Editing content

Almost everything lives in `src/data/`. `site.js` holds identity, contact details, navigation and
per-page SEO metadata; `content.js` holds page copy — capabilities, services, engagement models,
FAQs, principles, timeline, tech stack, culture, benefits, open roles and hiring steps. Components
only map over these values, so changing copy never means touching layout code.

Page-specific headlines and body paragraphs live in the relevant file under `src/pages/`.

### Customising the look

- **Colours**: the token blocks at the top of `src/index.css`. Change them once, both themes follow.
- **Glass intensity**: `--glass-*-a` variables and the `blur()` values in `.glass` / `.glass-strong`.
- **Background orbs**: `src/components/layout/BackgroundMesh.jsx`.
- **Motion**: wrap any block in `<Reveal delay={ms}>`; stagger a list with an increasing delay.

---

## Known limitations

- The contact form has no server-side validation or spam protection beyond a honeypot. If you expect
  volume, add a captcha and validate again on your endpoint (`src/lib/validate.js` is dependency-free
  and runs on Node as-is).
- `sitemap.xml` is static. If routes start changing often, generate it in a build step.
- No analytics is wired up, by design — add your own.
- Rendering is client-side. If organic search becomes a priority, moving to a prerendered or SSR
  setup would beat any further tuning here.
