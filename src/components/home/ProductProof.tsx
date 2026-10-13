import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import { homeProduct } from "@/lib/home";

/**
 * Bloomy, notre produit : la preuve que le studio construit du logiciel, et
 * pas seulement des pages. Tout ce qui est affirmé est vérifiable sur
 * bloomy.one et repris de l'étude de cas publiée.
 *
 * Le panneau menthe déborde du bord droit de l'écran : le produit continue
 * au-delà du cadre. La capture est ancrée au coin haut gauche du panneau et
 * rognée par ses bords, jamais posée dans le vide. `PanelFrame` l'estampille
 * « Aperçu » : c'est notre produit, pas une capture client.
 *
 * Mobile : texte, puis le panneau qui déborde à droite de la même façon.
 */

/** Ce qui sépare la colonne du bord de l'écran : gouttière + marge du conteneur large. */
const BLEED = "calc((100vw - min(100vw, 88rem)) / 2 + 2.5rem)";

export function ProductProof() {
  const shot = homeProduct.shot;

  return (
    <section className="overflow-x-clip py-24 sm:py-32">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Kicker ruled>{homeProduct.kicker}</Kicker>
            <h2 className="text-display-xl mt-7">{homeProduct.title}</h2>
            <p className="lede mt-6">{homeProduct.body}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:gap-10">
              {homeProduct.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="text-[0.92rem] leading-snug text-forest-soft">{fact.label}</dt>
                  <dd className="text-display-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link href={homeProduct.caseHref} className={buttonClass("secondary")}>
                {homeProduct.caseLabel}
                <ButtonArrow />
              </Link>
              <a
                href={homeProduct.liveHref}
                target="_blank"
                rel="noopener"
                className="group link-live inline-flex min-h-11 items-center gap-1 self-start text-[0.95rem] font-semibold text-bloom-ink sm:self-auto"
              >
                {homeProduct.liveLabel}
                <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-4" />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </div>

          <div className="relative -mr-5 sm:-mr-8 lg:col-span-7 lg:mr-0">
            <div
              className="leaf-lg relative h-[20rem] overflow-hidden bg-mint sm:h-[28rem] lg:h-[36rem] lg:w-[calc(100%+var(--bleed))]"
              style={{ "--bleed": BLEED } as React.CSSProperties}
            >
              <PanelFrame
                label="Bloomy"
                className="absolute left-6 top-6 w-[36rem] sm:left-10 sm:top-10 sm:w-[46rem] lg:left-14 lg:top-14 lg:w-[56rem]"
              >
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 56rem, (min-width: 640px) 46rem, 36rem"
                  className="h-auto w-full"
                />
              </PanelFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
