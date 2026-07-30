import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Au-delà des fleuristes — section 8 de la direction artistique.
 *
 * Deux lignes, pas une de plus : la page reste celle des fleuristes. Elle
 * signale simplement que le studio ne s'arrête pas là, pour le visiteur qui
 * n'est pas fleuriste et qui doit trouver sa porte sans chercher.
 */

const sectors: { title: string; body: string; href: string; cta: string }[] = [
  {
    title: "Commerces et métiers visuels",
    body: "Salons, ateliers, artisans : le même travail d'image et de conversion, avec le vocabulaire de votre métier.",
    href: "/salons-de-coiffure",
    cta: "Salons de coiffure",
  },
  {
    title: "Produits numériques",
    body: "Une application, un outil interne, une place de marché : nous construisons aussi ce qui n'existe pas encore.",
    href: "/developpement-mvp",
    cta: "Développement & MVP",
  },
];

export function AdjacentSectors() {
  return (
    <section className="border-t border-hairline py-16 sm:py-20">
      <Container>
        <Eyebrow>Autres métiers</Eyebrow>
        <ul className="mt-8 border-t border-hairline">
          {sectors.map((s) => (
            <li key={s.href} className="border-b border-hairline">
              <Link
                href={s.href}
                className="group grid gap-3 py-6 transition-colors sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] sm:items-baseline sm:gap-8"
              >
                <h2 className="text-display-sm transition-colors group-hover:text-rose">
                  {s.title}
                </h2>
                <p className="leading-relaxed text-ink-soft">{s.body}</p>
                <span className="plate-label whitespace-nowrap text-rose">
                  {s.cta} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
