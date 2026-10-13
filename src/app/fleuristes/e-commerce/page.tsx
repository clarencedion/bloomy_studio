import Link from "next/link";
import {
  ArrowRight,
  CalendarStar,
  Check,
  ClipboardText,
  CreditCard,
  Storefront,
  Truck,
  Flower,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { CaptureCrop } from "@/components/fleuristes/CaptureCrop";
import { FaqBlock } from "@/components/fleuristes/FaqBlock";
import { HeroActions } from "@/components/fleuristes/HeroActions";
import { articleLink } from "@/components/fleuristes/reading";
import { StorefrontShowcase } from "@/components/fleuristes/StorefrontShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SiteCard } from "@/components/visuals/ShowcaseSites";
import { getShowcaseSite, type ShowcaseSite } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Site e-commerce fleuriste : click-and-collect & livraison",
  description:
    "Boutique en ligne pensée pour le métier de fleuriste : catalogue saisonnier, click-and-collect, livraison locale, paiement sécurisé, sans commission.",
  path: "/fleuristes/e-commerce",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "E-commerce", path: "/fleuristes/e-commerce" },
];

/*
 * Osmose Florale est LE site fleuriste du studio. On n'en dit que ce qui est
 * vérifié : une boutique en ligne de fleurs, avec livraison locale à Marboz.
 */
const showcaseCaption = "Une vraie boutique en ligne de fleurs, avec livraison locale à Marboz.";

/*
 * Recadrage de la capture longue d'Osmose Florale (960 × 3000) sur sa
 * collection en ligne. Coordonnées en pixels du fichier source.
 */
const catalogueCrop = { x: 48, y: 880, w: 864, h: 588 };
const osmoseTone = getShowcaseSite("osmose-florale")?.tone;

/** Les parcours d'une commande, après le catalogue. */
const journeys: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Storefront,
    title: "Click-and-collect avec créneaux",
    body: "Le client commande, choisit son créneau de retrait, paie en ligne. Vous préparez entre deux clients au comptoir. Les créneaux se règlent selon vos journées\u00a0: resserrés le samedi, élargis en semaine.",
  },
  {
    icon: Truck,
    title: "Livraison locale par zones",
    body: "Vos zones, vos frais, vos horaires de tournée. Livraison le jour même si la commande arrive avant l'heure que vous fixez. Adresse et créneau vérifiés à la commande\u00a0: fini les allers-retours téléphoniques.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé, encaissé chez vous",
    body: "Paiement par carte via un prestataire certifié, versé directement sur votre compte. Aucune commission Bloomy Studio sur vos ventes\u00a0: nous vendons un outil, pas un pourcentage.",
  },
  {
    icon: Flower,
    title: "Le deuil traité avec soin",
    body: "Un parcours dédié, sobre, avec livraison en cérémonie, message d'accompagnement et facturation adaptée. C'est souvent la première commande d'un client qui ne vous connaît pas\u00a0: elle doit être irréprochable.",
  },
  {
    icon: CalendarStar,
    title: "Pages saisonnières prêtes avant les pics",
    body: "Saint-Valentin, fête des mères, Toussaint\u00a0: précommandes ouvertes en amont, créneaux renforcés, offre resserrée. Le site absorbe le pic au lieu de le subir.",
  },
  {
    icon: ClipboardText,
    title: "Et le matin, tout tient sur un écran",
    body: "Les commandes du jour, leur créneau de retrait et leur état d'avancement au même endroit. Plus de cahier, plus de captures d'écran Instagram, plus de «\u00a0on avait dit quelle heure\u00a0?\u00a0».",
  },
];

/** Ce qui reste chez le fleuriste quand la commande passe par sa boutique. */
const kept: { title: string; body: string }[] = [
  { title: "Le prix payé", body: "encaissé directement sur votre compte, sans commission" },
  { title: "Votre identité", body: "votre nom, votre univers, vos photos" },
  { title: "Vos clients", body: "et le droit de les recontacter, avec leur accord" },
  { title: "Vos prix", body: "fixés par vous, ajustés quand vous le décidez" },
];

/** Deux autres boutiques florales qui vendent et livrent en ligne. */
const otherShops = (["maison-de-rose", "capifiore"] as const)
  .map((slug) => getShowcaseSite(slug))
  .filter((s): s is ShowcaseSite => Boolean(s));

