/**
 * Tiny class-name joiner. Filters out false / null / undefined so conditional
 * classes can be written inline without leaving stray spaces in the DOM.
 *
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
