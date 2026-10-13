import Image from "next/image";
import type { CSSProperties } from "react";

import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { siteHost, type ShowcaseSite } from "@/lib/portfolio";

/**
 * Le site livré, dans sa fenêtre, qui défile de haut en bas au survol (ou au
 * focus clavier) de la carte parente `.group`. Le visiteur parcourt la page
 * d'accueil entière du projet sans quitter la nôtre.
 *
 * Le décalage est calculé ici, côté serveur, depuis les dimensions réelles
 * de la capture longue : la fenêtre affiche un ratio 16/10, donc sa hauteur
 * vaut 10/16 de la largeur, et l'image doit remonter de tout ce qui dépasse.
 * La durée suit la longueur de la page pour garder une vitesse constante.
 *
 * Sans capture longue, ou avec `prefers-reduced-motion`, la capture reste
 * immobile.
 */
export function ScrollingCapture({
  site,
  sizes,
  eager = false,
  className = "",
}: {
  site: ShowcaseSite;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const shot = site.long ?? { image: site.image, width: site.width, height: site.height };
  const visibleRatio = (shot.width * 10) / 16 / shot.height;
  const shift = site.long ? -(1 - visibleRatio) * 100 : 0;
  const duration = Math.max(3, Math.min(9, (shot.height / shot.width) * 2.4));

  return (
    <BrowserFrame label={siteHost(site)} className={className}>
      <div
        className="capture-window"
        style={
          {
            "--capture-shift": `${shift.toFixed(2)}%`,
            "--capture-duration": `${duration.toFixed(1)}s`,
          } as CSSProperties
        }
      >
        <Image
          src={shot.image}
          alt={site.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </div>
    </BrowserFrame>
  );
}
