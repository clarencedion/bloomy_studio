import Link from "next/link";

import { AdminDemo } from "@/components/home/AdminDemo";
import { CaseSpotlight } from "@/components/home/CaseSpotlight";
import { Frictions } from "@/components/home/Frictions";
import { Hero } from "@/components/home/Hero";
import { MethodSteps } from "@/components/home/MethodSteps";
import { NeedsGrid } from "@/components/home/NeedsGrid";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductLab } from "@/components/home/ProductLab";
import { ProofRow } from "@/components/home/ProofRow";
import { SectorGrid } from "@/components/home/SectorGrid";
import { StudioTeam } from "@/components/home/StudioTeam";
import { WorkShowcase } from "@/components/home/WorkShowcase";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bloomy Studio — Sites e-commerce & SEO local pour fleuristes",
  description:
    "Sites e-commerce, SEO local et outils sur mesure pour fleuristes, conçus par l'équipe de Bloomy pour une présence aussi soignée que votre boutique.",
  path: "/",
});

/**
 * Accueil.
 *
 * L'ordre des sections est une narration, pas un assemblage : voir
 * `docs/direction-artistique.md` §6. Chaque section sert au moins un verbe —
 * comprendre, désirer, être rassuré, voir une preuve, agir — et aucune ne
 * répète le bénéfice de la précédente.
 *
 * Les CTA sont volontairement rares : hero, après la méthode, bande finale.
 * Un bouton après chaque section détruirait sa propre crédibilité.
 */

const faq = [
  {
    question: "Combien coûte un site pour ma boutique ?",
    answer: (
      <p>
        Sur devis, après un échange sur vos besoins réels — détaillé ligne par
        ligne, sans option surprise. Commencez par{" "}
        <Link href="/audit">le diagnostic gratuit</Link>{" "}: il vous donne une base
        concrète pour décider, même si vous ne travaillez pas avec nous.
      </p>
    ),
  },
  {
    question: "Je me suis déjà fait avoir par un prestataire. Qu'est-ce qui change ?",
    answer: (
      <p>
        Vous restez propriétaire de votre site, de votre domaine et de vos
        contenus. Et <Link href="/methode">notre méthode</Link>{" "}est publique :
        vous savez à l&apos;avance ce qui se passe à chaque étape, avec des
        points de validation où c&apos;est vous qui décidez.
      </p>
    ),
  },
  {
    question: "J'ai déjà Instagram, à quoi sert un site ?",
    answer: (
      <p>
        Instagram touche ceux qui vous suivent déjà. Votre site et votre fiche
        Google captent ceux qui tapent « fleuriste + votre ville » au moment où
        ils veulent acheter — mariage, deuil, entreprises.
      </p>
    ),
  },
  {
    question: "Travaillez-vous uniquement avec des fleuristes ?",
    answer: (
      <p>
        C&apos;est notre cœur de métier. Nous accompagnons aussi des{" "}
        <Link href="/salons-de-coiffure">salons de coiffure</Link>{" "}et des
        fondateurs pour le{" "}
        <Link href="/developpement-mvp">développement de MVP</Link>.
      </p>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Le texte dit à qui l'on parle, la composition prouve qu'on sait faire. */}
      <Hero />

      {/* 2 — Montrer avant de raconter : trois sites livrés, trois univers. */}
      <section
        id="realisations"
        className="border-y border-hairline bg-cream-deep py-16 sm:py-24"
      >
        <Container width="wide">
          <SectionHead
            align="center"
            eyebrow="Nos réalisations"
            title="Quatre projets, quatre univers"
            lede="Aucun modèle décliné : chaque site part de l'activité, de ses matières et de sa façon de vendre."
          />
          <div className="mt-12">
            <WorkShowcase />
          </div>
        </Container>
      </section>

      {/* 3 — Répondre tout de suite à « vous faites quoi, exactement ? ». */}
      <ProductGrid />

      {/* 4 — Nommer le problème sans vendre dans la foulée. */}
      <Frictions />

      {/* 5 — À qui l'on s'adresse, le métier principal en tête. */}
      <SectorGrid />

      {/* 6 — L'offre fleuriste, organisée par objectif du client. */}
      <NeedsGrid />

      {/* 7 — Une transformation racontée, décision par décision. */}
      <CaseSpotlight />

      {/* 8 — « Je ne saurai pas m'en servir » : montrer l'endroit, pas une capture inventée. */}
      <AdminDemo />

      {/* 9 — Lever le risque, puis demander le diagnostic. */}
      <MethodSteps />

      {/* 10 — Notre propre produit : la preuve qu'on sait construire, pas seulement livrer. */}
      <ProductLab />

      {/* 11 — Les visages derrière le studio. Deux personnes, nommées. */}
      <StudioTeam />

      {/* 12 — Des faits, pas des témoignages : aucun n'est autorisé à ce jour. */}
      <ProofRow />

      {/* 11 — Les objections restantes, repliées. */}
      <section className="border-t border-hairline py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
          align="left"
            eyebrow="Vos questions"
            title="Ce qu'on nous demande"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
        </Container>
      </section>

      {/* 12 — Le seul endroit où l'on demande quelque chose. */}
      <CtaBand placement="home_footer" />
    </>
  );
}
