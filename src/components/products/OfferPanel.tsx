import type { ReactNode } from "react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

import type { Offer } from "@/lib/offers";

/**
 * Une offre en panneau `forest` à coins feuille : la seule « histoire de
 * couleur » de la page qui l'utilise (un panneau, pas une bande). À gauche,
 * pour qui, le prix et la durée ; à droite, ce qui est inclus, puis ce qui
 * est volontairement exclu, dans un panneau plus sombre.
 *
 * Le prix vient de `lib/offers.ts` : tant qu'il vaut `null`, « Sur devis ».
 *
 * Mobile (< 1024 px) : tout s'empile ; la liste des inclusions passe sur une
 * colonne sous 640 px.
 */
export function OfferPanel({
  offer,
  excludesTitle = "Volontairement exclu",
  excludesNote,
  footer,
  className = "",
}: {
  offer: Offer;
  excludesTitle?: string;
  excludesNote?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={offer.id}
      className={`on-forest leaf-lg scroll-mt-28 bg-forest px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 ${className}`}
    >
      {/* Ordre du DOM = ordre de lecture mobile : l'offre, ce qu'elle
          contient, puis le lien de suite (`footer`), qui remonte sous le prix
          en desktop. */}
      <div className="grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0">
        <div className="lg:col-span-5">
          <h2 className="text-display-xl text-paper">{offer.name}</h2>
          <p className="lede mt-6">{offer.audience}</p>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-paper/80">{offer.summary}</p>
          <dl className="mt-10 grid gap-6 border-t border-line-dark pt-7 sm:grid-cols-2">
            <div>
              <dt className="plate-label">Prix</dt>
              <dd className="text-display-md mt-2 text-bloom-light">{offer.price ?? "Sur devis"}</dd>
            </div>
            <div>
              <dt className="plate-label">Durée</dt>
              <dd className="mt-2 text-[0.98rem] leading-snug text-paper">{offer.process}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <h3 className="text-display-sm text-paper">Inclus</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {offer.includes.map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-paper/90">
                <Check aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-leaf" />
                {item}
              </li>
            ))}
          </ul>

          <div className="leaf mt-12 bg-forest-deep p-6 sm:p-8">
            <h3 className="text-display-sm text-paper">{excludesTitle}</h3>
            <ul className="mt-5 space-y-3">
              {offer.excludes.map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-paper/80">
                  <X aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-bloom-light" />
                  {item}
                </li>
              ))}
            </ul>
            {excludesNote ? (
              <p className="mt-5 text-[0.92rem] leading-relaxed text-leaf">{excludesNote}</p>
            ) : null}
          </div>
        </div>

        {footer ? <div className="lg:col-span-5 lg:row-start-2 lg:pt-10">{footer}</div> : null}
      </div>
    </div>
  );
}
