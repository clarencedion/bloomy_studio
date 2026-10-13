import type { ReactNode } from "react";

import { BloomyPhoneShot, BloomyScrollShot } from "@/components/visuals/ProductShot";

/**
 * Le produit en grand, sous le titre : la page entière de bloomy.one qui
 * défile dans sa fenêtre au survol, et le téléphone à côté,
 * rogné par le bord bas du panneau menthe.
 *
 * Mobile (< 768 px) : seul le téléphone reste, plus lisible qu'une fenêtre
 * de navigateur réduite à 350 px ; il est rogné de la même façon.
 */
export function BloomyDuo({ caption, className = "" }: { caption: ReactNode; className?: string }) {
  return (
    <figure className={`group ${className}`}>
      <div className="leaf-lg relative overflow-hidden bg-mint px-5 pt-8 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
        <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="hidden md:col-span-8 md:block md:pb-12 lg:pb-16">
            <BloomyScrollShot eager sizes="(min-width: 1280px) 52rem, 64vw" />
          </div>
          <div className="relative h-[23rem] sm:h-[28rem] md:col-span-4 md:h-auto">
            <BloomyPhoneShot
              sizes="(min-width: 1024px) 17rem, (min-width: 768px) 14rem, 13rem"
              className="mx-auto w-[13rem] md:absolute md:inset-x-0 md:top-0 md:w-[14rem] lg:w-[16.5rem]"
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-5 px-1">{caption}</figcaption>
    </figure>
  );
}
