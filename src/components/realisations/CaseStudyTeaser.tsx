import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Renvoi vers une étude de cas, en bas de l'index des réalisations.
 *
 * Un panneau rose (la fleur du logo : le produit de l'équipe) qui annonce la
 * page qu'il ouvre : même capture, même cadre. La capture est ancrée au coin
 * du panneau et rognée par sa courbe, jamais posée dans le vide.
 *
 * Les trois premiers résultats sont repris tels quels de lib/case-studies.ts :
 * uniquement des faits vérifiables.
 */
export function CaseStudyTeaser({ cs }: { cs: CaseStudy }) {
  return (
    <article className="leaf-lg relative overflow-hidden bg-blush">
      <div className="grid lg:grid-cols-12 lg:items-center">
        <div className="px-6 pb-12 pt-11 sm:px-12 sm:pt-14 lg:col-span-5 lg:py-20 lg:pl-16 lg:pr-6">
          <Kicker ruled>Étude de cas</Kicker>
          <h2 className="text-display-lg mt-7">
            {cs.client}, de l&apos;idée à la production
          </h2>
          <p className="mt-5 max-w-[34rem] text-[1.04rem] leading-relaxed text-forest-soft">
            {cs.summary}
          </p>
          <ul className="mt-8 space-y-3">
            {cs.results.slice(0, 3).map((result) => (
              <li key={result} className="flex gap-3 text-[0.98rem] text-forest">
                <Check
                  aria-hidden="true"
                  weight="bold"
                  className="mt-[0.2rem] size-4 shrink-0 text-bloom-ink"
                />
                {result}
              </li>
            ))}
          </ul>
          <ButtonLink
            href={`/realisations/${cs.slug}`}
            variant="secondary"
            arrow
            className="mt-10"
          >
            Lire l&apos;étude de cas
          </ButtonLink>
        </div>

        {/* Ancrée au bord bas : le cadre descend sous le panneau, qui le rogne.
            Le tampon « Aperçu » du cadre reste toujours visible. */}
        <div className="px-6 sm:px-12 lg:col-span-7 lg:self-end lg:pl-4 lg:pr-14 lg:pt-16">
          <PanelFrame
            label={`${cs.client}, page comparatif`}
            className="translate-y-8 sm:translate-y-12"
          >
            <Image
              src="/produit/bloomy-produit.webp"
              alt="Page comparatif de bloomy.one : composition fleur par fleur, 0 % de commission, livraison locale et aperçu photo avant envoi."
              width={1600}
              height={900}
              sizes="(min-width: 1280px) 52rem, (min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full"
            />
          </PanelFrame>
        </div>
      </div>
    </article>
  );
}
