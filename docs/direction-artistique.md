# Direction artistique : « Tige & fleur » (refonte du 2026-10-02)

Ce document remplace intégralement le système « atelier clair » (Cal Sans,
bourgogne, prune). Il fait autorité sur le visuel, la typographie, le
mouvement et la composition des pages. `docs/refonte-suivi.md` retrace la
décision ; `AGENTS.md` en résume les règles permanentes.

Méthode : les compétences **taste-skill** (`design-taste-frontend`,
`redesign-existing-projects`, `full-output-enforcement`) appliquées au
projet. Leur liste de contrôle finale (§ 8 ci-dessous) est obligatoire avant
de considérer une page terminée.

---

## 1. Lecture du brief

> **Refonte complète d'un site d'agence de développement web français, pour
> des commerçants indépendants et des fondateurs, dans un langage confiant,
> artisanal et floral-pop, construit en Tailwind v4 + Motion avec une
> grotesque d'affichage qui prolonge le logo.**

Réglages taste-skill : `DESIGN_VARIANCE 8` · `MOTION_INTENSITY 6` ·
`VISUAL_DENSITY 3`. Mode : *redesign, overhaul* (nouveau langage visuel,
contenus, routes et SEO conservés).

Le site est la vitrine du savoir-faire du studio. Il doit donc être, lui-même,
la meilleure preuve : chaque section montre du travail réel avant d'en parler.

## 2. Concept

**« Tige & fleur ».** Le logo contient déjà tout le système : une fleur rose
qui éclot au-dessus d'une ligne verte, « DIGITAL STUDIO », tenue entre deux
filets roses. Le vert est la tige : la structure, le code, ce qui tient. Le
rose est la fleur : ce qui éclot, le résultat, l'action.

Trois emprunts directs au logo, aucun ornement inventé :

1. **Le libellé à filets** (« —— DIGITAL STUDIO —— ») → `.kicker--ruled`.
   Capitales très espacées entre deux filets roses. Rationné (§ 4.3).
2. **La feuille** : les feuilles du logo ont deux angles arrondis opposés et
   deux angles vifs → les coins `.leaf` des panneaux et des médias.
3. **Le monogramme B + tulipe** → favicon, et une seule apparition en très
   grand, ton sur ton, dans la bande finale de chaque page.

## 3. Logo

