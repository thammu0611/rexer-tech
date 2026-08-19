import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './utils.jsx';

describe('routing', () => {
  it('renders the homepage hero as the only h1', async () => {
    renderApp('/');
    const headings = await screen.findAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/Infrastructure engineered/i);
  });

  it('exposes skip link, banner, main and contentinfo landmarks', async () => {
    renderApp('/');
    expect(await screen.findByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('navigates from the nav bar to the services page', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await user.click(screen.getByRole('navigation', { name: 'Main' }).querySelector('a[href="/services"]'));
    expect(await screen.findByRole('heading', { level: 1, name: /what we deliver/i })).toBeInTheDocument();
  });

  it('serves a 404 page for unknown routes', async () => {
    renderApp('/nope-not-here');
    expect(
      await screen.findByRole('heading', { level: 1, name: /isn't in production/i })
    ).toBeInTheDocument();
    await waitFor(() => expect(document.title).toMatch(/Page not found/i));
  });

  it('leaves focus on the body at first paint so the skip link stays reachable', async () => {
    renderApp('/');
    await screen.findByRole('link', { name: /skip to main content/i });
    // Regression guard: focusing <main> on a cold load would push the skip link
    // and the whole navigation behind the page content in tab order.
    expect(document.activeElement).toBe(document.body);
  });

  it('moves focus into main after a navigation', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await user.click(screen.getByRole('navigation', { name: 'Main' }).querySelector('a[href="/about"]'));
    await screen.findByRole('heading', { level: 1, name: /built by engineers/i });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('main')));
  });

  it('sets a per-route title and canonical link', async () => {
    renderApp('/about');
    await screen.findByRole('heading', { level: 1, name: /built by engineers/i });
    await waitFor(() => expect(document.title).toMatch(/About/i));
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toMatch(/\/about$/);
  });
});
