import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './utils.jsx';

describe('theme toggle', () => {
  it('switches the dark class on the document root', async () => {
    const user = userEvent.setup();
    renderApp('/');
    const toggles = await screen.findAllByRole('button', { name: /switch to (light|dark) theme/i });
    const before = document.documentElement.classList.contains('dark');
    await user.click(toggles[0]);
    expect(document.documentElement.classList.contains('dark')).toBe(!before);
  });
});

describe('faq accordion', () => {
  it('opens one answer at a time and reports state via aria-expanded', async () => {
    const user = userEvent.setup();
    renderApp('/services');
    const first = await screen.findByRole('button', { name: /how quickly can you start/i });
    const second = screen.getByRole('button', { name: /work with our existing engineers/i });

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('careers page', () => {
  it('links every apply button to a pre-filled contact route', async () => {
    renderApp('/careers');
    const apply = await screen.findAllByRole('link', { name: /apply for /i });
    expect(apply).toHaveLength(4);
    expect(apply[0]).toHaveAttribute('href', expect.stringContaining('/contact?role='));
  });
});
