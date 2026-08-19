import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

// jsdom implements neither of these, and several components rely on them.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  // Report everything as visible immediately so scroll-reveal content is
  // present in tests without faking scroll events.
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// jsdom throws "Not implemented" for these, which floods the test output.
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
