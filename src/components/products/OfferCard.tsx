import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";

import type { Offer } from "@/lib/offers";

const surfaces = {
  white: "border border-line bg-white",
  blush: "bg-blush",
  mint: "bg-mint",
} as const;

/**
 * Une formule, en carte à coins feuille. Deux dispositions :
 * - `stack` : tout s'empile, pour une cellule de cinq ou sept colonnes ;
 * - `wide`  : nom et prix à gauche, contenu à droite, pour une cellule
 *   pleine largeur.
 *
 * Ordre de lecture constant : pour qui, ce que c'est, ce qui est inclus, ce
 * qui ne l'est pas, puis le prix et la durée en pied de carte.
 *
 * Mobile (< 768 px) : la disposition `wide` s'empile comme `stack`.
 */
export function OfferCard({
  offer,
  surface = "white",
  layout = "stack",
  link,
  className = "",
}: {
  offer: Offer;
  surface?: keyof typeof surfaces;
  layout?: "stack" | "wide";
  link?: { href: string; label: string };
  className?: string;
}) {
  const wide = layout === "wide";

  const intro = (
    <>
      <h3 className="text-display-lg">{offer.name}</h3>
      <p className="mt-4 text-[1.05rem] font-medium leading-snug text-forest">{offer.audience}</p>
      <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-forest-soft">{offer.summary}</p>
    </>
  );

  const price = (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <p className="text-display-sm text-bloom-ink">{offer.price ?? "Sur devis"}</p>
      <p className="text-[0.9rem] leading-snug text-forest-soft">{offer.process}</p>
    </div>
  );

  const details = (
    <>
      <ul className={`grid gap-x-8 gap-y-3 ${wide ? "sm:grid-cols-2" : ""}`}>
        {offer.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[0.96rem] leading-relaxed text-forest">
            <Check aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-forest-soft" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[0.92rem] leading-relaxed text-forest-soft">
        <span className="font-semibold text-forest">Non inclus : </span>
        {offer.excludes.map((e) => e.charAt(0).toLowerCase() + e.slice(1)).join(", ")}.
      </p>
    </>
  );

  const more = link ? (
    <Link
      href={link.href}
      className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold text-bloom-ink underline decoration-bloom-ink/35 underline-offset-[6px] hover:decoration-bloom-ink"
    >
      {link.label}
      <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
    </Link>
  ) : null;

  return (
    <article
      id={offer.id}
      className={`leaf-lg scroll-mt-28 p-7 sm:p-10 ${surfaces[surface]} ${className}`}
    >
      {wide ? (
        /* Ordre du DOM = ordre de lecture mobile (présentation, contenu,
           puis prix) ; en desktop, le prix remonte sous la présentation. */
        <div className="grid gap-8 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-0">
          <div className="md:col-span-5">{intro}</div>
          <div className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:pt-2">
            {details}
          </div>
          <div className="md:col-span-5 md:row-start-2 md:pt-8">
            <div className="border-t border-forest/15 pt-6">{price}</div>
            {more}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {intro}
          <div className="mt-8">{details}</div>
          <div className="mt-auto pt-8">
            <div className="border-t border-forest/15 pt-6">{price}</div>
            {more}
          </div>
        </div>
      )}
    </article>
  );
}
