// ---------------------------------------------------------------------------
// Contact-form transport.
//
// Point VITE_CONTACT_ENDPOINT at any JSON POST endpoint (Formspree, Basin,
// a Netlify/Vercel function, your own API) and submissions go there. With no
// endpoint configured the call resolves as a no-op success so the UI stays
// demonstrable in development — the return value tells you which happened.
// ---------------------------------------------------------------------------

const ENDPOINT = import.meta.env?.VITE_CONTACT_ENDPOINT || '';

const TIMEOUT_MS = 15000;

export async function submitContact(payload) {
  if (!ENDPOINT) {
    // Simulate network latency so loading states are exercised in dev.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true, delivered: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, delivered: false, error: `Server responded ${response.status}.` };
    }
    return { ok: true, delivered: true };
  } catch (error) {
    const aborted = error?.name === 'AbortError';
    return {
      ok: false,
      delivered: false,
      error: aborted ? 'The request timed out.' : 'Could not reach the server.',
    };
  } finally {
    clearTimeout(timer);
  }
}
