/**
 * Sites livrés par le studio, montrés en vitrine.
 *
 * Uniquement des projets réellement réalisés par Bloomy Studio — jamais une
 * boutique partenaire de la marketplace bloomy.one, jamais une maquette
 * présentée comme un site en ligne (règle produit : aucune preuve inventée).
 *
 * Les captures sont produites depuis les sites en ligne par
 * `npm run captures` (voir `scripts/capture-realisations.mjs`) : desktop
 * 1600 × 1000 et mobile 390 × 844 en densité 2, converties en WebP sous
 * 100 Ko. Régénérer après toute refonte d'un site client.
 *
 * `note` décrit ce qui est visible sur la capture : ce que le site fait, ce
 * qu'on a dessiné. Jamais une métrique — aucun chiffre de trafic ou de vente
 * n'est mesuré ni autorisé à ce jour.
 */

export type PortfolioCategory =
  | "all"
  | "ecommerce-retail"
  | "floristry"
  | "hospitality"
  | "consulting"
  | "events-creative"
  | "horticulture";

export type CategoryFilter = {
  id: PortfolioCategory;
  label: string;
  shortLabel?: string;
};

export const portfolioCategories: readonly CategoryFilter[] = [
  { id: "floristry", label: "Fleuristes", shortLabel: "Fleuristes" },
  { id: "all", label: "Tous les projets", shortLabel: "Tous" },
  { id: "ecommerce-retail", label: "E-commerce & Boutiques", shortLabel: "E-commerce" },
  { id: "events-creative", label: "Événementiel & Studio créatif", shortLabel: "Événementiel" },
  { id: "hospitality", label: "Hôtellerie & Tourisme", shortLabel: "Hôtellerie" },
  { id: "consulting", label: "Conseil & Stratégie B2B", shortLabel: "Conseil" },
  { id: "horticulture", label: "Horticulture & Pépinières", shortLabel: "Horticulture" },
] as const;

export type ShowcaseSite = {
  /** Identifiant stable — sert de clé et de valeur d'événement analytics. */
  slug: string;
  /** Nom du projet, tel qu'il se nomme lui-même. */
  name: string;
  city: string;
  /**
   * Sépare les vitrines florales du reste. Les pages fleuristes ne montrent
   * que `fleuriste` : un écolodge au milieu de quatre boutiques brouillerait
   * la spécialisation qu'elles servent à démontrer.
   */
  sector: "fleuriste" | "autre";
  /** Libellé détaillé de secteur pour l'affichage de badge. */
  sectorLabel: string;
  /** Catégorie principale du projet. */
  category: PortfolioCategory;
  /** Catégories d'appartenance pour le filtrage multi-critères. */
  categories: readonly PortfolioCategory[];
  /** Ce que le site fait, en trois mots — sert d'étiquette sous la capture. */
  focus: string;
  /** Une phrase sur ce qui a été livré, vérifiable sur la capture. */
  note: string;
  image: string;
  /** Dimensions réelles du fichier : réservent la place, CLS à zéro. */
  width: number;
  height: number;
  /** Alt descriptif (10–125 caractères, règle seo-images). */
  alt: string;
  /**
   * Adresse publique du site livré. C'est elle qui transforme la perception :
   * un prospect méfiant peut vérifier en un clic que ce n'est pas une
   * maquette. On pointe le domaine propre du client quand il existe, sinon
   * l'adresse Firebase — jamais une URL de préproduction.
   */
  liveUrl: string;
  /** Capture mobile réelle du même site. */
  mobile?: { image: string; width: number; height: number; alt: string };
};

/**
 * Portfolio complet : les 19 projets réels du studio.
 * Les 15 sites fleuristes sont ordonnés en premier, suivis des réalisations
 * pour les autres commerces et secteurs d'activité.
 */
