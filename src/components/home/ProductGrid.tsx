import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { products, tintClass } from "@/lib/products";

/**
 * Les trois façons de travailler avec le studio.
 *
 * Elle arrive tôt : le visiteur qui n'est pas fleuriste doit comprendre en un
 * écran qu'il y a une porte pour lui. Avant, la capacité produit n'apparaissait
 * qu'en neuvième section — trop tard pour un fondateur venu pour un MVP.
 *
 * Chaque carte porte une teinte de matière différente. C'est la seule couleur
 * de fond du site : elle distingue trois offres sans ajouter trois libellés,
 * et elle règle le défaut « tout est beige » sans toucher à la couleur
 * d'action, qui reste le bourgogne et lui seul.
 */
export function ProductGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container width="wide">
        <SectionHead
          align="split"
          eyebrow="Ce que nous faisons"
          title="Trois façons de travailler ensemble"
          lede="Un site à livrer, un produit à prouver, ou un logiciel déjà construit auquel vous vous abonnez."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={Math.min(i, 2) * 70} className="h-full">
                <Link
                  href={p.href}
                  className={`lift group flex h-full flex-col rounded-sm border border-hairline p-7 ${tintClass[p.tint]}`}
                >
                  <p className="plate-label">{p.name}</p>
                  <h3 className="text-display-md mt-4 transition-colors group-hover:text-rose">
                    {p.promise}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                  <p className="mt-5 border-t border-ink/10 pt-4 text-[0.85rem] text-ink-soft">
                    {p.detail}
                  </p>
                  <span className="plate-label mt-6 inline-flex items-center gap-1.5 text-rose">
                    {p.cta}
                    <span aria-hidden="true" className="link-live-arrow">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
