/**
 * First focusable element on the page. Keyboard and screen-reader users can
 * jump straight past the navigation to the main content.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-teal px-5 py-2.5 font-body text-sm font-medium text-paper shadow-glass dark:text-[#04131a]"
    >
      Skip to main content
    </a>
  );
}
