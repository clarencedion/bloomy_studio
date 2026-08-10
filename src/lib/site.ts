/**
 * Configuration centrale du site. Toute coordonnée, URL ou libellé global
 * vit ici — jamais en dur dans les composants.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio.bloomy.one"
).replace(/\/$/, "");

export const site = {
  name: "Bloomy Studio",
  tagline: "Le studio digital qui fait fleurir les fleuristes.",
  description:
    "Sites e-commerce, SEO local et outils sur mesure pour fleuristes, conçus avec une véritable expertise du secteur floral. Basé à Nantes, actif partout en France.",
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
   * Portraits réels, repris du produit bloomy.one — détourés sur fond
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
 * Navigation principale — six entrées, pas plus : au-delà, plus rien ne se
 * distingue. L'ordre suit la valeur commerciale (spécialisation fleuriste,
 * puis offres, puis capacité produit).
 *
 * « Applications & MVP » y figure parce que c'est la troisième activité du
 * studio, et qu'elle n'était atteignable que depuis le pied de page.
 * « Méthode » en est sortie : c'est une page de réassurance qu'on atteint en
 * contexte (accueil, FAQ, pied de page), pas une porte d'entrée.
 */
export const mainNav: NavItem[] = [
  { label: "Fleuristes", href: "/fleuristes" },
  { label: "Services", href: "/services" },
  { label: "MVP", href: "/developpement-mvp" },
  // Le blog cède sa place au troisième produit : il reste atteignable depuis
  // le pied de page et depuis chaque page pilier, alors qu'un produit qu'on
  // ne trouve pas en navigation n'existe pas commercialement.
  { label: "Micro SaaS", href: "/micro-saas" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
];

export const footerNav = {
  fleuristes: [
    { label: "Site internet pour fleuriste", href: "/fleuristes/site-internet" },
    { label: "E-commerce & click-and-collect", href: "/fleuristes/e-commerce" },
    { label: "SEO local & Google Maps", href: "/fleuristes/seo-local" },
    { label: "Maintenance & accompagnement", href: "/fleuristes/maintenance" },
  ],
  studio: [
    { label: "Tous les services", href: "/services" },
    { label: "Salons de coiffure", href: "/salons-de-coiffure" },
    { label: "Développement MVP", href: "/developpement-mvp" },
    { label: "Micro SaaS", href: "/micro-saas" },
    { label: "Notre méthode", href: "/methode" },
    { label: "Réalisations", href: "/realisations" },
    { label: "À propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
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
