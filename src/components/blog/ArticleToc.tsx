import { CaretDown } from "@phosphor-icons/react/dist/ssr";

import type { OutlineEntry } from "@/components/blog/outline";

function Links({ outline }: { outline: OutlineEntry[] }) {
  return (
    <ol className="space-y-1 border-l border-line">
      {outline.map((entry) => (
        <li key={entry.id}>
          <a
            href={`#${entry.id}`}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.9rem] leading-snug text-forest-soft transition-colors hover:border-bloom hover:text-bloom-ink"
          >
            {entry.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Sommaire de l'article, rendu côté serveur à partir des H2.
 *
 * - Desktop : colonne collante à gauche du texte, toujours à portée.
 * - Mobile : un `<details>` replié au-dessus du texte, pour ne pas pousser
 *   le premier paragraphe hors de l'écran.
 */
export function ArticleToc({ outline }: { outline: OutlineEntry[] }) {
  if (outline.length < 3) return null;

  return (
    <>
      <details className="group/toc leaf-sm border border-line bg-white lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-semibold [&::-webkit-details-marker]:hidden">
          Dans cet article
          <CaretDown
            aria-hidden="true"
            weight="bold"
            className="size-4 text-bloom-ink transition-transform group-open/toc:rotate-180"
          />
        </summary>
        <nav aria-label="Sommaire de l'article" className="px-5 pb-5">
          <Links outline={outline} />
        </nav>
      </details>

      <nav aria-label="Sommaire de l'article" className="max-lg:hidden lg:sticky lg:top-28">
        <p className="plate-label">Dans cet article</p>
        <div className="mt-5">
          <Links outline={outline} />
        </div>
      </nav>
    </>
  );
}
