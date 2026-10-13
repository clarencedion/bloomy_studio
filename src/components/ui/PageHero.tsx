import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

type Tone = "paper" | "blush" | "mint";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  blush: "bg-blush",
  mint: "bg-mint",
};

type Props = {
  crumbs: { name: string; path: string }[];
  /** Libellé facultatif au-dessus du H1, avec les filets du logo. */
  eyebrow?: string;
  title: ReactNode;
  lede: ReactNode;
  /** Actions sous le chapô (boutons). */
  children?: ReactNode;
  /**
   * Composition pleine largeur sous le texte : une capture réelle, un
   * aperçu d'interface.
   */
  visual?: ReactNode;
  /** Composition à droite du texte en desktop (sous le texte en mobile). */
  aside?: ReactNode;
  /** Fond du bandeau d'en-tête. */
  tone?: Tone;
};

/**
 * En-tête des pages intérieures : fil d'Ariane, H1 aligné à gauche, chapô,
 * actions, et une composition facultative.
 *
 * Volontairement différent du hero d'accueil : pas de mur de travaux, pas
 * d'animation de titre. Une page intérieure répond vite à « suis-je au bon
 * endroit ? » puis laisse la place à son propre récit.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
  visual,
  aside,
  tone = "paper",
}: Props) {
  return (
    <section className={`relative ${tones[tone]}`}>
      <Container width="wide" className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <Breadcrumbs items={crumbs} />
        <div
          className={`mt-12 sm:mt-16 ${
            aside ? "grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10" : ""
          }`}
        >
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow ? (
              <Kicker ruled className="mb-7">
                {eyebrow}
              </Kicker>
            ) : null}
            <h1 className="text-display-xl">{title}</h1>
            <p className="lede prose-links mt-7 max-w-2xl">{lede}</p>
            {children ? <div className="mt-9">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
        {visual ? <Reveal className="relative mt-14 sm:mt-20">{visual}</Reveal> : null}
      </Container>
    </section>
  );
}
