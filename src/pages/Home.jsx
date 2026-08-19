import { Quote } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Stat from '../components/ui/Stat.jsx';
import SectionHeading, { Eyebrow } from '../components/ui/SectionHeading.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import { PAGE_META, SITE, organizationSchema } from '../data/site.js';
import { CAPABILITIES, CASE_STUDIES, CLIENT_LOGOS, HERO_STATS, TESTIMONIALS } from '../data/content.js';

const meta = PAGE_META.home;

export default function Home() {
  return (
    <>
      <Seo {...meta} schema={organizationSchema} />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="gutter pb-6 pt-10 sm:pt-14 md:pt-20">
        <div className="container-fluid">
          <GlassCard strong className="px-5 py-10 sm:px-8 sm:py-14 md:px-14 md:py-20">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <Eyebrow>{SITE.legalName} / Technology Partner</Eyebrow>
                <h1 className="text-balance font-display text-fluid-hero font-semibold text-ink">
                  Infrastructure engineered for the load you&apos;ll actually see.
                </h1>
                <p className="text-pretty mt-5 max-w-xl font-body text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
                  We design, build and operate the systems behind products that can&apos;t afford downtime —
                  from cloud architecture to the data platforms that run on top of it.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                  <Button to="/contact" size="lg">
                    Start a project
                  </Button>
                  <Button to="/about" variant="glass" size="lg">
                    See our approach
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-line/10 pt-6 md:col-span-4 md:grid-cols-1 md:gap-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {HERO_STATS.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ------------------------------------------------------- SOCIAL PROOF */}
      <section className="gutter section-tight" aria-labelledby="clients-heading">
        <div className="container-fluid">
          <h2 id="clients-heading" className="sr-only">
            Teams we work with
          </h2>
          <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Operating production systems for
          </p>
          <div className="mask-fade-x overflow-hidden">
            <ul className="marquee-track flex w-max animate-marquee items-center gap-10 sm:gap-16">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={i >= CLIENT_LOGOS.length ? 'true' : undefined}
                  className="whitespace-nowrap font-display text-base font-semibold text-muted/70 sm:text-lg"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- COMPANY INTRO */}
      <section className="gutter section-tight">
        <div className="container-fluid">
          <Reveal>
            <GlassCard className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
              <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <SectionHeading
                  eyebrow="Who we are"
                  title="A small team that treats infrastructure like a craft, not a checkbox."
                />
                <p className="text-pretty font-body text-sm leading-relaxed text-muted md:self-end md:text-base">
                  {SITE.legalName} was founded by engineers who were tired of watching good products get held
                  back by fragile infrastructure. We work embedded with your team, not around it — which means
                  fewer handoffs, faster decisions, and systems someone actually understands once we&apos;re
                  gone.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- CAPABILITIES */}
      <section className="gutter section" aria-labelledby="capabilities-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="capabilities-heading"
              eyebrow="What we do"
              title="Core capabilities"
              description="Four practice areas, each staffed by engineers who ship in that domain full-time."
            />
          </Reveal>

          <ul className="mt-8 grid gap-4 xs:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {CAPABILITIES.map(({ icon: Icon, title, description }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="h-full">
                <GlassCard interactive className="h-full p-5 sm:p-6">
                  <Icon className="mb-4 text-teal" size={22} aria-hidden="true" />
                  <h3 className="mb-2 font-display text-base font-semibold text-ink sm:text-lg">{title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-8">
            <Button to="/services" variant="glass">
              All six services
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- CASE STUDIES */}
      <section className="gutter section" aria-labelledby="work-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="work-heading"
              eyebrow="Selected work"
              title="What changed after we shipped"
              description="Three recent engagements, with the numbers the client measured afterwards."
            />
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <Reveal as="li" key={study.client} delay={i * 90} className="h-full">
                <GlassCard as="article" interactive className="flex h-full flex-col p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                    {study.sector}
                  </p>
                  <h3 className="text-balance mt-3 font-display text-fluid-h3 font-semibold text-ink">
                    {study.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">{study.summary}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line/10 pt-5">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd className="font-display text-lg font-semibold text-teal">{metric.value}</dd>
                        <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 font-body text-xs text-muted">{study.client}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ TESTIMONIALS */}
      <section className="gutter section-tight" aria-labelledby="testimonials-heading">
        <div className="container-fluid">
          <h2 id="testimonials-heading" className="sr-only">
            What clients say
          </h2>
          <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 90} className="h-full">
                <GlassCard as="figure" strong className="h-full p-6 sm:p-8">
                  <Quote className="mb-4 text-teal/70" size={22} aria-hidden="true" />
                  <blockquote className="text-pretty font-body text-base leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 font-body text-sm text-muted">
                    <span className="font-medium text-ink">{t.name}</span> — {t.role}
                  </figcaption>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
