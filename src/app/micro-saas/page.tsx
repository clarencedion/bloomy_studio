import Link from "next/link";

import { BloomyDuo } from "@/components/products/BloomyDuo";
import { ProductLiveLink } from "@/components/products/ProductLiveLink";
import { ProductSpec } from "@/components/products/ProductSpec";
import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { CtaLink } from "@/components/ui/CtaLink";
import { EditorialList } from "@/components/ui/EditorialList";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BloomyComparatifShot } from "@/components/visuals/ProductShot";
import { pageMetadata } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Micro SaaS : nos propres logiciels, proposés en abonnement",
  description:
    "Bloomy Studio construit et exploite ses propres logiciels. Le premier, Bloomy, est en production : un outil qui tourne déjà, pas un projet à financer.",
  path: "/micro-saas",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Micro SaaS", path: "/micro-saas" },
];

/**
 * Micro SaaS : la troisième façon de travailler avec le studio.
 *
 * Honnêteté d'inventaire : **un seul** produit est en production aujourd'hui,
 * bloomy.one. La page ne parle donc jamais d'un « catalogue » ni d'une
 * « suite » : elle montre le produit qui existe, dit franchement ce qui
 * n'existe pas encore (le panneau forest), puis explique le modèle. Aucun
 * autre nom de produit, aucun chiffre absent de `lib/case-studies.ts`.
 *
 * Récit : le produit en grand (hero), sa fiche, l'aveu d'inventaire, le
 * modèle, les questions. Cinq familles de mise en page, aucune répétée.
 */

const specRows = [
  {
    term: "Pour qui",
    detail:
      "Les fleuristes indépendants, et leurs clients qui veulent composer un bouquet comme au comptoir.",
  },
  {
    term: "Ce qui change",
    detail: "0 % de commission prélevée sur les artisans partenaires.",
  },
  {
    term: "Au quotidien",
    detail: "Click-and-collect et livraison le jour même, opérationnels.",
  },
  {
    term: "Construit avec",
    detail: "Flutter et Firebase, par l'équipe du studio, qui l'exploite depuis 2024.",
  },
  {
    term: "Utilisateurs",
    detail: "Plus de 1 000 inscrits.",
  },
];

const modele = [
  {
    title: "Vous vous abonnez, vous ne financez pas",
    body: "Un développement sur mesure se paie une fois, cher, et vieillit à vos frais. Un produit que nous exploitons déjà se paie au mois : le coût d'entrée est faible, et les évolutions profitent à tous en même temps.",
  },
  {
    title: "Nous le faisons tourner, pas seulement livrer",
    body: "Hébergement, sécurité, mises à jour, corrections : c'est notre produit, donc c'est notre travail. Vous n'avez pas de prestataire à relancer.",
  },
  {
    title: "Ce que nous apprenons revient dans nos prestations",
    body: "Exploiter un produit face à de vrais utilisateurs nous apprend ce qu'aucune mission ne nous apprendrait : les paiements, les commandes, les pics de saison. C'est ce qui nourrit les sites que nous livrons.",
  },
];

