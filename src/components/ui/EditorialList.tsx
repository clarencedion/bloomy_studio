import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";

/**
 * Liste éditoriale — l'alternative aux grilles de trois colonnes.
 *
 * Le défaut structurel du site était de rendre chaque énumération sous la même
 * forme : trois ou quatre blocs de texte égaux, séparés par des filets, sous un
 * titre centré. Répété cinq fois par page, ce gabarit produit exactement la
 * lecture d'un document texte — aucune hiérarchie, aucun rythme, aucun regard
 * guidé.
 *
 * Ici chaque entrée occupe toute la largeur, le titre tient une colonne étroite
 * et le corps une colonne large. L'œil descend en zigzag court au lieu de
 * balayer une grille : c'est la mise en page d'un article, pas d'un tableau.
 *
 * `dense` resserre l'interligne pour les listes de plus de six entrées.
 */

export type EditorialItem = {
  title: string;
  body: ReactNode;
  /** Rend la ligne entière cliquable, avec une flèche qui avance au survol. */
  href?: string;
  /** Libellé du lien, affiché en bas de la colonne de droite. */
  cta?: string;
};

function Row({ item, dense }: { item: EditorialItem; dense: boolean }) {
  const inner = (
    <div
      className={`grid gap-x-10 gap-y-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] ${
        dense ? "py-5" : "py-7 sm:py-9"
      }`}
    >
      <h3 className="text-display-sm transition-colors group-hover:text-rose">
        {item.title}
      </h3>
      <div>
        <p className="leading-relaxed text-ink-soft">{item.body}</p>
        {item.cta ? (
          <span className="plate-label mt-4 inline-flex items-center gap-1.5 text-rose">
            {item.cta}
            <span aria-hidden="true" className="link-live-arrow">
              →
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );

  return item.href ? (
    <Link href={item.href} className="group block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function EditorialList({
  items,
  dense = false,
  className = "",
}: {
  items: EditorialItem[];
  dense?: boolean;
  className?: string;
}) {
  return (
    <ul className={`border-t border-hairline ${className}`}>
      {items.map((item, i) => (
        <li key={item.title} className="border-b border-hairline">
          {/* Trois décalages au maximum : au-delà, la page semble charger
              lentement plutôt que se composer. */}
          <Reveal delay={Math.min(i, 2) * 70}>
            <Row item={item} dense={dense} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
