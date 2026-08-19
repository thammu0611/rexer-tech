import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';
import Seo from '../components/Seo.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { CONTACT_INFO, PAGE_META, SITE } from '../data/site.js';
import { MESSAGE_MAX, validateField, validateForm } from '../lib/validate.js';
import { submitContact } from '../lib/submitContact.js';

const meta = PAGE_META.contact;

const EMPTY = { name: '', email: '', phone: '', company: '', message: '', consent: false, _gotcha: '' };

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SITE.legalName}`,
  url: `${SITE.url}/contact`,
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('');

  // Arriving from a "Apply" button on /careers pre-fills the message so the
  // visitor is not retyping context the link already carried.
  useEffect(() => {
    if (!role) return;
    setForm((f) =>
      f.message
        ? f
        : { ...f, message: `I'd like to apply for the ${role} role.\n\nA bit about my background:\n` }
    );
  }, [role]);

  const set = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value, { ...form, [field]: value }) }));
    }
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, form[field], form) }));
  };

  const remaining = MESSAGE_MAX - form.message.length;

  const errorCount = useMemo(() => Object.values(errors).filter(Boolean).length, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setStatusMessage('');
      // Move focus to the first field that needs attention.
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    // Honeypot: real people leave this hidden field empty.
    if (form._gotcha) {
      setStatus('success');
      setStatusMessage('Message sent.');
      return;
    }

    setStatus('submitting');
    const result = await submitContact({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
      role: role || undefined,
      submittedAt: new Date().toISOString(),
    });

    if (result.ok) {
      setStatus('success');
      setStatusMessage(
        result.delivered
          ? `Thanks — your message is on its way. We reply ${CONTACT_INFO.responseTime}.`
          : `Thanks — validation passed. No delivery endpoint is configured yet, so nothing was sent (set VITE_CONTACT_ENDPOINT to go live).`
      );
      setForm(EMPTY);
      setTouched({});
      setErrors({});
    } else {
      setStatus('error');
      setStatusMessage(
        `${result.error || 'Something went wrong.'} You can also email us directly at ${CONTACT_INFO.email}.`
      );
    }
  };

  return (
    <>
      <Seo {...meta} schema={contactSchema} />

      <section className="gutter section">
        <div className="container-fluid grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* CONTACT INFORMATION */}
          <GlassCard strong className="h-fit p-6 sm:p-8 md:p-10">
            <SectionHeading
              as="h1"
              size="hero"
              eyebrow="Contact"
              title="Tell us about your system."
              description={`Reach out directly, or send a message and we'll get back to you ${CONTACT_INFO.responseTime}.`}
            />

            <ul className="mt-8 flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <span className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                  <Mail size={16} className="text-teal" aria-hidden="true" />
                </span>
                <a
                  className="font-body text-sm text-ink underline decoration-line/20 underline-offset-2 transition-colors hover:text-teal"
                  href={`mailto:${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                  <Phone size={16} className="text-teal" aria-hidden="true" />
                </span>
                <a
                  className="font-body text-sm text-ink underline decoration-line/20 underline-offset-2 transition-colors hover:text-teal"
                  href={`tel:${CONTACT_INFO.phoneHref}`}
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                  <MapPin size={16} className="text-teal" aria-hidden="true" />
                </span>
                <address className="font-body text-sm not-italic leading-relaxed text-ink">
                  {CONTACT_INFO.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <span className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                  <Clock size={16} className="text-teal" aria-hidden="true" />
                </span>
                <span className="font-body text-sm text-ink">{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </GlassCard>

          {/* CONTACT FORM */}
          <GlassCard tag="Enquiry" className="p-6 sm:p-8 md:p-10">
            <h2 className="mb-6 font-display text-fluid-h3 font-semibold text-ink">
              {role ? `Apply: ${role}` : 'Send a message'}
            </h2>

            {/* Single live region: success, failure and validation summaries all
                announce here, so assistive tech hears the result of a submit. */}
            <div aria-live="polite" aria-atomic="true">
              {status === 'success' && (
                <p className="mb-6 flex items-start gap-2 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 font-body text-sm text-teal">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
              {status === 'error' && (
                <p className="mb-6 flex items-start gap-2 rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 font-body text-sm text-rose">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
              {errorCount > 0 && status === 'idle' && (
                <p className="sr-only">
                  {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} attention.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Field
                id="name"
                label="Name"
                icon={User}
                required
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={set('name')}
                onBlur={blur('name')}
                error={touched.name ? errors.name : undefined}
              />

              <Field
                id="email"
                label="Email"
                icon={Mail}
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={set('email')}
                onBlur={blur('email')}
                error={touched.email ? errors.email : undefined}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="phone"
                  label="Phone"
                  icon={Phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 44 4000 1200"
                  value={form.phone}
                  onChange={set('phone')}
                  onBlur={blur('phone')}
                  error={touched.phone ? errors.phone : undefined}
                />
                <Field
                  id="company"
                  label="Company"
                  icon={Briefcase}
                  autoComplete="organization"
                  placeholder="Where you work"
                  value={form.company}
                  onChange={set('company')}
                  onBlur={blur('company')}
                  error={touched.company ? errors.company : undefined}
                />
              </div>

              <Field
                id="message"
                as="textarea"
                label="Message"
                icon={MessageSquare}
                required
                rows={6}
                maxLength={MESSAGE_MAX}
                placeholder="What are you building, and what is getting in the way?"
                hint={`${remaining} characters left`}
                value={form.message}
                onChange={set('message')}
                onBlur={blur('message')}
                error={touched.message ? errors.message : undefined}
              />

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input
                  id="_gotcha"
                  name="_gotcha"
                  tabIndex={-1}
                  value={form._gotcha}
                  onChange={set('_gotcha')}
                />
              </div>

              <div>
                <label htmlFor="consent" className="flex items-start gap-3 font-body text-sm text-muted">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={set('consent')}
                    onBlur={blur('consent')}
                    aria-invalid={touched.consent && errors.consent ? true : undefined}
                    aria-describedby={touched.consent && errors.consent ? 'consent-error' : undefined}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-teal"
                  />
                  <span>I&apos;m happy for {SITE.name} to use these details to reply to my enquiry.</span>
                </label>
                {touched.consent && errors.consent && (
                  <p id="consent-error" className="mt-1.5 font-body text-xs text-rose">
                    {errors.consent}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" loading={status === 'submitting'} className="w-full">
                {role ? 'Send application' : 'Send message'}
              </Button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
