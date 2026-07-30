import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";
import { addOns, floristOffers, mvpOffer } from "@/lib/offers";

export const metadata = pageMetadata({
  title: "Services et offres : site, e-commerce, SEO local, MVP",
  description:
    "Les offres Bloomy Studio en détail : Essentiel, Boutique et Croissance pour fleuristes, MVP Sprint pour fondateurs, et services complémentaires. Devis transparents.",
  path: "/services",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Services & offres"
        title="Des offres lisibles, des devis qui détaillent tout"
        lede={
          <>
            Pas de grille cachée ni d&apos;options surprises : chaque offre
            précise pour qui elle est faite, ce qu&apos;elle inclut, ce
            qu&apos;elle exclut, et comment le projet se déroule. Les montants
            sont établis sur devis après{" "}
            <Link href="/audit">le diagnostic gratuit</Link>{" "}— parce
            qu&apos;un prix juste se calcule sur votre situation réelle.
          </>
        }
      />

      {/* Offres fleuristes */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Pour les fleuristes"
            title="Trois offres, selon d'où vous partez"
            lede={
              <>
                Le détail du métier derrière chaque offre se trouve sur les
                pages dédiées :{" "}
                <Link href="/fleuristes/site-internet">site</Link>,{" "}
                <Link href="/fleuristes/e-commerce">e-commerce</Link>,{" "}
                <Link href="/fleuristes/seo-local">SEO local</Link>{" "}et{" "}
                <Link href="/fleuristes/maintenance">maintenance</Link>.
              </>
            }
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {floristOffers.map((offer) => (
              <article
                key={offer.id}
                className={`flex flex-col rounded-sm border p-7 ${
                  offer.highlight
                    ? "border-rose bg-rose-veil/60"
                    : "border-hairline bg-paper"
                }`}
              >
                {offer.highlight && (
                  <p className="mb-3 w-fit rounded-sm bg-rose px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cream">
                    La plus demandée
                  </p>
                )}
                <h3 className="text-display-md">{offer.name}</h3>
                <p className="mt-2 text-sm font-medium text-rose">
                  {offer.audience}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {offer.summary}
                </p>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Inclus
                </h4>
                <ul className="mt-3 flex-1 space-y-2 text-sm">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 text-sage-deep">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Non inclus
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {offer.excludes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-hairline pt-4 text-sm">
                  <span className="text-lg font-semibold">
                    {offer.price ?? "Sur devis"}
                  </span>
                  <span className="mt-1 block text-ink-soft">{offer.process}</span>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Compléments */}
      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Compléments"
            title="À ajouter selon vos besoins"
            lede="Chaque complément se greffe sur une offre ou se prend séparément. Là aussi : devis détaillé, périmètre écrit."
          />
          <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((a) => (
              <div key={a.name} className="border-t border-hairline pt-4">
                <h3 className="font-semibold">{a.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Autres secteurs */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Autres métiers"
            title="Salons de coiffure et produits digitaux"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-hairline bg-sage-veil/50 p-7">
              <h3 className="text-display-md">Salons de coiffure</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Les offres Essentiel, Boutique et Croissance s&apos;adaptent au
                métier de la coiffure : réservation intégrée, menu de
                prestations, équipe, cartes cadeaux.
              </p>
              <Link
                href="/salons-de-coiffure"
                className="mt-5 inline-block font-semibold text-sage-deep underline-offset-4 hover:underline"
              >
                La page dédiée aux salons →
              </Link>
            </article>
            <article className="rounded-sm border border-hairline bg-rose-veil/50 p-7">
              <h3 className="text-display-md">{mvpOffer.name}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{mvpOffer.summary}</p>
              <p className="mt-3 text-sm text-ink-soft">
                <span className="font-semibold text-ink">
                  {mvpOffer.price ?? "Sur devis"}
                </span>{" "}
                · {mvpOffer.process}
              </p>
              <Link
                href="/developpement-mvp"
                className="mt-5 inline-block font-semibold text-rose underline-offset-4 hover:underline"
              >
                Le développement MVP en détail →
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <CtaBand
        placement="services_footer"
        title="Le bon point de départ : savoir où vous en êtes"
        lede="Le diagnostic gratuit précède tout devis. Il vous situe honnêtement — et vous choisissez ensuite, sans pression."
      />
    </>
  );
}
