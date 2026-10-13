import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { FaqBlock } from "@/components/fleuristes/FaqBlock";
import { FloristWall } from "@/components/fleuristes/FloristWall";
import { HeroActions } from "@/components/fleuristes/HeroActions";
import { InkWords } from "@/components/fleuristes/InkWords";
import { articleLink } from "@/components/fleuristes/reading";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import { Kicker } from "@/components/ui/Kicker";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SiteShowpiece } from "@/components/visuals/ShowcaseSites";
import { floristSites } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Agence web pour fleuristes : site, e-commerce, SEO local",
  description:
    "Bloomy Studio conçoit sites, boutiques en ligne et visibilité Google pour fleuristes indépendants, avec l'expertise de la plateforme bloomy.one.",
  path: "/fleuristes",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
];

/*
 * Les journées d'un fleuriste, en grille à cellules inégales. Chaque cellule
 * déclare sa teinte et son emprise ; la photo d'ambiance occupe la septième
 * cellule (deux rangées en desktop). Elle illustre le métier, jamais un client.
 */
type Season = {
  title: string;
  body: string;
  tone: "blush" | "mint" | "white";
  /** Emprise en desktop (grille de 12). */
  span: string;
  lead?: boolean;
};

const seasons: Season[] = [
  {
    title: "Saint-Valentin et fête des mères",
    body: "Vos deux plus gros pics de l'année se jouent en quelques jours. Pages dédiées prêtes trois semaines avant, créneaux de retrait renforcés, précommandes\u00a0: le site absorbe la demande au lieu de la perdre.",
    tone: "blush",
    span: "md:col-span-2 lg:col-span-7",
    lead: true,
  },
  {
    title: "Mariages",
    body: "Un mariage se prépare des mois à l'avance et se choisit sur dossier. Une page mariage avec vos réalisations, votre démarche et un formulaire de brief attire des demandes qualifiées, pas des curieux.",
    tone: "white",
    span: "lg:col-span-5",
  },
  {
    title: "Deuil",
    body: "Les familles cherchent dans l'urgence, souvent depuis un téléphone, avec une charge émotionnelle forte. Un parcours sobre, clair, avec livraison directe en cérémonie, est un vrai service rendu.",
    tone: "mint",
    span: "lg:col-span-4",
  },
  {
    title: "Entreprises et abonnements",
    body: "Bureaux, hôtels, restaurants\u00a0: des revenus récurrents que peu de fleuristes valorisent en ligne. Une page dédiée avec demande de devis structure cette clientèle.",
    tone: "white",
    span: "lg:col-span-4",
  },
  {
    title: "Le quotidien",
    body: "Anniversaires, naissances, «\u00a0je passe ce soir\u00a0»\u00a0: le client veut savoir si c'est ouvert, ce qui est disponible et si on peut lui préparer quelque chose pour 18\u00a0h. Click-and-collect et catalogue à jour répondent à ça.",
    tone: "white",
    span: "lg:col-span-4",
  },
  {
    title: "Le stock qui change chaque matin",
    body: "Votre catalogue n'est pas figé\u00a0: arrivages, saisons, météo. Votre site doit se mettre à jour en deux minutes depuis le comptoir, pas via un ticket à votre prestataire.",
    tone: "blush",
    span: "lg:col-span-4",
  },
];

const seasonTones: Record<Season["tone"], string> = {
  blush: "bg-blush",
  mint: "bg-mint",
  white: "border border-line bg-white",
};

const pillars = [
  {
    title: "Un site à la hauteur de votre boutique",
    body: "Identité visuelle propre à votre maison, photos mises en valeur, textes qui parlent votre langue. Rapide et impeccable sur mobile, là où vos clients vous cherchent.",
    href: "/fleuristes/site-internet",
    label: "Création de site pour fleuriste",
  },
  {
    title: "Vendre en ligne sans reverser de commission",
    body: "Catalogue saisonnier, click-and-collect avec créneaux, livraison locale par zones, paiement sécurisé. Chaque commande passée sur votre site est une commande que les plateformes ne prélèvent pas.",
    href: "/fleuristes/e-commerce",
    label: "E-commerce et click-and-collect",
  },
  {
    title: "Être trouvé sur Google et Google Maps",
    body: "Fiche Google Business Profile complète et cohérente avec votre site, pages services dédiées, stratégie d'avis régulière\u00a0: les fondamentaux du référencement local, appliqués sérieusement.",
    href: "/fleuristes/seo-local",
    label: "SEO local pour fleuriste",
  },
  {
    title: "Un site vivant, pas un site livré",
    body: "Mises à jour, sauvegardes, pages saisonnières préparées avant les pics, rapport mensuel lisible. Vous savez ce qui se passe et ce que ça rapporte.",
    href: "/fleuristes/maintenance",
    label: "Maintenance et accompagnement",
  },
];

