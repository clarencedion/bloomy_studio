import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { ChartLineUp, Key, Receipt } from "@phosphor-icons/react/dist/ssr";

import { MethodStem, type Milestone, type OffStep } from "@/components/studio/MethodStem";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notre méthode : quatre jalons, une validation à chacun",
  description:
    "Comment Bloomy Studio mène un projet : cadrage, direction visuelle, construction et lancement, des durées annoncées et une validation à chaque jalon.",
  path: "/methode",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Méthode", path: "/methode" },
];

/**
 * Durées totales, de l'atelier de cadrage à la mise en ligne, telles que les
 * annoncent `lib/offers.ts` et `lib/products.ts`.
 */
const durations = [
  { label: "Site vitrine", value: "4", unit: "semaines environ" },
  { label: "Boutique en ligne", value: "6 à 8", unit: "semaines, selon le catalogue" },
  { label: "MVP", value: "6 à 10", unit: "semaines, selon le périmètre" },
];

/** Les quatre jalons, ceux que résument l'accueil et `/sites-internet`. */
const milestones: Milestone[] = [
  {
    title: "Cadrage",
    when: "Une à deux semaines",
    body: "Nous transformons un atelier sur votre métier en périmètre écrit\u00a0: pages, fonctionnalités, contenus, responsabilités de chacun et calendrier. Le devis en découle, ligne par ligne.",
    you: "Un atelier d'une à deux heures, dans vos locaux quand c'est possible, en visio sinon. Vous parlez de votre activité, nous posons des questions précises.",
    validate: "Le périmètre écrit et le devis détaillé, avant tout engagement.",
    deliverable: "Périmètre écrit, devis détaillé et calendrier.",
  },
  {
    title: "Direction visuelle",
    when: "Au début de la conception",
    body: "Couleurs, typographies et ton tirés de votre activité, jamais d'un modèle tout fait. Vous voyez l'univers de votre site avant que la première page ne soit construite.",
    you: "Vos retours sur l'univers proposé. Ils sont intégrés tout de suite, pas à la fin.",
    validate: "L'univers visuel, avant la première page.",
    deliverable: "La direction visuelle de votre site.",
  },
  {
    title: "Construction",
    when: "Deux à cinq semaines de conception au total, selon l'offre",
    body: "Contenus, développement, catalogue\u00a0: la page d'accueil d'abord, puis l'ensemble des pages. Vous suivez l'avancement sur un lien privé, en continu.",
    you: "Vos retours à chaque étape, sur le lien privé. Jamais d'effet tunnel\u00a0: vous voyez votre site grandir.",
    validate: "La page d'accueil complète, puis l'ensemble des pages.",
    deliverable: "Le site complet, sur un environnement de recette.",
  },
  {
    title: "Lancement",
    when: "Une semaine",
    body: "Tests sur tous les écrans, vitesse, accessibilité, connexion de votre fiche Google, redirections, puis mise en production. Une heure de formation suit, pour que vous soyez autonome.",
    you: "Vous testez le parcours complet (commander, réserver, appeler) comme le fera un client.",
    validate: "Le feu vert final, avant la mise en ligne.",
    deliverable: "Le site en ligne, la formation et tous les accès, à votre nom.",
  },
];

const before: OffStep = {
  label: "Avant, si vous voulez",
  title: "Le diagnostic gratuit",
  body: (
    <p>
      Une analyse humaine de votre site, de votre fiche Google et de votre
      visibilité locale, avec des priorités concrètes sous 48&nbsp;h ouvrées.
      Elle vous reste utile même si vous ne travaillez pas avec nous.{" "}
      <Link href="/audit">Demander le diagnostic</Link>.
    </p>
  ),
};

const after: OffStep = {
  label: "Après, en continu",
  title: "La suite, selon votre offre",
  body: (
    <p>
      Surveillance, mises à jour, pages saisonnières et référencement local
      actif, avec un rapport mensuel lisible en cinq minutes. Sans engagement de
      longue durée&nbsp;: la qualité du travail est notre seul argument pour vous
      garder. Le détail est dans <Link href="/services">nos offres</Link>.
    </p>
  ),
};

