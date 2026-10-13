import Image from "next/image";

import { PhoneShot } from "@/components/fleuristes/PhoneShot";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { getShowcaseSite, siteHost, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * Un même site, sur ordinateur et sur téléphone, sur le panneau teinté de sa
 * propre couleur. Le téléphone monte depuis le bord bas du panneau (ancré,
 * jamais flottant) et recouvre le coin de la fenêtre desktop.
 *
 * Toutes les cotes sont en pourcentages de la largeur : la composition est
 * identique de 320 px à 1440 px, seule l'échelle change.
 */
export function DuoShowcase({
  slug,
  eager = false,
  className = "",
}: {
  slug: ShowcaseSlug;
  eager?: boolean;
  className?: string;
}) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  return (
    <figure className={`group ${className}`}>
      <div
        className="leaf-lg relative overflow-hidden px-4 pb-[24%] pt-4 sm:px-7 sm:pt-7"
        style={{ backgroundColor: site.tone }}
      >
        <BrowserFrame label={siteHost(site)} className="ml-auto w-[88%]">
          <Image
            src={site.image}
            alt={site.alt}
            width={site.width}
            height={site.height}
            sizes="(min-width: 1024px) 34rem, 88vw"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            className="h-auto w-full"
          />
        </BrowserFrame>
        {site.mobile ? (
          <div className="absolute -bottom-[16%] left-[5%] w-[29%]">
            <PhoneShot site={site} sizes="(min-width: 1024px) 11rem, 29vw" />
          </div>
        ) : null}
      </div>
      <figcaption className="mt-5 px-1">
        <p className="text-display-sm">
          {site.name} <span className="text-forest-faint">· {site.city}</span>
        </p>
        <p className="mt-1.5 max-w-md text-[0.95rem] leading-relaxed text-forest-soft">
          {site.note}
        </p>
        <LiveSiteLink site={site} className="mt-3" />
      </figcaption>
    </figure>
  );
}
