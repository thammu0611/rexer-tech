import GlassCard from '../ui/GlassCard.jsx';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';

/** The repeated "talk to us" band at the bottom of most pages. */
export default function CtaBanner({
  title = 'Have a system that needs to hold?',
  body = 'Tell us what you’re building — we’ll tell you what it’ll take.',
  cta = 'Get in touch',
  to = '/contact',
}) {
  return (
    <section className="gutter section-tight">
      <div className="container-fluid">
        <Reveal>
          <GlassCard strong className="px-5 py-8 sm:px-6 sm:py-10 md:px-10">
            <div className="flex flex-col items-center justify-between gap-5 text-center sm:gap-6 md:flex-row md:text-left">
              <div>
                <h2 className="text-balance font-display text-xl font-semibold text-ink sm:text-2xl md:text-3xl">
                  {title}
                </h2>
                <p className="mt-2 font-body text-sm text-muted sm:text-base">{body}</p>
              </div>
              <Button to={to} size="lg" className="w-full flex-shrink-0 sm:w-auto">
                {cta}
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