const commitments: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Key,
    title: "Vous êtes propriétaire de tout",
    body: "Nom de domaine, contenus, code, accès\u00a0: tout est à votre nom dès le premier jour. Si nous cessons de travailler ensemble, vous partez avec l'intégralité. C'est écrit dans nos devis.",
  },
  {
    icon: Receipt,
    title: "Le devis découle du besoin",
    body: "Le cadrage précède le chiffrage, jamais l'inverse. Si une partie de votre besoin peut être couverte par un outil gratuit ou par l'existant, nous vous le disons.",
  },
  {
    icon: ChartLineUp,
    title: "Aucun chiffre inventé",
    body: "Ni «\u00a0+300\u00a0% de trafic garanti\u00a0», ni faux témoignages, ni classement Google promis. Nous montrons des mesures réelles et expliquons ce qu'elles veulent dire.",
  },
];

/**
 * Méthode : la page qui répond à « comment ça va se passer ? ».
 *
 * Récit : un en-tête avec les durées totales par type de projet (panneau
 * menthe), la frise verticale des quatre jalons sur sa tige rose (le cœur de
 * la page), puis les trois engagements en trio asymétrique. Trois familles
 * de mise en page, plus la bande finale.
 */
export default function MethodePage() {
  const [main, ...rest] = commitments;
  const MainIcon = main.icon;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="La méthode"
        title="Vous saurez toujours où en est votre projet"
        lede={
          <>
            Quatre jalons validés un à un, et un lien privé pour suivre
            l&apos;avancement, du <Link href="/sites-internet">site vitrine</Link>{" "}
            au <Link href="/developpement-mvp">MVP</Link>.
          </>
        }
        aside={
          <div className="leaf-lg bg-mint p-7 sm:p-10">
            <h2 className="text-display-sm">De l&apos;atelier de cadrage à la mise en ligne</h2>
            <dl className="mt-6 border-t border-forest/15">
              {durations.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b border-forest/15 py-5 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[1rem] font-medium text-forest">{d.label}</dt>
                  <dd className="text-right">
                    <span className="block font-display text-[2.4rem] font-bold leading-none tracking-[-0.03em] text-forest [font-variation-settings:'wdth'_84] sm:text-[2.8rem]">
                      {d.value}
                    </span>
                    <span className="mt-1.5 block text-[0.86rem] text-forest-soft">{d.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <MethodStem before={before} milestones={milestones} after={after} />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-2xl">Ce qui ne se négocie pas</h2>
          <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
            <article className="leaf-lg flex flex-col justify-between gap-12 bg-blush p-8 sm:p-12 lg:col-span-7 lg:row-span-2">
              <span className="grid size-16 place-items-center rounded-full bg-bloom-strong text-white">
                <MainIcon aria-hidden="true" className="size-8" />
              </span>
              <div>
                <h3 className="text-display-lg max-w-md">{main.title}</h3>
                <p className="mt-5 max-w-[48ch] text-[1.08rem] leading-relaxed text-forest-soft">
                  {main.body}
                </p>
              </div>
            </article>
            {rest.map(({ icon: ItemIcon, title, body }, i) => (
              <article
                key={title}
                className={`leaf p-7 sm:p-9 lg:col-span-5 ${
                  i === 0 ? "bg-mint" : "border border-line bg-white"
                }`}
              >
                <ItemIcon aria-hidden="true" className="size-7 text-forest" />
                <h3 className="text-display-sm mt-5">{title}</h3>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-forest-soft">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        placement="methode_footer"
        title="Commençons par le cadrage."
        lede="Décrivez-nous où vous en êtes. L'un de nous deux vous répond sous 48&nbsp;h ouvrées et vous propose un premier échange."
      />
    </>
  );
}
