/**
 * Sites livrés par le studio, montrés en vitrine.
 *
 * Uniquement des projets réellement réalisés par Bloomy Studio — jamais une
 * boutique partenaire de la marketplace bloomy.one, jamais une maquette
 * présentée comme un site en ligne (règle produit : aucune preuve inventée).
 *
 * Les captures vivent dans `public/realisations/`, en WebP < 100 Ko.
 *
 * `note` décrit ce qui est visible sur la capture : ce que le site fait, ce
 * qu'on a dessiné. Jamais une métrique — aucun chiffre de trafic ou de vente
 * n'est mesuré ni autorisé à ce jour.
 */

export type ShowcaseSite = {
  /** Identifiant stable — sert de clé et de valeur d'événement analytics. */
  slug: string;
  /** Nom de la boutique, tel qu'elle se nomme elle-même. */
  name: string;
  city: string;
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
   * Capture mobile réelle du même site, quand elle existe. Les compositions
   * desktop + mobile de l'accueil l'affichent dès qu'elle est renseignée, et
   * s'en passent proprement tant qu'elle est absente.
   */
  mobile?: { image: string; width: number; height: number; alt: string };
};

export const showcaseSites: ShowcaseSite[] = [
  {
    slug: "monloup",
    name: "Monloup",
    city: "Roanne",
    focus: "Boutique en ligne & livraison",
    note: "Boutique, location, mariages et deuil : chaque service a sa page et son parcours de commande.",
    image: "/realisations/monloup.webp",
    width: 1600,
    height: 979,
    alt: "Site de Monloup, artisan fleuriste à Roanne, conçu par Bloomy Studio.",
  },
  {
    slug: "maison-hortense",
    name: "Maison Hortense",
    city: "Saint-Nauphary",
    focus: "Vitrine & mariages",
    note: "Une vitrine éditoriale ivoire et lilas, avec la boutique et les ateliers dans le même parcours.",
    image: "/realisations/maison-hortense.webp",
    width: 1600,
    height: 974,
    alt: "Site de Maison Hortense, fleuriste à Saint-Nauphary, conçu par Bloomy Studio.",
  },
  {
    slug: "kl-fleuriste",
    name: "KL Fleuriste",
    city: "Reims",
    focus: "Scénographie & événementiel",
    note: "Un aplat vert signature et un chemin dédié aux événements, à côté de la boutique.",
    image: "/realisations/kl-fleuriste.webp",
    width: 1600,
    height: 1007,
    alt: "Site de KL Fleuriste & Événementiel à Reims, conçu par Bloomy Studio.",
  },
];

export function getShowcaseSite(slug: string): ShowcaseSite | undefined {
  return showcaseSites.find((s) => s.slug === slug);
}
