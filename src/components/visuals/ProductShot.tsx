import Image from "next/image";

/**
 * Captures réelles du produit de l'équipe (bloomy.one).
 *
 * Elles remplacent les aperçus qui étaient auparavant redessinés en HTML/CSS
 * (`BloomyComposer`, `AdminPreview`). Une interface redessinée à la main est
 * une illustration, pas une preuve : elle ne montre ni les vraies photos de
 * fleurs, ni les vrais prix, ni le vrai rendu — et elle se reconnaît
 * immédiatement comme un décor. Le produit existe et il est public : on le
 * montre tel qu'il est.
 *
 * Le fichier est détouré (fond transparent) : il se pose aussi bien sur
 * l'ivoire que sur une bande prune, sans cadre d'appareil supplémentaire —
 * le téléphone fait déjà partie de l'image.
 */
export function BloomyAppShot({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/produit/composer-app.webp"
      alt="L'application Bloomy : composition d'un bouquet tige par tige, avec le prix estimé en direct."
      width={900}
      height={1187}
      sizes="(min-width: 1024px) 22rem, 60vw"
      className={`h-auto w-full ${className}`}
    />
  );
}
