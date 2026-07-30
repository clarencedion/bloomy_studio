<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bloomy Studio — règles projet

Site vitrine de Bloomy Studio (Next.js 16 App Router, TS strict, Tailwind v4).
Références : `docs/direction-artistique.md` (visuel, accueil, animations —
fait autorité) et `docs/bloomy-studio-blueprint.md` (SEO, offres, légal).
Spécificités Next 16 : `params` asynchrones, Turbopack par défaut, pas de
`next lint`, et **`priority` déprécié sur `next/image`** — utiliser
`loading="eager"` + `fetchPriority="high"` sur l'unique image LCP.

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
- **Système « atelier clair »** — tokens dans `globals.css` (`@theme`), classes
  système dans `@layer components` pour que les utilitaires Tailwind gardent
  la main. Fond ivoire chaud (`cream`, `cream-deep` pour les panneaux), `ink`
  anthracite pour le texte. Une seule **couleur d'action par page** : `rose`
  (bourgogne) — liens, boutons, aplat de conversion. `plum` (prune profond)
  est une **surface** sombre et chaude, jamais un texte de corps ; `bloom`
  (accent floral vif) est une **micro-dose** — pastille, survol, ponctuation
  d'un chiffre, jamais deux dans un écran ; `sage` (vert désaturé) est
  décoratif et n'est jamais un lien. Pour du texte, uniquement les variantes
  `-deep` (contraste AA). Display : **Cal Sans** (`.text-display-*`, via
  `@fontsource/cal-sans`) — une seule graisse et **pas d'italique** : toute
  emphase passe par la couleur, jamais par `italic`. Corps et libellés :
  **Inter** (axe `opsz`). Boutons en pilule (`rounded-full`), cartes en
  `rounded-sm`, `rounded-lg` réservé aux cadres d'appareil.
- **Montrer avant de raconter** : l'accueil ouvre sur `WorkShowcase`, les
  autres pages de décision sur `ShowcaseSites` / `SiteGallery` — de **vraies
  captures de sites livrés**, définies dans `lib/portfolio.ts` et stockées en
  WebP < 100 Ko dans `public/realisations/`. Toute capture ou aperçu
  d'interface passe par `components/visuals/DeviceFrame.tsx` (`BrowserFrame`,
  `PhoneFrame`, `PanelFrame`) : un appareil est toujours ancré à un bord, une
  bande ou une photo — jamais incliné, jamais flottant. Les sections portent
  une pastille `<Eyebrow>` de trois mots ; le chapô est facultatif.
- **Mouvement rare** : cinq animations autorisées sur tout le site (voir
  `docs/direction-artistique.md` §4.4). La révélation au défilement passe par
  `<Reveal>` — état masqué conditionné à `[data-js]`, donc **jamais de texte
  bloqué à opacity 0 sans JavaScript**. Trois éléments décalés au maximum.
- **Économie de mots** : l'accueil vise ~900 mots répartis en douze sections,
  **une idée par section, aucun bénéfice répété**. La profondeur SEO vit sur
  les pages piliers et spokes (`/fleuristes/*` ≥ 800 mots, blog ≥ 1500) — on
  raccourcit l'accueil, jamais les pages de référencement.
- **Seulement du travail réel** : `lib/portfolio.ts` ne contient que des sites
  livrés par le studio — **jamais une boutique partenaire de la marketplace
  bloomy.one**, jamais une maquette présentée comme un site en ligne. Les
  photos de bouquets vivent dans `public/photos/` et ne sont **jamais posées à
  côté d'une affirmation sur un client** — ce sont des photos d'ambiance, pas
  le travail de la boutique montrée. Le complément décoratif reste
  `components/visuals/Botanical.tsx` (SVG au trait) ; `BloomyComposer` et
  `AdminPreview` sont des aperçus du produit de l'équipe, étiquetés « Aperçu »
  par `PanelFrame` — jamais une capture client.
- **Pas de numérotation décorative** : `01 / 02 / 03` est réservé aux vraies
  séquences (la méthode). Les sections portent un `<Eyebrow>`, pas un rang.
- **Consentement** : aucun script tiers sans accord explicite. Le pipeline
  analytics passe par `track()` (`lib/analytics.ts`) exclusivement.
- **Secrets serveur uniquement** (`firebase-admin.ts`, `leads.ts` portent
  `server-only`). Rien de sensible dans les composants client ni dans Git.
- **Accessibilité** : un seul H1/page, hiérarchie sans saut, focus visibles,
  formulaires labellisés, `prefers-reduced-motion` respecté. Sur les bandes
  `plum`, ni `rose` ni `sage-deep` ne sont lisibles : utiliser `cream/70` ou
  `sage`.
- **Navigation** : six entrées maximum dans `mainNav` (`lib/site.ts`) — au-delà,
  la barre déborde sous 1280 px et plus rien ne se distingue. Toute entrée
  ajoutée en remplace une autre, qui reste accessible par le pied de page et
  par un lien contextuel.
- **Espace après un lien** : JSX supprime l'espace littéral entre `</Link>` (ou
  `</a>`) et le texte qui suit. L'écrire explicitement — `</Link>{" "}—` —
  sinon le rendu colle la ponctuation au lien. Vérifiable d'un coup :
  `curl -s <url> | grep -oE '</a>(—|:|[A-Za-zÀ-ÿ])'` ne doit rien renvoyer.

## Vérifications avant de conclure

```bash
npm run lint && npm run typecheck && npm test && npm run build
npm run e2e   # après changement d'UI ou de formulaire
```

Ne pas considérer un changement visuel comme terminé sans l'avoir regardé
dans un vrai navigateur (Playwright), desktop **et** mobile.
