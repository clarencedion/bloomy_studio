import Link from "next/link";

import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Founders } from "@/components/home/Founders";
import { HomeHero } from "@/components/home/HomeHero";
import { Manifesto } from "@/components/home/Manifesto";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { OfferStack } from "@/components/home/OfferStack";
import { ProductProof } from "@/components/home/ProductProof";
import { Sectors } from "@/components/home/Sectors";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { homeFaq } from "@/lib/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Agence de développement web à Nantes : sites, e-commerce, MVP",
  description:
    "Sites vitrines, e-commerce, MVP et micro SaaS conçus et développés sur mesure à Nantes par Bloomy Studio, un studio de deux personnes. Sur devis.",
  path: "/",
});

/**
 * Accueil : la vitrine de ce que le studio sait faire.
 *
 * Dix sections, dix familles de mise en page, une idée chacune (voir
 * `docs/direction-artistique.md` § 7) :
 *
 *  1. Hero, texte à gauche, mur de travaux à droite      (split + défilement)
 *  2. Le travail, d'abord                                 (grille à échelles variables)
 *  3. Ce que nous construisons                            (cartes collantes empilées)
 *  4. Pour quels métiers                                  (accordéon de bandes)
 *  5. Manifeste                                           (énoncé pleine largeur)
 *  6. Méthode                                             (frise horizontale)
 *  7. Bloomy, notre produit                               (panneau qui déborde)
 *  8. L'équipe                                            (duo centré)
 *  9. Questions                                           (titre collant + accordéon)
 * 10. Bande finale                                        (aplat vert)
 *
 * Deux libellés à filets seulement (hero, produit) : la plupart des
 * sections n'en ont pas besoin, leur titre suffit.
 */

/** Quatre questions, pas plus. Chaque réponse reprend un engagement publié. */
const faq: FaqItem[] = [
  {
    question: "Combien coûte un projet ?",
    answer: (
      <p>
        Sur devis, après un échange sur vos besoins réels : chaque ligne est
        détaillée, sans option surprise. Pour un commerce, le{" "}
        <Link href="/audit">diagnostic gratuit</Link>{" "}est un bon point de
        départ. Pour un produit, <Link href="/contact">décrivez-nous votre projet</Link>.
      </p>
    ),
  },
  {
    question: "À qui appartiennent le site et le code ?",
    answer: (
      <p>
        À vous. Nom de domaine, contenus, code et accès sont à votre nom dès le
        premier jour. Si nous cessons de travailler ensemble, vous partez avec
        l&apos;intégralité : c&apos;est écrit dans nos devis.
      </p>
    ),
  },
  {
    question: "Combien de temps faut-il ?",
    answer: (
      <p>
        Environ quatre semaines pour un site vitrine, six à huit pour une
        boutique en ligne selon la taille du catalogue, six à dix pour un MVP
        selon le périmètre. Chaque étape est détaillée sur{" "}
        <Link href="/methode">notre méthode</Link>.
      </p>
    ),
  },
  {
    question: "Travaillez-vous uniquement avec des fleuristes ?",
    answer: (
      <p>
        Non. C&apos;est le métier que nous connaissons le mieux, puisque nous
        construisons aussi Bloomy avec des fleuristes. Nous livrons aussi pour
        des <Link href="/salons-de-coiffure">salons de coiffure</Link>, des
        artisans, des lieux et des fondateurs : voyez{" "}
        <Link href="/realisations">les réalisations</Link>.
      </p>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedWork />
      <OfferStack />
      <Sectors />
      <Manifesto />
      <MethodTimeline />
      <ProductProof />
      <Founders />

      <section className="border-t border-line py-24 sm:py-32">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-display-xl lg:sticky lg:top-28">{homeFaq.title}</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqAccordion items={faq} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand placement="home_footer" />
    </>
  );
}
