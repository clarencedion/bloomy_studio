import Image from "next/image";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import { siteHost, type ShowcaseSite } from "@/lib/portfolio";

/**
 * Carte de l'index des réalisations.
 *
 * Trois formats, attribués par la grille selon la position (voir
 * `cardShape` dans PortfolioShowcase) :
 *   - `feature` : toute la largeur, capture longue qui défile au survol,
 *     légende à côté en desktop. Un projet sur cinq.
 *   - `wide` / `narrow` : 7 et 5 colonnes en desktop, la petite carte
 *     descend d'un cran. Les paires s'inversent d'une rangée à l'autre.
 *
 * La capture repose sur un panneau teinté de la couleur du site lui-même.
 * La légende va dessous (ou à côté), jamais sur l'image.
 *
 * La capture est cliquable à la souris (même adresse que le lien en clair),
 * mais retirée de l'ordre de tabulation et de l'arbre d'accessibilité : le
 * lecteur d'écran et le clavier passent par le seul `LiveSiteLink`.
 */

export type CardShape = "feature" | "wide" | "narrow";

const shapeClass: Record<CardShape, string> = {
  feature: "md:col-span-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10",
  wide: "md:col-span-6 lg:col-span-7",
  narrow: "md:col-span-6 md:mt-16 lg:col-span-5 lg:mt-20",
};

function Capture({ site, shape }: { site: ShowcaseSite; shape: CardShape }) {
  if (shape === "feature") {
    return (
      <ScrollingCapture
        site={site}
        sizes="(min-width: 1280px) 41rem, (min-width: 1024px) 60vw, 100vw"
      />
    );
  }
  return (
    <BrowserFrame label={siteHost(site)}>
      <Image
        src={site.image}
        alt={site.alt}
        width={site.width}
        height={site.height}
        sizes={
          shape === "wide"
            ? "(min-width: 1280px) 34rem, (min-width: 768px) 50vw, 100vw"
            : "(min-width: 1280px) 24rem, (min-width: 768px) 46vw, 100vw"
        }
        className="h-auto w-full"
      />
    </BrowserFrame>
  );
}

export function ProjectCard({
  site,
  shape,
  flip = false,
}: {
  site: ShowcaseSite;
  shape: CardShape;
  /** Format `feature` : légende à gauche plutôt qu'à droite. */
  flip?: boolean;
}) {
  const feature = shape === "feature";

  return (
    <article className={`group ${shapeClass[shape]}`}>
      <a
        href={site.offline ? undefined : site.liveUrl}
        target={site.offline ? undefined : "_blank"}
        rel={site.offline ? undefined : "noopener"}
        tabIndex={-1}
        aria-hidden="true"
        className={`block ${feature ? `lg:col-span-8 ${flip ? "lg:order-2" : ""}` : ""}`}
      >
        <div
          className={`leaf transition-transform duration-300 ease-soft group-hover:-translate-y-1 ${
            feature ? "p-3.5 sm:p-7 lg:p-9" : "p-3.5 sm:p-5"
          }`}
          style={{ backgroundColor: site.tone }}
        >
          <Capture site={site} shape={shape} />
        </div>
      </a>

      {feature ? (
        <div className={`mt-5 px-1 lg:col-span-4 lg:mt-0 ${flip ? "lg:order-1" : ""}`}>
          <p className="plate-label">{site.sectorLabel}</p>
          <h3 className="text-display-md mt-3">{site.name}</h3>
          <p className="mt-1.5 text-[0.95rem] text-forest-faint">{site.city}</p>
          <p className="mt-5 max-w-[34rem] leading-relaxed text-forest-soft">{site.note}</p>
          <LiveSiteLink site={site} className="mt-6" />
        </div>
      ) : (
        <div className="mt-4 px-1">
          {/* Mobile : la ville toujours sous le nom (même rythme d'une carte à
              l'autre, quelle que soit la longueur du nom). */}
          <div className="flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
            <h3 className="text-display-sm">{site.name}</h3>
            <p className="plate-label">{site.city}</p>
          </div>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">{site.focus}</p>
          <LiveSiteLink site={site} className="mt-3" />
        </div>
      )}
    </article>
  );
}
