/**
 * Contenu de la page `/ramonage` — site du studio destiné aux ramoneurs.
 *
 * La page suit une seule ligne narrative, dans cet ordre : ce que le site
 * fait (hero + repères), à quoi il ressemble (vitrine RamoPlus), comment il
 * réserve (parcours jouable), ce qu'il change avant et après l'intervention
 * (diptyque), puis les questions et l'appel.
 *
 * RamoPlus (`ramoplus.pages.dev`) est un site conçu par le studio, réellement
 * en ligne et cliquable de bout en bout. Ce n'est pas un site client en
 * production : décision du 2026-08-25, la page ne le qualifie donc jamais de
 * travail livré à un client, elle dit seulement ce qui est vérifiable — nous
 * l'avons conçu, il est en ligne. Conséquences à tenir : il n'entre pas dans
 * `lib/portfolio.ts` ni dans `/realisations`, et ses témoignages ne sont
 * jamais repris ici comme preuve (règle : aucune preuve inventée).
 */

export const ramonagePage = {
  hero: {
    eyebrow: "Sites pour ramoneurs",
    title: "Votre site prend les rendez-vous. Vous gardez les mains libres.",
    lede:
      "Vos clients décrivent leur appareil et proposent leurs créneaux pendant que vous êtes sur un chantier. Vous ouvrez le téléphone le soir sur des demandes déjà complètes.",
    primaryCta: "Voir mon futur site",
    secondaryCta: "Essayer la réservation",
    imageAlt:
      "Ramoneur préparant son matériel devant un poêle à bois dans une maison",
    imageCaption: "Votre métier d’abord. Le numérique travaille en coulisses.",
  },

  /**
   * Bande de repères accrochée au hero : quatre lignes, pas de paragraphe.
   * Elle remplace l'ancienne section « une journée simplifiée », dont les
   * trois cartes disaient déjà ce que le diptyque raconte plus bas.
   */
  markers: [
    {
      label: "Rendez-vous en ligne",
      body: "Appareil, adresse et disponibilités arrivent renseignés.",
    },
    {
      label: "Demandes filtrées",
      body: "Hors secteur, le formulaire le dit avant votre téléphone.",
    },
    {
      label: "Tournées groupées",
      body: "Les créneaux proposés suivent vos jours par commune.",
    },
    {
      label: "Certificat transmis",
      body: "Le document part du mobile en fin d’intervention.",
    },
  ],

  showcase: {
    eyebrow: "Un site en ligne",
    title: "Le site existe déjà. Ouvrez-le, cliquez partout.",
    lede:
      "RamoPlus, c'est le site que nous avons conçu pour le ramonage : accueil, prestations, grille tarifaire, réglementation, zones et prise de rendez-vous complète. Le même socle se réécrit avec votre nom, vos tarifs et vos communes.",
    caption:
      "RamoPlus — conçu par le studio, en ligne et cliquable de bout en bout.",
    liveLabel: "Site en ligne",
    liveUrl: "https://ramoplus.pages.dev/",
    desktopAlt:
      "Page d’accueil du site RamoPlus : titre, prise de rendez-vous et bandeau de garanties",
    mobileAlt: "Le même site RamoPlus affiché sur un téléphone",
  },

  booking: {
    eyebrow: "Le parcours client",
    title: "Trois écrans, et la demande est qualifiée.",
    lede:
      "Le module de réservation de RamoPlus, reproduit ici. Choisissez un appareil, proposez des créneaux : le dossier se remplit sans un seul appel.",
    panelLabel: "Prise de rendez-vous — ce que voit votre client",
    note:
      "Durées et tarifs repris de la grille publiée sur ramoplus.pages.dev. Sur votre site, ce sont les vôtres.",
  },

  /**
   * Diptyque : deux volets de même structure (pastille, titre, texte, trois
   * points) et de même cadrage, en miroir. C'est la seule répétition voulue
   * de la page — elle oppose l'avant et l'après d'une intervention.
   */
  field: {
    eyebrow: "Autour de l’intervention",
    title: "Avant le passage, après le passage.",
    lede:
      "Le site ne s’arrête pas au bouton « réserver ». Il prépare la tournée, puis il clôt le dossier.",
    panels: [
      {
        eyebrow: "Avant le passage",
        title: "Votre zone d’intervention devient un filtre.",
        body:
          "Le formulaire connaît vos communes et vos jours. Une demande hors secteur est traitée sur place, sans vous déranger à 20 h.",
        points: [
          "Vos communes et vos rayons sont annoncés noir sur blanc.",
          "Les créneaux proposés regroupent les passages d’un même secteur.",
          "Hors zone : refus clair ou bascule vers une demande de devis.",
        ],
        image: "/ramonage/tournee-crayon.webp",
        imageAlt:
          "Illustration au crayon d’un ramoneur en tournée dans un village français",
      },
      {
        eyebrow: "Après le passage",
        title: "L’intervention se clôt avant de remonter dans le camion.",
        body:
          "Le dossier client est déjà ouvert : appareil, adresse, dernier passage. Vous ajoutez le constat, le document part, le rappel de l’an prochain est posé.",
        points: [
          "Dossier client centralisé, consultable depuis le chantier.",
          "Envoi du document au client depuis le mobile.",
          "Rappel annuel paramétrable selon la fréquence légale.",
        ],
        image: "/ramonage/certificat-crayon.webp",
        imageAlt:
          "Illustration au crayon d’un ramoneur transmettant un document sur smartphone",
      },
    ],
  },

  faq: {
    eyebrow: "Questions de terrain",
    title: "L’essentiel avant de démarrer.",
    items: [
      {
        question: "Est-ce compatible avec mon agenda actuel ?",
        answer:
          "Nous partons de votre façon de gérer les créneaux. Selon votre équipement, le site se connecte à votre calendrier ou fonctionne avec un planning dédié.",
      },
      {
        question: "Et si certains clients préfèrent appeler ?",
        answer:
          "Le bouton d’appel reste visible, surtout sur mobile. La réservation en ligne absorbe simplement les demandes du soir, du week-end et les clients qui veulent aller vite.",
      },
      {
        question: "Puis-je limiter les réservations à certaines communes ?",
        answer:
          "Oui. Nous configurons votre zone, vos jours de passage et le traitement d’une demande hors secteur : refus clair ou demande de devis.",
      },
      {
        question: "Qui décide des tarifs affichés ?",
        answer:
          "Vous. Le parcours ci-dessus reprend la grille publiée sur RamoPlus ; votre site affiche vos propres montants, ou aucun montant si vous préférez chiffrer après diagnostic.",
      },
      {
        question: "Combien de temps faut-il pour être en ligne ?",
        answer:
          "Quelques semaines dans la plupart des cas. Le délai dépend surtout des contenus, des connexions souhaitées et de votre disponibilité pour les validations.",
      },
    ],
  },

  closing: {
    eyebrow: "Parlons de votre saison",
    title: "Montrez-nous comment vous travaillez. Nous dessinons le site autour.",
    lede:
      "Un premier échange de 15 minutes suffit pour parler de vos communes, de vos prestations et de votre planning.",
    cta: "Échanger sur mon projet",
    reassurance: "Gratuit, direct et sans engagement.",
  },
} as const;

