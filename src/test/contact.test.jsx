import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './utils.jsx';

const fill = async (user) => {
  await user.type(screen.getByLabelText(/^name/i), 'Ridha Fathima');
  await user.type(screen.getByLabelText(/^email/i), 'ridha@example.com');
  await user.type(
    screen.getByLabelText(/^message/i),
    'We are splitting a monolith and need help before peak season.'
  );
  await user.click(screen.getByRole('checkbox'));
};

describe('contact form', () => {
  it('blocks submission and reports errors when empty', async () => {
    const user = userEvent.setup();
    renderApp('/contact');
    await user.click(await screen.findByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter an email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('validates email format on blur', async () => {
    const user = userEvent.setup();
    renderApp('/contact');
    const email = await screen.findByLabelText(/^email/i);
    await user.type(email, 'not-an-email');
    await user.tab();
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it('submits a valid message and confirms in a live region', async () => {
    const user = userEvent.setup();
    renderApp('/contact');
    await screen.findByRole('button', { name: /send message/i });
    await fill(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByLabelText(/^name/i)).toHaveValue('');
  });

  it('pre-fills the message when arriving from a job listing', async () => {
    renderApp('/contact?role=Security%20Engineer');
    expect(await screen.findByRole('heading', { name: /apply: security engineer/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i).value).toMatch(/Security Engineer/);
  });
});
