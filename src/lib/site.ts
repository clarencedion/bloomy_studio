/**
 * Configuration centrale du site. Toute coordonnée, URL ou libellé global
 * vit ici — jamais en dur dans les composants.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio.bloomy.one"
).replace(/\/$/, "");

export const site = {
  name: "Bloomy Studio",
  tagline: "Des sites qui font éclore votre activité.",
  description:
    "Agence de développement web à Nantes : sites vitrines, e-commerce, MVP et micro SaaS sur mesure, conçus et développés par un studio de deux personnes.",
  email: "contact@bloomy.one",
  /** Téléphone public : non communiqué pour l'instant (voir checklist contenu). */
  phone: null as string | null,
  /** Lien de prise de RDV (Calendly…) : activé dès qu'une URL est fournie. */
  bookingUrl: null as string | null,
  city: "Nantes",
  country: "FR",
  areaServed: ["Nantes", "France"],
  parent: {
    name: "Bloomy",
    url: "https://bloomy.one",
  },
  /*
   * Portraits réels, repris du produit bloomy.one, détourés sur fond
   * transparent. Ce sont les seules photographies de personnes réelles du
   * site : elles montrent l'équipe elle-même, jamais un client.
   */
  founders: [
    { name: "Clarence Dion", role: "Co-fondateur", photo: "/equipe/clarence.webp" },
    { name: "Tom Rodrigues", role: "Co-fondateur", photo: "/equipe/tom.webp" },
  ],
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export type NavItem = { label: string; href: string };

/**
 * L'appel à l'action principal du site, partout le même libellé : une seule
 * formulation par intention (règle taste-skill « no duplicate CTA intent »).
 * Le diagnostic gratuit reste l'offre d'entrée des pages métier, sous son
 * propre libellé.
 */
export const primaryCta = { label: "Démarrer un projet", href: "/contact" } as const;
export const auditCta = { label: "Diagnostic gratuit", href: "/audit" } as const;

/** Entrée de menu déroulant : un intitulé, une ligne d'explication, une cible. */
export type NavLeaf = NavItem & { hint: string };

/**
 * Entrée de navigation : soit un lien simple, soit un menu déroulant.
 *
 * Le studio vend deux axes qui se croisent — **ce qu'on construit** (site,
 * MVP, micro SaaS) et **pour quel métier** (fleuristes, coiffure, autres
 * commerces). Une barre plate obligeait à choisir un des deux axes et à
 * enterrer l'autre dans le pied de page. Deux menus déroulants les exposent
 * tous les deux sans dépasser cinq entrées visibles.
 */
export type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; id: string; intro: string; items: NavLeaf[] };

export const mainNav: NavEntry[] = [
  {
    kind: "menu",
    label: "Produits",
    id: "produits",
    intro: "Ce que nous construisons.",
    items: [
      {
        label: "Sites internet & e-commerce",
        href: "/sites-internet",
        hint: "Vitrine ou boutique en ligne, sur mesure.",
      },
      {
        label: "MVP",
        href: "/developpement-mvp",
        hint: "Une première version qui tient devant de vrais utilisateurs.",
      },
      {
        label: "Micro SaaS",
        href: "/micro-saas",
        hint: "Nos propres produits, en abonnement.",
      },
    ],
  },
  {
    kind: "menu",
    label: "Secteurs",
    id: "secteurs",
    intro: "Les métiers dont nous connaissons déjà le vocabulaire.",
    items: [
      {
        label: "Fleuristes",
        href: "/fleuristes",
        hint: "Notre spécialité : saisons, deuil, mariages, click-and-collect.",
      },
      {
        label: "Salons de coiffure",
        href: "/salons-de-coiffure",
        hint: "Prestations lisibles sur mobile et réservation intégrée.",
      },
      {
        label: "Ramoneurs",
        href: "/ramonage",
        hint: "Demandes de passage complètes et tournées simplifiées.",
      },
      {
        label: "Autres commerces",
        href: "/realisations",
        hint: "Ateliers, artisans et lieux : voir ce que nous avons livré.",
      },
    ],
  },
  { kind: "link", label: "Réalisations", href: "/realisations" },
  { kind: "link", label: "Méthode", href: "/methode" },
  { kind: "link", label: "À propos", href: "/a-propos" },
];

/** Tous les liens de la navigation, à plat — sert aux tests d'intégrité. */
export const mainNavLinks: NavItem[] = mainNav.flatMap((e) =>
  e.kind === "link" ? [{ label: e.label, href: e.href }] : e.items,
);

export const footerNav = {
  fleuristes: [
    { label: "Site internet pour fleuriste", href: "/fleuristes/site-internet" },
    { label: "E-commerce & click-and-collect", href: "/fleuristes/e-commerce" },
    { label: "SEO local & Google Maps", href: "/fleuristes/seo-local" },
    { label: "Maintenance & accompagnement", href: "/fleuristes/maintenance" },
  ],
  studio: [
    { label: "Réalisations", href: "/realisations" },
    { label: "Notre méthode", href: "/methode" },
    { label: "À propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
    { label: "Diagnostic gratuit", href: "/audit" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { label: "Cookies", href: "/cookies" },
    { label: "Conditions générales", href: "/conditions-generales" },
  ],
} as const;

/** Chemin absolu d'une page du site. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