export const showcaseSites = [
  {
    slug: "fleurs-ditalie",
    liveUrl: "https://fleurs-ditalie.web.app",
    name: "Fleurs d'Italie",
    city: "Paris",
    sector: "fleuriste",
    sectorLabel: "Maison florale d'exception",
    category: "floristry",
    categories: ["floristry", "ecommerce-retail"],
    focus: "Maison florale haut de gamme",
    note: "Fleuriste d'exception parisien : univers raffiné, compositions florales sur mesure et service premium.",
    image: "/realisations/fleurs-ditalie.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Fleurs d'Italie, fleuriste d'exception à Paris, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/fleurs-ditalie-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Fleurs d'Italie à Paris.",
    },
  },
  {
    slug: "monloup",
    liveUrl: "https://monloup.web.app",
    name: "Monloup",
    city: "Roanne",
    sector: "fleuriste",
    sectorLabel: "Boutique en ligne & Artisanat",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Boutique en ligne & livraison",
    note: "Boutique, location, mariages et deuil : chaque service a sa page et son parcours de commande.",
    image: "/realisations/monloup.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Monloup, artisan fleuriste à Roanne, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/monloup-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Monloup, artisan fleuriste à Roanne.",
    },
  },
  {
    slug: "artistfloral",
    liveUrl: "https://artistfloral.web.app",
    name: "Artistfloral",
    city: "Vertou",
    sector: "fleuriste",
    sectorLabel: "Studio créatif & Ateliers",
    category: "events-creative",
    categories: ["events-creative", "floristry"],
    focus: "Ateliers & créations artisanales",
    note: "Studio floral artisanal, ateliers d'art floral et scénographie florale sur mesure pour les mariages.",
    image: "/realisations/artistfloral.webp",
    width: 1600,
    height: 1000,
    alt: "Site d'Artistfloral, studio floral artisanal et ateliers à Vertou, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/artistfloral-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site d'Artistfloral à Vertou.",
    },
  },
  {
    slug: "kl-fleurs",
    liveUrl: "https://kl-fleurs.web.app",
    name: "KL Fleurs & Événementiel",
    city: "Reims",
    sector: "fleuriste",
    sectorLabel: "Fleurs & Événementiel",
    category: "events-creative",
    categories: ["events-creative", "floristry"],
    focus: "Scénographie & événementiel",
    note: "Créations florales et décoration événementielle sur mesure pour réceptions et entreprises.",
    image: "/realisations/kl-fleurs.webp",
    width: 1600,
    height: 1000,
    alt: "Site de KL Fleurs & Événementiel à Reims, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/kl-fleurs-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de KL Fleurs & Événementiel à Reims.",
    },
  },
  {
    slug: "maison-hortense",
    liveUrl: "https://maisonhortense.web.app",
    name: "Maison Hortense",
    city: "Saint-Nauphary",
    sector: "fleuriste",
    sectorLabel: "Maison florale contemporaine",
    category: "floristry",
    categories: ["floristry"],
    focus: "Maison florale contemporaine",
    note: "Maison florale contemporaine et élégante réunissant boutique d'artisan, mariages et ateliers de composition.",
    image: "/realisations/maison-hortense.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Maison Hortense, fleuriste à Saint-Nauphary, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/maison-hortense-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Maison Hortense, fleuriste à Saint-Nauphary.",
    },
  },
  {
    slug: "la-cle-des-champs",
    liveUrl: "https://lacledeschamps.web.app",
    name: "La Clé des Champs & des Thés",
    city: "Bellegarde",
    sector: "fleuriste",
    sectorLabel: "Concept store fleurs & thés",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Fleurs, thés & décoration",
    note: "Concept store chaleureux réunissant art floral, thés d'exception et objets de décoration pour la maison.",
    image: "/realisations/la-cle-des-champs.webp",
    width: 1600,
    height: 1000,
    alt: "Site de La Clé des Champs & des Thés à Bellegarde, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/la-cle-des-champs-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de La Clé des Champs & des Thés.",
    },
  },
  {
    slug: "maison-orpha",
    liveUrl: "https://maisonorpha.web.app",
    name: "Maison Orpha",
    city: "Reims",
    sector: "fleuriste",
    sectorLabel: "Fleuriste & Décoration",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Fleurs & objets de décoration",
    note: "Fleuriste contemporain combinant art floral et sélection d'objets de décoration au cœur de Reims.",
    image: "/realisations/maison-orpha.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Maison Orpha, fleuriste et objets colorés à Reims, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/maison-orpha-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Maison Orpha, fleuriste à Reims.",
    },
  },
  {
    slug: "maison-de-rose",
    liveUrl: "https://maisonderose.web.app",
    name: "Maison de Rose",
    city: "Paris & Île-de-France",
    sector: "fleuriste",
    sectorLabel: "Maison florale contemporaine",
    category: "floristry",
    categories: ["floristry"],
    focus: "Boutique florale & bouquets sur mesure",
    note: "Boutique florale contemporaine et bouquets sur mesure à Paris, Achères et Verneuil-sur-Seine.",
    image: "/realisations/maison-de-rose.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Maison de Rose, fleuriste contemporain en Île-de-France, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/maison-de-rose-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Maison de Rose.",
    },
  },
  {
    slug: "julius",
    liveUrl: "https://fleuriste-julius.web.app",
    name: "Julius",
    city: "Toulouse",
    sector: "fleuriste",
    sectorLabel: "Artisan fleuriste",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Artisan fleuriste contemporain",
    note: "Artisan fleuriste contemporain à Toulouse : fleurs de saison, sélection végétale et conseils d'artisan.",
    image: "/realisations/julius.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Julius, artisan fleuriste à Toulouse, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/julius-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Julius à Toulouse.",
    },
  },
  {
    slug: "capifiore",
    liveUrl: "https://capifiore.web.app",
    name: "Capifiore",
    city: "Cap Corse · Luri",
    sector: "fleuriste",
    sectorLabel: "Fleuriste de proximité",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Fleuriste insulaire & livraison",
    note: "Artisane fleuriste installée au Cap Corse : créations florales locales et service de livraison sur l'île.",
    image: "/realisations/capifiore.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Capifiore, artisane fleuriste au Cap Corse, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/capifiore-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Capifiore au Cap Corse.",
    },
  },
  {
    slug: "la-fine-fleur",
    liveUrl: "https://lafinefleur.web.app",
    name: "La Fine Fleur",
    city: "Muzillac",
    sector: "fleuriste",
    sectorLabel: "Artisan fleuriste",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Fleurs fraîches & arrangements",
    note: "Artisan fleuriste et arrangements floraux personnalisés au cœur du Morbihan.",
    image: "/realisations/la-fine-fleur.webp",
    width: 1600,
    height: 1000,
    alt: "Site de La Fine Fleur, artisan fleuriste à Muzillac, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/la-fine-fleur-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de La Fine Fleur à Muzillac.",
    },
  },
  {
    slug: "atelier-de-laurent",
    liveUrl: "https://atelierdelaurent.web.app",
    name: "Atelier de Laurent",
    city: "Notre-Dame-de-Monts",
    sector: "fleuriste",
    sectorLabel: "Atelier floral d'artisan",
    category: "floristry",
    categories: ["floristry", "events-creative"],
    focus: "Artisanat floral & sur-mesure",
    note: "Atelier floral artisanal et compositions végétales sur mesure, inspirées du littoral vendéen.",
    image: "/realisations/atelier-de-laurent.webp",
    width: 1600,
    height: 1000,
    alt: "Site de L'Atelier de Laurent, artisan fleuriste à Notre-Dame-de-Monts, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/atelier-de-laurent-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de L'Atelier de Laurent.",
    },
  },
  {
    slug: "osmose-florale",
    liveUrl: "https://osmoseflorale.web.app",
    name: "Osmose Florale",
    city: "Marboz",
    sector: "fleuriste",
    sectorLabel: "Design floral contemporain",
    category: "floristry",
    categories: ["floristry", "events-creative"],
    focus: "Design floral & bouquets d'artisan",
    note: "Créations florales contemporaines et bouquets d'artisan pour toutes les occasions.",
    image: "/realisations/osmose-florale.webp",
    width: 1600,
    height: 1000,
    alt: "Site d'Osmose Florale, fleuriste artisan à Marboz, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/osmose-florale-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site d'Osmose Florale à Marboz.",
    },
  },
  {
    slug: "aux-coquelicots",
    liveUrl: "https://auxcoquelicots.web.app",
    name: "Aux Coquelicots",
    city: "Neufchef",
    sector: "fleuriste",
    sectorLabel: "Fleuriste de proximité",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Fleurs locales & compositions",
    note: "Artisan fleuriste de proximité : compositions florales fraîches et livraison en Lorraine.",
    image: "/realisations/aux-coquelicots.webp",
    width: 1600,
    height: 1000,
    alt: "Site d'Aux Coquelicots, artisan fleuriste à Neufchef, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/aux-coquelicots-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site d'Aux Coquelicots à Neufchef.",
    },
  },
  {
    slug: "au-jardin-de-celine",
    liveUrl: "https://aujardindeceline.web.app",
    name: "Au Jardin de Céline",
    city: "Massy",
    sector: "fleuriste",
    sectorLabel: "Artisan fleuriste",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail", "floristry"],
    focus: "Créations personnalisées & accueil",
    note: "Artisan fleuriste proposant des créations florales personnalisées et un accompagnement sur mesure.",
    image: "/realisations/au-jardin-de-celine.webp",
    width: 1600,
    height: 1000,
    alt: "Site d'Au Jardin de Céline, fleuriste à Massy, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/au-jardin-de-celine-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site d'Au Jardin de Céline à Massy.",
    },
  },
  {
    slug: "rodolphe-dion-coiffure",
    liveUrl: "https://rodolphedioncoiffure.web.app",
    name: "Rodolphe Dion Coiffure",
    city: "Dol-de-Bretagne",
    sector: "autre",
    sectorLabel: "Salon de coiffure & Soins",
    category: "ecommerce-retail",
    categories: ["ecommerce-retail"],
    focus: "Salon de coiffure & réservation",
    note: "Salon de coiffure à Dol-de-Bretagne : prestations claires, réservation en ligne et identité soignée.",
    image: "/realisations/rodolphe-dion-coiffure.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Rodolphe Dion Coiffure, salon de coiffure à Dol-de-Bretagne, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/rodolphe-dion-coiffure-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Rodolphe Dion Coiffure à Dol-de-Bretagne.",
    },
  },
  {
    slug: "act4results",
    liveUrl: "https://act4results.web.app",
    name: "ACT4RESULTS",
    city: "Paris · Conseil B2B",
    sector: "autre",
    sectorLabel: "Conseil stratégique & B2B",
    category: "consulting",
    categories: ["consulting"],
    focus: "Performance & transformation des ventes",
    note: "Conseil en performance commerciale, transformation des ventes et accompagnement stratégique des équipes B2B.",
    image: "/realisations/act4results.webp",
    width: 1600,
    height: 1000,
    alt: "Site d'ACT4RESULTS, conseil en performance commerciale et transformation des ventes, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/act4results-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site d'ACT4RESULTS.",
    },
  },
  {
    slug: "flovia",
    liveUrl: "https://flovia.web.app",
    name: "FLÖVIA",
    city: "Micro-villages flottants",
    sector: "autre",
    sectorLabel: "Hôtellerie & Tourisme",
    category: "hospitality",
    categories: ["hospitality"],
    focus: "Tourisme & immersion",
    note: "Écolodges flottants et hébergements touristiques durables : expérience immersive et réservation en ligne.",
    image: "/realisations/flovia.webp",
    width: 1600,
    height: 1000,
    alt: "Site de FLÖVIA, micro-villages flottants et écolodges sur l'eau, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/flovia-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de FLÖVIA, micro-villages flottants sur l'eau.",
    },
  },
  {
    slug: "pepinieres-raffard",
    liveUrl: "https://pepinieres-raffard.web.app",
    name: "Pépinières Raffard",
    city: "Châtenoy",
    sector: "autre",
    sectorLabel: "Horticulture & Pépinière",
    category: "horticulture",
    categories: ["horticulture"],
    focus: "Producteur de rosiers depuis 1935",
    note: "Pépinière spécialiste et producteur de rosiers : mise en valeur du savoir-faire horticole et catalogue des variétés.",
    image: "/realisations/pepinieres-raffard.webp",
    width: 1600,
    height: 1000,
    alt: "Site des Pépinières Raffard, producteur de rosiers et pépinière horticole, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/pepinieres-raffard-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site des Pépinières Raffard.",
    },
  },
] as const satisfies readonly ShowcaseSite[];

