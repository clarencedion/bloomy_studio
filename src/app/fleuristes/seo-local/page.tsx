import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Browser, Check, Link as LinkIcon, MapPin, X } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { FaqBlock } from "@/components/fleuristes/FaqBlock";
import { HeroActions } from "@/components/fleuristes/HeroActions";
import { articleLink } from "@/components/fleuristes/reading";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SiteCard } from "@/components/visuals/ShowcaseSites";
import { getShowcaseSite } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SEO local fleuriste : Google Maps & fiche Google travaillées",
  description:
    "Référencement local pour fleuristes : fiche Google Business Profile complète, avis réguliers, pages services et données cohérentes pour votre ville.",
  path: "/fleuristes/seo-local",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "SEO local", path: "/fleuristes/seo-local" },
];

/*
 * Ouverture : un site de fleuriste dont la navigation porte déjà ses pages
 * services (mariages, deuil) et sa ville. Capture réelle, aucune affirmation
 * sur son classement.
 */
const heroSite = getShowcaseSite("aux-coquelicots");

type Lever = { title: string; body: ReactNode };

/** Les leviers, rangés sur les trois terrains du référencement local. */
const terrains: { icon: Icon; name: string; summary: string; levers: Lever[] }[] = [
  {
    icon: MapPin,
    name: "Votre fiche Google",
    summary: "Ce que le client voit avant même d'ouvrir votre site.",
    levers: [
      {
        title: "Une fiche complète, vraiment",
        body: "Catégorie principale exacte, services détaillés, horaires à jour (y compris jours fériés), photos récentes, attributs, zone desservie. La plupart des fiches de fleuristes sont remplies à moitié\u00a0: c'est la moitié qui manque qui fait la différence.",
      },
      {
        title: "Des avis réguliers, jamais achetés",
        body: "Google valorise la fraîcheur des avis autant que leur note. Nous mettons en place une demande d'avis naturelle après les commandes, et jamais de filtrage des clients mécontents, une pratique que Google interdit et sanctionne.",
      },
    ],
  },
  {
    icon: Browser,
    name: "Votre site",
    summary: "Ce qui transforme une recherche précise en appel ou en commande.",
    levers: [
      {
        title: "Une page par service, pas une page «\u00a0prestations\u00a0»",
        body: (
          <>
            Mariage, deuil, entreprises, ateliers&nbsp;: chaque service a sa page
            dédiée sur votre{" "}
            <Link href="/fleuristes/site-internet">site de fleuriste</Link>.
            C&apos;est l&apos;un des facteurs les plus puissants du
            référencement local, et le plus négligé.
          </>
        ),
      },
      {
        title: "Un site techniquement irréprochable",
        body: "Vitesse mobile, données structurées, pages comprises par Google\u00a0: le socle technique de votre site alimente directement votre visibilité locale. Les deux se construisent ensemble.",
      },
    ],
  },
  {
    icon: LinkIcon,
    name: "Le lien entre les deux",
    summary: "Ce qui rassure Google comme vos clients.",
    levers: [
      {
        title: "Des données cohérentes partout",
        body: "Nom, adresse, téléphone et horaires strictement identiques entre votre site, votre fiche Google et les annuaires qui comptent. Les incohérences sèment le doute chez Google comme chez vos clients.",
      },
    ],
  },
];

const weDo = [
  "Appliquer les recommandations publiques de Google, sérieusement et patiemment.",
  "Demander des avis après les commandes, à tous vos clients.",
  "Concevoir la fiche et le site ensemble, avec les mêmes informations.",
];

const weRefuse = [
  "Acheter des avis, ou écarter les clients mécontents avant qu'ils notent.",
  "Inscrire votre boutique en masse dans des annuaires de faible qualité.",
  "Promettre la première position en quinze jours.",
];

/** Ce que le rapport mensuel suit. */
const measured = ["Appels depuis la fiche", "Itinéraires lancés", "Visites du site", "Commandes"];

