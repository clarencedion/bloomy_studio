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

## Déploiement — Firebase App Hosting

Le site est **indépendant** de l'application Bloomy principale : le déployer dans un backend App Hosting dédié (idéalement un projet Firebase distinct) pour ne toucher à aucune production existante.

```bash
firebase apphosting:backends:create --project <projet-studio> --location europe-west4
# Connecter le dépôt Git : chaque push sur la branche configurée déclenche build + déploiement.
```

1. La configuration runtime est dans `apphosting.yaml` (instances, `NEXT_PUBLIC_SITE_URL`, secrets commentés).
2. Secrets : `firebase apphosting:secrets:set RESEND_API_KEY` puis décommenter le bloc correspondant.
3. Domaine : associer `studio.bloomy.one` (ou le domaine choisi) dans la console App Hosting, puis mettre `NEXT_PUBLIC_SITE_URL` en cohérence **avant** le build.
4. Publier `firestore.rules` : `firebase deploy --only firestore:rules`.
5. Après mise en ligne : rediriger `bloomy.one/consulting/` en **301** vers le nouveau domaine (à configurer sur le site principal Bloomy), déclarer le sitemap dans Search Console.

Environnements de préversion : créer un second backend (`studio-staging`) pointant sur une branche `staging` — App Hosting gère la séparation.

## Avant le lancement public

Voir [docs/content-checklist.md](docs/content-checklist.md) : entité légale, prix, photos, validation juridique des pages légales, tests Safari/iOS réels. Les pages légales affichent un bandeau « document de travail » tant que `src/lib/legal.ts` contient des champs `[À COMPLÉTER]`.
