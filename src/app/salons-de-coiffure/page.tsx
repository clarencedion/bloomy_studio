import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import { CalendarCheck, Gift, MapPin, Storefront } from "@phosphor-icons/react/dist/ssr";

import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import {
  getShowcaseSite,
  siteHost,
  type ShowcaseSite,
  type ShowcaseSlug,
} from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { auditCta } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Création de site pour salon de coiffure, image premium",
  description:
    "Sites pour salons de coiffure : identité premium, prestations mobile, réservation intégrée, SEO local et recrutement, sans dépendre des plateformes.",
  path: "/salons-de-coiffure",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Salons de coiffure", path: "/salons-de-coiffure" },
];

/** Un projet du portfolio, garanti à la compilation comme à l'exécution. */
function project(slug: ShowcaseSlug): ShowcaseSite & { mobile: NonNullable<ShowcaseSite["mobile"]> } {
  const site = getShowcaseSite(slug);
  if (!site?.mobile) throw new Error(`Projet ou capture mobile introuvable : ${slug}`);
  return site as ShowcaseSite & { mobile: NonNullable<ShowcaseSite["mobile"]> };
}

/** Le salon livré par le studio : la preuve de la page. */
const salon = project("rodolphe-dion-coiffure");
/** Projet concept beauté : toujours présenté comme tel. */
const nails = project("nails-by-cindy");

/**
 * Recadrages de la capture longue du site livré (960 × 3000), en pixels de
 * la capture. Ce ne sont pas des visuels redessinés : la même image réelle,
 * cadrée sur une section du site. À recaler si la capture est régénérée.
 */
type Crop = { x: number; y: number; w: number; h: number };

const crops = {
  tarifs: { x: 420, y: 1066, w: 444, h: 376 },
  equipe: { x: 96, y: 1550, w: 768, h: 400 },
  galerie: { x: 96, y: 2580, w: 768, h: 316 },
} satisfies Record<string, Crop>;

/**
 * Ce que la clientèle regarde avant de réserver. Chaque sujet est illustré
 * par la section correspondante du site de Rodolphe Dion Coiffure.
 */
const showroom: {
  title: string;
  body: string;
  /** Grille desktop : 7 + 5, puis 5 + 7. */
  span: string;
  panel: string;
  media: { kind: "scroll" } | { kind: "crop"; crop: Crop; alt: string };
}[] = [
  {
    title: "Une identité au niveau de votre salon",
    body: "Vous avez investi dans votre lieu : matériaux, lumière, ambiance. Votre site doit produire la même impression, avec une direction artistique dédiée, des photographies mises en scène et un ton juste. Pas un thème « coiffure » acheté en ligne.",
    span: "md:col-span-7",
    panel: "",
    media: { kind: "scroll" },
  },
  {
    title: "Un menu de prestations pensé pour le téléphone",
    body: "Coupe, couleur, balayage, soins, barbe : vos prestations et vos prix, lisibles en deux gestes sur mobile, sans PDF à télécharger. La transparence tarifaire rassure et filtre les demandes.",
    span: "md:col-span-5",
    panel: "bg-mint",
    media: {
      kind: "crop",
      crop: crops.tarifs,
      alt: "Grille des prestations et des tarifs sur le site de Rodolphe Dion Coiffure",
    },
  },
  {
    title: "Votre équipe, mise en avant",
    body: "Portraits, spécialités, parcours : les clients choisissent souvent une personne autant qu'un salon. Et une page équipe soignée est votre meilleur outil de recrutement dans un métier en tension.",
    span: "md:col-span-5",
    panel: "bg-blush",
    media: {
      kind: "crop",
      crop: crops.equipe,
      alt: "Portrait de Rodolphe Dion et sa présentation sur le site du salon",
    },
  },
  {
    title: "Vos réalisations, en galerie",
    body: "Colorations, transformations, coiffures d'événement : une galerie structurée qui montre votre niveau, avant/après compris, avec l'accord de vos clients et sans filtre trompeur.",
    span: "md:col-span-7",
    panel: "bg-mint-deep",
    media: {
      kind: "crop",
      crop: crops.galerie,
      alt: "Galerie du salon sur son site : coloration, coupe homme, chignon de mariage et intérieur",
    },
  },
];

