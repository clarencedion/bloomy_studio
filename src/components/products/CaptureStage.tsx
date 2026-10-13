import Image from "next/image";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import { getShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * Composition d'ouverture des pages produit : un site livré, en grand, sur un
 * panneau à coins feuille teinté de sa propre couleur. La capture longue
 * défile au survol ou au focus ; le téléphone, posé sur le bord bas du
 * panneau, montre la même page composée pour le mobile.
 *
 * Mobile (< 768 px) : le téléphone se range sous le panneau, à droite, pour
 * ne jamais masquer la capture sur un petit écran.
 */
export function CaptureStage({
  slug,
  eager = false,
  withPhone = true,
  className = "",
}: {
  slug: ShowcaseSlug;
  eager?: boolean;
  withPhone?: boolean;
  className?: string;
}) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  const phone = withPhone ? site.mobile : undefined;

  return (
    <figure className={`group relative ${className}`}>
      <div
        className="leaf-lg relative p-4 pb-10 sm:p-7 sm:pb-16"
        style={{ backgroundColor: site.tone }}
      >
        <ScrollingCapture
          site={site}
          eager={eager}
          sizes="(min-width: 1024px) 38rem, 100vw"
          className={phone ? "md:mr-14" : ""}
        />
        {phone ? (
          <div className="absolute -bottom-10 right-5 w-[7.5rem] sm:right-7 sm:w-[9.5rem] md:-bottom-12 md:w-[10.5rem]">
            <PhoneFrame>
              <Image
                src={phone.image}
                alt={phone.alt}
                width={phone.width}
                height={phone.height}
                sizes="11rem"
                className="h-auto w-full"
              />
            </PhoneFrame>
          </div>
        ) : null}
      </div>
      <figcaption className={`mt-5 px-1 ${phone ? "pr-36 sm:pr-48" : ""}`}>
        <p className="text-[0.95rem] font-semibold text-forest">
          {site.name}
          <span className="font-normal text-forest-faint">, {site.city}</span>
        </p>
        <LiveSiteLink site={site} className="mt-1.5" />
      </figcaption>
    </figure>
  );
}