const faq: FaqItem[] = [
  {
    question: "Mon stock change tous les jours. Comment un site peut-il suivre\u00a0?",
    answer: (
      <p>
        C&apos;est précisément pour cela que nous ne vendons pas de catalogue
        figé. Vous gérez des disponibilités&nbsp;: un bouquet passe «&nbsp;épuisé&nbsp;» en un
        geste, une nouvelle création se publie depuis le téléphone, et les
        gammes de prix («&nbsp;bouquet du marché dès 25&nbsp;€&nbsp;») évitent de photographier
        chaque composition. Voir{" "}
        <Link href="/fleuristes/e-commerce">notre approche e-commerce</Link>.
      </p>
    ),
  },
  {
    question: "Que penser des grandes plateformes de transmission florale\u00a0?",
    answer: (
      <p>
        Elles apportent des commandes, mais au prix de commissions importantes
        et d&apos;un catalogue standardisé qui efface votre identité. Notre
        position est pragmatique&nbsp;: gardez-les si elles vous rapportent, mais
        construisez en parallèle un canal qui vous appartient. Votre site, vos
        prix, vos marges, vos clients. C&apos;est la conviction qui a fondé{" "}
        <a href="https://bloomy.one">Bloomy</a>&nbsp;: 0&nbsp;% de commission pour
        l&apos;artisan.
      </p>
    ),
  },
  {
    question: "Je n'ai pas de belles photos de mes créations.",
    answer: (
      <p>
        C&apos;est le cas de la plupart de nos interlocuteurs, et ça se résout.
        Nous concevons d&apos;abord un site qui met en valeur des photos
        simples prises au téléphone dans de bonnes conditions, et nous vous
        montrons comment. Si vous voulez aller plus loin, la direction photo
        fait partie de <Link href="/services">nos services complémentaires</Link>.
      </p>
    ),
  },
  {
    question: "En combien de temps mon site peut-il être en ligne\u00a0?",
    answer: (
      <p>
        Un site vitrine soigné&nbsp;: environ quatre semaines. Une boutique en ligne
        complète&nbsp;: six à huit semaines selon le catalogue. Si vous visez un pic
        (Saint-Valentin, fête des mères), parlons-en tôt&nbsp;: nous planifions pour
        que le site travaille pendant le pic, pas qu&apos;il sorte juste après.
      </p>
    ),
  },
];

