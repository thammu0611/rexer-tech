import { describe, expect, it } from 'vitest';
import { isValid, validateField, validateForm } from './validate.js';

const valid = {
  name: 'Ridha Fathima',
  email: 'ridha@example.com',
  phone: '+91 44 4000 1200',
  company: 'Rexer',
  message: 'We need help splitting a monolith before our next peak season.',
  consent: true,
};

describe('validateField', () => {
  it('requires a name of at least two characters', () => {
    expect(validateField('name', '')).toBeTruthy();
    expect(validateField('name', 'R')).toBeTruthy();
    expect(validateField('name', 'Ridha')).toBeUndefined();
  });

  it('rejects malformed email addresses', () => {
    for (const bad of ['', 'nope', 'a@b', 'a b@c.com', 'a@b.c']) {
      expect(validateField('email', bad), bad).toBeTruthy();
    }
    expect(validateField('email', 'a.b+tag@sub.example.co')).toBeUndefined();
  });

  it('treats phone as optional but validates it when present', () => {
    expect(validateField('phone', '')).toBeUndefined();
    expect(validateField('phone', '123')).toBeTruthy();
    expect(validateField('phone', 'call me maybe')).toBeTruthy();
    expect(validateField('phone', '+91 44 4000 1200')).toBeUndefined();
  });

  it('enforces a minimum message length', () => {
    expect(validateField('message', 'too short')).toBeTruthy();
    expect(validateField('message', 'long enough to be useful')).toBeUndefined();
  });

  it('requires consent', () => {
    expect(validateField('consent', false, { consent: false })).toBeTruthy();
    expect(validateField('consent', true, { consent: true })).toBeUndefined();
  });

  it('ignores unknown fields rather than throwing', () => {
    expect(validateField('nickname', 'anything')).toBeUndefined();
  });
});

describe('validateForm', () => {
  it('passes a complete, well-formed submission', () => {
    expect(validateForm(valid)).toEqual({});
    expect(isValid(valid)).toBe(true);
  });

  it('reports every invalid field at once', () => {
    const errors = validateForm({ ...valid, name: '', email: 'bad', message: 'hi', consent: false });
    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'message', 'name']);
  });

  it('trims whitespace-only values', () => {
    expect(validateForm({ ...valid, name: '   ' }).name).toBeTruthy();
  });
});
