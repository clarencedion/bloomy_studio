import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notre méthode : transparente, jalonnée, sans tunnel opaque",
  description:
    "Comment Bloomy Studio mène un projet : diagnostic, cadrage, conception validée par jalons, lancement accompagné et mesure honnête des résultats.",
  path: "/methode",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Méthode", path: "/methode" },
];

const phases = [
  {
    num: "01",
    name: "Diagnostic",
    duration: "Une semaine",
    you: "Vous remplissez le formulaire d'audit (cinq minutes) et nous montrez l'existant.",
    us: "Nous analysons votre site, votre fiche Google, votre visibilité locale et vos concurrents directs. Vous recevez une synthèse écrite, honnête, avec des priorités — utilisable même si vous ne travaillez pas avec nous.",
    deliverable: "Synthèse de diagnostic + recommandations priorisées",
  },
  {
    num: "02",
    name: "Cadrage",
    duration: "Une à deux semaines",
    you: "Un atelier d'une à deux heures — en boutique quand c'est possible, en visio sinon. Vous parlez de votre métier ; nous posons des questions précises.",
    us: "Nous transformons l'atelier en périmètre écrit : pages, fonctionnalités, contenus, responsabilités de chacun, calendrier. Le devis détaillé en découle, ligne par ligne.",
    deliverable: "Périmètre écrit + devis détaillé + calendrier",
  },
  {
    num: "03",
    name: "Conception",
    duration: "Deux à cinq semaines selon l'offre",
    you: "Vous validez trois jalons : la direction visuelle, la page d'accueil complète, puis l'ensemble des pages. Vos retours sont intégrés à chaque jalon — pas à la fin.",
    us: "Direction artistique, contenus, développement, catalogue. Vous suivez l'avancement sur un lien privé, en continu : jamais d'effet tunnel.",
    deliverable: "Site complet sur environnement de recette",
  },
  {
    num: "04",
    name: "Lancement",
    duration: "Une semaine",
    you: "Vous testez le parcours complet — commander, réserver, appeler — et donnez le feu vert final.",
    us: "Tests multi-écrans, vitesse, accessibilité, connexion de la fiche Google, redirections, mise en production. Puis une formation d'une heure pour que vous soyez autonome.",
    deliverable: "Site en ligne + formation + accès complets à votre nom",
  },
  {
    num: "05",
    name: "La suite",
    duration: "En continu",
    you: "Vous recevez un rapport mensuel lisible en cinq minutes et décidez des priorités avec nous.",
    us: "Surveillance, mises à jour, pages saisonnières, SEO local actif selon votre offre. Sans engagement de longue durée : la qualité du travail est notre seul argument de rétention.",
    deliverable: "Rapport mensuel + plan d'action trimestriel",
  },
];

const principles = [
  {
    title: "Vous êtes propriétaire de tout",
    body: "Nom de domaine, contenus, code, accès : tout est à votre nom dès le premier jour. Si nous cessons de travailler ensemble, vous partez avec l'intégralité — c'est écrit dans nos devis.",
  },
  {
    title: "Aucun chiffre inventé",
    body: "Pas de « +300 % de trafic garanti », pas de faux témoignages, pas de classement Google promis. Nous montrons des mesures réelles et nous expliquons ce qu'elles veulent dire.",
  },
  {
    title: "Le devis découle du besoin",
    body: "Le cadrage précède le chiffrage, jamais l'inverse. Et si une partie de votre besoin peut être couverte par un outil gratuit ou un existant sain, nous vous le disons.",
  },
  {
    title: "Des validations, pas des surprises",
    body: "Chaque phase se conclut par un livrable que vous validez. Vous ne découvrez jamais votre site « à la fin » : vous l'avez vu grandir à chaque étape.",
  },
];

export default function MethodePage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="La méthode"
        title="Vous saurez toujours où en est votre projet"
        lede={
          <>
            La méfiance envers les prestataires web est méritée : devis
            opaques, tunnels de trois mois, sites livrés puis abandonnés. Notre
            réponse est une méthode publique, en cinq phases, avec des
            livrables validés à chaque étape — la même pour un{" "}
            <Link href="/fleuristes">fleuriste</Link>, un{" "}
            <Link href="/salons-de-coiffure">salon</Link>{" "}ou un{" "}
            <Link href="/developpement-mvp">MVP</Link>.
          </>
        }
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-6">
            {phases.map((phase) => (
              <article
                key={phase.num}
                className="rounded-sm border border-hairline bg-paper p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-4">
                    <span className="step-num text-2xl" aria-hidden="true">
                      {phase.num}
                    </span>
                    <h2 className="text-display-md">{phase.name}</h2>
                  </div>
                  <p className="text-sm font-medium text-ink-soft">{phase.duration}</p>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="border-l-2 border-sage pl-4">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-deep">
                      Votre rôle
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                      {phase.you}
                    </p>
                  </div>
                  <div className="border-l-2 border-rose pl-4">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-rose">
                      Notre travail
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                      {phase.us}
                    </p>
                  </div>
                </div>
                <p className="mt-6 border-t border-hairline pt-4 text-sm">
                  <span className="font-semibold">Livrable :</span>{" "}
                  <span className="text-ink-soft">{phase.deliverable}</span>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-hairline bg-rose-veil/40 py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Nos principes"
            title="Quatre engagements non négociables"
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {principles.map((p) => (
              <article key={p.title} className="border-t border-hairline pt-5">
                <h3 className="text-display-sm">{p.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        placement="methode_footer"
        title="La première phase est gratuite. Commençons par elle."
        lede="Le diagnostic vous situe honnêtement — et vous décidez ensuite, en connaissance de cause."
      />
    </>
  );
}
