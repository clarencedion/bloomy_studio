import type { ShowcaseSlug } from "@/lib/portfolio";

/**
 * Copie de l'accueil, section par section (voir `docs/direction-artistique.md`
 * § 7). Une idée par section, aucun bénéfice répété. Chaque affirmation
 * reprend un fait déjà publié ailleurs sur le site : `lib/offers.ts`,
 * `lib/case-studies.ts`, les pages `/sites-internet`, `/methode` et
 * `/developpement-mvp`. Rien n'est inventé ici.
 */

/** Segment de titre : `accent` passe le mot en rose (jamais en italique). */
export type TitleSegment = { text: string; accent?: boolean };

export const homeHero = {
  kicker: "Agence de développement web",
  /** Une ligne par entrée : chacune monte derrière son masque, une fois. */
  lines: [
    [{ text: "Des sites qui" }],
    [{ text: "font " }, { text: "éclore", accent: true }],
    [{ text: "votre activité." }],
  ] satisfies TitleSegment[][],
  lede: "Sites vitrines, e-commerce, MVP et micro SaaS, conçus et développés à Nantes par un studio de deux personnes.",
  portfolioLabel: "Voir les réalisations",
  wallCaption: "Captures réelles de sites que nous avons conçus.",
  /**
   * Mur de travaux : deux colonnes de captures mobiles qui défilent en sens
   * inverse. Les projets mis en avant d'abord, puis d'autres univers pour
   * que deux téléphones voisins ne se ressemblent jamais.
   */
  wall: {
    left: [
      "osmose-florale",
      "gb-performance",
      "nails-by-cindy",
      "net-plus-services",
      "maison-orpha",
      "flovia",
    ],
    right: [
      "fleurs-ditalie",
      "domaine-des-aurores",
      "rodolphe-dion-coiffure",
      "capifiore",
      "act4results",
      "monloup",
    ],
  } satisfies Record<"left" | "right", ShowcaseSlug[]>,
};

export const homeWork = {
  title: "Le travail, d'abord.",
  lede: "Chaque site part d'un métier, de ses matières et de sa façon de vendre.",
};

export const homeOffers = {
  title: "Ce que nous construisons.",
};

export type HomeSector = {
  id: string;
  name: string;
  /** Une phrase concrète : ce que ce métier attend de son site. */
  line: string;
  href: string;
  /** Capture réelle d'un site de ce secteur. */
  slug: ShowcaseSlug;
};

export const homeSectors = {
  title: "Pour quels métiers.",
  lede: "Les fleuristes sont notre spécialité. Le même soin vaut pour la beauté, les artisans et les autres commerces.",
  items: [
    {
      id: "fleuristes",
      name: "Fleuristes",
      line: "Saisons, deuil, mariages et click-and-collect : notre spécialité.",
      href: "/fleuristes",
      slug: "maison-orpha",
    },
    {
      id: "beaute",
      name: "Coiffure & beauté",
      line: "Un menu de prestations lisible sur mobile et la réservation intégrée.",
      href: "/salons-de-coiffure",
      slug: "rodolphe-dion-coiffure",
    },
    {
      id: "artisans",
      name: "Artisans & services",
      line: "Carrosserie, nettoyage technique, ramonage : des demandes de devis complètes dès le premier message.",
      href: "/ramonage",
      slug: "gb-performance",
    },
    {
      id: "autres",
      name: "Autres commerces",
      line: "Hôtellerie, conseil, lieux : le même soin, avec le vocabulaire de votre métier.",
      href: "/realisations",
      slug: "flovia",
    },
  ] satisfies HomeSector[],
};

/**
 * Manifeste. Trois phrases, chacune vérifiable : aucun thème acheté
 * (`/sites-internet`), les deux fondateurs font tout (`lib/site.ts`), tout
 * est à votre nom (principes de `/methode`).
 */
export const homeManifesto = {
  srTitle: "Notre façon de travailler",
  segments: [
    { text: "Nous n'achetons aucun thème. Deux personnes conçoivent et développent votre site, de la première maquette à la mise en ligne. Le domaine, le code et les contenus restent" },
    { text: "à votre nom.", accent: true },
  ] satisfies TitleSegment[],
};

/** Les quatre jalons d'un site vitrine, tels que `/sites-internet` les annonce. */
export const homeMethod = {
  title: "Quatre jalons, et vous validez chacun.",
  lede: "Environ quatre semaines pour un site vitrine. Vous suivez l'avancement sur un lien privé, sans effet tunnel.",
  linkLabel: "Le déroulé complet",
  steps: [
    {
      title: "Cadrage",
      body: "Un atelier sur votre métier, puis un périmètre écrit et un devis détaillé ligne par ligne.",
    },
    {
      title: "Direction visuelle",
      body: "Couleurs, typographies et ton tirés de votre activité. Vous validez l'univers avant la première page.",
    },
    {
      title: "Construction",
      body: "La page d'accueil, puis l'ensemble des pages. Vos retours sont intégrés à chaque jalon, pas à la fin.",
    },
    {
      title: "Lancement",
      body: "Tests sur tous les écrans, mise en ligne, puis une heure de formation pour être autonome.",
    },
  ],
};

/** Bloomy, le produit de l'équipe : faits tirés de l'étude de cas publiée. */
export const homeProduct = {
  kicker: "Notre produit",
  title: "Nous faisons aussi tourner notre propre logiciel.",
  body: "Sur bloomy.one, on compose son bouquet fleur par fleur chez un artisan proche, avec retrait en boutique ou livraison. Nous l'avons conçu, développé, et nous l'exploitons.",
  facts: [
    { value: "1 000+", label: "utilisateurs inscrits" },
    { value: "Le jour même", label: "click-and-collect et livraison opérationnels" },
  ],
  caseHref: "/realisations/bloomy-plateforme-florale",
  caseLabel: "Lire l'étude de cas",
  liveHref: "https://bloomy.one",
  liveLabel: "bloomy.one",
  shot: {
    image: "/produit/bloomy-produit.webp",
    width: 1600,
    height: 900,
    alt: "Le comparatif public de bloomy.one : création sur mesure, 0 % de commission, click-and-collect.",
  },
};

export const homeTeam = {
  title: "Deux personnes, pas un service client.",
  /** Les noms viennent de `site.founders` : la phrase les encadre. */
  bodyAfterNames:
    "construisent Bloomy et les sites du studio. C'est l'un des deux qui lit votre message et conçoit votre site.",
  role: "Bloomy & Bloomy Studio",
  linkLabel: "Qui nous sommes",
};

export const homeFaq = {
  title: "Ce que l'on nous demande.",
};
