import Image from "next/image";

import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { ramonagePage } from "@/lib/ramonage";

const copy = ramonagePage.showcase;

/**
 * Vitrine de la page ramoneur : la capture réelle de RamoPlus, pas un
 * gabarit redessiné en HTML. Le mobile est ancré au bord droit du navigateur
 * — superposition, jamais d'appareil incliné ni flottant
 * (direction artistique §4.3).
 *
 * La légende s'en tient au vérifiable : nous l'avons conçu, il est en ligne.
 * Rien n'y présente RamoPlus comme un site client en production — il n'entre
 * d'ailleurs pas dans `lib/portfolio.ts`.
 */
export function RamonageSiteShowcase() {
  const host = copy.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <figure className="mx-auto max-w-5xl">
      <div className="rounded-sm border border-hairline bg-cream-deep p-4 sm:p-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:gap-0">
          <BrowserFrame
            label={`${host} — RamoPlus, ramonage certifié`}
            className="w-full min-w-0 lg:flex-1"
          >
            <Image
              src="/ramonage/ramoplus-accueil.webp"
              alt={copy.desktopAlt}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 44rem, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>

          <PhoneFrame className="relative z-10 w-36 shrink-0 sm:w-40 lg:-ml-24 lg:mb-6 lg:w-44">
            <Image
              src="/ramonage/ramoplus-accueil-mobile.webp"
              alt={copy.mobileAlt}
              width={780}
              height={1688}
              sizes="11rem"
              className="h-auto w-full"
            />
          </PhoneFrame>
        </div>
      </div>

      <figcaption className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="caption max-w-md">{copy.caption}</span>
        <span className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-sage-deep">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-deep" />
            {copy.liveLabel}
          </span>
          <a
            href={copy.liveUrl}
            target="_blank"
            rel="noopener"
            className="link-live text-[0.9rem] font-semibold text-rose"
          >
            {host}
            <span aria-hidden="true" className="link-live-arrow"> ↗</span>
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
