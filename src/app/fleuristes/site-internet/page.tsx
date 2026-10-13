import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Article,
  Lightning,
  MapPin,
  Palette,
  PencilSimpleLine,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { DuoShowcase } from "@/components/fleuristes/DuoShowcase";
import { FaqBlock } from "@/components/fleuristes/FaqBlock";
import { HeroActions } from "@/components/fleuristes/HeroActions";
import { PhoneShot } from "@/components/fleuristes/PhoneShot";
import { articleLink } from "@/components/fleuristes/reading";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getShowcaseSite, type ShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Création de site internet pour fleuriste, sur mesure",
  description:
    "Un site de fleuriste conçu sur mesure : identité propre, mobile impeccable, pages services qui convertissent et contenus que vous modifiez vous-même.",
  path: "/fleuristes/site-internet",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "Site internet", path: "/fleuristes/site-internet" },
];

const deliverables: { icon: Icon; title: string; body: ReactNode }[] = [
  {
    icon: Palette,
    title: "Une identité qui vous ressemble",
    body: "Couleurs, typographies et ton choisis à partir de votre boutique réelle, pas d'un thème acheté. Deux fleuristes clients n'auront jamais le même site.",
  },
  {
    icon: Article,
    title: "Des pages services qui travaillent",
    body: "Mariage, deuil, entreprises, ateliers\u00a0: chaque prestation a sa page dédiée, avec le bon vocabulaire et le bon appel à l'action. C'est aussi le premier levier de visibilité locale.",
  },
  {
    icon: PencilSimpleLine,
    title: "Des contenus que vous maîtrisez",
    body: "Horaires, photos, fermetures, prix, actualités\u00a0: vous modifiez tout vous-même, sans nous attendre ni payer de ticket. Formation incluse à la livraison.",
  },
  {
    icon: Lightning,
    title: "Une base technique rapide et saine",
    body: "Chargement rapide, images optimisées, structure comprise par Google, sécurité et sauvegardes. L'invisible qui fait la différence durable\u00a0: un visiteur qui attend ne devient jamais un client.",
  },
  {
    icon: MapPin,
    title: "La connexion à votre fiche Google",
    body: (
      <>
        Site et fiche Google Business Profile racontent la même chose&nbsp;: mêmes
        horaires, mêmes services, même adresse. Cette cohérence est un fondement
        du référencement local, détaillé sur{" "}
        <Link href="/fleuristes/seo-local">notre page dédiée</Link>.
      </>
    ),
  },
];

/** Les trois téléphones de la section mobile, du plus bas au plus haut. */
const mobileSlugs = ["fleurs-ditalie", "monloup", "julius"] as const satisfies readonly ShowcaseSlug[];
const mobileSites = mobileSlugs
  .map((slug) => getShowcaseSite(slug))
  .filter((s): s is ShowcaseSite => Boolean(s));
/* Décalage vertical de chaque téléphone : celui du milieu monte plus haut. */
const phoneDrops = ["-mb-[30%] mt-[14%]", "-mb-[14%]", "-mb-[30%] mt-[22%]"];

const steps = [
  {
    week: "Semaine 1",
    title: "Cadrage",
    body: "Visite (ou visio) de votre boutique, revue de vos services et de votre clientèle, collecte des contenus existants. Vous validez l'architecture des pages avant qu'une seule ligne de design ne soit dessinée.",
  },
  {
    week: "Semaine 2",
    title: "Direction visuelle",
    body: "Deux pistes d'identité, appliquées à votre page d'accueil réelle plutôt qu'à une maquette abstraite. Vous choisissez, nous affinons jusqu'à ce que ça vous ressemble vraiment.",
  },
  {
    week: "Semaine 3",
    title: "Construction",
    body: "Toutes les pages sont montées avec vos contenus réels, pas du texte de remplissage. Vous suivez l'avancement sur un lien privé, à votre rythme.",
  },
  {
    week: "Semaine 4",
    title: "Lancement",
    body: "Tests mobiles, connexion de la fiche Google, mise en ligne, formation d'une heure sur votre propre contenu. Le site est à vous, avec ses accès.",
  },
];

const routes = [
  {
    href: "/fleuristes/e-commerce",
    title: "Vendre en ligne dès le lancement",
    body: "Catalogue, click-and-collect et livraison locale sur la même base\u00a0: notre offre e-commerce est le point de départ le plus direct.",
    label: "E-commerce pour fleuriste",
    tone: "bg-blush",
  },
  {
    href: "/sites-internet",
    title: "Vous tenez un autre commerce",
    body: "La même exigence, appliquée à votre métier\u00a0: sites vitrines et boutiques en ligne pour artisans, salons et commerces de proximité.",
    label: "Sites internet, tous métiers",
    tone: "border border-line bg-white",
  },
];

