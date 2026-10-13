import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

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
      className={`grid gap-x-12 gap-y-3 md:grid-cols-12 ${dense ? "py-6" : "py-8 sm:py-10"}`}
    >
      <h3 className="text-display-md transition-colors group-hover:text-bloom-ink md:col-span-5">
        {item.title}
      </h3>
      <div className="md:col-span-7">
        <p className="max-w-[60ch] text-[1.02rem] leading-relaxed text-forest-soft">{item.body}</p>
        {item.cta ? (
          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-bloom-ink">
            {item.cta}
            <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
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
    <ul className={`border-t border-line ${className}`}>
      {items.map((item, i) => (
        <li key={item.title} className="border-b border-line">
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
