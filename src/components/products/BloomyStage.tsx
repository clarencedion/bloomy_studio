import type { ReactNode } from "react";

import { BloomyAppShot, BloomyPhoneShot } from "@/components/visuals/ProductShot";

/**
 * Bloomy sur le web et sur téléphone, sur un même panneau : la preuve qu'une
 * seule base de code sert les deux. La fenêtre de navigateur sort par le bord
 * gauche du panneau, le téléphone par le bord bas : les deux sont rognés par
 * le panneau, jamais posés dans le vide ni inclinés.
 *
 * Mobile (< 640 px) : même composition, réduite ; le téléphone reste à
 * droite et ne masque que la marge de la capture.
 */
export function BloomyStage({
  caption,
  eager = false,
  className = "",
}: {
  caption: ReactNode;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="leaf-lg relative h-[21rem] overflow-hidden bg-blush sm:h-[30rem] lg:h-[33rem]">
        <BloomyAppShot
          eager={eager}
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 34rem, 20rem"
          className="absolute -left-10 top-12 w-[20rem] sm:-left-12 sm:top-16 sm:w-[34rem] lg:top-20 lg:w-[30rem]"
        />
        <BloomyPhoneShot
          sizes="(min-width: 640px) 15rem, 9.5rem"
          className="absolute right-5 top-7 w-[9.5rem] sm:right-10 sm:top-10 sm:w-[14rem] lg:w-[14.5rem]"
        />
      </div>
      <figcaption className="mt-5 px-1">{caption}</figcaption>
    </figure>
  );
}
