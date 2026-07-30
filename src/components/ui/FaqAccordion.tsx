"use client";

import { useId, useState } from "react";

export type FaqItem = { question: string; answer: React.ReactNode };

/**
 * Accordéon FAQ accessible (boutons + aria-expanded, contenu réel dans le DOM).
 * Pas de schema FAQPage : les rich results FAQ ont été retirés par Google.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[1.02rem] font-semibold transition-colors hover:text-rose"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`text-rose transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  style={{ transitionTimingFunction: "var(--ease-soft)" }}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="prose-links pb-5 pr-8 text-[0.98rem] leading-relaxed text-ink-soft"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
