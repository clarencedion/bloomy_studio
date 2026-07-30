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

export const showcaseSites = [
  {
    slug: "monloup",
    liveUrl: "https://monloup.web.app",
    name: "Monloup",
    city: "Roanne",
    sector: "fleuriste",
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
    slug: "maison-hortense",
    liveUrl: "https://chezmaisonhortense.fr",
    name: "Maison Hortense",
    city: "Saint-Nauphary",
    sector: "fleuriste",
    focus: "Vitrine & mariages",
    note: "Une vitrine éditoriale ivoire et lilas, avec la boutique et les ateliers dans le même parcours.",
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
    slug: "kl-fleurs",
    liveUrl: "https://klfleursevenementiel.fr",
    name: "KL Fleurs & Événementiel",
    city: "Reims",
    sector: "fleuriste",
    focus: "Scénographie & événementiel",
    note: "Un aplat vert signature et un chemin dédié aux événements, à côté de la boutique.",
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
    slug: "maison-orpha",
    liveUrl: "https://maisonorpha.web.app",
    name: "Maison Orpha",
    city: "Reims",
    sector: "fleuriste",
    focus: "Couleur & objets",
    note: "Un rouge franc sur toute la page, assumé jusqu'au bout : la boutique vend des fleurs et des objets colorés.",
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
    slug: "flovia",
    liveUrl: "https://flovia.web.app",
    name: "Flōvia",
    city: "Micro-villages flottants",
    sector: "autre",
    focus: "Tourisme & immersion",
    note: "Hors du monde floral : une expérience sombre et cinématographique pour un concept d'écolodges sur l'eau.",
    image: "/realisations/flovia.webp",
    width: 1600,
    height: 1000,
    alt: "Site de Flōvia, micro-villages flottants et écolodges, conçu par Bloomy Studio.",
    mobile: {
      image: "/realisations/flovia-mobile.webp",
      width: 780,
      height: 1688,
      alt: "Version mobile du site de Flōvia, micro-villages flottants sur l'eau.",
    },
  },
] as const satisfies readonly ShowcaseSite[];

/** Les vitrines florales seules — ce que montrent les pages fleuristes. */
export const floristSites = showcaseSites.filter((s) => s.sector === "fleuriste");

/** Slugs connus — littéraux, pour que `getShowcaseSite` refuse une faute de frappe. */
export type ShowcaseSlug = (typeof showcaseSites)[number]["slug"];

export function getShowcaseSite(slug: ShowcaseSlug): ShowcaseSite | undefined {
  return showcaseSites.find((s) => s.slug === slug);
}
