import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn.js';

function AccordionItem({ question, answer, open, onToggle }) {
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-line/10 last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-ink transition-colors hover:text-teal sm:text-lg"
        >
          <span className="text-balance">{question}</span>
          <Plus
            size={18}
            aria-hidden="true"
            className={cn(
              'flex-shrink-0 text-teal transition-transform duration-300 ease-smooth',
              open && 'rotate-45'
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5 pr-8 font-body text-sm leading-relaxed text-muted"
      >
        {answer}
      </div>
    </div>
  );
}

/**
 * Single-open accordion. Uses a real <button> per row with aria-expanded /
 * aria-controls and `hidden` on the collapsed panel, so collapsed answers are
 * genuinely out of the accessibility tree rather than just visually clipped.
 */
export default function Accordion({ items, defaultOpen = 0, className = '' }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className={cn('divide-line/10', className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          question={item.q}
          answer={item.a}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
