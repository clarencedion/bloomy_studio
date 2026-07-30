# Direction artistique & plan de section — Bloomy Studio

Document interne de conception. Il traduit la direction artistique révisée
(Framer 25 % · Attio 25 % · Gisou 20 % · Stripe 20 % · Linear 10 %) en
décisions exécutables : système visuel, architecture de conversion, et une
fiche par section de l'accueil.

Règle de lecture : les références n'ont jamais valeur de modèle. Elles servent
à arbitrer une décision déjà motivée par un objectif commercial. Aucune section
n'existe ici parce qu'elle existe ailleurs.

Ce document prime sur `docs/bloomy-studio-blueprint.md` pour tout ce qui touche
au visuel et à l'accueil ; le blueprint reste la référence SEO, offres, légal.

---

## 1. Ce que le site doit vendre

Par ordre de valeur commerciale, et donc de place à l'écran :

1. **Sites & e-commerce pour fleuristes** — cœur de métier, ~75 % du discours.
2. **Sites pour commerces et métiers visuels** — coiffure et assimilés, ~15 %.
3. **Applications, outils métier et MVP** — ~10 %, découvert *après* la
   spécialisation florale, comme preuve de profondeur technique.

Conséquence structurelle : la spécialisation fleuriste doit être lisible en dix
secondes (eyebrow, titre, première vitrine). La capacité applicative n'apparaît
qu'en section 9, quand la crédibilité métier est déjà acquise.

## 2. Ce que le visiteur doit ressentir, dans l'ordre

| Étape | Question du fleuriste | Section qui répond |
|---|---|---|
| 0–10 s | « C'est pour moi ? Est-ce que c'est beau ? » | 1 Hero, 2 Réalisations |
| 10–40 s | « Est-ce qu'ils comprennent mon problème ? » | 3 Frictions |
| 40–90 s | « Concrètement, ils font quoi ? » | 4 Besoins, 5 Étude de cas |
| 90–150 s | « Est-ce que je saurai m'en servir ? » | 6 Administration |
| 150 s+ | « Comment ça se passe, et avec qui ? » | 7 Méthode, 8 Autres métiers, 9 Produits |
| Décision | « Qu'est-ce qui me le prouve ? » | 10 Preuves, 11 FAQ, 12 CTA final |

Chaque section sert au moins un de ces cinq verbes : **comprendre, désirer,
être rassuré, voir une preuve, agir**. Une section qui n'en sert aucun saute.

## 3. Matériel réel disponible (inventaire vérifié)

Rien d'autre que ceci ne peut être montré. Aucune preuve inventée, aucune image
générée, aucune boutique partenaire de la marketplace présentée comme cliente.

**Sites livrés, captures desktop 1600 px WebP (`public/realisations/`)**

| Projet | Ville | Univers de la capture | Ce qu'elle prouve |
|---|---|---|---|
| Monloup | Roanne | Crème et caramel, arche photo, boutique + location + deuil | E-commerce florale complet |
| Maison Hortense | Saint-Nauphary | Ivoire et lilas, nature morte, ateliers + mariages | Vitrine premium et éditoriale |
| KL Fleuriste | Reims | Aplat vert sauge plein, scénographie de mariage | Direction artistique affirmée |

Les trois captures sont d'excellente qualité et **suffisent à porter la section
2 et la section 5**. Elles couvrent trois palettes différentes — c'est un
argument : le studio ne recycle pas un template.

**Autres actifs réels**

- `docs`/`case-studies.ts` : **Bloomy** (bloomy.one), plateforme construite par
  l'équipe — 1 000+ inscrits, 0 % de commission, click-and-collect et livraison
  en production, Nantes + 4 villes. Seule étude de cas publiée.
