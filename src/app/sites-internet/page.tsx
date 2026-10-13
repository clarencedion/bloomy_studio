import Link from "next/link";
import {
  DeviceMobile,
  Key,
  MagnifyingGlass,
  PaintBrushBroad,
  PencilSimpleLine,
  ShoppingBagOpen,
} from "@phosphor-icons/react/dist/ssr";

import { CaptureStage } from "@/components/products/CaptureStage";
import { SectorPanel, type SectorLink } from "@/components/products/SectorPanel";
import { StickyFeatureSplit, type Feature } from "@/components/products/StickyFeatureSplit";
import { WorkMosaic } from "@/components/products/WorkMosaic";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { clientSites, conceptSites, getShowcaseSite, recentSites, type ShowcaseSlug } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Création de site internet et e-commerce sur mesure",
  description:
    "Sites vitrines et boutiques en ligne conçus sur mesure : identité propre, mobile soigné, contenus que vous modifiez seul, référencement local solide.",
  path: "/sites-internet",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Sites internet", path: "/sites-internet" },
];

/**
 * Page produit « Sites internet », niveau générique.
 *
 * Récit : montrer un site livré (hero), puis d'autres univers en ligne
 * (galerie), dire ce que le client reçoit (liste collante), renvoyer vers la
 * déclinaison de son métier (panneau forest), répondre aux objections (FAQ).
 * Cinq familles de mise en page, aucune répétée.
 *
 * Règle AGENTS.md : la page générique renvoie vers chaque déclinaison métier
 * existante (fleuristes, coiffure, ramonage).
 */

/** Galerie : des univers volontairement contrastés, un concept signalé. */
const gallerySlugs = [
  "gb-performance",
  "rodolphe-dion-coiffure",
  "net-plus-services",
  "flovia",
] as const satisfies readonly ShowcaseSlug[];

const features: Feature[] = [
  {
    icon: <PaintBrushBroad weight="regular" className="size-6" />,
    title: "Une identité qui vous appartient",
    body: "Couleurs, typographies et ton tirés de votre commerce réel, pas d'un thème acheté. Deux clients n'ont jamais le même site.",
  },
  {
    icon: <DeviceMobile weight="regular" className="size-6" />,
    title: "Un mobile composé pour lui-même",
    body: "La majorité de vos visiteurs arrivent du téléphone, souvent depuis Google. Appeler, trouver l'adresse ou commander tient en deux gestes.",
  },
  {
    icon: <PencilSimpleLine weight="regular" className="size-6" />,
    title: "Des contenus que vous modifiez seul",
    body: "Horaires, photos, prix, fermetures : ce qui change souvent se change sans nous. Une heure de formation est comprise à la livraison.",
  },
  {
    icon: <ShoppingBagOpen weight="regular" className="size-6" />,
    title: "La vente en ligne, au bon niveau",
    body: "Du simple formulaire de commande au catalogue avec paiement, créneaux de retrait et zones de livraison. Le bon niveau est celui que vous tiendrez toute l'année.",
  },
  {
    icon: <MagnifyingGlass weight="regular" className="size-6" />,
    title: "Des fondations que Google comprend",
    body: "Structure, vitesse, données structurées, cohérence avec votre fiche d'établissement. Invisible sur une maquette, déterminant six mois plus tard.",
  },
  {
    icon: <Key weight="regular" className="size-6" />,
    title: "Un site qui vous reste",
    body: "Nom de domaine à votre nom, contenus et code transférables. Si nous cessons de travailler ensemble, vous partez avec votre site : c'est écrit dans le devis.",
  },
];

const featurePhone = (() => {
  const site = getShowcaseSite("gb-performance");
  return {
    image: site?.mobile?.image ?? "",
    width: site?.mobile?.width ?? 780,
    height: site?.mobile?.height ?? 1688,
    alt: site?.mobile?.alt ?? "",
    tone: site?.tone ?? "#1c1230",
    caption: "WAW Carrosserie, Saint-Priest : la version téléphone du site livré.",
  };
})();

function mobileOf(slug: ShowcaseSlug) {
  const m = getShowcaseSite(slug)?.mobile;
  return {
    image: m?.image ?? "",
    width: m?.width ?? 780,
    height: m?.height ?? 1688,
    alt: m?.alt ?? "",
  };
}

const sectors: SectorLink[] = [
  {
    name: "Fleuristes",
    hint: "Notre spécialité : saisons, deuil, mariages, click-and-collect et arrivages du matin.",
    href: "/fleuristes",
    phone: mobileOf("maison-orpha"),
  },
  {
    name: "Salons de coiffure",
    hint: "Un menu de prestations lisible sur mobile, la réservation intégrée, l'équipe mise en avant.",
    href: "/salons-de-coiffure",
    phone: mobileOf("rodolphe-dion-coiffure"),
  },
  {
    name: "Ramoneurs",
    hint: "Des demandes de passage complètes et des tournées regroupées par commune.",
    href: "/ramonage",
    phone: {
      image: "/ramonage/ramoplus-accueil-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Le site RamoPlus, conçu par le studio pour le ramonage, affiché sur un téléphone.",
    },
  },
];