const faq: FaqItem[] = [
  {
    question: "Pourquoi pas un site Wix ou un template à 30\u00a0€\u00a0?",
    answer: (
      <p>
        Vous pouvez tout à fait démarrer ainsi, beaucoup le font. Les limites
        arrivent vite&nbsp;: un design partagé avec des centaines de commerces, des
        performances moyennes sur mobile, un référencement local difficile à
        travailler sérieusement, et un temps considérable passé à bricoler.
        Notre travail se compare au vôtre&nbsp;: une composition sur mesure ne joue
        pas dans la même catégorie qu&apos;un bouquet de station-service.
      </p>
    ),
  },
  {
    question: "Le site m'appartient-il vraiment\u00a0?",
    answer: (
      <p>
        Oui&nbsp;: nom de domaine à votre nom, contenus et photos à vous, code et
        hébergement transférables. Si nous cessons de travailler ensemble, vous
        partez avec votre site. C&apos;est écrit dans nos devis.
      </p>
    ),
  },
  {
    question: "Et si je veux vendre en ligne plus tard\u00a0?",
    answer: (
      <p>
        Le site vitrine est construit sur la même base que{" "}
        <Link href="/fleuristes/e-commerce">notre offre e-commerce</Link>&nbsp;:
        ajouter le catalogue, le click-and-collect et le paiement se fait sans
        refonte. Beaucoup de nos échanges commencent par un site vitrine et
        grandissent ensuite.
      </p>
    ),
  },
  {
    question: "J'ai déjà un site, qu'est-ce qui se passe pour Google\u00a0?",
    answer: (
      <p>
        Les pages qui ont de la valeur (celles que Google connaît déjà, celles
        que vos clients ont mises en favori) sont redirigées vers leur
        nouvelle adresse plutôt que supprimées. C&apos;est ce qui évite de
        perdre en une nuit une visibilité construite pendant des années.
      </p>
    ),
  },
  {
    question: "Combien ça coûte\u00a0?",
    answer: (
      <p>
        Sur devis, après un échange sur votre situation&nbsp;: voir{" "}
        <Link href="/services">le détail des offres</Link>. Le devis liste
        précisément ce qui est inclus. Pour vous faire une idée du marché,
        lisez aussi notre article{" "}
        <Link href="/blog/site-internet-fleuriste-checklist">
          sur ce que doit contenir un site de fleuriste
        </Link>
        .
      </p>
    ),
  },
];