export default function FleuristesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Services digitaux pour fleuristes",
          description:
            "Création de site internet, e-commerce, click-and-collect et SEO local pour fleuristes indépendants.",
          path: "/fleuristes",
          serviceType: "Création de site internet et SEO local pour fleuristes",
          audience: "Fleuristes indépendants",
        })}
      />

      {/* Ouverture : le site fleuriste de référence du studio, en grand,
          avant tout argumentaire. La capture longue défile au survol. */}
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes"
        title={
          <>
            L&apos;agence web des <span className="text-bloom-ink">fleuristes</span>{" "}
            indépendants
          </>
        }
        lede="Sites, boutiques en ligne et visibilité Google, pensés pour les saisons, le comptoir et les commandes d'un fleuriste."
        visual={<SiteShowpiece slug="osmose-florale" eager />}
      >
        <HeroActions placement="fleuristes_hero" />
      </PageHero>

      {/* Le mur des boutiques : toutes les autres vitrines florales, formats
          mêlés. Desktop en colonnes, mobile en rail horizontal. */}
      <section className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">
              {floristSites.length}&nbsp;boutiques en ligne, chacune à son image
            </h2>
            <p className="lede mt-5">
              Chaque site part de la boutique&nbsp;: ses matières, ses couleurs, sa
              façon de vendre. Ce sont des adresses publiques, pas des
              maquettes. Ouvrez-les.
            </p>
          </div>
          <FloristWall exclude={["osmose-florale"]} className="mt-12 sm:mt-16" />
        </Container>
      </section>

      {/* Le métier, en grille à cellules inégales.
          Mobile : une colonne, la photo entre « Mariages » et « Deuil ».
          Tablette : deux colonnes. Desktop : 7/5 puis photo sur deux rangées. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">
              Un site de fleuriste se pense autour de vos vraies journées
            </h2>
            <p className="lede mt-5">
              Un prestataire généraliste voit un «&nbsp;commerce de détail&nbsp;». Nous
              voyons des arrivages du matin, des pics saisonniers, des mariages
              sur dossier et des familles en deuil qui commandent depuis un
              téléphone.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {seasons.slice(0, 2).map((s) => (
              <SeasonCell key={s.title} season={s} />
            ))}
            <div className="leaf relative min-h-[18rem] overflow-hidden md:min-h-0 lg:col-span-4 lg:row-span-2">
              <Image
                src="/photos/mains-composition-wide.webp"
                alt="Mains d'une fleuriste ajustant un bouquet de roses et d'hortensias."
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
            {seasons.slice(2).map((s) => (
              <SeasonCell key={s.title} season={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Les quatre briques, sur un panneau vert : la tige du système.
          Desktop : présentation à gauche (5), liens à droite (7).
          Mobile : présentation puis liste, pleine largeur. */}
      <section className="py-6 sm:py-10">
        <Container width="wide">
          <div className="on-forest leaf-lg bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="text-display-lg text-paper">
                  Le système complet, brique par brique
                </h2>
                <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/80">
                  Chaque brique a sa page dédiée, parce que chaque sujet mérite
                  mieux que trois lignes dans une liste.
                </p>
                <p className="prose-links mt-4 max-w-md text-[1.05rem] leading-relaxed text-paper/80">
                  Pas une déclinaison «&nbsp;métiers de bouche et artisans&nbsp;»&nbsp;: une
                  spécialisation née en créant{" "}
                  <a href="https://bloomy.one">bloomy.one</a>, la plateforme de
                  composition florale, aux côtés de vrais artisans.
                </p>
              </div>
              <ul className="border-t border-line-dark lg:col-span-7">
                {pillars.map((p) => (
                  <li key={p.href} className="border-b border-line-dark">
                    <Link
                      href={p.href}
                      className="group grid gap-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8 sm:py-8"
                    >
                      <span>
                        <span className="block text-display-md text-paper transition-colors group-hover:text-bloom-light">
                          {p.title}
                        </span>
                        <span className="mt-2.5 block max-w-xl leading-relaxed text-paper/75">
                          {p.body}
                        </span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-bloom-light">
                          {p.label}
                          <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Conviction : une phrase à l'encre, qui se remplit en traversant
          l'écran, puis le raisonnement décalé sur la droite. */}
      <section className="py-24 sm:py-36">
        <Container width="wide">
          <Kicker ruled className="mb-8">
            Notre conviction
          </Kicker>
          <h2 className="scroll-ink text-display-xl max-w-5xl">
            <InkWords text="Votre canal en propre d'abord, les plateformes ensuite." />
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6 lg:col-start-6">
              <p className="text-[1.08rem] leading-relaxed text-forest-soft">
                La transmission florale prélève sa marge sur chaque bouquet et
                standardise votre catalogue. Nous avons construit Bloomy sur le
                principe inverse, 0&nbsp;% de commission pour l&apos;artisan, et
                votre site suit la même logique&nbsp;: vos commandes vous
                appartiennent entièrement. Un site en propre ne remplace pas
                votre présence ailleurs. Il vous rend le choix.
              </p>
              <Link
                href="/blog/marketplace-ou-site-en-propre"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-bloom-ink"
              >
                <span className="link-live">Marketplace ou site en propre, le vrai calcul</span>
                <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqBlock
        title="Questions de fleuristes, réponses concrètes"
        items={faq}
        reading={[
          articleLink("site-internet-fleuriste-checklist"),
          articleLink("apparaitre-google-maps-fleuriste"),
        ]}
      />

      <CtaBand
        intent="audit"
        placement="fleuristes_footer"
        title="Commençons par un diagnostic."
        lede="Site actuel, fiche Google, visibilité face aux fleuristes voisins&nbsp;: une analyse humaine et concrète, gratuite et sans engagement."
      />
    </>
  );
}

function SeasonCell({ season }: { season: Season }) {
  return (
    <Reveal className={`${season.span} flex`}>
      <article
        className={`leaf flex w-full flex-col justify-between gap-8 p-7 sm:p-9 ${seasonTones[season.tone]}`}
      >
        <h3 className={season.lead ? "text-display-lg" : "text-display-md"}>{season.title}</h3>
        <p
          className={`leading-relaxed text-forest-soft ${
            season.lead ? "max-w-xl text-[1.06rem]" : "text-[0.98rem]"
          }`}
        >
          {season.body}
        </p>
      </article>
    </Reveal>
  );
}