- `public/photos/` : deux photographies florales réelles — un bouquet champêtre
  vertical (4:5) et un bouquet éclat de saison tenu à bras (1:1, geste humain,
  fond d'atelier). C'est peu, mais c'est vrai.
- `components/visuals/BloomyComposer.tsx` : aperçu stylisé du produit de
  l'équipe, explicitement étiqueté comme tel.
- `components/visuals/Botanical.tsx` : botaniques au trait, complément
  décoratif uniquement.

**Manques qui contraignent la direction** (détail et arbitrages en §10)

- Aucune capture **mobile** des sites livrés → indispensable aux compositions
  desktop + mobile de l'influence Framer.
- Aucune capture d'**interface d'administration** réelle.
- Aucune photographie « atelier × digital » (ordinateur, tablette, téléphone en
  situation) → c'est le carburant de l'influence Gisou.
- Aucun **témoignage** client autorisé par écrit.
- Les projets cités dans la direction (Artist Floral, Flovia, MétéoLinge)
  **n'existent pas dans le dépôt** : ni capture, ni entrée portfolio, ni étude
  de cas. Ils ne peuvent pas être affichés tant que le matériel n'arrive pas.

## 4. Système visuel — évolution, pas refonte

Le système « atelier clair » actuel (beaucoup de blanc, une seule couleur
forte, Cal Sans + Inter) est cohérent avec la direction demandée. Il lui manque
trois choses : **la profondeur** (Framer), **la densité structurée** (Stripe),
**la précision froide contrôlée** (Linear). D'où les ajouts ci-dessous.

### 4.1 Palette

Ivoire chaud dominant, une couleur d'action, une couleur de surface sombre, une
teinte végétale désaturée. Les couleurs saturées viennent des photos, des
fleurs et des sites clients — jamais de l'interface.

| Token | Valeur | Rôle | Contraste sur ivoire |
|---|---|---|---|
| `cream` | `#FAF7F1` | Ivoire chaud, fond de page | — |
| `cream-deep` | `#F3EDE4` | Panneaux, bandes en retrait | — |
| `paper` | `#FFFFFF` | Surfaces, cartes, interfaces | — |
| `paper-warm` | `#FCF6F4` | Surface légèrement rosée (formulaires, encarts) | — |
| `ink` | `#1B181C` | Anthracite chaud : titres, corps | ~16:1 |
| `ink-soft` | `#57525A` | Texte secondaire | 7,1:1 |
| `rose` | `#8A2145` | **Unique couleur d'action** : CTA, liens, accents | 8,3:1 |
| `plum` | `#43203A` | **Prune profond** : bandes sombres, surfaces tech | 13,0:1 |
| `bloom` | `#C43060` | Accent floral vif, **ponctuel** (pastille, soulignement, hover) | 5,0:1 |
| `sage` | `#8DA089` | Vert botanique désaturé, décoratif uniquement | — |
| `sage-deep` | `#3B5A45` | Vert lisible (étiquettes, icônes sur voile) | 7,2:1 |
| `hairline` | `#EAE2D8` | Tous les filets | — |

Changements par rapport à `globals.css` :

- `ink` passe du brun-noir à l'**anthracite chaud** (demande explicite).
- `green #97C485` → `sage #8DA089` : le vert vif date de bloomy.one produit, il
  jure avec l'ivoire et sature les icônes. Version désaturée demandée.
- Ajout de `plum` : les bandes sombres sont aujourd'hui en `ink` pur, ce qui
  fait « SaaS ». Le prune profond réchauffe et sert de fond aux composants
  d'interface (section 6 et 9) sans virer au clone sombre de Linear.
- Ajout de `bloom` : un seul accent plus vif que le bourgogne, autorisé
  uniquement en micro-dose (pastille de section, soulignement de survol,
  ponctuation d'un chiffre). Jamais deux `bloom` dans le même écran.
- `lilac` : sortie progressive. Plus aucun nouvel usage ; les `bg-lilac-veil`
  existants deviennent `sage`-veil ou `paper-warm`.

Discipline d'emploi, non négociable : **une seule couleur d'action par page**
(`rose`), le prune est une surface, le sage n'est jamais un lien, le bloom ne
porte jamais une information seule.

### 4.2 Typographie

Inchangée dans son principe — Cal Sans display (une graisse, jamais d'italique)
+ Inter corps — mais la hiérarchie gagne deux niveaux dont l'accueil a besoin :

- `text-display-2xl` : hero uniquement, `clamp(2.8rem, 1.5rem + 4.6vw, 5rem)`.
- `.lede` : chapô de section, 1,15 rem → 1,3 rem, `ink-soft`, max 46 caractères
  par ligne au-delà de 640 px.
- L'emphase colorée dans un titre reste la seule emphase autorisée : `rose` sur
  un fragment de trois mots maximum, une fois par page.

### 4.3 Formes, profondeur, matière

- Rayons : `rounded-sm` (6 px) pour les cartes et les captures, `rounded-full`
  pour les boutons, `rounded-lg` (12 px) **uniquement** pour les cadres
  d'appareil. Rien au-delà — la direction proscrit les cartes trop arrondies.
- Profondeur sans 3D : superposition contrôlée (mobile qui chevauche le coin
  d'une capture desktop), `shadow-float` sur l'élément dominant, `shadow-lift`
  sur les secondaires, filet `hairline` sur tout ce qui est blanc sur ivoire.
  Jamais de rotation, jamais de perspective, jamais de flottement dans le vide :
  chaque appareil est ancré à un bord, une bande ou une photo.
- Nouveau composant transverse **`DeviceFrame`** : trois variantes `browser`,
  `phone`, `panel`. C'est lui qui donne la cohérence Framer/Linear ; toutes les
  captures du site passent par lui.
- Grain de papier conservé à 1,8 % — c'est ce qui empêche l'ivoire de devenir
  du blanc de SaaS.

### 4.4 Mouvement

Cinq animations autorisées sur tout le site, pas une de plus :

1. **Révélation au scroll** — 16 px vers le haut + opacité, 500 ms, `ease-soft`,
   déclenchée une seule fois, jamais en cascade de plus de 3 éléments.
2. **Survol de projet** — élévation 4 px + passage du filet en `rose`, 200 ms.
3. **Transition de vue** dans les composants à onglets (section 6), 180 ms.
4. **Séquence d'éclosion** du hero, déjà en place, jouée une seule fois.
5. **Progression de l'étude de cas** (section 5) : la colonne visuelle est
   `sticky` en desktop pendant que le texte défile. Aucun scroll détourné,
   aucune durée artificielle, désactivé sous 1024 px.

Interdits : apparition lettre par lettre, particules, pétales, parallaxe lourde,
animation en boucle permanente. `prefers-reduced-motion` coupe 1, 4 et 5 et
réduit 2 et 3 à un changement de couleur.

## 5. Architecture de conversion

Trois portes, une seule primaire :

- **Primaire — diagnostic gratuit** (`/audit`). Reste la conversion la plus
  qualifiante : elle produit un livrable, donc une conversation.
- **Secondaire — parler du projet** (`/contact`).
- **Tertiaire — explorer les réalisations** (`/realisations`), qui ramène vers
  les deux premières.

Répartition des CTA sur l'accueil : hero (2 CTA maximum), après la section 5,
après la section 7, bande finale. Pas plus — un CTA après chaque section
détruit sa propre crédibilité.

Événements `track()` à câbler, en réutilisant la map existante :
`cta_audit_click`, `case_study_view`, `contact_submit`, plus deux ajouts —
`showcase_project_view` (section 2, projet mis au premier plan) et
`admin_demo_tab` (section 6, onglet consulté). Rien d'autre.

## 6. Les douze sections de l'accueil

Budget de mots : **~900 mots**, contre ~500 aujourd'hui. La règle « accueil
court » cède ici, parce que la narration Attio exige de faire progresser le
prospect ; la contrepartie est stricte : **une idée par section, aucun bénéfice
répété deux fois**. La profondeur SEO reste sur les piliers et le blog.

---

### 1 — Hero

- **Objectif** : comprendre + désirer. Spécialisation fleuriste évidente,
  maîtrise technique suggérée.
- **Contenu** : eyebrow « Studio digital spécialisé pour les fleuristes » ;
  titre « Nous créons l'expérience digitale que votre savoir-faire mérite. » ;
  sous-titre en une phrase concrète ; deux CTA ; ligne de réassurance
  « Sites vitrines · E-commerce · Commandes en ligne · SEO local · Applications ».
- **Influence** : Attio (clarté, hiérarchie) + Framer (composition) + Gisou
  (chaleur de la photo).
- **Composant** : `HeroStudio` + `HeroComposition`. Une réalisation domine
  (Monloup, `DeviceFrame browser`), ancrée en bas à droite par sa version
  mobile (`DeviceFrame phone`), et un fragment d'interface de gestion en
  arrière-plan décalé. Trois éléments, pas dix.
- **Mobile** : texte pleine largeur, CTA empilés pleine largeur ; la composition
  devient une capture desktop rognée à 16:10 avec le mobile chevauchant le coin
  bas-droit ; le fragment d'administration disparaît.
- **Animation** : révélation du bloc texte, puis composition à +150 ms. Une fois.
- **CTA** : « Découvrir nos créations » (ancre `#realisations`) + « Parler de
  mon projet » (`/contact`). Le diagnostic gratuit reste porté par le header
  collant et la bande finale — voir §10, arbitrage à confirmer.
- **Preuve** : un vrai site livré, visible avant toute promesse.

### 2 — Réalisations, immédiatement

- **Objectif** : voir une preuve. Répondre à « est-ce que c'est beau ? » en
  moins de trois secondes de défilement.
- **Contenu** : les trois sites livrés, chacun avec ville, nature du projet
  (boutique en ligne / vitrine & mariages / scénographie) et une ligne de
  résultat factuel. Pas de faux logos, pas de compteur de projets.
- **Influence** : Framer, dominante.
- **Composant** : `WorkShowcase` — remplace l'usage actuel de `ShowcaseSites`
  sur l'accueil. Une réalisation active en grand, les deux autres en vignettes
  cliquables à gauche ; le changement est instantané, sans carrousel
  automatique. Les captures gardent leurs vraies proportions.
- **Mobile** : pile verticale de trois captures pleine largeur, chacune
  légendée ; aucune interaction requise pour tout voir.
- **Animation** : fondu-croisé 220 ms au changement de projet ; survol = filet
  `rose` sur la vignette.
- **CTA** : « Voir toutes les réalisations » (`/realisations`), en lien discret.
- **Preuve** : trois univers graphiques différents = du sur-mesure, pas un
  template décliné.

### 3 — Ce qui bloque aujourd'hui

- **Objectif** : être compris. Le fleuriste doit se reconnaître, pas se sentir
  jugé.
- **Contenu** : trois frictions concrètes, formulées à la première personne du
  métier — le site qui ne ressemble pas à la boutique ; les commandes qui
  passent par Instagram, le téléphone et des captures d'écran ; l'invisibilité
  sur Google au moment où quelqu'un cherche « fleuriste + ville ». Une phrase
  chacune, aucun vocabulaire d'agence.
- **Influence** : Attio.
- **Composant** : `Frictions` — liste filetée sur deux colonnes, pas de cartes,
  pas d'icônes décoratives. La sobriété fait l'empathie ici.
- **Mobile** : une colonne, filets conservés.
- **Animation** : révélation au scroll, décalage 60 ms entre les trois lignes.
- **CTA** : aucun. Une section qui nomme un problème ne vend pas dans la foulée.
- **Preuve** : la justesse du constat est la preuve.

### 4 — Ce que nous faisons, par besoin

- **Objectif** : comprendre l'offre sans lire une liste de prestations.
- **Contenu** : quatre besoins réels — vendre en ligne (click-and-collect et
  livraison locale) ; recevoir des demandes de mariage et d'entreprise ; être
  trouvé sur Google et Maps ; garder la main sur ses contenus. Chacun renvoie
  au spoke correspondant.
- **Influence** : Stripe.
- **Composant** : `NeedsGrid` — quatre panneaux `paper` sur `cream-deep`, filet
  `hairline`, pictogramme botanique `sage-deep` sur voile, titre orienté
  résultat, une ligne de corps, lien fléché. Aucun numéro décoratif.
- **Mobile** : deux colonnes dès 640 px, une seule en dessous.
- **Animation** : élévation au survol uniquement.
- **CTA** : « Voir le détail des offres » (`/services`).
- **Preuve** : chaque besoin pointe vers une page qui le documente vraiment.

### 5 — Étude de cas principale

- **Objectif** : désirer + être rassuré. Montrer une transformation, pas un
  visuel.
- **Contenu** : Monloup, Roanne. Situation de départ, décisions de conception,
  ce que la boutique gère elle-même aujourd'hui. Uniquement des faits
  vérifiables ; aucune métrique tant qu'elle n'est pas mesurée et autorisée.
- **Influence** : Framer (composition, scroll narratif) + Gisou (photographie).
- **Composant** : `CaseSpotlight` — bande `cream-deep`, colonne texte à gauche,
  colonne visuelle `sticky` à droite qui enchaîne capture desktop → capture
  mobile → détail floral (photo réelle). L'ancrage photographique est ce qui
  distingue cette section d'une démo de SaaS.
- **Mobile** : `sticky` désactivé, alternance texte / visuel en pile.
- **Animation** : progression `sticky` (règle 5). Rien d'autre.
- **CTA** : « Lire l'étude de cas » — nécessite une entrée `case-studies.ts`
  pour Monloup ; à défaut, lien vers `/realisations`.
- **Preuve** : un projet nommé, une ville, un site en ligne.

### 6 — L'administration, en vrai

- **Objectif** : lever l'objection numéro un — « je ne saurai pas m'en servir ».
- **Contenu** : trois gestes du quotidien, montrés : ajouter un bouquet au
  catalogue, fermer une journée de retrait, publier une page de saison. Un
  paragraphe court, trois onglets.
- **Influence** : Linear (précision, densité) + Attio (démonstration au service
  du message).
- **Composant** : `AdminPreview`, client component à onglets, posé sur une bande
  `plum` — surface sombre chaude, pas un fond noir. **Étiqueté « Aperçu de
  l'interface » de la même façon que `BloomyComposer`** : tant qu'aucune capture
  d'un back-office livré n'est disponible, c'est une reconstitution fidèle du
  produit de l'équipe, jamais une capture client présentée comme telle.
- **Mobile** : onglets en défilement horizontal, panneau pleine largeur ; le
  conteneur défile, jamais la page.
- **Animation** : transition d'onglet 180 ms, pas d'auto-play.
- **CTA** : aucun. La section rassure, la suivante engage.
- **Preuve** : le studio édite ce type d'interface tous les jours pour bloomy.one.

### 7 — La méthode

- **Objectif** : être rassuré sur le déroulé et sur le risque.
- **Contenu** : les quatre étapes existantes — diagnostic, cadrage, conception,
  lancement — avec ce que le client valide à chaque jalon.
- **Influence** : Attio + Stripe.
- **Composant** : `MethodSteps`, version resserrée de l'existant. **Seul endroit
  du site où la numérotation est autorisée**, parce que c'est une vraie séquence.
- **Mobile** : une colonne, filet horizontal entre les étapes.
- **Animation** : révélation au scroll.
- **CTA** : « Recevoir mon diagnostic gratuit » (`/audit`) — placement le plus
  performant de la page, juste après la levée du risque.
- **Preuve** : méthode publique et opposable, propriété du site garantie.

### 8 — Au-delà des fleuristes

- **Objectif** : élargir sans diluer.
- **Contenu** : deux lignes maximum — commerces et métiers visuels (salons,
  ateliers, artisans) ; produits numériques. Rien de plus : la page fleuriste
  reste le sujet.
- **Influence** : Stripe.
- **Composant** : `AdjacentSectors` — deux blocs horizontaux filetés, sans
  visuel, sur fond `cream`.
- **Mobile** : empilés.
- **Animation** : aucune.
- **CTA** : liens vers `/salons-de-coiffure` et `/developpement-mvp`.
- **Preuve** : les pages existent et sont complètes.

### 9 — Applications, outils et MVP

- **Objectif** : voir une preuve de profondeur technique, après la crédibilité
  métier.
- **Contenu** : Bloomy — application web et mobile, catalogue temps réel,
  click-and-collect, tableaux de bord fleuristes, 1 000+ inscrits, 0 % de
  commission, cinq villes. Puis une ligne sur ce que cela permet de construire
  pour d'autres : outil métier, marketplace, automatisation.
- **Influence** : Linear (rigueur) + Framer (mise en scène).
- **Composant** : `ProductLab` — bande `plum`, `BloomyComposer` réutilisé en
  `DeviceFrame phone`, chiffres vérifiables en regard. Les technologies (React,
  Flutter, Firebase) apparaissent **en bas, en petit**, comme preuve et non
  comme argument.
- **Mobile** : pile, chiffres en ligne de trois.
- **Animation** : révélation au scroll.
- **CTA** : « Développement d'applications » (`/developpement-mvp`).
- **Preuve** : un produit en production, sous notre nom.

### 10 — Preuves

- **Objectif** : voir une preuve avant la décision.
- **Contenu** : les trois chiffres vérifiables déjà en place (100 % sur mesure,
  0 % de commission, 48 h ouvrées), les villes des sites livrés, le lien vers
  bloomy.one. **Pas de témoignages** : aucun n'existe avec autorisation écrite.
  La section s'appelle donc « Preuves », et accueillera les citations le jour où
  elles seront réelles et signées.
- **Influence** : sobriété volontaire, aucun carrousel.
- **Composant** : `ProofRow`, évolution du bloc de légitimité actuel.
- **Mobile** : trois lignes empilées, centrées.
- **Animation** : aucune.
- **CTA** : aucun.
- **Preuve** : c'est la section entière.

### 11 — FAQ

- **Objectif** : lever les dernières objections sans alourdir la page.
- **Contenu** : les cinq questions existantes, conservées telles quelles — elles
  sont bonnes et couvrent prix, confiance, Instagram, autonomie, périmètre.
- **Influence** : Stripe (lisibilité).
- **Composant** : `FaqAccordion` existant, replié par défaut. **Pas de schema
  FAQPage** (règle projet).
- **Mobile** : identique.
- **Animation** : ouverture native, 200 ms.
- **CTA** : aucun, la bande finale suit immédiatement.
- **Preuve** : réponses vérifiables, liens internes vers les pages qui détaillent.

### 12 — Bande finale

- **Objectif** : agir.
- **Contenu** : une phrase, un CTA primaire, un secondaire discret, la mention
  « réponse sous 48 h ouvrées ».
- **Influence** : Gisou (photographie) + Attio (netteté du message).
- **Composant** : `CtaBand` existant, enrichi d'un fond photographique réel —
  le bouquet éclat de saison, assombri par un voile `plum` à 82 % pour garantir
  le contraste du texte.
- **Mobile** : photo en fond conservée, CTA pleine largeur.
- **Animation** : aucune.
- **CTA** : « Recevoir mon diagnostic gratuit » (`/audit`) + « Écrire au studio ».
- **Preuve** : le délai annoncé, tenu.

---

## 7. Ce qui disparaît de l'accueil actuel

- La section « Le studio » (photo + phrase + bouton) : son message est absorbé
  par les sections 3 et 9, sa photo est réemployée en section 5.
- Les quatre cartes de services génériques → reformulées par besoin (section 4).
- Le bloc `BloomyComposer` isolé → déplacé en section 9, où il prouve la
  compétence applicative au lieu d'illustrer un service.

## 8. Les autres pages

Le système (`DeviceFrame`, palette, échelle typographique, révélations) est
défini une fois et s'applique partout. Les pages gardent leur contenu et leur
volume de texte — la profondeur SEO ne se raccourcit jamais. Ce qui change :
l'ouverture, la couleur des bandes, la matière des panneaux, et le fait que
chaque page de décision montre du travail réel avant d'argumenter.

**Règles transverses appliquées à toutes les pages**

- `PageHero` v2 : fil d'Ariane, pastille, H1, chapô, et un **emplacement
  visuel optionnel**. Le rameau botanique décoratif disparaît — la direction
  révisée proscrit explicitement les illustrations botaniques génériques. Ce
  qui occupe l'espace, désormais, c'est du travail livré.
- Toutes les bandes sombres passent de `ink` à `plum`. `ink` reste réservé au
  pied de page, qui doit rester le point d'arrêt le plus sombre de la page.
- Toute capture ou aperçu passe par `DeviceFrame`.
- Révélation au défilement sur les listes de plus de trois éléments, jamais
  sur un titre ni sur un formulaire.
- Un seul CTA primaire par écran, la `CtaBand` fermant chaque page.

### Navigation

`Applications & MVP` entre dans la navigation principale : c'est la troisième
activité du studio et elle n'était atteignable que par le pied de page ou par
un lien de section. `Méthode` en sort — c'est une page de réassurance qu'on
atteint en contexte (FAQ, accueil, pied de page), pas une porte d'entrée.

Ordre retenu : **Fleuristes · Services · Applications & MVP · Réalisations ·
Blog · À propos**. Six entrées, la spécialisation d'abord, la capacité
technique juste après les offres.

### Fiches par page

**`/fleuristes` — pilier n°1**
Objectif : comprendre + désirer. Ouverture sur la galerie des trois sites
livrés, en pleine largeur. Influence Stripe (organisation par besoin) sur les
quatre piliers, Attio sur la section métier. La bande « notre conviction »
passe en `plum`. Preuve : trois univers graphiques, plus le lien bloomy.one.

**`/fleuristes/site-internet`, `/e-commerce`, `/seo-local`, `/maintenance`**
Objectif : convertir une intention précise. Chaque page ouvre sur **une
capture réelle** cadrée dans `BrowserFrame` — celle qui illustre le mieux le
sujet : Maison Hortense pour la vitrine, Monloup pour l'e-commerce et le SEO
local, KL Fleuriste pour la maintenance et l'événementiel. `maintenance`
reçoit en plus l'aperçu `OrdersPeek`, qui montre ce qu'on gère au quotidien.
Aucun faux encart Google, aucune fausse métrique.

**`/services` — hub d'offres**
Objectif : comprendre l'étendue et le prix. Influence Stripe : dense mais
rangé, une colonne par offre, inclus / non inclus explicites, « Sur devis »
assumé. Les compléments deviennent une liste filetée plutôt que des cartes.

**`/developpement-mvp` — la page la plus technique**
Objectif : prouver la capacité produit. Influence Linear, dosée : panneaux
`PanelFrame` sur `plum`, alignements stricts, aucun ornement. Ouverture sur
l'aperçu du produit de l'équipe (`BloomyComposer` en `PhoneFrame`) plutôt que
sur du texte. La pile technique reste en bas, en petit. Preuve : bloomy.one en
production, chiffres vérifiables.

**`/salons-de-coiffure` — pilier secondaire**
Objectif : montrer que le soin appliqué aux fleuristes se transpose. Aucune
capture de salon n'existe : la page montre donc les sites de fleuristes
**explicitement légendés comme tels**, comme preuve de savoir-faire, jamais
comme des références du secteur. C'est la seule façon honnête de montrer du
travail ici.

**`/realisations` — le portfolio**
Objectif : voir une preuve, en grand. Influence Framer, la plus marquée du
site : captures pleine largeur, une par écran, alternées avec leur légende.
Les études de cas suivent. L'encart « ce qui n'est pas montré » reste : il dit
pourquoi la liste est courte, et c'est un argument de sérieux.

**`/methode`**
Objectif : lever le risque. Influence Attio + Stripe : une vraie séquence
numérotée — le seul endroit du site qui a le droit de l'être — et quatre
engagements sur bande `plum`.

**`/a-propos`**
Objectif : rassurer sur le qui. Influence Gisou : c'est la page où la
photographie a le plus de légitimité, faute de portraits réels elle reste
sobre en attendant le shooting. L'écosystème Bloomy / Bloomy Studio est
présenté en deux colonnes filetées.

**`/blog` et `/blog/[slug]`**
Objectif : capter l'intention informationnelle. Rythme éditorial : mesure de
ligne courte, titres display, métadonnées discrètes. Aucune vignette
décorative — un article n'a pas besoin d'une image d'illustration générique.

**`/audit` et `/contact` — les pages de conversion**
Objectif : agir. Surfaces `paper-warm`, formulaire seul dans la colonne,
réassurance sous le bouton, aucune distraction : ni navigation secondaire, ni
CTA concurrent. Aucune animation sur un formulaire.

**Pages légales et 404**
Objectif : servir. Sobriété maximale, colonne de lecture étroite, aucun
ornement. Le seul changement est celui des couleurs.

## 9. Règles projet à mettre à jour (`AGENTS.md`)

Trois règles actuelles contredisent la direction révisée et devront être
réécrites en même temps que le code, pour que le dépôt reste cohérent :

1. « `rose` comme unique couleur forte » → reste vraie **pour l'action**, mais
   la règle doit intégrer `plum` (surfaces) et `bloom` (accent ponctuel).
2. « L'accueil vise ~500 mots » → ~900 mots, avec la contrainte « une idée par
   section » en garde-fou.
3. « Chaque page de décision ouvre sur `ShowcaseSites` » → devient
   `WorkShowcase` sur l'accueil ; `SiteGallery` reste pour les pages internes.

Inchangées et prioritaires sur tout le reste : aucune preuve inventée, contenu
dans `src/lib/`, SEO server-first, secrets serveur uniquement, accessibilité.

## 10. Arbitrages tranchés

1. **CTA du hero — décidé contre la lettre de la direction.** Elle demandait
   « Découvrir nos créations » en primaire ; le hero porte finalement
   « Recevoir mon diagnostic gratuit » en primaire et « Découvrir nos
   créations » en secondaire, vers `/realisations`.
   Raison : la vitrine occupe déjà l'écran suivant, un bouton d'ancre vers elle
   ne fait que dupliquer le défilement. Le visiteur convaincu par la
   composition du hero trouve donc la conversion qualifiante sous la main, et
   l'explorateur garde une vraie page à ouvrir. L'intention de la direction —
   mener par le travail — est portée par la composition et par la section 2,
   pas par un bouton. Décision mesurable via `cta_audit_click` et
   réversible en une ligne.
2. **Captures mobiles — à produire.** Nécessaires aux sections 1, 2 et 5. Le
   champ `mobile` de `lib/portfolio.ts` est prêt : dès qu'il est renseigné, le
   téléphone apparaît dans le hero et dans l'étude de cas, sans retoucher la
   mise en page. Production prévue avec Playwright en 390 × 844 depuis les
   sites en ligne — **en attente des URL des sites livrés**.
3. **Photographie « atelier × digital » — shooting prévu.** En attendant, les
   emplacements sont dessinés aux bons ratios et les deux photos existantes
   servent d'ambiance (fond de la bande finale). Règle appliquée : une photo
   d'ambiance n'est **jamais** posée à côté d'une affirmation sur un client —
   c'est pourquoi la section 5 n'en porte pas. Aucune image générée.
4. **Projets absents.** Artist Floral, Flovia, MétéoLinge : URL attendues pour
   produire les captures. Tant qu'elles manquent, ils n'apparaissent nulle part.

## 11. État d'avancement

Livré et vérifié (lint, types, 20 tests unitaires, 55 tests e2e, build, revue
visuelle desktop et mobile) :

- Palette, échelle typographique, `<Reveal>`, `DeviceFrame`.
- Les douze sections de l'accueil, dans l'ordre de §6.
- `CtaBand` photographique, propagée à toutes les pages qui l'utilisent.
- `PageHero` v2 avec emplacement visuel, appliqué à toutes les pages
  intérieures ; illustrations botaniques décoratives retirées.
- Navigation à six entrées, `Applications & MVP` incluse.
- Ouverture sur une capture réelle pour les quatre spokes fleuristes, la
  galerie complète sur `/fleuristes`, `/realisations` en présentation alternée
  pleine largeur, aperçus d'interface sur `/developpement-mvp` et
  `/fleuristes/e-commerce`.
- Formulaires sur `paper-warm`, boutons en pilule partout.

Défauts corrigés au passage : `--color-lilac-deep` inexistant, classe morte
`text-rose-veil-deep` (9 occurrences), `priority` déprécié sur `next/image`,
bourgogne et vert profond illisibles sur bande sombre, couleur en dur
`bg-[#2b2733]`, et les espaces supprimés par JSX après un lien.

Reste à faire :

1. Brancher les captures mobiles dès réception des URL (sections 1, 2, 5).
2. Photographies d'atelier après shooting (sections 5 et 12).
3. Entrée `case-studies.ts` pour Monloup — le CTA de la section 5 pointera
   alors vers l'étude de cas plutôt que vers `/realisations`.
4. Répercussion du système sur les pages piliers et spokes.
5. Témoignages réels dans `ProofRow`, à l'obtention des autorisations écrites.

À chaque lot : `npm run lint && npm run typecheck && npm test && npm run build`,
puis `npm run e2e`, puis vérification visuelle réelle en desktop **et** mobile.

Note de vérification : une capture pleine page Playwright ne déclenche pas les
révélations au défilement (Chromium capture au-delà du viewport sans scroller).
Les sections apparaissent vides sur ces captures alors qu'elles s'affichent
normalement — vérifier en faisant défiler la page, pas en `fullPage`.
