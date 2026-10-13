import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";

export type SectorLink = {
  name: string;
  hint: string;
  href: string;
  phone: { image: string; width: number; height: number; alt: string };
};

/**
 * Les déclinaisons métier d'une page produit générique, sur un panneau
 * `forest` à coins feuille : la seule « histoire de couleur » de la page,
 * un panneau dans une section claire et non une bande sombre.
 *
 * À gauche, les métiers en liens pleine largeur ; à droite, un téléphone par
 * métier, posés sur le bord bas du panneau en escalier (jamais inclinés,
 * jamais flottants). Le texte suit le même ordre que les téléphones et la
 * légende dit ce que chacun montre.
 *
 * Mobile (< 1024 px) : la liste d'abord, puis les trois téléphones côte à
 * côte, rognés par le bas du panneau.
 */
export function SectorPanel({
  kicker,
  title,
  lede,
  sectors,
  caption,
  footnote,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  sectors: SectorLink[];
  caption: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container width="wide">
        <div className="on-forest leaf-lg relative overflow-hidden bg-forest">
          <div className="grid lg:grid-cols-12">
            <div className="px-6 pb-10 pt-12 sm:px-12 sm:pt-16 lg:col-span-6 lg:pb-16 lg:pl-14 lg:pr-6 lg:pt-20">
              {kicker ? (
                <Kicker ruled className="mb-7">
                  {kicker}
                </Kicker>
              ) : null}
              <h2 className="text-display-lg text-paper">{title}</h2>
              {lede ? <p className="lede mt-5">{lede}</p> : null}

              <ul className="mt-10 border-t border-line-dark">
                {sectors.map((s) => (
                  <li key={s.href} className="border-b border-line-dark">
                    <Link href={s.href} className="group flex items-start justify-between gap-6 py-6">
                      <span>
                        <span className="text-display-md block text-paper transition-colors group-hover:text-bloom-light">
                          {s.name}
                        </span>
                        <span className="mt-2 block max-w-md text-[0.98rem] leading-relaxed text-leaf">
                          {s.hint}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line-dark text-paper transition-colors group-hover:border-bloom-light group-hover:bg-bloom-light group-hover:text-forest-deep"
                      >
                        <ArrowRight weight="bold" className="arrow-nudge size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {footnote ? (
                <p className="prose-links mt-7 max-w-lg text-[0.95rem] leading-relaxed text-paper/80">
                  {footnote}
                </p>
              ) : null}
              <p className="caption mt-8 max-w-lg">{caption}</p>
            </div>

            {/* Les téléphones reposent sur le bord bas du panneau, qui les rogne. */}
            <div className="relative flex h-[16rem] items-end justify-center gap-3 overflow-hidden px-5 sm:h-[24rem] sm:gap-6 sm:px-12 lg:col-span-6 lg:h-auto lg:gap-6 lg:px-10">
              {sectors.map((s, i) => (
                <PhoneFrame
                  key={s.href}
                  className={`w-[31%] max-w-[14.5rem] shrink-0 ${
                    i === 0
                      ? "-mb-24 sm:-mb-40 lg:-mb-28"
                      : i === 1
                        ? "-mb-12 sm:-mb-24 lg:-mb-6"
                        : "-mb-32 sm:-mb-52 lg:-mb-44"
                  }`}
                >
                  <Image
                    src={s.phone.image}
                    alt={s.phone.alt}
                    width={s.phone.width}
                    height={s.phone.height}
                    sizes="(min-width: 1024px) 14.5rem, 31vw"
                    className="h-auto w-full"
                  />
                </PhoneFrame>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
