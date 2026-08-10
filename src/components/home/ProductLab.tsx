import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BloomyAppShot } from "@/components/visuals/ProductShot";

/**
 * Applications & MVP — section 9 de la direction artistique.
 *
 * Elle arrive tard, et c'est voulu : la capacité technique est une preuve de
 * profondeur, pas le message principal. Le fleuriste doit d'abord reconnaître
 * un studio qui comprend son métier.
 *
 * Tout ce qui est affirmé ici est vérifiable sur bloomy.one — c'est notre
 * propre produit, pas une référence empruntée.
 */

const figures: [string, string][] = [
  ["1 000+", "utilisateurs inscrits"],
  ["0 %", "de commission sur les artisans"],
  ["4", "villes en extension après Nantes"],
];

export function ProductLab() {
  return (
    <section className="on-ink bg-plum py-16 text-cream sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Eyebrow>Applications & produits</Eyebrow>
            <h2 className="text-display-lg mt-6">
              Nous ne faisons pas que des sites. Nous construisons des produits.
            </h2>
            <p className="mt-5 leading-relaxed text-cream/75">
              Bloomy est notre plateforme : on y compose son bouquet fleur par
              fleur chez un artisan, on choisit le retrait ou la livraison, et le
              fleuriste pilote son catalogue depuis son tableau de bord.
              Développée en Flutter sur Firebase, en production.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {figures.map(([figure, label]) => (
                <div key={label}>
                  <dt className="text-display-md text-cream">{figure}</dt>
                  <dd className="mt-1 text-[0.8rem] leading-snug text-cream/65">{label}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/developpement-mvp"
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-cream px-7 py-3 font-semibold text-plum transition-colors hover:bg-rose hover:text-cream"
            >
              Développer un produit avec nous
            </Link>
          </div>

          <figure className="mx-auto w-full max-w-[20rem]">
            <BloomyAppShot />
            <figcaption className="caption mt-4 text-center">
              L&apos;application Bloomy, en production sur iOS et Android
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