const faq: FaqItem[] = [
  {
    question: "Je n'ai pas le temps de gérer une boutique en ligne.",
    answer: (
      <p>
        C&apos;est l&apos;objection la plus fréquente, et la plus juste. Notre
        réponse tient en deux principes&nbsp;: ne mettre en ligne que ce qui se gère
        en gammes (pas une photo par bouquet), et regrouper les actions dans
        des moments courts (valider les commandes du matin, fermer un créneau).
        Comptez dix minutes par jour, pas une heure. La{" "}
        <Link href="/fleuristes/maintenance">maintenance</Link>{" "}couvre le reste.
      </p>
    ),
  },
  {
    question: "Quelle différence avec vendre via une grande plateforme\u00a0?",
    answer: (
      <p>
        Sur votre boutique en ligne&nbsp;: vos prix, votre identité, vos clients
        (avec leur accord, vous pouvez les recontacter), et le montant de
        chaque vente encaissé chez vous, sans commission. Sur une plateforme&nbsp;: une commission sur chaque
        commande et un client qui appartient à la plateforme. Notre analyse
        complète&nbsp;:{" "}
        <Link href="/blog/marketplace-ou-site-en-propre">marketplace ou site en propre</Link>.
      </p>
    ),
  },
  {
    question: "Et les compositions personnalisées\u00a0?",
    answer: (
      <p>
        Le sur-mesure reste votre cœur de métier. Le site le sert avec un
        parcours «&nbsp;bouquet personnalisé&nbsp;»&nbsp;: budget, occasion, couleurs,
        message. Vous recevez un brief clair et confirmez par téléphone si
        besoin. Nous avons construit ce type de parcours pour{" "}
        <Link href="/realisations/bloomy-plateforme-florale">Bloomy</Link>, où
        le client compose fleur par fleur.
      </p>
    ),
  },
  {
    question: "Faut-il déjà avoir un site vitrine\u00a0?",
    answer: (
      <p>
        Non. L&apos;offre Boutique inclut tout le socle du{" "}
        <Link href="/fleuristes/site-internet">site sur mesure</Link>{" "}(identité,
        pages services, mobile), plus la vente en ligne. Si vous avez déjà un
        site récent et sain, nous étudions s&apos;il peut servir de base&nbsp;;
        s&apos;il dessert votre image, nous vous le dirons honnêtement.
      </p>
    ),
  },
];