/** Ce qui travaille pour le salon sans se voir. */
const backstage: { title: string; body: string; icon: Icon }[] = [
  {
    title: "La réservation là où vous la gérez déjà",
    body: "Vous travaillez avec Planity, Treatwell ou un agenda maison ? Le site s'y connecte proprement : le client réserve dans votre outil, sans ressaisie. Nous n'imposons jamais un système de réservation propriétaire.",
    icon: CalendarCheck,
  },
  {
    title: "Une visibilité locale sérieuse",
    body: "Fiche Google complète, avis réguliers, cohérence entre le site et la fiche, pages par prestation : les fondamentaux que nous appliquons aux fleuristes, adaptés aux recherches « coiffeur », « balayage » ou « coloriste » de votre ville.",
    icon: MapPin,
  },
  {
    title: "Cartes cadeaux et vente de produits",
    body: "Une carte cadeau achetable en ligne en trois minutes, et la possibilité de vendre vos gammes de produits capillaires, sans transformer le site en supermarché.",
    icon: Gift,
  },
  {
    title: "Plusieurs salons, une seule cohérence",
    body: "Si vous avez deux ou trois adresses, chaque salon garde sa page, ses horaires et sa fiche Google, dans une identité commune. L'architecture est prévue pour grandir avec vous.",
    icon: Storefront,
  },
];

const faq = [
  {
    question: "Planity me suffit, non ?",
    answer: (
      <p>
        Planity est un excellent agenda : gardez‑le, nous nous y connectons.
        Mais votre profil y ressemble à celui de tous les salons voisins, et les
        clients qui vous découvrent par Google atterrissent sur une page qui ne
        vous appartient pas. Votre site est le seul endroit où votre
        positionnement, vos prix et votre équipe s&apos;expriment pleinement. Et
        il alimente votre fiche Google, pas celle d&apos;une plateforme.
      </p>
    ),
  },
  {
    question: "Qu'est‑ce qui vous distingue d'une agence web classique ?",
    answer: (
      <p>
        Nous travaillons d&apos;abord pour des commerces indépendants à forte
        identité : fleuristes, salons, artisans. Concrètement, nous savons
        travailler un référencement de proximité, des prestations à forte
        dimension visuelle et une clientèle qui réserve depuis son téléphone. Et
        notre <Link href="/methode">méthode</Link>{" "}est la même pour tous :
        transparente, jalonnée, mesurée.
      </p>
    ),
  },
  {
    question: "Pouvez‑vous nous aider à recruter ?",
    answer: (
      <p>
        Le site y contribue directement : page équipe vivante, page « nous
        rejoindre » avec vos conditions réelles et votre ambiance, photos du
        salon. Les candidats se renseignent exactement comme les clients : un
        salon sans site soigné part avec un handicap.
      </p>
    ),
  },
];

/**
 * Une section réelle du site livré, cadrée dans la capture longue. L'image
 * est agrandie puis décalée : `translate` en pourcentage se rapporte à sa
 * propre taille, donc le cadrage reste exact à toutes les largeurs.
 */
function CaptureCrop({
  site,
  crop,
  alt,
  sizes,
}: {
  site: ShowcaseSite;
  crop: Crop;
  alt: string;
  sizes: string;
}) {
  const shot = site.long ?? { image: site.image, width: site.width, height: site.height };
  const style: CSSProperties = {
    width: `${(shot.width / crop.w) * 100}%`,
    transform: `translate(${(-(crop.x / shot.width) * 100).toFixed(3)}%, ${(-(crop.y / shot.height) * 100).toFixed(3)}%)`,
  };
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
    >
      <Image
        src={shot.image}
        alt={alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="absolute left-0 top-0 h-auto max-w-none"
        style={style}
      />
    </div>
  );
}

/**
 * Hero : le site du salon tel que ses clients l'ouvrent, sur téléphone. Le
 * mobile monte du bord bas d'un panneau teinté de la couleur du salon, qui
 * le rogne : l'appareil est ancré, jamais flottant.
 */
