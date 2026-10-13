# Bloomy Studio — site vitrine

Le site de **Bloomy Studio**, le studio digital de l'équipe [Bloomy](https://bloomy.one) : sites, e-commerce et SEO local pour fleuristes (et, secondairement, salons de coiffure et développement MVP).

Document de référence produit : [docs/bloomy-studio-blueprint.md](docs/bloomy-studio-blueprint.md).
Contenus à compléter avant lancement : [docs/content-checklist.md](docs/content-checklist.md).

## Stack

- **Next.js 16.2** (App Router, Turbopack) — version baseline de Firebase App Hosting
- **TypeScript strict** · **Tailwind CSS v4** (tokens dans `src/app/globals.css`)
- **Motion for React** (animations sobres, `prefers-reduced-motion` respecté)
- **Zod** (validation des formulaires côté serveur)
- **firebase-admin** (stockage des leads, serveur uniquement, initialisation paresseuse)
- **Vitest** (unitaires) · **Playwright** (e2e + QA visuelle)

## Démarrer

```bash
npm install
cp .env.example .env.local   # ajuster si besoin
npm run dev                  # http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Développement |
| `npm run build` | Build de production |
| `npm run start` | Servir le build |
| `npm run lint` | ESLint (zéro warning toléré) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Tests unitaires Vitest (`tests/unit/`) |
| `npm run e2e` | Playwright : build + serveur + tests desktop/mobile (`tests/e2e/`) |

Prérequis e2e : `npx playwright install chromium`.

## Architecture

```
src/
  app/                    # Routes (App Router) — metadata via generateMetadata/pageMetadata
    sitemap.ts robots.ts  # SEO infra (lastmod réels, pas de priority/changefreq)
    opengraph-image.tsx   # Image OG générée depuis le système visuel
  components/
    layout/  ui/  visuals/  forms/  consent/  legal/  seo/
  lib/
    site.ts               # Config centrale : coordonnées, nav, URL canonique
    offers.ts             # Offres — AUCUN prix public : « Sur devis » (voir checklist)
    case-studies.ts       # Études de cas typées (faits vérifiables uniquement)
    blog.tsx              # Articles typés (pas de CMS au lancement — choix documenté)
    legal.ts              # Entité légale : placeholders [À COMPLÉTER] centralisés
    seo.ts  schema.ts     # Helpers metadata + JSON-LD (rendus serveur)
    analytics.ts          # Carte des événements + garde de consentement
    leads.ts  anti-spam.ts firebase-admin.ts   # Pipeline leads (serveur)
```

### Principes non négociables

- **Aucune preuve inventée** : pas de faux témoignages, chiffres, logos ou classements. Le test `tests/unit/content-integrity.test.ts` verrouille notamment les prix (« Sur devis » tant qu'aucun prix vérifié n'existe).
- **SEO critique rendu serveur** : title, description, canonical et JSON-LD ne sont jamais injectés côté client.
- **Consentement d'abord** : aucun script de mesure sans accord explicite (bandeau CNIL, choix modifiable via « Gérer les cookies », site 100 % fonctionnel après refus).
- **Le contenu vit dans `lib/`** : offres, coordonnées, textes légaux et articles sont centralisés et typés — jamais en dur dans les composants.

## Leads (audit & contact)

Server Actions + Zod, avec honeypot, piège temporel et rate-limit mémoire (meilleur effort — App Hosting peut exécuter plusieurs instances ; pour un durcissement, brancher un compteur Firestore).

Destinations, par ordre de disponibilité :
1. **Firestore** (`leads`) via SDK Admin — automatique sur App Hosting (ADC), ou `FIREBASE_SERVICE_ACCOUNT_JSON` en local. Les règles (`firestore.rules`) refusent tout accès client.
2. **E-mail** via Resend si `RESEND_API_KEY` + `LEADS_FROM_EMAIL` sont configurés (serveur uniquement).
3. Sans configuration : le lead est **journalisé côté serveur** avec un avertissement explicite — jamais perdu en silence, mais à configurer avant tout trafic réel.

Consultation des leads : console Firebase → Firestore → collection `leads` (un back-office dédié est prévu en phase 2, voir blueprint §14).

## Analytics

`track()` (`src/lib/analytics.ts`) est le seul point d'entrée. Événements : `cta_audit_click`, `audit_start`, `audit_step`, `audit_submit`, `contact_submit`, `case_study_view`, `pricing_view`, `email_click`, `phone_click`, `calendly_click`. Rien ne part sans consentement **et** sans `NEXT_PUBLIC_GA_ID`.

## Déploiement — `studio.bloomy.one`

Le site tourne sur un backend **Firebase App Hosting** (`bloomystudio`, europe-west4, projet `bloomy-antigravity`), et **`studio.bloomy.one` est rattaché directement à ce backend**. Pas de réécriture Firebase Hosting dans la chaîne : c'est plus simple, plus rapide d'un saut réseau, et cela évite d'ouvrir l'invocation publique du service Cloud Run.

```bash
# Déploiement depuis la source locale (pas besoin de pousser sur GitHub)
firebase deploy --only apphosting --project bloomy-antigravity

