/**
 * Configuration centralisée des offres.
 * AUCUN prix vérifié n'existe à ce jour : `price` reste `null` et le site
 * affiche « Sur devis ». Le jour où les prix publics sont décidés, il suffit
 * de renseigner `price` (ex. "à partir de 1 900 €") — aucun composant à modifier.
 */

export type Offer = {
  id: string;
  name: string;
  audience: string;
  summary: string;
  price: string | null;
  includes: string[];
  excludes: string[];
  process: string;
  highlight?: boolean;
};

export const floristOffers: Offer[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    audience:
      "Pour la boutique qui n'a pas de site — ou un site qu'elle n'ose plus montrer.",
    summary:
      "Un site vitrine soigné qui reflète enfin la qualité de votre boutique : votre univers, vos services, vos horaires, votre fiche Google connectée.",
    price: null,
    includes: [
      "Site vitrine sur mesure (pas de template mutualisé)",
      "Pages services : bouquets, mariage, deuil, entreprises",
      "Optimisation Google de base (titres, descriptions, vitesse)",
      "Connexion à votre fiche Google Business Profile",
      "Formulaire de contact et clic-pour-appeler",
      "Formation d'une heure pour mettre à jour vos contenus",
    ],
    excludes: ["Vente en ligne", "Campagnes publicitaires", "Rédaction de blog"],
    process: "Environ 4 semaines, de l'atelier de cadrage à la mise en ligne.",
  },
  {
    id: "boutique",
    name: "Boutique",
    audience:
      "Pour la boutique qui veut vendre en ligne : livraison locale et click-and-collect.",
    summary:
      "Une vraie boutique en ligne pensée pour le métier : catalogue saisonnier facile à modifier, retrait en boutique, zones de livraison, paiement sécurisé.",
    price: null,
    includes: [
      "Tout le contenu de l'offre Essentiel",
      "Catalogue produits que vous modifiez vous-même (stock, saison, prix)",
      "Click-and-collect avec choix de créneau",
      "Livraison locale par zones et frais paramétrables",
      "Paiement en ligne sécurisé",
      "Pages saisonnières (Saint-Valentin, fête des mères…)",
      "Suivi simple des commandes",
    ],
    excludes: ["Gestion des réseaux sociaux", "Photographie produit (option)"],
    process: "6 à 8 semaines selon la taille du catalogue.",
    highlight: true,
  },
  {
    id: "croissance",
    name: "Croissance",
    audience:
      "Pour la boutique déjà en ligne qui veut être trouvée — et convertir davantage.",
    summary:
      "Un accompagnement continu : SEO local, fiche Google travaillée chaque mois, contenus saisonniers, mesures et améliorations régulières.",
    price: null,
    includes: [
      "Audit local complet (site, fiche Google, concurrence)",
      "Optimisation continue du référencement local",
      "Gestion et animation de la fiche Google Business Profile",
      "Pages et campagnes saisonnières",
      "Rapport mensuel lisible : appels, itinéraires, commandes",
      "Priorisation trimestrielle des améliorations",
    ],
    excludes: ["Publicité payante (peut être ajoutée sur devis)"],
    process: "Accompagnement mensuel, sans engagement de longue durée.",
  },
];

export const addOns: { name: string; description: string }[] = [
  {
    name: "SEO local",
    description:
      "Optimisation de votre visibilité sur Google et Google Maps dans votre zone de chalandise.",
  },
  {
    name: "Maintenance",
    description:
      "Mises à jour, sauvegardes, surveillance et petites évolutions, sans facturation surprise.",
  },
  {
    name: "Google Business Profile",
    description:
      "Structuration complète de votre fiche : catégories, services, photos, posts, avis.",
  },
  {
    name: "Pages saisonnières",
    description:
      "Saint-Valentin, fête des mères, Toussaint : des pages dédiées prêtes avant le pic.",
  },
  {
    name: "Direction photo",
    description:
      "Cadrage et préparation d'un shooting qui met vos créations au niveau de votre boutique.",
  },
  {
    name: "Analytics",
    description:
      "Mesure simple et conforme RGPD de ce qui compte : appels, itinéraires, commandes.",
  },
  {
    name: "Intégrations",
    description:
      "Connexion à vos outils existants : caisse, réservation, comptabilité, réseaux sociaux.",
  },
];

export const mvpOffer: Offer = {
  id: "mvp-sprint",
  name: "MVP Sprint",
  audience:
    "Pour les fondateurs qui veulent mettre un produit réel entre les mains de vrais utilisateurs.",
  summary:
    "Du cadrage produit à la mise en production sur Firebase : un MVP resserré sur l'essentiel, testable, mesurable, prêt à itérer.",
  price: null,
  includes: [
    "Atelier de cadrage : problème, cible, parcours critique",
    "Maquettes UX/UI des écrans clés",
    "Application web (ou PWA) sur Next.js + Firebase",
    "Authentification, base de données, paiements si nécessaires",
    "Tableau de bord d'administration",
    "Mesure d'usage et déploiement production",
    "Un cycle d'itération après les premiers retours utilisateurs",
  ],
  excludes: [
    "Applications natives iOS/Android complètes (PWA d'abord)",
    "Fonctionnalités secondaires avant validation du cœur du produit",
  ],
  process: "6 à 10 semaines selon le périmètre validé ensemble.",
};
