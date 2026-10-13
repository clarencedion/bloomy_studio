import Image from "next/image";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import {
  floristSites,
  getShowcaseSite,
  showcaseSites,
  siteHost,
  type ShowcaseSite,
  type ShowcaseSlug,
} from "@/lib/portfolio";

/**
 * Vitrines de projets, partagées par les pages de décision.
 *
 * Grammaire commune : la capture est posée dans sa fenêtre de navigateur, sur
 * un panneau à coins « feuille » teinté de la couleur du site lui-même
 * (`site.tone`). La légende va dessous, sur le papier, jamais sur l'image.
 *
 * Les pages métier restent sur `fleuriste` : un écolodge au milieu de quatre
 * boutiques brouillerait la spécialisation qu'elles servent à démontrer. Les
 * pages produit s'adressent à tout le monde et montrent l'ensemble.
 */

/** Panneau teinté qui porte une capture. */
function TonePanel({
  site,
  children,
  className = "",
}: {
  site: ShowcaseSite;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`leaf p-4 sm:p-6 ${className}`} style={{ backgroundColor: site.tone }}>
      {children}
    </div>
  );
}

export function SiteCard({
  site,
  eager = false,
  scrolling = false,
  sizes = "(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  site: ShowcaseSite;
  /** Next 16 : remplace `priority`. Une seule capture au-dessus de la ligne de flottaison par page. */
  eager?: boolean;
  /** Capture longue qui défile au survol. À réserver aux projets mis en avant. */
  scrolling?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <TonePanel site={site} className="transition-transform duration-300 group-hover:-translate-y-1">
        {scrolling ? (
          <ScrollingCapture site={site} sizes={sizes} eager={eager} />
        ) : (
          <BrowserFrame label={siteHost(site)}>
            <Image
              src={site.image}
              alt={site.alt}
              width={site.width}
              height={site.height}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : undefined}
              sizes={sizes}
              className="h-auto w-full"
            />
          </BrowserFrame>
        )}
      </TonePanel>
      <figcaption className="mt-4 px-1">
        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-display-sm">{site.name}</span>
          <span className="plate-label">{site.city}</span>
        </p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">{site.focus}</p>
        <LiveSiteLink site={site} className="mt-3" />
      </figcaption>
    </figure>
  );
}

/**
 * Trois boutiques côte à côte, la centrale en grand. Les deux autres
 * n'apparaissent qu'en desktop, où il y a la place.
 */
export function ShowcaseSites() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <SiteCard site={floristSites[1]} className="hidden lg:col-span-3 lg:mt-16 lg:block" />
      <SiteCard
        site={floristSites[0]}
        eager
        scrolling
        sizes="(min-width: 1024px) 44rem, 100vw"
        className="lg:col-span-6"
      />
      <SiteCard site={floristSites[2]} className="hidden lg:col-span-3 lg:mt-16 lg:block" />
    </div>
  );
}

/**
 * Pièce maîtresse : un projet en grand, pour ouvrir une page de décision.
 * La capture longue défile au survol.
 */
export function SiteShowpiece({
  slug,
  eager = false,
  className = "",
}: {
  /** Type littéral : une faute de frappe devient une erreur de compilation. */
  slug: ShowcaseSlug;
  eager?: boolean;
  className?: string;
}) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  return (
    <figure className={`group ${className}`}>
      <TonePanel site={site} className="sm:p-10 lg:p-14">
        <ScrollingCapture
          site={site}
          eager={eager}
          sizes="(min-width: 1280px) 64rem, 100vw"
          className="mx-auto max-w-5xl"
        />
      </TonePanel>
      <figcaption className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="text-display-sm">
            {site.name} <span className="text-forest-faint">· {site.city}</span>
          </p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">{site.note}</p>
        </div>
        <LiveSiteLink site={site} className="shrink-0 sm:pt-1" />
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
  return <SiteCard site={floristSites[index]} className={className} />;
}

/**
 * Galerie complète, sur deux colonnes en tablette et trois en desktop. Une
 * carte sur trois descend d'un cran en desktop : le rythme évite l'effet
 * tableau sans rogner aucune capture.
 */
export function SiteGallery({
  className = "",
  scope = "fleuriste",
  slugs,
}: {
  className?: string;
  scope?: "fleuriste" | "tous";
  /** Sélection explicite, prioritaire sur `scope`. */
  slugs?: readonly ShowcaseSlug[];
}) {
  const sites = slugs
    ? slugs.map((s) => getShowcaseSite(s)).filter((s): s is ShowcaseSite => Boolean(s))
    : scope === "tous"
      ? showcaseSites
      : floristSites;
  return (
    <div className={`grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {sites.map((site, i) => (
        <SiteCard key={site.slug} site={site} className={i % 3 === 1 ? "lg:mt-14" : ""} />
      ))}
    </div>
  );
}
