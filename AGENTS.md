<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bloomy Studio — règles projet

Site du studio de développement Bloomy Studio (Next.js 16 App Router, TS
strict, Tailwind v4). Références : `docs/direction-artistique.md` (visuel,
accueil, animations) et `docs/bloomy-studio-blueprint.md` (SEO, offres, légal),
complétées par `docs/refonte-suivi.md` qui retrace les décisions récentes et
**prime en cas de contradiction**.
Spécificités Next 16 : `params` asynchrones, Turbopack par défaut, pas de
`next lint`, et **`priority` déprécié sur `next/image`** — utiliser
`loading="eager"` + `fetchPriority="high"` sur l'unique image LCP.

## Positionnement (décidé le 2026-08-10, remplace la doctrine précédente)

Le site se présente comme une **agence de développement généraliste et
moderne**, pas comme un spécialiste mono-métier. Conséquences :

- L'accueil vend d'abord **ce que le studio construit** — sites & e-commerce,
  MVP, micro SaaS — puis **pour quels métiers**. La spécialisation fleuriste
  reste le savoir-faire le plus profond et garde ses pages dédiées, mais elle
  n'occupe plus le premier écran ni 75 % du discours.
- La navigation croise les deux axes avec **deux menus déroulants** (Produits,
  Secteurs) : voir `mainNav` dans `lib/site.ts`. La limite de six entrées
  s'applique aux entrées **visibles de la barre**, pas aux liens repliés.
- Toute page produit générique (`/sites-internet`, `/developpement-mvp`,
  `/micro-saas`) doit renvoyer vers sa déclinaison métier quand elle existe,
  et inversement.

## Règles permanentes

- **Aucune preuve inventée** : jamais de faux témoignages, chiffres, logos,
  classements ou prix. Les prix restent `null` (« Sur devis ») tant qu'aucun
  prix public n'est décidé — verrouillé par `tests/unit/content-integrity.test.ts`.
- **Contenu dans `src/lib/`**, jamais en dur dans les composants : offres
  (`offers.ts`), coordonnées (`site.ts`), légal (`legal.ts`), études de cas,
  articles. Copy en français, vouvoiement, ton direct et concret.
- **SEO server-first** : title/description/canonical via `pageMetadata()`
  (`lib/seo.ts`), JSON-LD via `lib/schema.ts` + `<JsonLd>`. Jamais côté client.
  Pas de schema FAQPage/HowTo. Titles 50–60 car., descriptions 130–150.
- **Système « Tige & fleur »** (refonte du 2026-10-02, détail dans
  `docs/direction-artistique.md`, qui fait autorité). Tout part du **logo**
  (`public/brand/`, composant `components/brand/Logo.tsx`) : rose `bloom`
  `#F04284` (la fleur) et vert `forest` `#0E3F2F` (la tige). Fond `paper`,
  texte `forest`, panneaux `blush`/`mint`. **Une seule couleur d'action, le
  rose** : `bloom-strong` pour les boutons (texte blanc), `bloom-ink` pour les
  liens ; `bloom` pur seulement en grande surface graphique (jamais du petit
  texte) ; sur `forest`, `bloom-light` et `leaf`. Thème clair verrouillé, une
  seule bascule sombre par page (bande finale + pied de page). Display
  **Bricolage Grotesque** (`.text-display-*`), corps **Geist**, pas
  d'italique. Forme : pilule pour tout ce qui se clique, coins « feuille »
  (`.leaf`) pour panneaux et médias, `rounded-xl` pour les cadres
  d'appareil. Icônes `@phosphor-icons/react` uniquement. Les anciens jetons
  (`cream`, `ink`, `rose`, `plum`, `sage`, `tint-*`) ne sont que des alias de
  migration : ne pas les utiliser dans du code neuf.
- **Règles taste-skill** (appliquées le 2026-10-02) : **aucun tiret cadratin
  ou demi-cadratin dans le texte visible** (titres, corps, boutons, `alt`,
  métadonnées) ; un libellé (`<Kicker>`) pour trois sections au maximum ; un
  seul libellé par intention de bouton (`primaryCta` « Démarrer un projet »,
  `auditCta` « Diagnostic gratuit », dans `lib/site.ts`) ; pas deux sections
  de la même famille de mise en page sur une page ; pas de rangée de trois
  cartes égales ; aucune fausse interface en `div`.
