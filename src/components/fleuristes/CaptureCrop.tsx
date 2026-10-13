import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Un détail d'une capture réelle, recadré sans retoucher le fichier : la
 * fenêtre prend le ratio du recadrage, l'image est agrandie puis décalée.
 *
 * Les pourcentages se calculent en coordonnées du fichier source :
 *   largeur = largeur source / largeur recadrée
 *   left    = -x / largeur recadrée   (relatif à la largeur de la fenêtre)
 *   top     = -y / hauteur recadrée   (relatif à la hauteur de la fenêtre)
 *
 * C'est la capture du site livré, pas une interface redessinée en HTML.
 */
export type Crop = { x: number; y: number; w: number; h: number };

export function CaptureCrop({
  src,
  width,
  height,
  crop,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  width: number;
  height: number;
  crop: Crop;
  alt: string;
  /** Taille rendue de l'image entière (pas de la fenêtre) : agrandie de largeur / crop.w. */
  sizes: string;
  className?: string;
}) {
  const style: CSSProperties = {
    width: `${((width / crop.w) * 100).toFixed(3)}%`,
    left: `${(-(crop.x / crop.w) * 100).toFixed(3)}%`,
    top: `${(-(crop.y / crop.h) * 100).toFixed(3)}%`,
  };
  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="absolute h-auto max-w-none"
        style={style}
      />
    </div>
  );
}
