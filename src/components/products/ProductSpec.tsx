import type { ReactNode } from "react";

/**
 * Fiche produit : à gauche, le titre, une phrase et une liste de définitions
 * (pour qui, ce que ça change, avec quoi c'est construit) ; à droite, une
 * capture réelle posée sur un panneau teinté, ancrée à son bord bas qui la
 * rogne.
 *
 * Mobile (< 1024 px) : le texte d'abord, puis le panneau.
 */
export function ProductSpec({
  title,
  body,
  rows,
  actions,
  visual,
  caption,
}: {
  title: ReactNode;
  body: ReactNode;
  rows: { term: string; detail: ReactNode }[];
  actions?: ReactNode;
  visual: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-12">
      <div className="lg:col-span-5">
        <h2 className="text-display-lg">{title}</h2>
        <p className="lede prose-links mt-5">{body}</p>
        <dl className="mt-10">
          {rows.map((r) => (
            <div key={r.term} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
              <dt className="text-[0.92rem] font-semibold text-forest">{r.term}</dt>
              <dd className="text-[0.98rem] leading-relaxed text-forest-soft">{r.detail}</dd>
            </div>
          ))}
        </dl>
        {actions ? <div className="mt-9">{actions}</div> : null}
      </div>
      <figure className="lg:col-span-7 lg:pt-2">
        <div className="leaf-lg overflow-hidden bg-blush px-5 pt-6 sm:px-10 sm:pt-10">
          <div className="translate-y-6 sm:translate-y-10">{visual}</div>
        </div>
        {caption ? <figcaption className="caption mt-4 px-1">{caption}</figcaption> : null}
      </figure>
    </div>
  );
}