/**
 * Données du parcours jouable, reprises telles quelles de la grille publiée
 * sur ramoplus.pages.dev/tarifs.html. Aucun chiffre n'est inventé ici : ce
 * sont les tarifs affichés par le site de démonstration, et la page le dit.
 */
export const ramonageDemo = {
  appliances: [
    {
      id: "poele-bois",
      name: "Poêle à bois",
      fuel: "Bois",
      desc: "Conduit simple ou tubé, ramonage mécanique rotatif.",
      duration: "45 min",
      price: "89 €",
    },
    {
      id: "insert-bois",
      name: "Insert à bois",
      fuel: "Bois",
      desc: "Démontage du déflecteur, aspiration des suies et contrôle.",
      duration: "55 min",
      price: "99 €",
    },
    {
      id: "cheminee-bois",
      name: "Cheminée à bois",
      fuel: "Bois",
      desc: "Foyer ouvert, protection soignée des sols et de l’âtre.",
      duration: "50 min",
      price: "99 €",
    },
    {
      id: "poele-granules",
      name: "Poêle à granulés",
      fuel: "Granulés",
      desc: "Conduit, extracteur, creuset et échangeur.",
      duration: "1 h 15",
      price: "139 €",
    },
    {
      id: "chaudiere-gaz",
      name: "Chaudière gaz",
      fuel: "Gaz",
      desc: "Entretien annuel et contrôle du conduit de fumée.",
      duration: "1 h",
      price: "119 €",
    },
    {
      id: "chaudiere-fioul",
      name: "Chaudière fioul",
      fuel: "Fioul",
      desc: "Ramonage du conduit et nettoyage de la chambre de combustion.",
      duration: "1 h 15",
      price: "149 €",
    },
  ],
  /** Jours de tournée par secteur — la logique que le site fait respecter. */
  days: [
    { id: "mar", label: "Mardi 3", sector: "Secteur centre" },
    { id: "mer", label: "Mercredi 4", sector: "Secteur nord" },
    { id: "jeu", label: "Jeudi 5", sector: "Secteur centre" },
    { id: "ven", label: "Vendredi 6", sector: "Secteur sud" },
  ],
  slots: ["8 h – 10 h", "10 h – 12 h", "14 h – 16 h", "16 h – 18 h"],
  /** Le client propose entre deux et cinq créneaux, comme sur RamoPlus. */
  minSlots: 2,
  maxSlots: 5,
} as const;

export type RamonageAppliance = (typeof ramonageDemo.appliances)[number];