const faq: FaqItem[] = [
  {
    question: "En combien de temps voit-on des résultats\u00a0?",
    answer: (
      <p>
        Les corrections de fiche Google produisent leurs premiers effets en
        quelques semaines&nbsp;; le travail de fond (pages services, avis, contenu)
        se mesure sur trois à six mois. Quiconque vous promet la première
        position en quinze jours vous ment&nbsp;: Google lui-même l&apos;écrit. Nous
        montrons la progression réelle, chiffres à l&apos;appui, chaque mois.
      </p>
    ),
  },
  {
    question: "Ma fiche Google existe déjà. Ça ne suffit pas\u00a0?",
    answer: (
      <p>
        Exister n&apos;est pas être choisi. Entre deux fleuristes à distance
        égale, Google favorise la fiche la plus complète, la plus active et la
        plus cohérente avec son site. Et le client, lui, choisit celle qui a
        des photos récentes, des avis frais et des horaires fiables. Le
        diagnostic gratuit vous dit exactement où en est la vôtre.
      </p>
    ),
  },
  {
    question: "Le SEO local fonctionne-t-il sans site internet\u00a0?",
    answer: (
      <p>
        Partiellement. La fiche Google seule peut vous faire apparaître sur
        Maps, mais elle plafonne vite&nbsp;: sans{" "}
        <Link href="/fleuristes/site-internet">site</Link>{" "}avec des pages
        services solides, vous laissez aux concurrents les recherches
        «&nbsp;fleuriste mariage&nbsp;», «&nbsp;livraison fleurs&nbsp;», «&nbsp;fleurs deuil&nbsp;» de votre
        ville. Les deux se renforcent&nbsp;: c&apos;est pour cela que nous les
        concevons ensemble.
      </p>
    ),
  },
  {
    question: "Achetez-vous des avis ou des annuaires en masse\u00a0?",
    answer: (
      <p>
        Jamais. Un avis acheté se repère (rafales de notes, comptes récents,
        textes interchangeables) et Google le supprime, en restreignant
        parfois la fiche qui l&apos;a reçu. Les inscriptions massives dans des
        annuaires de faible qualité ne rapportent rien et dispersent des
        informations contradictoires qu&apos;il faut ensuite corriger une à
        une. Le seul raccourci durable reste un client satisfait à qui
        l&apos;on pense à demander son avis.
      </p>
    ),
  },
];