const faq = [
  {
    question: "Quelle différence avec l'offre MVP ?",
    answer: (
      <p>
        Le <Link href="/developpement-mvp">MVP</Link>{" "}est une prestation :
        vous êtes propriétaire du produit et nous le construisons pour vous. Le
        micro SaaS est l&apos;inverse : le produit est le nôtre, vous
        l&apos;utilisez en abonnement. L&apos;un s&apos;adresse à un fondateur,
        l&apos;autre à un commerçant qui veut l&apos;outil sans le projet.
      </p>
    ),
  },
  {
    question: "Je suis fleuriste : Bloomy remplace‑t‑il mon site ?",
    answer: (
      <p>
        Non. Sur Bloomy, vos clients vous trouvent parmi d&apos;autres artisans
        de leur ville ; votre site reste votre adresse à vous, à votre nom. Les
        deux se complètent, et nous avons détaillé le choix dans{" "}
        <Link href="/blog/marketplace-ou-site-en-propre">
          marketplace ou site en propre
        </Link>
        . Pour votre site, voyez{" "}
        <Link href="/fleuristes">notre page dédiée aux fleuristes</Link>.
      </p>
    ),
  },
  {
    question: "Et si j'ai besoin d'une fonction qui n'existe pas ?",
    answer: (
      <p>
        Dites‑le‑nous. Si le besoin est partagé par d&apos;autres commerçants,
        il rejoint la feuille de route du produit. S&apos;il vous est vraiment
        propre, c&apos;est un projet sur mesure, et on parle plutôt d&apos;un{" "}
        <Link href="/sites-internet">site</Link>{" "}ou d&apos;un{" "}
        <Link href="/developpement-mvp">MVP</Link>.
      </p>
    ),
  },
];

export default function MicroSaasPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Micro SaaS"
        title="Nos propres logiciels, plutôt qu'un devis de plus"
        lede="Nous construisons et exploitons nos propres logiciels. Vous vous abonnez à un produit qui tourne déjà."
        visual={
          <BloomyDuo
            caption={
              <>
                <p className="text-[0.95rem] font-semibold text-forest">
                  Bloomy
                  <span className="font-normal text-forest-faint">
                    , la plateforme florale que nous avons construite et que nous exploitons
                  </span>
                </p>
                <ProductLiveLink className="mt-1" />
              </>
            }
          />
        }
      >
        <CtaLink
          href={primaryCta.href}
          event="cta_contact_click"
          placement="micro_saas_hero"
          className={buttonClass("primary")}
        >
          {primaryCta.label}
          <ButtonArrow />
        </CtaLink>
      </PageHero>

      {/* La fiche du produit qui existe. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <ProductSpec
            title="Bloomy, en production"
            body="Une plateforme où l'on compose son bouquet fleur par fleur chez un artisan proche, avec retrait en boutique ou livraison."
            rows={specRows}
            actions={
              <ButtonLink href="/realisations/bloomy-plateforme-florale" variant="secondary" arrow>
                Lire l&apos;étude de cas
              </ButtonLink>
            }
            visual={<BloomyComparatifShot />}
            caption="La page comparatif publiée sur bloomy.one : ce que Bloomy fait, face aux grandes plateformes."
          />
        </Container>
      </section>

      {/* L'aveu d'inventaire : le panneau forest, unique sur la page. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="on-forest leaf-lg grid gap-8 bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-20 lg:px-20">
            <p
              aria-hidden="true"
              className="font-display text-[8rem] font-bold leading-[0.8] tracking-tight text-bloom-light sm:text-[12rem] lg:text-[15rem]"
            >
              1
            </p>
            <div className="lg:pb-3">
              <h2 className="text-display-xl text-paper">
                Un produit en production. Pas un catalogue.
              </h2>
              <p className="lede mt-6 max-w-2xl">
                D&apos;autres idées sont à l&apos;étude. Tant qu&apos;elles ne
                sont pas devant de vrais utilisateurs, elles n&apos;ont rien à
                faire sur cette page : nous préférons le dire plutôt
                qu&apos;afficher une gamme qui n&apos;existe pas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container width="wide">
          <SectionHead title="Pourquoi l'abonnement plutôt que le projet" />
          <EditorialList className="mt-12" items={modele} />
        </Container>
      </section>

      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="narrow">
          <h2 className="text-display-lg">Ce que l&apos;on nous demande</h2>
          <div className="mt-10">
            <FaqAccordion items={faq} />
          </div>
        </Container>
      </section>

      <CtaBand
        placement="micro_saas_footer"
        title="Un besoin que notre produit ne couvre pas ?"
        lede="Dites‑nous ce que vous cherchez. Si Bloomy ne convient pas, nous vous dirons vers qui vous tourner."
      />
    </>
  );
}
