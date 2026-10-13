import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/Container";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";

export type ReadingLink = {
  href: string;
  /** Nature du lien : « Article · 8 min », « Page », etc. */
  kind: string;
  label: string;
};

/**
 * Questions fréquentes des pages fleuristes : le titre et les lectures
 * associées à gauche, l'accordéon à droite.
 *
 * Desktop : 5 colonnes / 7 colonnes, le titre en haut à gauche, les lectures
 * juste dessous (la première rangée garde sa hauteur, la seconde absorbe la
 * hauteur de l'accordéon). Mobile (< 1024 px) : titre, questions, puis lectures, dans cet
 * ordre, pour que la réponse arrive avant le renvoi.
 */
export function FaqBlock({
  title,
  items,
  reading = [],
}: {
  title: string;
  items: FaqItem[];
  reading?: ReadingLink[];
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container width="wide">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10">
          <h2 className="text-display-lg lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:max-w-md">{title}</h2>
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <FaqAccordion items={items} />
          </div>
          {reading.length ? (
            <div className="lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-start">
              <p className="text-[0.95rem] font-semibold">Pour aller plus loin</p>
              <ul className="mt-3 border-t border-line">
                {reading.map((r) => (
                  <li key={r.href} className="border-b border-line">
                    <Link
                      href={r.href}
                      className="group flex min-h-14 items-start justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block text-[0.8rem] text-forest-faint">{r.kind}</span>
                        <span className="mt-0.5 block font-semibold leading-snug transition-colors group-hover:text-bloom-ink">
                          {r.label}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        weight="bold"
                        className="arrow-nudge mt-5 size-4 shrink-0 text-bloom-ink"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