export default function EcommercePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Site e-commerce pour fleuriste",
          description:
            "Création de boutiques en ligne pour fleuristes : catalogue saisonnier, click-and-collect, livraison locale, paiement sécurisé.",
          path: "/fleuristes/e-commerce",
          serviceType: "Création de site e-commerce",
          audience: "Fleuristes indépendants",
        })}
      />

      {/* Ouverture : Osmose Florale, la boutique en ligne de référence du
          studio, sur ordinateur et sur téléphone, avant tout argumentaire. */}
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · E-commerce"
        title={
          <>
            Une boutique en ligne pensée pour un{" "}
            <span className="text-bloom-ink">comptoir de fleuriste</span>
          </>
        }
        lede="Stock du matin, click-and-collect, tournées, pics saisonniers&nbsp;: des parcours construits pour votre métier, pas pour n'importe quel commerce."
        visual={<StorefrontShowcase slug="osmose-florale" caption={showcaseCaption} eager />}
      >
        <HeroActions placement="ecommerce_hero" />
      </PageHero>

      {/* Le catalogue : un détail réel de la boutique d'Osmose Florale à
          gauche, le raisonnement à droite.
          Desktop : 7 / 5. Mobile : le texte d'abord, puis la capture. */}
      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <h2 className="text-display-lg">Un catalogue saisonnier, pas un catalogue figé</h2>
              <p className="lede mt-6">
                Un site e-commerce de fleuriste n&apos;est pas un e-commerce
                générique avec des photos de fleurs.
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-forest-soft">
                Des gammes («&nbsp;bouquet du marché dès 25&nbsp;€&nbsp;») plutôt qu&apos;une
                photo par composition, des disponibilités modifiables en un
                geste, des collections par saison et par occasion. Le catalogue
                suit vos arrivages, pas l&apos;inverse.
              </p>
              <p className="prose-links mt-4 max-w-xl leading-relaxed text-forest-soft">
                Ces parcours, nous les avons construits en production sur{" "}
                <a href="https://bloomy.one">bloomy.one</a>, la plateforme de
                composition florale du studio. Votre boutique en profite dès le
                premier jour.
              </p>
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <figure>
                <div className="leaf p-4 sm:p-8" style={{ backgroundColor: osmoseTone }}>
                  <CaptureCrop
                    src="/realisations/long/osmose-florale.webp"
                    width={960}
                    height={3000}
                    crop={catalogueCrop}
                    alt="La collection en ligne d'Osmose Florale&nbsp;: bouquets de roses présentés avec leur prix de départ."
                    sizes="(min-width: 1024px) 50rem, 110vw"
                    className="rounded-xl shadow-float"
                  />
                </div>
                <figcaption className="caption mt-4 px-1">
                  La collection en ligne d&apos;Osmose Florale, à Marboz, telle
                  qu&apos;elle s&apos;affiche aujourd&apos;hui.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Les parcours d'une commande, en fiche technique à deux colonnes.
          Mobile : une colonne, icône à gauche du titre. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">Six réalités du métier, six parcours prêts</h2>
            <p className="lede mt-6">
              Chaque fonctionnalité existe parce qu&apos;un vrai fleuriste en a
              eu besoin, jamais parce qu&apos;elle remplissait une grille
              tarifaire.
            </p>
          </div>
          <ul className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {journeys.map(({ icon: ItemIcon, title, body }, i) => (
              <li key={title} className="border-t border-line pt-7">
                <Reveal delay={(i % 2) * 80}>
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-bloom-ink">
                      <ItemIcon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="text-display-sm">{title}</h3>
                  </div>
                  <p className="mt-4 max-w-[58ch] leading-relaxed text-forest-soft">{body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le calcul, sur le seul panneau vert de la page.
          Desktop : raisonnement 6 / ce qui reste chez vous 6.
          Mobile : l'un sous l'autre. */}
      <section className="py-6 sm:py-10">
        <Container width="wide">
          <div className="on-forest leaf-lg bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-display-lg text-paper">
                  Une commission économisée est une marge{" "}
                  <span className="text-bloom-light">retrouvée</span>
                </h2>
                <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-paper/80">
                  Les plateformes de transmission florale prélèvent un
                  pourcentage sur chaque commande, auquel s&apos;ajoutent
                  souvent des frais d&apos;abonnement. Sur un panier moyen de
                  bouquet, faites le calcul sur une année&nbsp;: c&apos;est
                  fréquemment le prix d&apos;un site entier. Nous ne vous dirons
                  jamais de quitter ces canaux du jour au lendemain. Mais chaque
                  commande qui passe par votre propre boutique vous revient en
                  totalité.
                </p>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-leaf">
                  Aucune promesse de chiffre d&apos;affaires ici&nbsp;: le résultat
                  dépend de votre zone, de votre offre et de votre régularité.
                  Nous mesurons tout, avec vous, chaque mois.
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-display-sm text-paper">
                  Ce qui reste chez vous avec votre boutique en ligne
                </p>
                <ul className="mt-6 border-t border-line-dark">
                  {kept.map((k) => (
                    <li key={k.title} className="flex gap-4 border-b border-line-dark py-5">
                      <Check
                        aria-hidden="true"
                        weight="bold"
                        className="mt-1 size-5 shrink-0 text-bloom-light"
                      />
                      <p className="leading-relaxed">
                        <span className="font-semibold text-paper">{k.title}</span>
                        <span className="text-leaf">, {k.body}.</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Deux autres boutiques florales qui vendent en ligne, à échelles
          inégales. Desktop : 7 / 5, la seconde descend d'un cran.
          Mobile : l'une sous l'autre. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-display-lg max-w-2xl">
              D&apos;autres comptoirs qui vendent déjà en ligne
            </h2>
            <Link
              href="/fleuristes"
              className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-bloom-ink"
            >
              <span className="link-live">Toutes les boutiques de fleuristes</span>
              <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
            </Link>
          </div>
          <div className="mt-12 grid items-start gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-10">
            {otherShops.map((site, i) => (
              <SiteCard
                key={site.slug}
                site={site}
                sizes={i === 0 ? "(min-width: 1024px) 46rem, 100vw" : "(min-width: 1024px) 32rem, 100vw"}
                className={i === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24"}
              />
            ))}
          </div>
        </Container>
      </section>

      <FaqBlock
        title="Ce que les fleuristes nous demandent"
        items={faq}
        reading={[
          articleLink("marketplace-ou-site-en-propre"),
          {
            href: "/fleuristes/seo-local",
            kind: "Page · être trouvé avant de vendre",
            label: "SEO local pour fleuriste",
          },
          {
            href: "/fleuristes/maintenance",
            kind: "Page · après la mise en ligne",
            label: "L'accompagnement continu",
          },
        ]}
      />

      <CtaBand
        intent="audit"
        placement="ecommerce_footer"
        title="Vendez chez vous, pas sur une plateforme."
        lede="Le diagnostic gratuit évalue votre potentiel de vente en ligne&nbsp;: zone, concurrence, offre. Réponse concrète, sans engagement."
      />
    </>
  );
}
