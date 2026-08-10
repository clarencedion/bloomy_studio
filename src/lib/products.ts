/**
 * Les trois façons de travailler avec le studio, et les métiers servis.
 *
 * Cette donnée existe pour que l'accueil puisse répondre en un écran à
 * « qu'est-ce que vous faites, exactement ? » — question à laquelle la version
 * précédente ne répondait qu'après six sections.
 *
 * Règle d'honnêteté (voir AGENTS.md) : un seul micro-SaaS est réellement en
 * production, bloomy.one. La formulation ne laisse donc jamais entendre qu'il
 * existe un catalogue de produits. De même, `sectors` ne liste que des métiers
 * pour lesquels une page et un travail réels existent.
 */

export type Product = {
  id: string;
  /** Nom court, tel qu'il apparaît en navigation. */
  name: string;
  /** Une ligne : ce que le client obtient, pas ce que nous faisons. */
  promise: string;
  /** Deux phrases maximum — l'accueil n'explique pas, il oriente. */
  body: string;
  /** Ce qui rend la chose concrète : livrable, durée, ou preuve existante. */
  detail: string;
  href: string;
  cta: string;
  /** Teinte de carte (token `--color-tint-*`). Jamais une couleur d'action. */
  tint: "kraft" | "soie" | "eau";
  /** Illustration à l'encre associée (voir components/visuals/Sketch.tsx). */
  sketch: "site" | "mvp" | "saas";
};

export const products: Product[] = [
  {
    id: "sites",
    name: "Sites & e-commerce",
    promise: "Un site qui vend pendant que vous composez",
    body: "Vitrine ou boutique en ligne, conçue autour de votre métier plutôt que d'un template. Vous restez propriétaire de tout, et vous modifiez vos contenus vous-même.",
    detail: "Quatre semaines, quatre jalons validés ensemble.",
    href: "/sites-internet",
    cta: "Voir l'approche",
    tint: "kraft",
    sketch: "site",
  },
  {
    id: "mvp",
    name: "MVP",
    promise: "Votre idée entre les mains de vrais utilisateurs",
    body: "Pour un fondateur qui doit prouver quelque chose vite : cadrage, conception, construction et mise en production d'une première version qui tient debout.",
    detail: "Flutter, Next.js et Firebase — la stack de nos propres produits.",
    href: "/developpement-mvp",
    cta: "Voir la démarche",
    tint: "eau",
    sketch: "mvp",
  },
  {
    id: "micro-saas",
    name: "Micro SaaS",
    promise: "Nos produits, en abonnement",
    body: "Nous construisons et exploitons nos propres logiciels. Vous vous abonnez à un produit qui existe déjà, au lieu de financer un développement sur mesure.",
    detail: "Le premier s'appelle Bloomy : 1 000+ inscrits, 0 % de commission.",
    href: "/micro-saas",
    cta: "Découvrir Bloomy",
    tint: "soie",
    sketch: "saas",
  },
];

export type Sector = {
  id: string;
  name: string;
  /** Ce que ce métier a de particulier, en une phrase concrète. */
  body: string;
  href: string;
  tint: "kraft" | "soie" | "feuille" | "eau" | "lin";
  sketch: "bouquet" | "salon" | "boutique";
};

export const sectors: Sector[] = [
  {
    id: "fleuristes",
    name: "Fleuristes",
    body: "Arrivages du matin, pics de saison, mariages sur dossier et commandes de deuil passées depuis un téléphone.",
    href: "/fleuristes",
    tint: "soie",
    sketch: "bouquet",
  },
  {
    id: "salons",
    name: "Salons de coiffure",
    body: "Un menu de prestations lisible sur mobile, la réservation intégrée, et le recrutement qui compte autant que les clients.",
    href: "/salons-de-coiffure",
    tint: "feuille",
    sketch: "salon",
  },
  {
    id: "autres",
    name: "Commerces & métiers visuels",
    body: "Ateliers, artisans, lieux : le même travail d'image et de conversion, avec le vocabulaire de votre métier.",
    href: "/realisations",
    tint: "lin",
    sketch: "boutique",
  },
];

/** Classe de fond par teinte — évite d'écrire la couleur dans les composants. */
export const tintClass: Record<string, string> = {
  kraft: "bg-tint-kraft",
  soie: "bg-tint-soie",
  feuille: "bg-tint-feuille",
  eau: "bg-tint-eau",
  lin: "bg-tint-lin",
};