- **Montrer avant de raconter** : l'accueil ouvre sur le mur de travaux et
  la grille de projets, les pages de décision sur une capture réelle. Toute
  capture passe par `components/visuals/DeviceFrame.tsx` ou
  `ScrollingCapture.tsx` (capture longue qui défile au survol). Un appareil
  est toujours posé sur un panneau ou une bande, jamais incliné ni flottant.
- **Mouvement motivé** : la liste fermée des animations autorisées est dans
  `docs/direction-artistique.md` §6 (un seul défilement continu par page). La révélation au défilement passe par
  `<Reveal>` — état masqué conditionné à `[data-js]`, donc **jamais de texte
  bloqué à opacity 0 sans JavaScript**. Trois éléments décalés au maximum.
- **Économie de mots** : l'accueil vise ~900 mots répartis en douze sections,
  **une idée par section, aucun bénéfice répété**. La profondeur SEO vit sur
  les pages piliers et spokes (`/fleuristes/*` ≥ 800 mots, blog ≥ 1500) — on
  raccourcit l'accueil, jamais les pages de référencement.
- **Seulement du travail réel** : `lib/portfolio.ts` ne contient que des
  sites conçus par le studio, jamais une boutique partenaire de la
  marketplace bloomy.one. Trois natures (`kind`) : `client` (livré, en
  ligne : « Site en ligne »), `recent` (entreprise réelle, mise en production
  non confirmée : « Projet récent »), `concept` (démonstration fictive ou
  proposition de refonte non commandée : toujours « Projet concept »). **Une
  adresse de développement (vercel.app, web.app, pages.dev…) n'est jamais
  écrite à l'écran** : `siteHost()` affiche alors le nom du projet et le lien
  dit « Voir le site » (vérifié par les tests unitaires et e2e).
  Les photos de `public/photos/` sont des photos d'ambiance, **jamais posées à
  côté d'une affirmation sur un client**. `PanelFrame` estampille « Aperçu »
  les visuels produit de l'équipe.
- **Pas de numérotation décorative** : `01 / 02 / 03` est réservé aux vraies
  séquences (la méthode). Une section porte au mieux un `<Kicker>`, jamais un
  rang.
- **Consentement** : aucun script tiers sans accord explicite. Le pipeline
  analytics passe par `track()` (`lib/analytics.ts`) exclusivement.
- **Secrets serveur uniquement** (`firebase-admin.ts`, `leads.ts` portent
  `server-only`). Rien de sensible dans les composants client ni dans Git.
- **Accessibilité** : un seul H1/page, hiérarchie sans saut, focus visibles,
  formulaires labellisés, `prefers-reduced-motion` respecté. Sur les bandes
  `forest`, ni `bloom` ni `bloom-ink` ne sont lisibles : utiliser `bloom-light`,
  `leaf` ou `paper`.
- **Navigation** : six entrées maximum dans `mainNav` (`lib/site.ts`) — au-delà,
  la barre déborde sous 1280 px et plus rien ne se distingue. Toute entrée
  ajoutée en remplace une autre, qui reste accessible par le pied de page et
  par un lien contextuel.
- **Espace après un lien** : JSX supprime l'espace littéral entre `</Link>` (ou
  `</a>`) et le texte qui suit. L'écrire explicitement, `</Link>{" "}:`,
  sinon le rendu colle la ponctuation au lien. Vérifiable d'un coup :
  `curl -s <url> | grep -oE '</a>(—|:|[A-Za-zÀ-ÿ])'` ne doit rien renvoyer.

- **Production App Hosting** : ne jamais lire un fichier de `public/` depuis
  du code serveur sans garder l'exclusion `outputFileTracingExcludes` de
  `next.config.ts` (sinon l'adaptateur ne copie plus `public/` et toutes les
  images tombent en 404 : incident du 2026-10-03, voir README). Garder aussi
  `images.unoptimized: false`. Après chaque déploiement :
  `npm run check:images`.

## Vérifications avant de conclure

```bash
npm run lint && npm run typecheck && npm test && npm run build
npm run e2e   # après changement d'UI ou de formulaire
```

Ne pas considérer un changement visuel comme terminé sans l'avoir regardé
dans un vrai navigateur (Playwright), desktop **et** mobile.
