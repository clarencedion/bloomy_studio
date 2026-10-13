import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";

export type Feature = {
  /** Icône Phosphor (version `dist/ssr`), rendue décorative. */
  icon: ReactNode;
  title: string;
  body: ReactNode;
};

type Phone = {
  image: string;
  width: number;
  height: number;
  alt: string;
  /** Teinte du panneau qui porte le téléphone (la couleur du site montré). */
  tone: string;
  caption: ReactNode;
};

/**
 * Colonne gauche collante (titre, chapô, un téléphone posé sur le bord bas
 * d'un panneau), colonne droite qui défile : la liste de ce que le client
 * reçoit. Le téléphone reste en vue pendant la lecture, sans JavaScript.
 *
 * Mobile (< 1024 px) : tout s'empile. Le panneau du téléphone passe sous la
 * liste, plus bas, pour que le texte arrive d'abord.
 */
export function StickyFeatureSplit({
  title,
  lede,
  features,
  phone,
}: {
  title: ReactNode;
  lede?: ReactNode;
  features: Feature[];
  phone: Phone;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-display-lg">{title}</h2>
              {lede ? <p className="lede mt-5">{lede}</p> : null}
              <figure className="mt-10 hidden lg:block">
                <div
                  className="leaf relative h-[23rem] overflow-hidden px-10 pt-10"
                  style={{ backgroundColor: phone.tone }}
                >
                  <PhoneFrame className="mx-auto w-[14rem]">
                    <Image
                      src={phone.image}
                      alt={phone.alt}
                      width={phone.width}
                      height={phone.height}
                      sizes="14rem"
                      className="h-auto w-full"
                    />
                  </PhoneFrame>
                </div>
                <figcaption className="caption mt-3 px-1">{phone.caption}</figcaption>
              </figure>
            </div>
          </div>

          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:pt-3">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={(i % 2) * 80}>
                  <span
                    aria-hidden="true"
                    className="leaf-sm grid size-12 place-items-center bg-mint text-forest"
                  >
                    {f.icon}
                  </span>
                  <h3 className="text-display-sm mt-5">{f.title}</h3>
                  <p className="mt-2.5 text-[1.02rem] leading-relaxed text-forest-soft">{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Mobile et tablette : le téléphone vient après la liste. */}
          <figure className="lg:hidden">
            <div
              className="leaf relative h-[19rem] overflow-hidden px-6 pt-8 sm:h-[24rem]"
              style={{ backgroundColor: phone.tone }}
            >
              <PhoneFrame className="mx-auto w-[11.5rem] sm:w-[14rem]">
                <Image
                  src={phone.image}
                  alt={phone.alt}
                  width={phone.width}
                  height={phone.height}
                  sizes="14rem"
                  className="h-auto w-full"
                />
              </PhoneFrame>
            </div>
            <figcaption className="caption mt-3 px-1">{phone.caption}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
