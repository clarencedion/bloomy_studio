import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { ramonagePage } from "@/lib/ramonage";

const copy = ramonagePage.showcase;

/** Adresse affichée du site, sans protocole ni barre finale. */
/**
 * RamoPlus vit sur une adresse de développement (pages.dev) : on n'écrit
 * jamais cette adresse à l'écran, seulement le nom du site.
 */
export const ramoplusHost = "RamoPlus";

/**
 * Vitrine de la page ramoneur : la capture réelle de RamoPlus, jamais un
 * gabarit redessiné en HTML. La fenêtre de navigateur monte du bord bas
 * d'un panneau « feuille » qui la rogne : l'appareil est ancré, pas flottant
 * (direction artistique § 4.4). Le mobile du même site est déjà dans le
 * hero ; ici, le bureau seul, en grand.
 *
 * Mobile (< 768 px) : même composition, marges réduites ; la légende passe
 * sur deux lignes, le lien sous le texte.
 *
 * La légende s'en tient au vérifiable : nous l'avons conçu, il est en ligne.
 * Rien n'y présente RamoPlus comme un site client en production, et il
 * n'entre pas dans `lib/portfolio.ts`.
 */
export function RamonageSiteShowcase() {
  return (
    <figure>
      <div className="leaf-lg overflow-hidden bg-mint px-4 pt-6 sm:px-10 sm:pt-12 lg:px-20 lg:pt-16">
        <BrowserFrame label={ramoplusHost} className="mx-auto -mb-10 max-w-5xl sm:-mb-16 lg:-mb-24">
          <Image
            src="/ramonage/ramoplus-accueil.webp"
            alt={copy.desktopAlt}
            width={1600}
            height={1000}
            sizes="(min-width: 1280px) 64rem, 92vw"
            className="h-auto w-full"
          />
        </BrowserFrame>
      </div>

      <figcaption className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[0.98rem] leading-relaxed text-forest-soft">{copy.caption}</span>
        <span className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="plate-label">{copy.liveLabel}</span>
          <a
            href={copy.liveUrl}
            target="_blank"
            rel="noopener"
            className="group link-live inline-flex min-h-11 items-center gap-1 text-[0.92rem] font-semibold text-bloom-ink"
          >
            {ramoplusHost}
            <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-3.5" />
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
