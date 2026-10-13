"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";

export type FaqItem = { question: string; answer: React.ReactNode };

/**
 * Accordéon FAQ accessible (boutons + aria-expanded, contenu réel dans le DOM).
 * Pas de schema FAQPage : les rich results FAQ ont été retirés par Google.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-[1.15rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-bloom-ink sm:text-[1.25rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
                    open
                      ? "rotate-45 border-bloom-strong bg-bloom-strong text-white"
                      : "border-forest/20 text-forest group-hover:border-forest"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-soft)" }}
                >
                  <Plus weight="bold" className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="prose-links max-w-[62ch] pb-7 pr-12 text-[1.02rem] leading-relaxed text-forest-soft"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