const faq = [
  {
    question: "Combien de temps, et comment ça se passe ?",
    answer: (
      <p>
        Environ quatre semaines pour un site vitrine, en quatre jalons que vous
        validez : cadrage, direction visuelle, construction, lancement. Le
        détail est sur <Link href="/methode">notre méthode</Link>.
      </p>
    ),
  },
  {
    question: "Combien ça coûte ?",
    answer: (
      <p>
        Sur devis, après un échange sur votre situation réelle. Le devis
        détaille ligne par ligne ce qui est inclus, et{" "}
        <Link href="/services">la page des offres</Link>{" "}présente chaque
        formule, ce qu&apos;elle contient et ce qu&apos;elle exclut.
      </p>
    ),
  },
  {
    question: "Vous ne travaillez qu'avec des fleuristes ?",
    answer: (
      <p>
        Non. C&apos;est le métier que nous connaissons le mieux (nous
        construisons aussi <a href="https://bloomy.one">Bloomy</a>{" "}avec des
        fleuristes), mais nous livrons pour des{" "}
        <Link href="/salons-de-coiffure">salons de coiffure</Link>, des
        artisans, des ateliers et des lieux. Tout est visible dans{" "}
        <Link href="/realisations">les réalisations</Link>.
      </p>
    ),
  },
  {
    question: "J'ai déjà un site, que devient mon référencement ?",
    answer: (
      <p>
        Les adresses qui ont de la valeur sont redirigées vers leurs nouvelles
        pages plutôt que supprimées. C&apos;est ce qui évite de perdre en une
        nuit une visibilité construite pendant des années, et c&apos;est par là
        que commence <Link href="/audit">le diagnostic gratuit</Link>.
      </p>
    ),
  },
];

export default function SitesInternetPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site internet et e-commerce",
          description:
            "Conception de sites vitrines et de boutiques en ligne sur mesure : identité, mobile, autonomie éditoriale et référencement local.",
          path: "/sites-internet",
          serviceType: "Création de site internet",
          audience: "Commerces indépendants, artisans et métiers visuels",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Sites & e-commerce"
        title="Des sites faits pour vendre, pas pour figurer"
        lede="Vitrine ou boutique en ligne, dessinée autour de votre commerce, et que vous pilotez vous-même une fois livrée."
        aside={<CaptureStage slug="osmose-florale" eager className="lg:ml-4" />}
      >
        <div className="flex flex-wrap items-center gap-4">
          <CtaLink
            href={primaryCta.href}
            event="cta_contact_click"
            placement="sites_internet_hero"
            className={buttonClass("primary")}
          >
            {primaryCta.label}
            <ButtonArrow />
          </CtaLink>
        </div>
      </PageHero>

      {/* Montrer avant de raconter : d'autres univers, tous en ligne. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title="Des sites en ligne, pas des maquettes"
            lede="Quatre sites livrés, dans quatre métiers. Chaque capture renvoie au site réel, que vous pouvez ouvrir maintenant."
          />
          <WorkMosaic slugs={gallerySlugs} className="mt-14 sm:mt-16" />
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.02rem] text-forest-soft">
              {clientSites.length} sites livrés, {recentSites.length} projets récents et{" "}
              {conceptSites.length} projets concept, filtrables par métier.
            </p>
            <ButtonLink href="/realisations" variant="secondary" arrow>
              Voir les réalisations
            </ButtonLink>
          </div>
        </Container>
      </section>

      <StickyFeatureSplit
        title="Ce que vous recevez, et rien de superflu"
        lede="Le même socle pour une vitrine ou une boutique. Ce qui change d'un projet à l'autre, c'est votre métier."
        features={features}
        phone={featurePhone}
      />

      <SectorPanel
        kicker="Par métier"
        title="Le même socle, le vocabulaire de votre métier"
        lede="Une page par secteur : les parcours, les saisons et les mots changent complètement d'un métier à l'autre."
        sectors={sectors}
        footnote={
          <>
            Votre métier n&apos;est pas listé ? Artisans, ateliers, conseil,
            tourisme : voyez{" "}
            <Link href="/realisations">ce que nous avons déjà livré</Link>.
          </>
        }
        caption="Sur les téléphones : Maison Orpha (Reims) et Rodolphe Dion Coiffure (Dol-de-Bretagne), deux sites livrés, puis RamoPlus, le site que nous avons conçu pour le ramonage."
      />

      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="narrow">
          <h2 className="text-display-lg">Avant de vous décider</h2>
          <div className="mt-10">
            <FaqAccordion items={faq} />
          </div>
        </Container>
      </section>

      <CtaBand
        intent="audit"
        placement="sites_internet_footer"
        title="Montrez‑nous votre site actuel, ou son absence."
        lede="Le diagnostic gratuit vous dit ce qui mérite d'être gardé, corrigé ou reconstruit. Sans jargon, sans engagement."
      />
    </>
  );
}
