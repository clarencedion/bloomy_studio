import Image from "next/image";

import { Sprig, type SpecimenName } from "@/components/visuals/Botanical";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { getShowcaseSite, showcaseSites } from "@/lib/portfolio";

/**
 * Vitrine : trois sites réellement livrés par le studio, montrés plutôt que
 * décrits. C'est la réponse à la seule question qu'un fleuriste se pose en
 * arrivant — « ils font quoi, et est-ce que c'est beau ? ».
 *
 * Les captures viennent de `lib/portfolio.ts` : uniquement des projets du
 * studio, jamais une boutique partenaire de la marketplace.
 */

function SiteCard({
  index,
  eager = false,
  className = "",
}: {
  index: number;
  /** Next 16 : remplace `priority`, déprécié. Réservé à une capture au-dessus
   *  de la ligne de flottaison, et à une seule par page. */
  eager?: boolean;
  className?: string;
}) {
  const site = showcaseSites[index];
  return (
    <figure className={className}>
      <BrowserFrame label={`${site.name} — ${site.city}`}>
        <Image
          src={site.image}
          alt={site.alt}
          width={site.width}
          height={site.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          sizes="(min-width: 1024px) 32rem, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
      <figcaption className="mt-2.5 flex items-baseline justify-center gap-2 text-center">
        <span className="text-[0.82rem] font-semibold">{site.name}</span>
        <span className="caption">{site.focus}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Le panneau : la capture centrale en pleine largeur, les deux autres rognées
 * par les bords. Le débordement est voulu — il suggère un portfolio qui
 * continue hors du cadre.
 */
export function ShowcaseSites() {
  return (
    <div className="overflow-hidden rounded-sm border border-hairline bg-cream-deep p-4 sm:p-8">
      <div className="flex items-start justify-center gap-5 sm:gap-7">
        <SiteCard index={1} className="hidden w-[24rem] shrink-0 lg:block" />
        <SiteCard index={0} eager className="w-full max-w-[32rem] shrink-0 lg:w-[32rem]" />
        <SiteCard index={2} className="hidden w-[24rem] shrink-0 lg:block" />
      </div>
    </div>
  );
}

/**
 * Pièce maîtresse : une capture en grand, légendée, pour ouvrir une page de
 * décision. C'est ce qui a remplacé l'ornement en tête de page — le visiteur
 * voit le travail avant de lire l'argumentaire.
 */
export function SiteShowpiece({
  slug,
  eager = false,
  className = "",
}: {
  slug: string;
  eager?: boolean;
  className?: string;
}) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  return (
    <figure className={`mx-auto max-w-4xl ${className}`}>
      <BrowserFrame label={`${site.name} — ${site.city}`}>
        <Image
          src={site.image}
          alt={site.alt}
          width={site.width}
          height={site.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
      <figcaption className="caption mx-auto mt-4 max-w-xl text-center">
        {site.name}, {site.city} — {site.note}
      </figcaption>
    </figure>
  );
}

/** Une capture isolée, pour illustrer un propos au fil d'une page service. */
export function SiteCardSingle({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  return <SiteCard index={index} className={className} />;
}

/**
 * Galerie complète : les trois sites côte à côte, sans rognage. Sert aux
 * pages où l'on a la place de tout montrer (réalisations, page service).
 */
export function SiteGallery({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {showcaseSites.map((site, i) => (
        <SiteCard key={site.name} index={i} />
      ))}
    </div>
  );
}

/**
 * Aperçu stylisé du composeur de bouquet de bloomy.one — le produit de
 * l'équipe elle-même, distinct des sites clients ci-dessus.
 */
export function BloomyComposer({ bare = false }: { bare?: boolean }) {
  const stems: [string, string, SpecimenName, number][] = [
    ["Renoncule", "3,50 €", "renoncule", 5],
    ["Eucalyptus", "2,10 €", "eucalyptus", 3],
    ["Tulipe", "2,80 €", "tulipe", 4],
  ];
  return (
    <div
      // `bare` : quand l'aperçu est déjà posé dans un cadre d'appareil, il ne
      // porte pas son propre cadre — deux bordures imbriquées font maquette.
      className={
        bare
          ? "bg-paper text-ink"
          : "overflow-hidden rounded-sm border border-hairline bg-paper shadow-float"
      }
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-hairline bg-cream px-4 py-2.5">
        <span
          className="text-[0.8rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          bloomy
        </span>
        <span className="plate-label" style={{ fontSize: "0.5rem" }}>
          Composer mon bouquet
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-end justify-between">
          <p className="plate-label" style={{ fontSize: "0.55rem" }}>
            Disponible ce matin
          </p>
          <p className="text-[0.6rem] text-ink-faint">Atelier partenaire · Nantes</p>
        </div>

        <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
          {stems.map(([name, price, specimen, qty]) => (
            <li key={name} className="flex items-center gap-3 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-sage-veil text-sage-deep">
                <Sprig name={specimen} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.72rem] font-semibold">{name}</span>
                <span className="block text-[0.62rem] text-ink-soft">{price} la tige</span>
              </span>
              <span className="flex items-center gap-2 text-[0.68rem]">
                <span className="grid size-5 place-items-center rounded-full border border-hairline">
                  −
                </span>
                <span className="w-3 text-center font-semibold">{qty}</span>
                <span className="grid size-5 place-items-center rounded-full border border-hairline">
                  +
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.65rem] text-ink-soft">
            Retrait aujourd&apos;hui, 17 h 30
          </span>
          <span
            className="text-[1.15rem] leading-none text-rose"
            style={{ fontFamily: "var(--font-display)" }}
          >
            32,20 €
          </span>
        </div>
        <div className="mt-3 grid h-9 place-items-center rounded-sm bg-ink text-[0.68rem] font-semibold text-cream">
          Réserver ce bouquet
        </div>
      </div>
    </div>
  );
}
