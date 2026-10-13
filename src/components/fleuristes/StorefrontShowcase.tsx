import type { ReactNode } from "react";

import { PhoneShot } from "@/components/fleuristes/PhoneShot";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import { getShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * La vitrine d'une boutique en ligne, ordinateur et téléphone côte à côte sur
 * le panneau teinté de la couleur du site. La fenêtre desktop porte la
 * capture longue, qui défile au survol : le visiteur parcourt la boutique
 * entière sans quitter la page. Le téléphone monte depuis le bord bas du
 * panneau (posé, jamais flottant).
 *
 * Desktop (≥ 640 px) : fenêtre sur 8 colonnes, téléphone sur 4.
 * Mobile : le téléphone seul, centré. C'est l'écran que le visiteur a en
 * main, et le survol qui fait défiler la fenêtre n'existe pas au doigt.
 *
 * La légende vient de la page : elle ne dit du client que ce que la page a
 * vérifié.
 */
export function StorefrontShowcase({
  slug,
  caption,
  eager = false,
  className = "",
}: {
  slug: ShowcaseSlug;
  caption: ReactNode;
  eager?: boolean;
  className?: string;
}) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  return (
    <figure className={`group ${className}`}>
      <div
        className="leaf-lg overflow-hidden px-6 pt-10 sm:px-8 sm:pt-10 lg:px-14 lg:pt-14"
        style={{ backgroundColor: site.tone }}
      >
        <div className="grid items-end gap-8 sm:grid-cols-12 lg:gap-12">
          <div className="max-sm:hidden sm:col-span-8 sm:mb-10 lg:mb-14">
            <ScrollingCapture
              site={site}
              eager={eager}
              sizes="(min-width: 1440px) 52rem, (min-width: 640px) 62vw, 1px"
            />
          </div>
          <div className="mx-auto -mb-16 w-[62%] max-w-[15.5rem] sm:col-span-4 sm:-mb-20 sm:w-full lg:-mb-24">
            <PhoneShot site={site} sizes="(min-width: 1024px) 15.5rem, (min-width: 640px) 28vw, 62vw" />
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="text-display-sm">
            {site.name} <span className="text-forest-faint">· {site.city}</span>
          </p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">{caption}</p>
        </div>
        <LiveSiteLink site={site} className="shrink-0 sm:pt-1" />
      </figcaption>
    </figure>
  );
}
