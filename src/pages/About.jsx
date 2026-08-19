import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Pill from '../components/ui/Pill.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import { PAGE_META, SITE } from '../data/site.js';
import { PRINCIPLES, PROCESS_STEPS, TECH_STACK, TIMELINE } from '../data/content.js';

const meta = PAGE_META.about;

export default function About() {
  return (
    <>
      <Seo {...meta} />

      {/* COMPANY OVERVIEW */}
      <section className="gutter pb-6 pt-10 sm:pt-14">
        <div className="container-fluid">
          <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
            <SectionHeading
              as="h1"
              size="hero"
              eyebrow="Company overview"
              title="Built by engineers, still run by engineers."
              description={`${SITE.legalName} started as a two-person consultancy fixing production incidents at 3am. A decade later, we're the infrastructure partner for teams that would rather not have a 3am incident at all.`}
            />
          </GlassCard>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="gutter section-tight" aria-labelledby="purpose-heading">
        <div className="container-fluid">
          <h2 id="purpose-heading" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <GlassCard tag="Mission" className="h-full p-5 sm:p-6">
                <h3 className="mb-2 font-display text-fluid-h3 font-semibold text-ink">
                  Why we&apos;re here
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  To give growing teams infrastructure that scales quietly in the background, so engineering
                  time goes toward the product, not toward keeping the lights on.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <GlassCard tag="Vision" className="h-full p-5 sm:p-6">
                <h3 className="mb-2 font-display text-fluid-h3 font-semibold text-ink">
                  Where we&apos;re headed
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  A world where &ldquo;infrastructure partner&rdquo; means a team you talk to twice a year,
                  not one you&apos;re on a call with every week.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="gutter section" aria-labelledby="principles-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="principles-heading"
              eyebrow="Principles"
              title="Three rules we don’t bend"
              description="They sound obvious written down. Holding to them under deadline pressure is the actual work."
            />
          </Reveal>
          <ul className="mt-8 grid gap-4 xs:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, description }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="h-full">
                <GlassCard className="h-full p-5 sm:p-6">
                  <Icon className="mb-4 text-teal" size={22} aria-hidden="true" />
                  <h3 className="mb-2 font-display text-fluid-h3 font-semibold text-ink">{title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="gutter section" aria-labelledby="process-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="process-heading"
              eyebrow="Technology"
              title="How we work"
              description="A repeatable process, applied to every engagement regardless of size."
            />
          </Reveal>

          <Reveal delay={120}>
            <GlassCard className="mt-8 px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-6 hidden h-px bg-line/10 md:block"
                />
                <ol className="relative grid gap-6 xs:grid-cols-2 sm:gap-8 md:grid-cols-4">
                  {PROCESS_STEPS.map(({ step, title, description }) => (
                    <li key={step} className="flex flex-col items-start">
                      <span className="glass-strong mb-4 flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm text-teal">
                        {step}
                      </span>
                      <h3 className="mb-1 font-display font-semibold text-ink">{title}</h3>
                      <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="gutter section" aria-labelledby="timeline-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading id="timeline-heading" eyebrow="History" title="Ten years, four turning points" />
          </Reveal>
          <ol className="mt-8 grid gap-4 xs:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {TIMELINE.map(({ year, title, description }, i) => (
              <Reveal as="li" key={year} delay={i * 70} className="h-full">
                <GlassCard className="h-full p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal">{year}</p>
                  <h3 className="mb-1 mt-3 font-display font-semibold text-ink">{title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="gutter section-tight" aria-labelledby="stack-heading">
        <div className="container-fluid">
          <Reveal>
            <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10">
              <h2 id="stack-heading" className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-teal">
                Stack we operate in
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {TECH_STACK.map((tech) => (
                  <Pill as="li" key={tech}>
                    {tech}
                  </Pill>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Want the long version?"
        body="We’ll walk you through an architecture review of your current system, free, in 45 minutes."
        cta="Book a review"
      />
    </>
  );
}
