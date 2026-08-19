import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { CONTACT_INFO, PAGE_META } from '../data/site.js';
import { BENEFITS, CULTURE_POINTS, HIRING_STEPS, OPEN_ROLES } from '../data/content.js';

const meta = PAGE_META.careers;

export default function Careers() {
  return (
    <>
      <Seo {...meta} />

      {/* OVERVIEW */}
      <section className="gutter pb-6 pt-10 sm:pt-14">
        <div className="container-fluid">
          <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
            <SectionHeading
              as="h1"
              size="hero"
              eyebrow="Careers"
              title="Build the infrastructure other engineers rely on."
              description="We're a small, senior team — every hire changes the shape of the company. If that sounds good rather than daunting, take a look below."
            />
          </GlassCard>
        </div>
      </section>

      {/* CULTURE */}
      <section className="gutter section" aria-labelledby="culture-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading id="culture-heading" eyebrow="Culture" title="How we work together" />
          </Reveal>
          <ul className="mt-8 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:gap-6">
            {CULTURE_POINTS.map(({ icon: Icon, title, description }, i) => (
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

      {/* BENEFITS */}
      <section className="gutter section-tight" aria-labelledby="benefits-heading">
        <div className="container-fluid">
          <Reveal>
            <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10">
              <h2
                id="benefits-heading"
                className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-teal"
              >
                What comes with the job
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 font-body text-sm text-muted">
                    <Check size={15} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-teal" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="gutter section" aria-labelledby="roles-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="roles-heading"
              eyebrow="Open roles"
              title="Current openings"
              description="Four roles open. Applying takes one message — no 40-field form, no cover letter."
            />
          </Reveal>

          <ul className="mt-8 flex flex-col gap-3 sm:gap-4">
            {OPEN_ROLES.map((role, i) => (
              <Reveal as="li" key={role.id} delay={i * 60}>
                <GlassCard
                  as="article"
                  interactive
                  className="flex flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6"
                >
                  <div>
                    <h3 className="font-display font-semibold text-ink">{role.title}</h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted">{role.summary}</p>
                    <ul className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-muted">
                      <li className="flex items-center gap-1">
                        <MapPin size={12} aria-hidden="true" /> {role.location}
                      </li>
                      <li>{role.type}</li>
                      <li>{role.level}</li>
                    </ul>
                  </div>
                  <Button
                    to={`/contact?role=${encodeURIComponent(role.title)}`}
                    variant="glass"
                    size="sm"
                    icon={ArrowUpRight}
                    className="w-full flex-shrink-0 sm:w-auto"
                    aria-label={`Apply for ${role.title}`}
                  >
                    Apply
                  </Button>
                </GlassCard>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={180}>
            <p className="mt-8 font-body text-sm text-muted">
              Don&apos;t see the right role? Reach out anyway at{' '}
              <a
                className="text-teal underline decoration-teal/40 underline-offset-2"
                href={`mailto:${CONTACT_INFO.email}`}
              >
                {CONTACT_INFO.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="gutter section" aria-labelledby="hiring-heading">
        <div className="container-fluid">
          <Reveal>
            <SectionHeading
              id="hiring-heading"
              eyebrow="Process"
              title="What applying looks like"
              description="Four steps, about two weeks end to end. The work sample is paid."
            />
          </Reveal>
          <ol className="mt-8 grid gap-4 xs:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {HIRING_STEPS.map(({ step, title, description }, i) => (
              <Reveal as="li" key={step} delay={i * 70} className="h-full">
                <GlassCard className="h-full p-5 sm:p-6">
                  <span className="glass-strong mb-4 flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-teal">
                    {step}
                  </span>
                  <h3 className="mb-1 font-display font-semibold text-ink">{title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted">{description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
