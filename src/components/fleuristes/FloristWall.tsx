import Image from "next/image";

import { PhoneShot } from "@/components/fleuristes/PhoneShot";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { floristSites, siteHost, type ShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * Le mur des boutiques : toutes les vitrines florales livrées, en planche
 * contact à formats mêlés. Une capture sur trois est la version mobile, posée
 * sur le bord bas de son panneau ; les autres sont la page d'accueil desktop.
 * Le mélange des hauteurs donne le rythme d'un mur de boutique plutôt que
 * celui d'un tableau.
 *
 * Desktop : colonnes (deux en tablette, trois au-delà de 1024 px).
 * Mobile (< 768 px) : un rail horizontal à défilement aimanté, chaque carte
 * à 80 % de l'écran pour laisser deviner la suivante.
 *
 * Le rail est `relative` : sans cela, les éléments absolus des cartes (texte
 * `sr-only` des liens, encoche des téléphones) prennent un ancêtre plus haut
 * comme bloc conteneur, échappent au rognage du rail et élargissent la page.
 */
function WallItem({ site, phone }: { site: ShowcaseSite; phone: boolean }) {
  return (
    <figure className="group">
      <div
        className={`leaf-sm overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 ${
          phone ? "px-6 pt-6 sm:px-10 sm:pt-8" : "p-3.5 sm:p-5"
        }`}
        style={{ backgroundColor: site.tone }}
      >
        {phone ? (
          <div className="mx-auto -mb-[22%] w-[62%] max-w-[13rem]">
            <PhoneShot site={site} sizes="(min-width: 768px) 13rem, 50vw" />
          </div>
        ) : (
          <BrowserFrame label={siteHost(site)}>
            <Image
              src={site.image}
              alt={site.alt}
              width={site.width}
              height={site.height}
              sizes="(min-width: 1024px) 26rem, (min-width: 768px) 45vw, 80vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
        )}
      </div>
      <figcaption className="mt-4 px-1">
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="text-display-sm">{site.name}</span>
          <span className="plate-label">{site.city}</span>
        </p>
        <p className="mt-1 text-[0.92rem] leading-relaxed text-forest-soft">{site.focus}</p>
        <LiveSiteLink site={site} className="mt-2.5" />
      </figcaption>
    </figure>
  );
}

/** Rang d'affichage : les sites livrés d'abord, puis les projets récents. */
const kindRank = { client: 0, recent: 1, concept: 2 } as const;

export function FloristWall({
  exclude = [],
  limit = 14,
  className = "",
}: {
  /** Projets déjà montrés plus haut sur la page. */
  exclude?: readonly ShowcaseSlug[];
  /** Nombre de sites montrés ; la liste complète vit sur /realisations. */
  limit?: number;
  className?: string;
}) {
  const sites = floristSites
    .filter((s) => !(exclude as readonly string[]).includes(s.slug))
    .sort((a, b) => kindRank[a.kind] - kindRank[b.kind])
    .slice(0, limit);
  return (
    <ul
      aria-label="Sites de fleuristes conçus par le studio"
      className={`relative -mx-5 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] sm:-mx-8 sm:px-8 md:mx-0 md:block md:columns-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:columns-3 lg:gap-10 ${className}`}
    >
      {sites.map((site, i) => (
        <li
          key={site.slug}
          className="w-[80vw] max-w-[22rem] shrink-0 snap-start md:mb-14 md:w-auto md:max-w-none md:break-inside-avoid"
        >
          <Reveal delay={(i % 3) * 80}>
            <WallItem site={site} phone={i % 3 === 1 && Boolean(site.mobile)} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