/** Les vitrines florales seules — ce que montrent les pages fleuristes. */
export const floristSites = showcaseSites.filter((s) => s.sector === "fleuriste");

/**
 * 4 vitrines florales phares pour l'accueil :
 * sélection des meilleurs designs et des univers les plus contrastés
 * (Maison de prestige, E-commerce, Studio créatif, Concept store).
 */
export const homeFeaturedSites = [
  showcaseSites.find((s) => s.slug === "fleurs-ditalie")!,
  showcaseSites.find((s) => s.slug === "monloup")!,
  showcaseSites.find((s) => s.slug === "artistfloral")!,
  showcaseSites.find((s) => s.slug === "la-cle-des-champs")!,
] as const satisfies readonly ShowcaseSite[];

/** Slugs connus — littéraux, pour que `getShowcaseSite` refuse une faute de frappe. */
export type ShowcaseSlug = (typeof showcaseSites)[number]["slug"];

export function getShowcaseSite(slug: ShowcaseSlug): ShowcaseSite | undefined {
  return showcaseSites.find((s) => s.slug === slug);
}

/** Filtrer les sites par catégorie. */
export function getSitesByCategory(category: PortfolioCategory): readonly ShowcaseSite[] {
  if (category === "all") return showcaseSites;
  return showcaseSites.filter((s) =>
    (s.categories as readonly PortfolioCategory[]).includes(category),
  );
}
