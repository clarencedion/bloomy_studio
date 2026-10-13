/**
 * Études de cas. Architecture complète ; un seul projet publié à ce jour :
 * Bloomy, la plateforme construite par l'équipe elle-même (faits vérifiables
 * sur bloomy.one). Les champs sans donnée réelle restent absents, jamais
 * remplis avec des chiffres inventés.
 */

export type CaseStudy = {
  slug: string;
  client: string;
  /** Titre de l'étude (H1) : ce que le projet a rendu possible, en une phrase. */
  headline: string;
  /** Title de la page, 50 à 60 caractères (le gabarit ajoute « | Bloomy Studio »). */
  metaTitle: string;
  sector: string;
  location: string;
  services: string[];
  year: string;
  /** Date de dernière mise à jour du contenu (sitemap lastmod). */
  updatedAt: string;
  summary: string;
  problem: string;
  approach: string;
  visualDirection: string;
  technical: string;
  seoWork: string;
  conversionWork: string;
  /** Résultats : uniquement des faits vérifiables. */
  results: string[];
  liveUrl: string | null;
  testimonial: { quote: string; author: string } | null;
  relatedServices: { label: string; href: string }[];
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bloomy-plateforme-florale",
    client: "Bloomy",
    headline: "Composer son bouquet fleur par fleur, chez l'artisan d'à côté.",
    metaTitle: "Bloomy, étude de cas : une plateforme florale en production",
    sector: "Commerce floral local",
    location: "Nantes, puis Paris, Bordeaux, Marseille, Toulouse",
    services: [
      "Produit & UX",
      "Développement web et mobile",
      "E-commerce floral",
      "Click-and-collect",
      "SEO local",
    ],
    year: "Depuis 2024",
    updatedAt: "2026-07-24",
    summary:
      "La plateforme qui permet de composer son bouquet fleur par fleur chez un artisan local, construite de zéro par l'équipe du studio.",
    problem:
      "Les fleuristes indépendants dépendent de grandes plateformes de transmission florale qui prélèvent des commissions importantes, imposent des catalogues standardisés et effacent l'identité de chaque boutique. Côté clients, impossible de composer un bouquet personnalisé en ligne comme on le ferait au comptoir.",
    approach:
      "Partir du comptoir, pas de la technologie : observer comment un bouquet se compose réellement en boutique (fleurs disponibles ce matin-là, budget du client, occasion) et reproduire cette conversation dans un parcours mobile simple. Chaque décision produit a été testée avec de vrais fleuristes nantais.",
    visualDirection:
      "Un univers chaleureux et artisanal, à rebours des plateformes froides du secteur : crème, lilas et vert botanique, illustrations douces, vocabulaire du métier.",
    technical:
      "Application multiplateforme développée en Flutter sur infrastructure Firebase : catalogue temps réel par boutique, composition fleur par fleur avec budget dynamique, click-and-collect et livraison locale, tableau de bord fleuriste pour gérer stock et commandes.",
    seoWork:
      "Architecture de pages par ville et par boutique partenaire, fiches structurées, données locales cohérentes entre le site et les fiches Google des boutiques.",
    conversionWork:
      "Parcours de commande réduit à l'essentiel : composer, choisir retrait ou livraison, payer. Prix transparent tout compris, aperçu photo avant envoi.",
    results: [
      "Plateforme en production sur bloomy.one",
      "Plus de 1 000 utilisateurs inscrits",
      "0 % de commission prélevée sur les artisans partenaires",
      "Click-and-collect et livraison le jour même opérationnels",
      "Déployée à Nantes et en extension sur 4 autres villes",
    ],
    liveUrl: "https://bloomy.one",
    testimonial: null,
    relatedServices: [
      { label: "E-commerce pour fleuristes", href: "/fleuristes/e-commerce" },
      { label: "SEO local", href: "/fleuristes/seo-local" },
      { label: "Développement MVP", href: "/developpement-mvp" },
    ],
    published: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug && c.published);
}

export function publishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published);
}
