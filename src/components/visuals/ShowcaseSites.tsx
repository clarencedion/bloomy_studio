import Image from "next/image";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import {
  floristSites,
  getShowcaseSite,
  type ShowcaseSlug,
} from "@/lib/portfolio";

/**
 * Vitrine : les sites de fleuristes réellement livrés par le studio, montrés
 * plutôt que décrits. C'est la réponse à la seule question qu'un fleuriste se
 * pose en arrivant — « ils font quoi, et est-ce que c'est beau ? ».
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
  const site = floristSites[index];
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
  /** Type littéral : une faute de frappe devient une erreur de compilation,
   *  au lieu d'une page qui perd silencieusement son visuel. */
  slug: ShowcaseSlug;
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
      <figcaption className="mx-auto mt-4 max-w-xl">
        <span className="caption block text-center">
          {site.name}, {site.city} — {site.note}
        </span>
        <LiveSiteLink site={site} className="mt-3 justify-center" />
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
 * Galerie complète : les vitrines florales côte à côte, sans rognage. Sert aux
 * pages où l'on a la place de tout montrer.
 */
export function SiteGallery({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className}`}>
      {floristSites.map((site, i) => (
        <SiteCard key={site.name} index={i} />
      ))}
    </div>
  );
}
