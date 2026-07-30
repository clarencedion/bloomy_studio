import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
  /**
   * Composition visuelle sous le texte : une capture réelle, un aperçu
   * d'interface. C'est ce qui remplace le rameau décoratif — sur une page de
   * décision, l'espace se donne au travail livré, pas à un ornement.
   */
  visual?: ReactNode;
};

/**
 * En-tête des pages intérieures : fil d'Ariane, pastille, H1, chapô, et une
 * composition facultative.
 *
 * Pas d'illustration botanique en marge : la direction artistique révisée les
 * proscrit explicitement. Une page qui n'a rien de réel à montrer se contente
 * du texte — c'est plus honnête qu'un décor.
 */
export function PageHero({ crumbs, eyebrow, title, lede, children, visual }: Props) {
  return (
    <section className="border-b border-hairline">
      <Container width={visual ? "wide" : "default"} className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-display-xl mt-6">{title}</h1>
          <p className="prose-links mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {lede}
          </p>
          {children}
        </div>
        {visual ? <div className="fade-up-late mt-12">{visual}</div> : null}
      </Container>
    </section>
  );
}