function HeroPhone() {
  return (
    <figure className="mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="leaf-lg overflow-hidden px-8 pt-10 sm:px-14 sm:pt-14"
        style={{ backgroundColor: salon.tone }}
      >
        <PhoneFrame className="mx-auto -mb-28 w-[13rem] sm:-mb-32 sm:w-[15rem]">
          <Image
            src={salon.mobile.image}
            alt={salon.mobile.alt}
            width={salon.mobile.width}
            height={salon.mobile.height}
            sizes="(min-width: 640px) 15rem, 13rem"
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full"
          />
        </PhoneFrame>
      </div>
      {/* Même légende que les compositions des pages produit (CaptureStage). */}
      <figcaption className="mt-5 px-1">
        <p className="text-[0.95rem] font-semibold text-forest">
          {salon.name}
          <span className="font-normal text-forest-faint">, {salon.city}</span>
        </p>
        <LiveSiteLink site={salon} className="mt-1.5" />
      </figcaption>
    </figure>
  );
}

function ShowroomCard({
  item,
  index,
}: {
  item: (typeof showroom)[number];
  index: number;
}) {
  const media: ReactNode =
    item.media.kind === "scroll" ? (
      <ScrollingCapture
        site={salon}
        sizes="(min-width: 1280px) 46rem, (min-width: 768px) 55vw, 100vw"
        className="w-full"
      />
    ) : (
      <BrowserFrame label={siteHost(salon)} className="w-full">
        <CaptureCrop
          site={salon}
          crop={item.media.crop}
          alt={item.media.alt}
          sizes="(min-width: 1280px) 64rem, (min-width: 768px) 90vw, 190vw"
        />
      </BrowserFrame>
    );

  return (
    <article
      className={`group grid gap-y-6 md:row-span-2 md:grid-rows-subgrid ${item.span} ${
        index >= 2 ? "md:mt-16" : ""
      }`}
    >
      <Reveal delay={(index % 2) * 80} className="h-full">
        <div
          className={`leaf flex h-full items-center p-5 sm:p-8 lg:p-10 ${item.panel}`}
          style={item.panel ? undefined : { backgroundColor: salon.tone }}
        >
          {media}
        </div>
      </Reveal>
      <div className="max-w-xl px-1">
        <h3 className="text-display-md">{item.title}</h3>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-forest-soft">{item.body}</p>
        {item.media.kind === "scroll" ? <LiveSiteLink site={salon} className="mt-4" /> : null}
      </div>
    </article>
  );
}

/**
 * /salons-de-coiffure : cinq temps.
 *
 * 1. Hero (texte + le site du salon sur mobile, panneau teinté du salon).
 * 2. Vitrine en mosaïque 7/5 puis 5/7 : quatre sujets, chacun illustré par la
 *    section réelle du site livré. Mobile : une colonne, visuel puis texte.
 * 3. Coulisses : panneau forest (la tige : ce qui tient sans se voir), titre à
 *    gauche et quatre sujets en 2 × 2 à droite. Mobile : titre puis une
 *    colonne de sujets.
 * 4. Projet concept Nails by Cindy : texte à gauche, capture qui défile et
 *    mobile ancré à droite. Mobile : texte, puis visuel, mobile plus petit.
 * 5. Questions, en colonne de lecture étroite. Puis la bande finale.
 */
