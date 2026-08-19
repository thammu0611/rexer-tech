// ---------------------------------------------------------------------------
// Contact-form validation. Pure functions, no React — which means they are
// unit-testable in isolation (see validate.test.js) and reusable server-side.
// ---------------------------------------------------------------------------

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
export const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/**
 * Validate a single field.
 * @returns {string|undefined} an error message, or undefined when valid
 */
export function validateField(field, value = '', form = {}) {
  const v = String(value).trim();

  switch (field) {
    case 'name':
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'That name looks too short.';
      if (v.length > 80) return 'Please keep your name under 80 characters.';
      return undefined;

    case 'email':
      if (!v) return 'Please enter an email address.';
      if (!EMAIL_RE.test(v)) return 'That does not look like a valid email address.';
      return undefined;

    case 'phone':
      if (!v) return undefined; // optional
      if (!PHONE_RE.test(v)) return 'Use digits, spaces and + ( ) - only.';
      if (v.replace(/\D/g, '').length < 7) return 'That phone number looks too short.';
      return undefined;

    case 'company':
      if (v.length > 100) return 'Please keep this under 100 characters.';
      return undefined;

    case 'message':
      if (!v) return 'Please tell us a little about your system.';
      if (v.length < MESSAGE_MIN) return `Please write at least ${MESSAGE_MIN} characters.`;
      if (v.length > MESSAGE_MAX) return `Please keep it under ${MESSAGE_MAX} characters.`;
      return undefined;

    case 'consent':
      if (!form.consent) return 'Please confirm we can reply to you.';
      return undefined;

    default:
      return undefined;
  }
}

export const CONTACT_FIELDS = ['name', 'email', 'phone', 'company', 'message', 'consent'];

/**
 * Validate the whole form.
 * @returns {Record<string, string>} field -> error message (empty when valid)
 */
export function validateForm(form) {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, form[field], form);
    if (error) errors[field] = error;
  }
  return errors;
}

export const isValid = (form) => Object.keys(validateForm(form)).length === 0;
