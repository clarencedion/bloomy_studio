import Image from "next/image";

/**
 * Le logo Bloomy Digital Studio, vectorisé depuis le fichier fourni par
 * l'équipe (source : `assets/brand/bloomy-logo-source.png`).
 *
 * - `wordmark` : tulipe + « Bloomy », pour la barre de navigation, où la
 *   ligne « DIGITAL STUDIO » deviendrait illisible.
 * - `lockup` : le logo complet, pour le pied de page et les grands formats.
 * - `mark` : le monogramme B + tulipe (favicon, signature).
 *
 * Les SVG sont servis comme fichiers statiques : mis en cache une fois, ils
 * n'alourdissent pas le HTML de chaque page.
 */

const variants = {
  wordmark: { src: "/brand/bloomy-wordmark.svg", width: 4884, height: 1596 },
  lockup: { src: "/brand/bloomy-logo.svg", width: 4884, height: 1794 },
  "lockup-dark": { src: "/brand/bloomy-logo-on-dark.svg", width: 4884, height: 1794 },
  mark: { src: "/brand/bloomy-mark.svg", width: 1386, height: 1437 },
} as const;

export type LogoVariant = keyof typeof variants;

export function Logo({
  variant = "wordmark",
  height,
  className = "",
  alt = "Bloomy Digital Studio",
  eager = false,
}: {
  variant?: LogoVariant;
  /** Hauteur affichée en pixels ; la largeur suit le ratio du fichier. */
  height: number;
  className?: string;
  alt?: string;
  eager?: boolean;
}) {
  const v = variants[variant];
  const width = Math.round((v.width / v.height) * height);
  return (
    <Image
      src={v.src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
