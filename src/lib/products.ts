import type { ShowcaseSlug } from "@/lib/portfolio";

/**
 * Les trois façons de travailler avec le studio : ce que l'accueil empile
 * dans « Ce que nous construisons ».
 *
 * Règle d'honnêteté (voir AGENTS.md) : un seul micro SaaS est réellement en
 * production, bloomy.one. La formulation ne laisse donc jamais entendre qu'il
 * existe un catalogue de produits. Chaque durée et chaque fait vient d'une
 * source déjà publiée : `lib/offers.ts`, la page `/developpement-mvp` et
 * l'étude de cas Bloomy (`lib/case-studies.ts`).
 */

/**
 * Le visuel réel qui accompagne chaque offre. Jamais une interface
 * redessinée en `div` :
 * - `site`   : un site livré, en capture desktop et mobile ;
 * - `stack`  : la pile technique de nos propres produits, en typographie ;
 * - `figure` : un fait vérifiable sur bloomy.one, en très grand.
 */
export type ProductVisual =
  | { kind: "site"; slug: ShowcaseSlug }
  | { kind: "stack"; caption: string; items: { name: string; role: string }[] }
  | { kind: "figure"; value: string; label: string; source: string; sourceHref: string };

export type Product = {
  id: "sites" | "mvp" | "micro-saas";
  /** Nom court, tel qu'il apparaît en navigation. */
  name: string;
  /** Une ligne : ce que le client obtient, pas ce que nous faisons. */
  promise: string;
  /** Deux phrases maximum : l'accueil n'explique pas, il oriente. */
  body: string;
  /** Ce qui rend la chose concrète : une durée publiée ou un fait existant. */
  detail: string;
  href: string;
  /** Libellé du lien vers la page produit, explicite hors contexte. */
  linkLabel: string;
  /** Fond de la carte : un panneau clair du système, jamais une couleur d'action. */
  surface: "white" | "blush" | "mint";
  visual: ProductVisual;
};

export const products: Product[] = [
  {
    id: "sites",
    name: "Sites & e-commerce",
    promise: "Un site qui vend pendant que vous travaillez.",
    body: "Vitrine ou boutique en ligne, conçue autour de votre métier plutôt que d'un thème acheté. Vous modifiez vos contenus vous-même, sans ticket ni facture.",
    detail: "Environ quatre semaines pour un site vitrine.",
    href: "/sites-internet",
    linkLabel: "Sites internet & e-commerce",
    surface: "white",
    visual: { kind: "site", slug: "capifiore" },
  },
  {
    id: "mvp",
    name: "MVP",
    promise: "Votre idée entre les mains de vrais utilisateurs.",
    body: "Pour un fondateur qui doit prouver quelque chose vite : cadrage, conception, construction et mise en production d'une première version qui tient debout.",
    detail: "6 à 10 semaines selon le périmètre validé ensemble.",
    href: "/developpement-mvp",
    linkLabel: "Développement de MVP",
    surface: "blush",
    visual: {
      kind: "stack",
      caption: "Le socle sur lequel Bloomy tourne en production.",
      items: [
        { name: "Flutter", role: "iOS, Android et web avec une seule base de code" },
        { name: "Next.js", role: "Des pages rapides et indexables" },
        { name: "Firebase", role: "Authentification, données temps réel et paiements" },
      ],
    },
  },
  {
    id: "micro-saas",
    name: "Micro SaaS",
    promise: "Nos propres produits, en abonnement.",
    body: "Nous construisons et exploitons nos propres logiciels. Vous vous abonnez à un produit qui tourne déjà, au lieu de financer un développement.",
    detail: "Un produit en production aujourd'hui : Bloomy.",
    href: "/micro-saas",
    linkLabel: "Nos micro SaaS",
    surface: "mint",
    visual: {
      kind: "figure",
      value: "0 %",
      label: "de commission prélevée sur les fleuristes partenaires de Bloomy.",
      source: "bloomy.one",
      sourceHref: "https://bloomy.one",
    },
  },
];