Fichier source : `assets/brand/bloomy-logo-source.png` (fourni par l'équipe).
Vectorisé en deux couches (rose `#F04284`, vert `#0E3F2F`) dans
`public/brand/` :

| Fichier | Usage |
|---|---|
| `bloomy-wordmark.svg` | Barre de navigation (tulipe + « Bloomy ») |
| `bloomy-logo.svg` | Logo complet sur fond clair |
| `bloomy-logo-on-dark.svg` | Logo complet sur forest (ligne en papier) |
| `bloomy-mark.svg` | Monogramme B + tulipe |
| `bloomy-mark-tone.svg` | Monogramme vert sur vert, filigrane de la bande finale |
| `bloomy-mark-white.svg` | Monogramme papier, réserve |

Composant : `components/brand/Logo.tsx`. Favicon : `src/app/icon.svg` et
`apple-icon.png` (monogramme sur fond `blush`). Ne jamais redessiner,
recolorer autrement, incliner ou animer le logo.

## 4. Système

### 4.1 Couleur

| Jeton | Valeur | Rôle |
|---|---|---|
| `paper` | `#FCFBF9` | Fond de page |
| `white` | `#FFFFFF` | Cadres, cartes, champs |
| `blush` / `blush-deep` | `#FCE8F0` / `#F8D5E3` | Panneaux teintés rose |
| `mint` / `mint-deep` | `#E6EFEA` / `#D5E3DB` | Panneaux teintés vert |
| `forest` | `#0E3F2F` | Texte (11,5:1) et surfaces sombres |
| `forest-deep` | `#082A1F` | Pied de page, lunette des téléphones |
| `forest-mid` | `#15523E` | Filigrane, nuances sur forest |
| `forest-soft` | `#3D5A50` | Texte secondaire (7,3:1) |
| `forest-faint` | `#5A7268` | Métadonnées (5,0:1), jamais plus clair |
| `leaf` | `#9FBDAF` | Texte secondaire **sur forest** (5,9:1) |
| `bloom` | `#F04284` | Le rose du logo : grandes surfaces graphiques, sélection. **Jamais du petit texte** (3,5:1) |
| `bloom-strong` | `#D92668` | Fond des boutons d'action, texte blanc (4,7:1) |
| `bloom-ink` | `#C81D5E` | Liens et petit texte rose sur clair (5,4:1) |
| `bloom-light` | `#FF8FB8` | Rose lisible **sur forest** (5,6:1) |
| `line` / `line-strong` / `line-dark` | | Filets sur clair, filets appuyés, filets sur forest |

Règles :

- **Une seule couleur d'action : le rose.** Les teintes `blush`/`mint` sont
  des fonds de panneau, jamais un lien, un bouton ou un état.
- **Thème clair verrouillé.** Une seule bascule vers le sombre par page :
  la bande finale (`CtaBand`) qui se prolonge dans le pied de page. Pas de
  bande sombre au milieu d'une page claire, sauf une « histoire de couleur »
  assumée et unique (le panneau `forest` du hero d'accueil en est une : c'est
  un panneau, pas une section).
- **Teinte de projet** : chaque site du portfolio porte une `tone` tirée de
  sa propre capture (`lib/portfolio.ts`). Elle sert de fond au panneau qui
  porte la capture. C'est la couleur du travail du client, pas une couleur de
  l'interface : les légendes restent sous le panneau, sur `paper`.
- Les anciens noms (`cream`, `ink`, `rose`, `plum`, `sage`, `tint-*`,
  `hairline`) restent des alias le temps de la migration. **Ne pas les
  utiliser dans du code neuf.**

### 4.2 Typographie

- **Display : Bricolage Grotesque** (variable, axes `opsz` et `wdth`).
  Les grandes tailles sont serrées et denses comme le « Bloomy » du logo
  (largeur 84, graisse 700, approche négative) ; les petites s'ouvrent.
  Échelle : `.text-display-3xl` (accueil uniquement), `-2xl` (bande finale,
  hero de page pilier), `-xl` (H1 de page), `-lg` (H2), `-md`, `-sm`.
- **Corps : Geist.** 16–17 px, interlignage 1,6–1,75, mesure ≤ 65 caractères.
- **Pas d'italique.** L'emphase d'un titre passe par la couleur
  (`text-bloom-ink` sur clair, `text-bloom-light` sur forest), sur un ou deux
  mots au maximum.
- Titres en casse de phrase. `text-wrap: balance` sur les titres,
  `pretty` sur les paragraphes (déjà global).
- **Aucun tiret cadratin (—) ni demi-cadratin (–) dans le texte visible** :
  titres, corps, boutons, légendes, textes alternatifs, métadonnées. Utiliser
  le point, la virgule, les deux-points ou les parenthèses. (Les commentaires
  de code ne sont pas concernés.)

### 4.3 Libellés (« kickers »)

`<Kicker>` (`components/ui/Kicker.tsx`) : capitales espacées de 0,3 em, comme
« DIGITAL STUDIO ». `ruled` ajoute les filets roses.

- **Un libellé pour trois sections au maximum** sur une page (le hero compte
  pour un). La plupart des sections n'en ont pas besoin : le titre suffit.
- Jamais de numérotation décorative (`01 /`, `002 ·`). Les chiffres sont
  réservés aux vraies séquences (la méthode, en quatre jalons).
- `<Eyebrow>` est l'ancien nom ; il rend désormais un `Kicker` à filets.

### 4.4 Formes

Règle de rayon, appliquée partout (verrou de forme taste-skill) :

| Élément | Forme |
|---|---|
| Boutons, puces de filtre, bouton menu | Pilule (`rounded-full`) |
| Panneaux, médias, cartes | Feuille : `.leaf` (2,25 rem / 0,4 rem), `.leaf-sm`, `.leaf-lg` |
| Cadres d'appareil (navigateur, panneau) | `rounded-xl` uniforme |
| Téléphone | `rounded-[1.9rem]` avec lunette `forest-deep` |
| Champs de formulaire | `rounded-2xl` |

Ombres : uniquement `shadow-lift` et `shadow-float`, teintées de vert. Pas de
verre dépoli décoratif, pas de lueur, pas de dégradé de fond sans raison.
Grain de papier global à 2 %.

### 4.5 Grille et espacement

- Conteneurs : `narrow` 46 rem, `default` 76 rem, `wide` 88 rem ; gouttières
  20 / 32 / 40 px.
- Grille de 12 colonnes en desktop ; chaque section déclare explicitement sa
  version mobile (< 768 px).
- Respiration de section : `py-20 sm:py-28` par défaut, `py-24 sm:py-36`
  pour les moments forts.
- **Pas deux sections de la même famille de mise en page sur une page**
  (taste-skill) ; jamais trois sections image + texte en zigzag de suite ;
  pas de rangée de trois cartes égales.

### 4.6 Boutons et liens

`components/ui/Button.tsx` (`ButtonLink`, `Button`, `buttonClass`,
`ButtonArrow`) :

- `primary` : rose `bloom-strong`, texte blanc, vire au vert au survol.
- `secondary` : contour vert, se remplit de vert au survol.
- `onDark` : papier plein sur forest.
- `ghost` : lien texte rose souligné.

Un seul libellé par intention sur tout le site (taste-skill) :

| Intention | Libellé | Cible | Événement |
|---|---|---|---|
| Contact (principale) | **Démarrer un projet** | `/contact` | `cta_contact_click` |
| Diagnostic (pages métier) | **Diagnostic gratuit** | `/audit` | `cta_audit_click` |
| Portfolio | **Voir les réalisations** | `/realisations` | |

Les deux premiers viennent de `primaryCta` et `auditCta` (`lib/site.ts`).
Le libellé d'un bouton tient sur une ligne en desktop.

### 4.7 Icônes

`@phosphor-icons/react`, graisse `bold` pour les flèches de bouton, `regular`
ailleurs. Dans un composant serveur : `@phosphor-icons/react/dist/ssr`. Jamais
d'icône dessinée à la main, jamais d'émoji.

## 5. Images

1. **Le travail d'abord.** Captures réelles des sites du portfolio,
   produites par `npm run captures` (`scripts/capture-realisations.mjs`) en
   trois formats : desktop 1600×1000, mobile 780×1688, et **longue** (page
   entière, 960 px de large, `public/realisations/long/`).
2. `ScrollingCapture` (`components/visuals/ScrollingCapture.tsx`) : la
   capture longue défile dans sa fenêtre de navigateur au survol ou au focus
   de la carte parente `.group`. C'est la démonstration de savoir-faire la
   plus forte du site : à utiliser pour les projets mis en avant, pas sur
   chaque vignette.
3. Photos d'ambiance (`public/photos/`) : jamais posées à côté d'une
   affirmation sur un client.
4. **Nature des projets** (`kind`) : `client` → « Site en ligne » ;
   `recent` (entreprise réelle, mise en production non confirmée) → « Projet
   récent » ; `concept` (démonstration fictive ou proposition de refonte non
   commandée) → « Projet concept », jamais « client » ni « site livré ».
   Les adresses de développement ne s'affichent jamais : la barre d'adresse
   des cadres montre le nom du projet.
5. Pas d'étiquette posée sur une image ; la légende va dessous.

## 6. Mouvement

Motion motivé uniquement (hiérarchie, récit, retour d'action, changement
d'état). Les animations autorisées sur le site :

1. **Entrée du titre d'accueil** : chaque ligne monte derrière un masque
   (`.line-mask`), une fois.
2. **Mur de travaux** du hero d'accueil : deux colonnes de captures mobiles
   qui défilent lentement en sens inverse (`.marquee-y`), pause au survol et
   au focus. **Un seul défilement continu par page.**
3. **Capture qui défile** dans sa fenêtre au survol (`ScrollingCapture`).
4. **Révélation au défilement** (`<Reveal>`) : 18 px + opacité, une fois,
   trois éléments décalés au maximum. État masqué conditionné à `[data-js]`.
5. **Manifeste à l'encre** (`.scroll-ink`) : les mots passent du pâle au
   plein en traversant l'écran, via `animation-timeline: view()` (amélioration
   progressive, rien sans support).
6. **Empilement collant** (`position: sticky`) pour les offres de l'accueil :
   aucun JavaScript, aucun détournement du défilement.
7. Micro-interactions : flèches qui avancent (`.arrow-nudge`), enfoncement
   (`.press`), élévation (`.lift`).

Interdits : défilement détourné, curseur personnalisé, parallaxe
généralisée, lettres une à une, boucles permanentes hors mur de travaux,
chargement d'introduction. `prefers-reduced-motion` coupe 1 à 5. Pas
d'écouteur `scroll` sur `window` : `IntersectionObserver`, `useScroll` de
Motion ou CSS uniquement.

## 7. Récit des pages

### Accueil

1. **Hero** : à gauche, H1 court (≤ 2 lignes desktop), chapô ≤ 20 mots,
   « Démarrer un projet » + « Voir les réalisations ». À droite, le **mur de
   travaux** : un panneau `forest` à coins feuille où défilent les captures
   mobiles réelles. Mobile : texte, puis une bande horizontale de captures.
2. **Le travail, d'abord** : grille à échelles variables des projets mis en
   avant (`ScrollingCapture` sur panneau teinté du projet), avec Osmose
   Florale en vedette.
3. **Ce que nous construisons** : Sites & e-commerce, MVP, Micro SaaS, en
   cartes qui s'empilent au défilement (sticky), chacune avec un visuel réel.
4. **Pour quels métiers** : fleuristes en tête (la spécialité), puis
   coiffure et beauté, artisans et services, autres commerces.
5. **Manifeste** : deux ou trois phrases sur la façon de travailler,
   `.scroll-ink`.
6. **Méthode** : quatre jalons numérotés (seule séquence numérotée).
7. **Bloomy, notre produit** : la preuve qu'on construit du logiciel.
8. **L'équipe** : deux personnes, nommées, photographiées.
9. **Questions** : quatre, pas plus.
10. **Bande finale** puis pied de page, d'un seul aplat vert.

### Pages intérieures

`PageHero` : fil d'Ariane, H1 à gauche (`-xl`), chapô, actions, composition
à droite (`aside`) ou dessous (`visual`). Jamais le hero d'accueil répété.
Chaque page a son propre récit et au moins quatre familles de mise en page
différentes ; les pages de référencement (`/fleuristes/*` ≥ 800 mots, blog
≥ 1 500) gardent toute leur profondeur.

## 8. Contrôle avant livraison (taste-skill, adapté)

- [ ] Zéro `—` ou `–` dans le texte visible (y compris `title`, `alt`,
      métadonnées).
- [ ] Un seul H1, hiérarchie sans saut, focus visibles, contraste AA.
- [ ] Hero : titre ≤ 2 lignes desktop, chapô ≤ 20 mots, CTA visibles sans
      défiler, ≤ 4 éléments de texte.
- [ ] Libellés : ≤ 1 pour 3 sections.
- [ ] Une intention = un libellé de bouton ; aucun libellé de bouton sur deux
      lignes en desktop.
- [ ] Rayon : pilule pour ce qui se clique, feuille pour les panneaux.
- [ ] Une seule couleur d'action (rose) ; thème clair, une seule bascule.
- [ ] Pas deux sections de la même famille ; pas de trois cartes égales ;
      pas de zigzag de trois.
- [ ] Images réelles ; aucune fausse interface en `div`.
- [ ] Un seul défilement continu par page ; tout mouvement justifiable.
- [ ] `prefers-reduced-motion` respecté ; aucun texte bloqué à opacity 0
      sans JavaScript.
- [ ] Mobile composé pour lui-même, aucun débordement horizontal.
- [ ] Aucune preuve inventée : prix « sur devis », pas de faux avis, concepts
      étiquetés.
