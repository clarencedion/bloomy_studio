import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EditorialList } from "@/components/ui/EditorialList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";
import { addOns, floristOffers, mvpOffer } from "@/lib/offers";

export const metadata = pageMetadata({
  title: "Services et offres : site, e-commerce, SEO local, MVP",
  description:
    "Les offres Bloomy Studio : Essentiel, Boutique et Croissance pour fleuristes, MVP Sprint pour fondateurs, et les services complémentaires en détail.",
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
          {/*
            Trois offres, trois lignes pleine largeur — et non trois cartes
            identiques côte à côte. Une fiche technique dense répétée trois fois
            se lit comme un tableau comparatif de fournisseur d'accès : on ne
            retient rien. Ici, le nom et le prix tiennent une colonne étroite,
            le contenu s'étale à droite, et l'offre mise en avant se signale par
            un simple filet bourgogne plutôt qu'un aplat rose.
          */}
          <div className="mt-14 border-t border-hairline">
            {floristOffers.map((offer) => (
              <article
                key={offer.id}
                className={`grid gap-x-12 gap-y-7 border-b border-hairline py-10 sm:py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] ${
                  offer.highlight ? "border-l-2 border-l-rose pl-6 sm:pl-8" : ""
                }`}
              >
                <div>
                  {offer.highlight ? (
                    <p className="plate-label text-rose">La plus demandée</p>
                  ) : null}
                  <h3 className={`text-display-lg ${offer.highlight ? "mt-2" : ""}`}>
                    {offer.name}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
                    {offer.audience}
                  </p>
                  <p className="text-display-sm mt-8 text-rose">
                    {offer.price ?? "Sur devis"}
                  </p>
                  <p className="caption mt-1.5">{offer.process}</p>
                </div>

                <div>
                  <p className="lede max-w-xl">{offer.summary}</p>
                  <div className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    <div>
                      <h4 className="plate-label">Inclus</h4>
                      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                        {offer.includes.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-0.5 text-sage-deep">
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="plate-label">Non inclus</h4>
                      <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-soft">
                        {offer.excludes.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-0.5">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Compléments */}
      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container>
          <SectionHead
          align="split"
            eyebrow="Compléments"
            title="À ajouter selon vos besoins"
            lede="Chaque complément se greffe sur une offre ou se prend séparément. Là aussi : devis détaillé, périmètre écrit."
          />
          <EditorialList
            className="mt-10"
            dense
            items={addOns.map((a) => ({ title: a.name, body: a.description }))}
          />
        </Container>
      </section>

      {/* Autres secteurs */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
          align="left"
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