export default function SiteInternetPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site internet pour fleuriste",
          description:
            "Conception de sites sur mesure pour fleuristes : identité visuelle, pages services, mobile premium, SEO de base et autonomie de mise à jour.",
          path: "/fleuristes/site-internet",
          serviceType: "Création de site internet",
          audience: "Fleuristes indépendants",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · Site internet"
        title={
          <>
            Un site de fleuriste à la hauteur de{" "}
            <span className="text-bloom-ink">votre vitrine</span>
          </>
        }
        lede="Pas vos photos posées dans un template&nbsp;: un site qui raconte votre maison et guide vers la commande."
        aside={<DuoShowcase slug="maison-hortense" eager />}
      >
        <HeroActions placement="site_internet_hero" />
      </PageHero>

      {/* Ce que vous recevez : le propos reste collé à gauche pendant que
          la liste défile à droite. Mobile : propos puis liste. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-display-lg">Ce que vous recevez, sans superflu</h2>
                <p className="lede mt-6">
                  Chaque élément répond à un problème observé chez de vrais
                  fleuristes, pas à une case de plaquette commerciale.
                </p>
                <p className="mt-5 max-w-md leading-relaxed text-forest-soft">
                  Votre boutique physique est votre meilleur argument&nbsp;:
                  lumière, odeurs, compositions du jour. Le site a un seul
                  travail. Prolonger cette impression chez quelqu&apos;un qui
                  ne vous connaît pas encore, puis l&apos;amener à pousser
                  votre porte ou à commander.
                </p>
              </div>
            </div>
            <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
              {deliverables.map(({ icon: ItemIcon, title, body }, i) => (
                <li key={title} className="border-b border-line">
                  <Reveal delay={Math.min(i, 2) * 80}>
                    <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 py-8 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-7">
                      <span className="grid size-11 place-items-center rounded-full bg-mint text-forest sm:size-13">
                        <ItemIcon aria-hidden="true" className="size-5 sm:size-6" />
                      </span>
                      <div>
                        <h3 className="text-display-sm">{title}</h3>
                        <p className="prose-links mt-2.5 max-w-[58ch] leading-relaxed text-forest-soft">
                          {body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Le mobile, montré : trois téléphones qui montent du bord bas d'un
          panneau rose. Mobile : texte puis téléphones, à la même échelle
          relative. */}
      <section className="py-4 sm:py-8">
        <Container width="wide">
          <div className="leaf-lg overflow-hidden bg-blush">
            <div className="grid lg:grid-cols-12 lg:items-center">
              <div className="px-6 pt-12 sm:px-12 sm:pt-16 lg:col-span-5 lg:py-20 lg:pr-4">
                <h2 className="text-display-lg">Pensé d&apos;abord pour le téléphone</h2>
                <p className="lede mt-6">
                  L&apos;essentiel de vos visiteurs arrive du téléphone,
                  souvent depuis votre fiche Google. Horaires, itinéraire,
                  appel, commande&nbsp;: tout est accessible en deux gestes.
                </p>
              </div>
              <div className="mt-12 flex items-start justify-center gap-[4%] px-[6%] lg:col-span-7 lg:mt-0 lg:self-stretch lg:px-[5%] lg:pt-16">
                {mobileSites.map((site, i) => (
                  <div key={site.slug} className={`w-[30%] max-w-[13.5rem] ${phoneDrops[i]}`}>
                    <PhoneShot site={site} sizes="(min-width: 1024px) 13.5rem, 30vw" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="caption mt-4 px-1">
            Versions mobiles de{" "}
            {mobileSites.map((s, i) => (
              <span key={s.slug}>
                {s.name} ({s.city})
                {i < mobileSites.length - 2 ? ", " : i === mobileSites.length - 2 ? " et " : ""}
              </span>
            ))}
            , telles qu&apos;elles s&apos;affichent en ligne aujourd&apos;hui.
          </p>
        </Container>
      </section>

      {/* Quatre semaines : une vraie séquence, donc numérotée.
          Desktop : quatre colonnes sous un filet. Mobile : fil vertical. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-3xl">
            Quatre semaines, quatre jalons validés ensemble
          </h2>
          <ol className="mt-12 grid gap-0 border-l-2 border-line-strong pl-6 sm:mt-16 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:pl-0">
            {steps.map((s, i) => (
              <li key={s.week} className="relative pb-10 last:pb-0 lg:border-t-2 lg:border-forest lg:pb-0 lg:pt-7">
                <Reveal delay={Math.min(i, 2) * 80}>
                  <p className="step-num">{s.week}</p>
                  <h3 className="text-display-md mt-3">{s.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-forest-soft">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="prose-links mt-12 text-[0.95rem] text-forest-soft">
            La version détaillée de ce processus&nbsp;:{" "}
            <Link href="/methode">notre méthode</Link>.
          </p>
        </Container>
      </section>

      {/* Bifurcation : la vitrine d'abord, ou la boutique tout de suite ;
          fleuriste, ou autre métier. Deux panneaux-liens côte à côte en
          tablette et desktop, empilés en mobile. */}
      <section className="pb-8 sm:pb-12">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">La vitrine d&apos;abord, la vente en ligne ensuite</h2>
            <p className="lede mt-6">
              Ce site convient aux boutiques qui vendent déjà bien au comptoir
              et veulent enfin une présence en ligne à leur hauteur. La vente
              en ligne vient ensuite, si le besoin se confirme.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`leaf group flex flex-col justify-between gap-10 p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-10 ${r.tone}`}
              >
                <span>
                  <span className="block text-display-md transition-colors group-hover:text-bloom-ink">
                    {r.title}
                  </span>
                  <span className="mt-3 block max-w-md leading-relaxed text-forest-soft">{r.body}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-bloom-ink">
                  {r.label}
                  <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FaqBlock
        title="Avant de vous décider"
        items={faq}
        reading={[articleLink("site-internet-fleuriste-checklist")]}
      />

      <CtaBand
        intent="audit"
        placement="site_internet_footer"
        title="Montrez-nous votre vitrine actuelle."
        lede="Ou dites-nous qu'elle n'existe pas encore. Le diagnostic gratuit vous dit ce qui mérite d'être gardé, corrigé ou reconstruit, sans jargon ni engagement."
      />
    </>
  );
}
