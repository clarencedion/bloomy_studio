import Link from "next/link";
import { Browser, Database, DeviceMobile } from "@phosphor-icons/react/dist/ssr";

import { BloomyStage } from "@/components/products/BloomyStage";
import { FactRow, type Fact } from "@/components/products/FactRow";
import { MilestoneTrack, type Milestone } from "@/components/products/MilestoneTrack";
import { OfferPanel } from "@/components/products/OfferPanel";
import { ProductLiveLink } from "@/components/products/ProductLiveLink";
import { StackChoice, type StackTool } from "@/components/products/StackChoice";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BloomyScrollShot } from "@/components/visuals/ProductShot";
import { mvpOffer } from "@/lib/offers";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Développement de MVP : Flutter, Next.js et Firebase",
  description:
    "Développement de MVP sur Flutter, Next.js et Firebase : cadrage, UX, authentification, paiements et mise en production, par les créateurs de Bloomy.",
  path: "/developpement-mvp",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Développement MVP", path: "/developpement-mvp" },
];

/**
 * Page produit « MVP », pour des fondateurs.
 *
 * Récit : le produit de l'équipe d'abord (hero), puis la preuve qu'un MVP
 * construit ainsi tient en production (Bloomy, faits de l'étude de cas), la
 * pile technique et la façon de choisir, les quatre jalons, l'offre avec ce
 * qu'elle exclut, et les objections. Six familles de mise en page, aucune
 * répétée : composition à droite, vitrine pleine largeur + faits, bento
 * asymétrique, piste de jalons, panneau forest, accordéon.
 *
 * Aucun fait inventé : tout vient de `lib/case-studies.ts`, `lib/products.ts`
 * et `lib/offers.ts`.
 */

/** Résultats publiés de l'étude de cas Bloomy (`lib/case-studies.ts`). */
const bloomyFacts: Fact[] = [
  { value: "1 000+", label: "utilisateurs inscrits" },
  { value: "0 %", label: "de commission prélevée sur les artisans partenaires" },
  { value: "Le jour même", label: "click-and-collect et livraison opérationnels" },
  { value: "Depuis 2024", label: "conçu, développé et exploité par l'équipe" },
];

const stack: { primary: StackTool; secondary: StackTool; base: StackTool } = {
  primary: {
    name: "Flutter",
    when: "Quand le produit doit vivre sur iOS, Android et le web avec une seule base de code.",
    proof: "C'est le choix que nous avons fait pour Bloomy, et il tient en production.",
    icon: <DeviceMobile weight="regular" className="size-6" />,
  },
  secondary: {
    name: "Next.js",
    when: "Quand le produit doit d'abord être rapide, léger et trouvé sur Google.",
    proof: "Le site que vous lisez en ce moment est construit en Next.js.",
    icon: <Browser weight="regular" className="size-6" />,
  },
  base: {
    name: "Firebase",
    when: "Dans les deux cas : authentification, données en temps réel et paiements.",
    proof: "Le socle sur lequel Bloomy tourne en production, que nous connaissons de l'intérieur.",
    icon: <Database weight="regular" className="size-6" />,
  },
};

const milestones: Milestone[] = [
  {
    title: "Cadrage produit",
    body: "Un atelier pour isoler le problème réel, l'utilisateur cible et le parcours critique. Tout le reste attend : un MVP qui fait trois choses bien bat un produit qui en promet trente.",
    deliverable: "le périmètre écrit, et la liste de ce qui attendra.",
  },
  {
    title: "Écrans clés",
    body: "Les maquettes des parcours essentiels, testables sur téléphone avant d'écrire le code métier. Vous validez sur du concret, pas sur un cahier des charges.",
    deliverable: "les maquettes UX/UI, cliquables.",
  },
  {
    title: "Construction",
    body: "Flutter ou Next.js sur Firebase, selon le produit. Authentification, base de données, paiements si nécessaires, et un tableau de bord d'administration.",
    deliverable: "l'application complète, sur un environnement de test.",
  },
  {
    title: "Production et mesure",
    body: "Déploiement, mesure d'usage dès le premier jour, puis un cycle d'itération après les premiers retours. Le lancement est le début du travail, pas sa fin.",
    deliverable: "le produit en ligne, ouvert à ses premiers utilisateurs.",
  },
];

