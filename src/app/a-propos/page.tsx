import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "À propos : l'équipe Bloomy derrière le studio, à Nantes",
  description:
    "Bloomy Studio, le studio digital de l'équipe derrière bloomy.one, plateforme florale nantaise : pourquoi les fleuristes, comment nous travaillons.",
  path: "/a-propos",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="À propos"
        title="Nous avons commencé par construire pour les fleuristes. Le studio en est la suite logique."
        lede={
          <>
            Bloomy Studio est le studio de création digitale de l&apos;équipe
            Bloomy, née à {site.city}. Avant d&apos;être un studio, nous sommes
            les constructeurs de{" "}
            <a href="https://bloomy.one">bloomy.one</a>{" "}— la plateforme qui
            permet de composer son bouquet fleur par fleur chez un artisan
            local, sans commission prélevée sur son travail.
          </>
        }
      />

      {/* Histoire */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="prose-links">
              <SectionHead
          align="left"
                eyebrow="L'histoire"
                title="Du comptoir des fleuristes au studio"
              />
              <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                <p>
                  Bloomy est parti d&apos;un constat simple : les plateformes de
                  transmission florale prélèvent des commissions importantes sur
                  le travail des artisans, standardisent leurs catalogues et
                  s&apos;interposent entre eux et leurs clients.{" "}
                  {site.founders[0].name} et {site.founders[1].name}{" "}
                  ont construit l&apos;inverse — une plateforme où le client compose
                  son bouquet fleur par fleur, où le prix est transparent, et où
                  l&apos;artisan ne reverse aucune commission.
                </p>
                <p>
                  Pour la construire, il a fallu passer des heures avec de vrais
                  fleuristes : comprendre les arrivages du matin, la variabilité
                  du stock, les créneaux de livraison, la Saint-Valentin qui se
                  joue en trois jours, le deuil qui exige de la délicatesse.
                  C&apos;est cette connaissance du métier — apprise en
                  production, pas dans une étude de marché — qui fonde le
                  studio.
                </p>
                <p>
                  Car en chemin, un deuxième constat s&apos;est imposé : la
                  plupart des fleuristes que nous rencontrions étaient aussi mal
                  servis par leur site web que par les plateformes. Devis
                  d&apos;agence disproportionnés, templates impersonnels,
                  prestataires disparus. Bloomy Studio existe pour cette raison
                  précise : offrir aux artisans une qualité d&apos;exécution
                  premium, au prix juste d&apos;une structure légère et
                  spécialisée.
                </p>
              </div>
            </div>

            {/* Équipe — sans photos tant qu'aucune vraie photo n'existe */}
            <div>
              {/* Pas de boîtes : deux noms posés sur un filet, comme un ours
                  de magazine. Tant qu'aucun portrait réel n'existe, la
                  typographie porte seule — une carte vide autour d'un nom
                  souligne surtout ce qui manque. */}
              <h2 className="plate-label">L&apos;équipe fondatrice</h2>
              <ul className="mt-6 border-t border-hairline">
                {site.founders.map((f) => (
                  <li key={f.name} className="border-b border-hairline py-5">
                    <p className="text-display-sm">{f.name}</p>
                    <p className="mt-1 text-[0.9rem] text-ink-soft">
                      {f.role} — Bloomy & Bloomy Studio
                    </p>
                  </li>
                ))}
              </ul>

              <h2 className="plate-label mt-12">Où nous trouver</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {site.city}, France — et partout où travaille un fleuriste : la
                méthode fonctionne aussi bien en boutique qu&apos;à distance.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="link-live mt-4 inline-block font-semibold text-rose"
              >
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Écosystème */}
      <div className="relative h-48 overflow-hidden sm:h-72">
        <Image
          src="/photos/atelier-matieres-wide.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container>
          <SectionHead
          align="split"
            eyebrow="L'écosystème"
            title="Deux activités, une même mission"
            lede="Rendre leur indépendance numérique aux artisans. La plateforme et le studio s'en occupent chacun à leur manière — et restent volontairement distincts."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-hairline bg-cream p-7">
              <h3 className="text-display-md">bloomy.one — la plateforme</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Composition de bouquet fleur par fleur, retrait en boutique ou
                livraison, prix transparent, 0 % de commission pour
                l&apos;artisan. Plus de 1 000 utilisateurs inscrits, à Nantes
                puis Paris, Bordeaux, Marseille et Toulouse.
              </p>
              <a
                href="https://bloomy.one"
                className="mt-4 inline-block font-semibold text-rose underline-offset-4 hover:underline"
              >
                Découvrir la plateforme →
              </a>
            </article>
            <article className="rounded-sm border border-hairline bg-cream p-7">
              <h3 className="text-display-md">Bloomy Studio — le studio</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Sites, e-commerce, SEO local et outils sur mesure pour
                fleuristes — et pour quelques métiers voisins qui partagent les
                mêmes exigences. Une précision importante : les fleuristes
                partenaires de la plateforme ne sont pas des clients du studio,
                et nous ne mélangeons jamais les deux.
              </p>
              <Link
                href="/fleuristes"
                className="mt-4 inline-block font-semibold text-rose underline-offset-4 hover:underline"
              >
                Les services du studio →
              </Link>
            </article>
          </div>
        </Container>
      </section>

      {/* Ce que ça change pour un client */}
      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
          align="left"
            eyebrow="Concrètement"
            title="Ce que cette double casquette change pour vous"
          />
          <ul className="mt-10 space-y-6">
            {[
              [
                "Nous testons sur nous-mêmes",
                "Les choix techniques que nous vous recommandons — vitesse, mobile, catalogue modifiable — sont ceux que nous opérons en production sur notre propre plateforme.",
              ],
              [
                "Nous connaissons vos chiffres",
                "Paniers moyens, saisonnalité, coût réel des commissions : nous parlons votre langue économique, pas seulement celle du design.",
              ],
              [
                "Nous resterons là",
                "Le studio n'est pas une activité opportuniste : il finance et nourrit la même mission que la plateforme. Votre prestataire ne disparaîtra pas à la première pivot de startup.",
              ],
            ].map(([t, b]) => (
              <li key={t} className="border-l-2 border-rose pl-5">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{b}</p>
              </li>
            ))}
          </ul>
          <p className="prose-links mt-10 text-sm text-ink-soft">
            Notre façon de travailler, étape par étape :{" "}
            <Link href="/methode">la méthode</Link>. Nos projets :{" "}
            <Link href="/realisations">les réalisations</Link>.
          </p>
        </Container>
      </section>

      <CtaBand placement="apropos_footer" />
    </>
  );
}
