import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { OrdersPeek } from "@/components/visuals/AdminPreview";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { BloomyComposer } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { mvpOffer } from "@/lib/offers";

/**
 * Preuve d'ouverture de la page : le produit de l'équipe, pas une promesse.
 * L'application côté client et le tableau de bord côté professionnel — les
 * deux moitiés de tout produit que nous construisons. Étiquetés « Aperçu ».
 */
function ProductProof() {
  return (
    <figure className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end sm:gap-10">
        <div className="w-full max-w-[18rem]">
          <PhoneFrame>
            <BloomyComposer bare />
          </PhoneFrame>
        </div>
        <div className="w-full max-w-[18rem]">
          <OrdersPeek />
        </div>
      </div>
      <figcaption className="caption mx-auto mt-6 max-w-lg text-center">
        Aperçus de bloomy.one : l&apos;application de commande et le tableau de
        bord professionnel — conçus, développés et opérés par l&apos;équipe.
      </figcaption>
    </figure>
  );
}

export const metadata = pageMetadata({
  title: "Développement MVP : votre produit en production sur Firebase",
  description:
    "Développement de MVP web et PWA sur Next.js et Firebase : cadrage produit, UX, authentification, paiements, admin et mise en production. Par les créateurs de Bloomy.",
  path: "/developpement-mvp",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Développement MVP", path: "/developpement-mvp" },
];

const steps = [
  {
    title: "Cadrage produit",
    body: "Un atelier pour isoler le problème réel, l'utilisateur cible et le parcours critique — celui sans lequel le produit n'a pas de raison d'exister. Nous coupons ensemble tout le reste : un MVP qui fait trois choses bien bat un produit qui en promet trente.",
  },
  {
    title: "UX/UI des écrans clés",
    body: "Maquettes des parcours essentiels, testables sur téléphone avant d'écrire une ligne de code métier. Vous validez sur du concret, pas sur un cahier des charges abstrait.",
  },
  {
    title: "Construction",
    body: "Application web ou PWA sur Next.js et Firebase : authentification, base de données temps réel, paiements si nécessaires, tableau de bord d'administration. Un socle éprouvé — celui sur lequel Bloomy tourne en production.",
  },
  {
    title: "Mise en production et mesure",
    body: "Déploiement, mesure d'usage dès le premier jour, et un cycle d'itération inclus après les premiers retours utilisateurs. Le lancement est le début du travail, pas sa fin.",
  },
];

const faq = [
  {
    question: "Pourquoi Firebase et une PWA plutôt qu'une app native ?",
    answer: (
      <p>
        Parce qu&apos;un MVP doit d&apos;abord vérifier qu&apos;il intéresse
        quelqu&apos;un. Une application web installable (PWA) se déploie en
        heures, se corrige en continu et évite les délais de validation des
        stores — pour une fraction du coût de deux applications natives. Si la
        traction le justifie, le passage au natif se fait ensuite, sur des
        bases validées. C&apos;est le chemin que nous connaissons : Bloomy
        fonctionne ainsi.
      </p>
    ),
  },
  {
    question: "Travaillez-vous sur n'importe quel projet ?",
    answer: (
      <p>
        Non, et c&apos;est volontaire. Nous prenons peu de projets MVP en
        parallèle de notre activité principale, et uniquement lorsque notre
        stack (Next.js, Firebase, web mobile-first) est la bonne réponse. Si
        votre projet exige du temps réel embarqué, du jeu vidéo ou une équipe
        de quinze personnes, nous vous le dirons au premier appel — et nous
        vous orienterons si nous le pouvons.
      </p>
    ),
  },
  {
    question: "Que se passe-t-il après le lancement ?",
    answer: (
      <p>
        Un cycle d&apos;itération est inclus : nous regardons ensemble les
        données d&apos;usage et les retours, puis nous corrigeons ce qui
        bloque réellement. Ensuite, trois options : vous internalisez (le code
        est à vous, documenté), nous continuons en accompagnement mensuel, ou
        le projet s&apos;arrête — et vous aurez dépensé le minimum pour le
        savoir.
      </p>
    ),
  },
  {
    question: "Le code m'appartient-il ?",
    answer: (
      <p>
        Intégralement : dépôt Git à votre nom, infrastructure sur vos comptes,
        documentation de reprise incluse. Aucune dépendance cachée à Bloomy
        Studio — un principe que nous appliquons aussi à{" "}
        <Link href="/fleuristes">nos sites pour fleuristes</Link>.
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
            "Développement de MVP web et PWA sur Next.js et Firebase : cadrage, UX, construction, mise en production et itération.",
          path: "/developpement-mvp",
          serviceType: "Développement d'application web",
          audience: "Fondateurs et porteurs de projet",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Développement MVP"
        title="Mettez un vrai produit entre les mains de vrais utilisateurs"
        lede={
          <>
            Nous développons des MVP resserrés sur l&apos;essentiel, en
            production sur Next.js et Firebase. Pas une agence logicielle
            illimitée : une petite équipe qui a construit et opère{" "}
            <a href="https://bloomy.one">sa propre plateforme</a>{" "}— et qui
            applique à votre produit ce qu&apos;elle a appris sur le sien.
          </>
        }
        visual={<ProductProof />}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Le déroulé"
            title="Du problème au produit en production"
            lede="Quatre phases, chacune conclue par un livrable concret que vous validez. Le périmètre est défini ensemble au cadrage — et défendu ensuite contre la tentation d'ajouter « juste une fonctionnalité »."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-sm border border-hairline bg-paper p-7">
                <p className="step-num text-xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-display-md mt-2">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Offre MVP Sprint */}
      <section className="on-ink bg-plum py-16 text-cream sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHead
                eyebrow="L'offre"
                title={mvpOffer.name}
              />
              <p className="mt-3 text-sm font-medium text-cream/70">{mvpOffer.audience}</p>
              <p className="mt-5 leading-relaxed text-cream/75">{mvpOffer.summary}</p>
              <p className="mt-6 text-sm text-cream/60">
                {mvpOffer.price ?? "Sur devis"} · {mvpOffer.process}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
                  Inclus
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
                  {mvpOffer.includes.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-sage">✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
                  Volontairement exclu
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
                  {mvpOffer.excludes.map((e) => (
                    <li key={e} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-cream/40">—</span>
                      {e}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-cream/50">
                  Un MVP réussi est un MVP qui a su dire non. Le périmètre exclu
                  n&apos;est pas perdu : il attend la validation du cœur du
                  produit.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            eyebrow="Vos questions"
            title="Stack, propriété, suite du projet"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Notre preuve par l&apos;exemple :{" "}
            <Link href="/realisations/bloomy-plateforme-florale">
              l&apos;étude de cas Bloomy
            </Link>
            , de l&apos;idée à la production.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="mvp_footer"
        title="Parlez-nous de votre produit — franchement"
        lede="Un premier échange de trente minutes pour évaluer si un MVP Sprint est la bonne réponse. Si ce n'est pas le cas, nous vous le dirons."
      />
    </>
  );
}
