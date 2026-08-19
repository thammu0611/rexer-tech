import { CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import { PAGE_META, SITE } from '../data/site.js';
import { ENGAGEMENT_MODELS, FAQS, SERVICES } from '../data/content.js';

const meta = PAGE_META.services;

// Marked-up FAQ so the questions are eligible for rich results in search.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function Services() {
  return (
    <>
      <Seo {...meta} schema={faqSchema} />

      {/* OVERVIEW */}
      <section className="gutter pb-6 pt-10 sm:pt-14">
        <div className="container-fluid">
          <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
            <SectionHeading
              as="h1"
              size="hero"
              eyebrow="Services"
              title="What we deliver, end to end."
              description={`Six practice areas that cover a system from the first architecture sketch to the pager rotation that keeps it running. Every engagement with ${SITE.name} ends with your team owning the result.`}
            />
          </GlassCard>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="gutter section" aria-labelledby="practices-heading">
        <div className="container-fluid">
          <h2 id="practices-heading" className="sr-only">
            Practice areas
          </h2>
          <ul className="grid gap-4 xs:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SERVICES.map(({ id, icon: Icon, title, description, points }, i) => (
              <Reveal as="li" key={id} delay={i * 60} className="h-full">
                <GlassCard
                  as="article"
                  id={id}
                  interactive
                  className="flex h-full scroll-mt-28 flex-col p-5 sm:p-6"
                >
                  <Icon className="mb-4 text-teal" size={22} aria-hidden="true" />
                  <h3 className="mb-2 font-display text-fluid-h3 font-semibold text-ink">{title}</h3>
                  <p className="mb-4 font-body text-sm leading-relaxed text-muted">{description}</p>
                  <ul className="mt-auto flex flex-col gap-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2 font-body text-xs text-muted">
                        <CheckCircle2
                          size={14}
                          aria-hidden="true"
                          className="mt-0.5 flex-shrink-0 text-teal"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="gutter section" aria-labelledby="engage-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="engage-heading"
              eyebrow="How we engage"
              title="Ways to work with us"
              description="Pick the shape that fits your team — all three run on the same delivery process."
            />
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {ENGAGEMENT_MODELS.map(({ title, description, bestFor, starts }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="h-full">
                <GlassCard tag={`0${i + 1}`} className="flex h-full flex-col p-5 sm:p-6">
                  <h3 className="mb-2 font-display text-fluid-h3 font-semibold text-ink">{title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                  <dl className="mt-auto space-y-2 pt-6 font-mono text-[11px] uppercase tracking-wider">
                    <div className="flex justify-between gap-3 border-t border-line/10 pt-2">
                      <dt className="text-muted">Best for</dt>
                      <dd className="text-right text-ink">{bestFor}</dd>
                    </div>
                    <div className="flex justify-between gap-3 border-t border-line/10 pt-2">
                      <dt className="text-muted">Commitment</dt>
                      <dd className="text-right text-ink">{starts}</dd>
                    </div>
                  </dl>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="gutter section" aria-labelledby="faq-heading">
        <div className="container-fluid grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              eyebrow="Questions"
              title="Before you email us"
              description="The five things prospective clients ask on almost every first call."
            />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <GlassCard strong className="px-5 py-2 sm:px-8">
              <Accordion items={FAQS} />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Not sure which model fits?"
        body="Tell us what you’re building and we’ll recommend one — including when the answer is “you don’t need us yet”."
        cta="Talk to us"
      />
    </>
  );
}