# Puis, toujours : vérifier que chaque image de chaque page répond
npm run check:images
```

**Ce qui part en production.** La CLI zippe le dossier en excluant la liste
`ignore` de `firebase.json` **et** chaque ligne du `.gitignore` (d'où les
entrées `.shots` et `assets` : 500 Mo de captures de contrôle n'ont rien à
faire dans l'archive). Sur App Hosting, l'adaptateur Next.js construit en mode
`standalone`, puis copie `public/` dans le bundle **uniquement si
`.next/standalone/public` n'existe pas déjà**.

> **Incident du 2026-10-03.** L'image Open Graph lisait le logo dans
> `public/brand/` : le traçage de Next a créé `.next/standalone/public` avec
> ces six SVG, l'adaptateur a sauté la copie, et **toutes les images WebP
> répondaient 404** en production alors que tout fonctionnait en local.
> Corrigé dans `next.config.ts` (`outputFileTracingExcludes` sur `public/`),
> verrouillé par `tests/unit/build-hygiene.test.ts`. Reproduire le build
> d'App Hosting en local, au besoin :
> `FRAMEWORK_VERSION=16.2.11 npx -p @apphosting/adapter-nextjs@14.0.21 apphosting-adapter-nextjs-build`
> dans une copie du dépôt, puis `node .next/standalone/server.js`.

L'adaptateur impose aussi `images.unoptimized: true` si la configuration ne
dit rien ; `next.config.ts` le met explicitement à `false` pour que
`/_next/image` serve des captures à la bonne taille.

1. Configuration runtime dans `apphosting.yaml` : instances, `NEXT_PUBLIC_SITE_URL`, secrets commentés.
2. Secrets : `firebase apphosting:secrets:set RESEND_API_KEY`, puis décommenter le bloc correspondant.
3. **`NEXT_PUBLIC_SITE_URL` doit toujours valoir le domaine réellement servi.** Il alimente les canoniques, le sitemap et le robots.txt : pointé vers un domaine mort, il rend le site inindexable. À changer dans `apphosting.yaml` **avant** le build.
4. Le site Firebase Hosting `bloomystudio` n'est plus dans la chaîne — le bloc `hosting` a été retiré de `firebase.json` pour qu'un déploiement ne republie pas une réécriture obsolète. `bloomystudio.web.app` renvoie donc 404, ce qui est sans conséquence tant que rien n'y pointe.
5. Après mise en ligne : rediriger `bloomy.one/consulting/` en **301**, déclarer le sitemap dans Search Console.

> **Ne jamais déployer `firestore.rules` sur `bloomy-antigravity`.** Ce projet héberge la **production de Bloomy** (bloomy.web.app). Le fichier de ce dépôt refuse tout accès client (`allow read, write: if false`) — correct pour une vitrine dont les leads passent par le SDK Admin, catastrophique appliqué à la base de l'application Bloomy. Aucun bloc `firestore` ne figure dans `firebase.json` : un `firebase deploy` sans `--only` ne peut pas le faire par accident.

## Captures des réalisations

`npm run captures` reprend les captures des sites du portfolio depuis leur version en ligne, en trois formats : desktop (WebP < 100 Ko) et mobile dans `public/realisations/`, et une capture longue de la page entière (< 190 Ko) dans `public/realisations/long/`, que la vitrine fait défiler au survol. `npm run captures -- slug1 slug2` ne reprend que certains sites. La liste des sources vit dans `scripts/capture-realisations.mjs` ; les métadonnées (ville, secteur, légende, nature client ou concept, teinte du panneau) dans `src/lib/portfolio.ts`. À relancer après toute refonte d'un site.

## Avant le lancement public

Voir [docs/content-checklist.md](docs/content-checklist.md) : entité légale, prix, photos, validation juridique des pages légales, tests Safari/iOS réels. Les pages légales affichent un bandeau « document de travail » tant que `src/lib/legal.ts` contient des champs `[À COMPLÉTER]`.