export default function SalonsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site pour salon de coiffure",
          description:
            "Sites premium pour salons de coiffure : identité, menu de prestations mobile, réservation intégrée, SEO local, recrutement et cartes cadeaux.",
          path: "/salons-de-coiffure",
          serviceType: "Création de site internet",
          audience: "Salons de coiffure",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Salons de coiffure"
        title="Un site à la hauteur de votre salon."
        lede="À l'image de votre lieu : prestations lisibles sur mobile, réservation reliée à vos outils, visibilité locale travaillée."
        aside={<HeroPhone />}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaLink
            href={auditCta.href}
            event="cta_audit_click"
            placement="salons_hero"
            className={buttonClass("primary")}
          >
            {auditCta.label}
            <ButtonArrow />
          </CtaLink>
          <ButtonLink href="/realisations" variant="secondary">
            Voir les réalisations
          </ButtonLink>
        </div>
      </PageHero>

      {/* 2. Ce que voit la clientèle : la vitrine réelle, sujet par sujet. */}
      <section className="pb-24 pt-8 sm:pb-32 sm:pt-12">
        <Container width="wide">
          <SectionHead
            title="Ce que vos clients regardent avant de réserver"
            lede="Un salon ne se vend pas comme une boutique : l'image, les prix, l'équipe, le travail fini. Chaque exemple est tiré du site que nous avons livré à Rodolphe Dion Coiffure."
          />
          <div className="mt-14 grid gap-y-16 md:mt-16 md:grid-cols-12 md:gap-x-8 md:gap-y-0 lg:gap-x-10">
            {showroom.map((item, index) => (
              <ShowroomCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Les coulisses : le panneau vert, la tige du logo. */}
      <section className="pb-24 sm:pb-32">
        <Container width="wide">
          <div className="on-forest leaf-lg bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="text-display-lg text-paper">
                  Ce qui travaille pour vous, <span className="text-bloom-light">en coulisses</span>
                </h2>
                <p className="lede mt-6 max-w-md">
                  Réservation, référencement, ventes, plusieurs adresses : ce
                  que vos clients ne voient pas, mais qui remplit l&apos;agenda.
                </p>
              </div>
              <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
                {backstage.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.title} className="border-t border-line-dark pt-6">
                      <Reveal delay={Math.min(index, 2) * 80}>
                        <ItemIcon aria-hidden="true" className="size-7 text-bloom-light" />
                        <h3 className="text-display-sm mt-5 text-paper">{item.title}</h3>
                        <p className="mt-3 text-[0.98rem] leading-relaxed text-paper/75">
                          {item.body}
                        </p>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Au-delà de la coiffure : un projet concept, présenté comme tel. */}
      <section className="pb-24 sm:pb-32">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="text-display-lg">
                Ongleries et instituts : même méthode, autre univers.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-forest-soft">
                Nails by Cindy est un projet concept : un site que nous avons
                dessiné pour une prothésiste ongulaire, sans cliente réelle
                derrière. On y trouve une galerie d&apos;inspirations, des
                prestations détaillées et un parcours de réservation en ligne.
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-forest-soft">
                Il est en ligne : parcourez‑le comme un vrai site.
              </p>
              <LiveSiteLink site={nails} className="mt-7" />
            </div>

            <Reveal className="lg:col-span-7">
              <figure className="group">
                <div
                  className="leaf-lg relative px-5 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-10 lg:pb-24 lg:pl-12 lg:pr-28"
                  style={{ backgroundColor: nails.tone }}
                >
                  <ScrollingCapture
                    site={nails}
                    sizes="(min-width: 1280px) 50rem, (min-width: 1024px) 60vw, 100vw"
                    className="w-full"
                  />
                  <PhoneFrame className="absolute -bottom-6 right-4 w-[6.5rem] sm:right-8 sm:w-32 lg:right-8 lg:w-40">
                    <Image
                      src={nails.mobile.image}
                      alt={nails.mobile.alt}
                      width={nails.mobile.width}
                      height={nails.mobile.height}
                      sizes="(min-width: 1024px) 10rem, 8rem"
                      className="h-auto w-full"
                    />
                  </PhoneFrame>
                </div>
                <figcaption className="caption mt-10 px-1">
                  {nails.name}, projet concept : l&apos;accueil sur ordinateur et sur téléphone.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Questions : une colonne de lecture. */}
      <section className="border-t border-line py-24 sm:py-32">
        <Container width="narrow">
          <SectionHead title="Ce que les salons nous demandent" className="mb-10" />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-10 text-[0.98rem] leading-relaxed text-forest-soft">
            Nos offres de <Link href="/sites-internet">sites internet et e-commerce</Link>{" "}
            s&apos;appliquent aussi aux salons. Le détail des formules est sur la
            page <Link href="/services">services</Link>, et notre façon de
            travailler sur la page <Link href="/methode">méthode</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="salons_footer"
        intent="audit"
        title="Que voient vos clients en cherchant votre salon ?"
        lede="Le diagnostic gratuit analyse votre site, votre fiche Google et votre visibilité face aux salons voisins. Concret, honnête, sans engagement."
      />
    </>
  );
}