export default function SeoLocalPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "SEO local pour fleuriste",
          description:
            "Référencement local pour fleuristes : Google Business Profile, avis, pages services, cohérence des données locales et mesure mensuelle.",
          path: "/fleuristes/seo-local",
          serviceType: "Référencement local",
          audience: "Fleuristes indépendants",
        })}
      />

      {/* Ouverture : un vrai site de fleuriste, ses pages services dans la
          navigation et sa ville dans le titre. La capture défile au survol. */}
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · SEO local"
        title={
          <>
            Être le fleuriste que <span className="text-bloom-ink">Google montre</span> en premier
          </>
        }
        lede="Votre fiche Google, votre site et la cohérence entre les deux&nbsp;: trois terrains travaillés méthodiquement, sans promesse magique."
        aside={
          heroSite ? (
            <SiteCard site={heroSite} eager scrolling sizes="(min-width: 1024px) 34rem, 100vw" />
          ) : null
        }
      >
        <HeroActions placement="seo_local_hero" />
      </PageHero>

      {/* Pourquoi c'est décisif : un titre large, puis le raisonnement en
          deux colonnes de lecture. Mobile : une colonne. */}
      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="wide">
          <h2 className="text-display-lg max-w-4xl">
            «&nbsp;Fleuriste&nbsp;» se cherche d&apos;abord sur Maps, et trois fiches
            seulement sont montrées
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14 [&_p]:max-w-[60ch]">
            <p className="text-[1.06rem] leading-relaxed text-forest-soft">
              Quand quelqu&apos;un cherche un fleuriste, il tape «&nbsp;fleuriste&nbsp;»
              ou «&nbsp;fleuriste + votre ville&nbsp;», et Google affiche d&apos;abord
              trois fiches locales avec carte, avis et itinéraire. Être dans
              ces trois-là, ou juste derrière, change concrètement le nombre
              d&apos;appels, d&apos;itinéraires et de commandes que vous
              recevez chaque semaine.
            </p>
            <div>
              <p className="text-[1.06rem] leading-relaxed text-forest-soft">
                La bonne nouvelle&nbsp;: la plupart des fleuristes ne travaillent
                pas sérieusement leur visibilité locale. Une fiche complète, des
                avis réguliers et des pages services bien construites suffisent
                souvent à se démarquer durablement dans une ville. Basés à
                Nantes, nous accompagnons des boutiques partout en France.
              </p>
              <Link
                href="/blog/apparaitre-google-maps-fleuriste"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-bloom-ink"
              >
                <span className="link-live">Apparaître sur Google Maps quand on est fleuriste</span>
                <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4 shrink-0" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Les leviers, rangés par terrain : le terrain à gauche, ses leviers
          à droite. Desktop : 4 / 8, leviers en deux colonnes.
          Mobile : terrain puis leviers, l'un sous l'autre. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">Cinq leviers, appliqués sans raccourci</h2>
            <p className="lede mt-6">
              Rien d&apos;ésotérique&nbsp;: les fondamentaux publics du
              référencement local, appliqués avec la rigueur que la plupart des
              prestataires s&apos;épargnent.
            </p>
          </div>
          <div className="mt-14 border-t border-line-strong">
            {terrains.map(({ icon: TerrainIcon, name, summary, levers }) => (
              <div
                key={name}
                className="grid gap-8 border-b border-line py-10 sm:py-12 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <span className="grid size-12 place-items-center rounded-full bg-mint text-forest">
                    <TerrainIcon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="text-display-md mt-5">{name}</h3>
                  <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-forest-faint">
                    {summary}
                  </p>
                </div>
                <div
                  className={`grid gap-8 lg:col-span-8 ${levers.length > 1 ? "md:grid-cols-2 md:gap-10" : ""}`}
                >
                  {levers.map((lever, i) => (
                    <Reveal key={lever.title} delay={i * 80}>
                      <h4 className="text-display-sm">{lever.title}</h4>
                      <p className="prose-links mt-3 max-w-[60ch] leading-relaxed text-forest-soft">
                        {lever.body}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* La ligne de conduite, en deux panneaux qui se répondent.
          Desktop : côte à côte. Mobile : l'un sous l'autre. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-3xl">Ce que nous faisons, ce que nous refusons</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="leaf bg-mint p-7 sm:p-10">
              <p className="text-display-sm">Nous faisons</p>
              <ul className="mt-6 space-y-4">
                {weDo.map((item) => (
                  <li key={item} className="flex gap-3.5 leading-relaxed">
                    <Check aria-hidden="true" weight="bold" className="mt-1 size-5 shrink-0 text-forest" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="leaf border border-line bg-white p-7 sm:p-10">
              <p className="text-display-sm">Nous refusons</p>
              <ul className="mt-6 space-y-4">
                {weRefuse.map((item) => (
                  <li key={item} className="flex gap-3.5 leading-relaxed text-forest-soft">
                    <X aria-hidden="true" weight="bold" className="mt-1 size-5 shrink-0 text-bloom-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* La mesure, sur le seul panneau vert de la page : ce que le rapport
          suit, en grand. Desktop : texte 5 / indicateurs 7.
          Mobile : texte puis indicateurs. */}
      <section className="py-6 sm:py-10">
        <Container width="wide">
          <div className="on-forest leaf-lg bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-display-lg text-paper">Ce que nous mesurons, chaque mois</h2>
                <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-paper/80">
                  Un rapport lisible en cinq minutes, pas un export de quarante
                  pages. Vous voyez ce qui progresse et ce qu&apos;on fait
                  ensuite.
                </p>
                <p className="prose-links mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/80">
                  Le SEO local s&apos;entretient dans la durée&nbsp;: c&apos;est le
                  rôle de{" "}
                  <Link href="/fleuristes/maintenance">notre accompagnement</Link>.
                </p>
              </div>
              <ul className="border-t border-line-dark lg:col-span-7">
                {measured.map((m) => (
                  <li
                    key={m}
                    className="text-display-md border-b border-line-dark py-5 text-paper sm:py-6"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <FaqBlock
        title="Parlons franchement de Google"
        items={faq}
        reading={[
          articleLink("apparaitre-google-maps-fleuriste"),
          {
            href: "/fleuristes/site-internet",
            kind: "Page · le socle du référencement",
            label: "Création de site pour fleuriste",
          },
        ]}
      />

      <CtaBand
        intent="audit"
        placement="seo_local_footer"
        title="Où en est votre visibilité locale&nbsp;?"
        lede="Le diagnostic gratuit analyse votre fiche Google, votre site et votre position face aux fleuristes voisins. Vous repartez avec des actions concrètes, même sans travailler avec nous."
      />
    </>
  );
}
