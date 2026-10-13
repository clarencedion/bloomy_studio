import Image from "next/image";
import type { CSSProperties } from "react";

import { BrowserFrame, PanelFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";

/**
 * Captures réelles du produit de l'équipe (bloomy.one), prises sur le site en
 * ligne le 2026-10-02 aux mêmes formats que les réalisations
 * (`scripts/capture-realisations.mjs`) : desktop 1600 × 1000, mobile
 * 390 × 844 en densité 2, et page entière réduite à 960 px.
 *
 * Elles remplacent l'ancienne capture du comparatif, une section qui n'existe
 * plus sur bloomy.one. Une interface reconstituée à la main serait une
 * illustration, pas une preuve : on montre donc le produit tel qu'il est en
 * production, traité exactement comme les captures de sites clients (cadre de
 * navigateur ou de téléphone, jamais incliné).
 *
 * Pas de <figure> ici : les pages appelantes en posent une avec leur propre
 * légende, et imbriquer deux <figure> produit une structure douteuse.
 */

const shots = {
  desktop: {
    src: "/produit/bloomy-accueil.webp",
    width: 1600,
    height: 1000,
    alt: "Page d'accueil de bloomy.one : recherche d'artisans fleuristes par adresse, retrait en boutique ou livraison par l'artisan.",
  },
  mobile: {
    src: "/produit/bloomy-accueil-mobile.webp",
    width: 780,
    height: 1688,
    alt: "bloomy.one sur téléphone : recherche par adresse et services des artisans fleuristes.",
  },
  comparatif: {
    src: "/produit/bloomy-produit.webp",
    width: 1600,
    height: 900,
    alt: "Page comparatif de bloomy.one : composition fleur par fleur, 0 % de commission pour l'artisan, livraison locale et aperçu photo avant envoi.",
  },
  long: {
    src: "/produit/bloomy-long.webp",
    width: 960,
    height: 3000,
    alt: "Page d'accueil complète de bloomy.one : recherche, réseau de boutiques, quatre façons de commander, questions fréquentes.",
  },
} as const;

type ShotProps = {
  className?: string;
  /** Next 16 : remplace `priority`. Uniquement pour l'image LCP de la page. */
  eager?: boolean;
  sizes?: string;
};

/** La page d'accueil de bloomy.one, dans une fenêtre de navigateur. */
export function BloomyAppShot({
  className = "",
  eager = false,
  sizes = "(min-width: 1024px) 34rem, 100vw",
}: ShotProps) {
  const s = shots.desktop;
  return (
    <div className={className}>
      <BrowserFrame label="bloomy.one">
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="h-auto w-full"
        />
      </BrowserFrame>
    </div>
  );
}

/**
 * La page entière de bloomy.one, qui défile dans sa fenêtre au survol ou au
 * focus de la carte parente `.group` (même mécanique que `ScrollingCapture`).
 * Le décalage est calculé depuis les dimensions réelles du fichier : la
 * fenêtre affiche un ratio 16/10, l'image remonte de tout ce qui dépasse.
 */
export function BloomyScrollShot({
  className = "",
  eager = false,
  sizes = "(min-width: 1280px) 64rem, 100vw",
}: ShotProps) {
  const s = shots.long;
  const visibleRatio = (s.width * 10) / 16 / s.height;
  const shift = -(1 - visibleRatio) * 100;
  const duration = Math.max(3, Math.min(9, (s.height / s.width) * 2.4));
  return (
    <BrowserFrame label="bloomy.one" className={className}>
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
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </div>
    </BrowserFrame>
  );
}

/** bloomy.one sur téléphone : la même base, composée pour le mobile. */
export function BloomyPhoneShot({
  className = "",
  eager = false,
  sizes = "(min-width: 1024px) 18rem, 60vw",
}: ShotProps) {
  const s = shots.mobile;
  return (
    <PhoneFrame className={className}>
      <Image
        src={s.src}
        alt={s.alt}
        width={s.width}
        height={s.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-auto w-full"
      />
    </PhoneFrame>
  );
}

/**
 * La page comparatif de bloomy.one, dans un panneau d'application estampillé
 * « Aperçu » : c'est notre produit, jamais une capture client.
 */
export function BloomyComparatifShot({
  className = "",
  eager = false,
  sizes = "(min-width: 1024px) 40rem, 100vw",
  label = "Bloomy, page comparatif",
}: ShotProps & { label?: string }) {
  const s = shots.comparatif;
  return (
    <PanelFrame label={label} className={className}>
      <Image
        src={s.src}
        alt={s.alt}
        width={s.width}
        height={s.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-auto w-full"
      />
    </PanelFrame>
  );
}