const faq = [
  {
    question: "Combien coûte un MVP ?",
    answer: (
      <p>
        Sur devis, après un premier échange : le prix dépend du périmètre que
        nous validons ensemble au cadrage. Le devis détaille ce qui est inclus
        et ce qui ne l&apos;est pas, comme{" "}
        <Link href="/services">toutes nos offres</Link>.
      </p>
    ),
  },
  {
    question: "Travaillez‑vous sur n'importe quel projet ?",
    answer: (
      <p>
        Non, et c&apos;est volontaire. Nous prenons peu de projets MVP en
        parallèle de notre activité, et uniquement lorsque Flutter, Next.js et
        Firebase sont la bonne réponse. Si votre projet exige de l&apos;embarqué
        temps réel, du jeu vidéo ou une équipe de quinze personnes, nous vous le
        dirons au premier appel, et nous vous orienterons si nous le pouvons.
      </p>
    ),
  },
  {
    question: "Que se passe‑t‑il après le lancement ?",
    answer: (
      <p>
        Un cycle d&apos;itération est inclus : nous regardons ensemble les
        données d&apos;usage et les retours, puis nous corrigeons ce qui bloque
        réellement. Ensuite, trois options : vous internalisez (le code est à
        vous, documenté), nous continuons en accompagnement mensuel, ou le
        projet s&apos;arrête, et vous aurez dépensé le minimum pour le savoir.
      </p>
    ),
  },
  {
    question: "Le code m'appartient‑il ?",
    answer: (
      <p>
        Intégralement : dépôt Git à votre nom, infrastructure sur vos comptes,
        documentation de reprise incluse. Aucune dépendance cachée à Bloomy
        Studio, un principe que nous appliquons aussi aux{" "}
        <Link href="/sites-internet">sites que nous livrons</Link>.
      </p>
    ),
  },
  {
    question: "MVP ou micro SaaS : quelle différence ?",
    answer: (
      <p>
        Le MVP est une prestation : le produit est le vôtre, nous le
        construisons pour vous. Le <Link href="/micro-saas">micro SaaS</Link>{" "}
        est l&apos;inverse : le produit est le nôtre, vous l&apos;utilisez en
        abonnement. Et si vous êtes commerçant plutôt que fondateur, un{" "}
        <Link href="/sites-internet">site sur mesure</Link>{" "}suffit souvent.
      </p>
    ),
  },
];

export default function MvpPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Développement de MVP",
          description:
            "Développement de MVP sur Flutter, Next.js et Firebase : cadrage, UX, construction, mise en production et itération.",
          path: "/developpement-mvp",
          serviceType: "Développement d'application web",
          audience: "Fondateurs et porteurs de projet",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Développement MVP"
        title="Un vrai produit, devant de vrais utilisateurs"
        lede="Cadrage, conception, construction et mise en production d'une première version qui tient debout, par l'équipe qui a construit Bloomy."
        aside={
          <BloomyStage
            eager
            className="lg:ml-4"
            caption={
              <>
                <p className="text-[0.95rem] font-semibold text-forest">
                  Bloomy
                  <span className="font-normal text-forest-faint">
                    , notre produit, sur le web et sur téléphone
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
          placement="mvp_hero"
          className={buttonClass("primary")}
        >
          {primaryCta.label}
          <ButtonArrow />
        </CtaLink>
      </PageHero>

      {/* La preuve : un MVP construit par l'équipe, passé en production. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title="Bloomy a commencé comme un MVP. Il est en production."
            lede="Nous l'avons construit de zéro en partant du comptoir, pas de la technologie : chaque décision produit a été testée avec de vrais fleuristes nantais."
          />
          <figure className="group mt-14 sm:mt-16">
            <div className="leaf-lg overflow-hidden bg-mint px-5 pt-6 sm:px-12 sm:pt-12 lg:px-24 lg:pt-16">
              <BloomyScrollShot
                className="mx-auto max-w-4xl translate-y-6 sm:translate-y-10"
                sizes="(min-width: 1280px) 56rem, 100vw"
              />
            </div>
            <figcaption className="caption mt-4 px-1">
              La page d&apos;accueil de bloomy.one, en entier.
            </figcaption>
          </figure>
          <FactRow facts={bloomyFacts} className="mt-16" />
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/realisations/bloomy-plateforme-florale" variant="secondary" arrow>
              Lire l&apos;étude de cas
            </ButtonLink>
            <p className="prose-links text-[0.98rem] text-forest-soft">
              Fleuriste avec un projet de site plutôt que d&apos;application ?{" "}
              <Link href="/fleuristes">Notre page dédiée</Link>.
            </p>
          </div>
        </Container>
      </section>

      {/* La pile : trois outils, choisis par le produit. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title="Trois outils, choisis par le produit"
            lede="Jamais par préférence. Nous vous disons au cadrage lequel s'impose, avec les arguments."
          />
          <StackChoice {...stack} className="mt-14 sm:mt-16" />
        </Container>
      </section>

      {/* La démarche : la seule séquence numérotée de la page. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title="Du problème au produit en production"
            lede="Quatre jalons, chacun conclu par un livrable que vous validez."
          />
          <MilestoneTrack steps={milestones} className="mt-14 sm:mt-16" />
        </Container>
      </section>

      {/* L'offre : le panneau forest, unique sur la page. */}
      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="wide">
          <OfferPanel
            offer={mvpOffer}
            excludesNote="Un MVP réussi est un MVP qui a su dire non. Le périmètre exclu n'est pas perdu : il attend la validation du cœur du produit."
          />
        </Container>
      </section>

      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="narrow">
          <h2 className="text-display-lg">Avant de vous lancer</h2>
          <div className="mt-10">
            <FaqAccordion items={faq} />
          </div>
        </Container>
      </section>

      <CtaBand
        placement="mvp_footer"
        title="Parlez‑nous de votre produit, franchement."
        lede="Un premier échange de trente minutes pour voir si un MVP Sprint est la bonne réponse. Si ce n'est pas le cas, nous vous le dirons."
      />
    </>
  );
}
