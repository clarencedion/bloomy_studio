# Bloomy Studio — Blueprint du site

Document de référence produit avant implémentation. Toute décision d'implémentation renvoie à ce document.

---

## 1. Audit du dépôt

- `/Users/clarencedion/CODING/bloomystudio/` ne contenait **aucun site existant** : uniquement `claude-seo-main/`, le toolkit SEO open-source (skills Claude Code). Il n'y a donc **pas de migration** : le site Bloomy Studio est un projet neuf, créé dans `bloomy-studio/`.
- Aucune configuration Firebase existante dans le dépôt. Le projet est préparé pour Firebase App Hosting mais **déployable indépendamment** de l'application Bloomy principale (exigence §30 du brief).
- Aucun asset de marque (logo, photos, fonts licenciées) dans le dépôt. Voir §« Assets manquants ».

**Stack retenue** : Next.js **16.2.11** (dernière version stable = baseline officielle Firebase App Hosting depuis mars 2026), TypeScript strict, Tailwind CSS v4 (config CSS-first), Motion for React, Zod, firebase-admin (server-only, lazy), Vitest, Playwright.

## 2. Audit de la marque existante

Constats vérifiés sur les pages publiques (juillet 2026) :

**bloomy.one (produit)**
- Bloomy est une application réelle : composition de bouquet fleur par fleur, retrait en boutique ou livraison, prix transparent, **0 % de commission pour l'artisan**, **plus de 1 000 utilisateurs inscrits**.
- Fondateurs : **Clarence Dion et Tom Rodrigues**. Mission : rendre leur indépendance numérique aux artisans fleuristes face aux intermédiaires.
- Ancrage : **Nantes**, extension Paris, Bordeaux, Marseille, Toulouse.
- Contact : contact@bloomy.one.

**bloomy.one/consulting (page actuelle de Bloomy Studio)**
- Positionnement déjà présent : « Création Site Web & SEO Local pour Fleuristes », approche artisanale, design identitaire, SEO local Nantes, site sur mesure. CTA « Démarrer un projet ». Pas de prix affichés, pas de témoignages, pas d'études de cas — c'est la faiblesse que le nouveau site corrige.
- Verticales secondaires évoquées : architecture, événementiel, mode, créateurs → resserrées ici sur coiffure + MVP (brief §1).

**Couleurs existantes** : les valeurs `#FFF9F2` (crème), `#A873A8` (lilas), `#97C485` (vert botanique) ne sont pas vérifiables dans le dépôt (aucun asset). Elles sont utilisées comme **point de départ**, avec des variantes foncées créées pour l'accessibilité (voir §6).

## 3. Positionnement

> **Le studio digital qui fait fleurir les fleuristes.** Qualité d'agence premium, expertise réelle du secteur floral, prix justes rendus possibles par une structure légère — jamais « pas cher ».

Équilibre éditorial : ~75 % fleuristes / 15 % salons de coiffure et commerces locaux premium / 10 % MVP. L'architecture (`/[secteur]` de premier niveau + config centralisée) permet d'ajouter des verticales sans refonte.

**Crédibilité différenciante (vérifiable, utilisée sur le site)** : l'équipe construit Bloomy, une vraie plateforme florale (catalogue, click-and-collect, livraison, commande mobile, tableaux de bord fleuristes). Bloomy Studio n'est pas un freelance généraliste qui cible les fleuristes par opportunisme.

**Interdits (appliqués partout)** : aucun chiffre client inventé, aucun témoignage inventé, aucun classement Google promis, aucune fausse urgence, ne jamais laisser croire que les fleuristes partenaires de la marketplace Bloomy sont des clients du Studio.

## 4. Audiences et objections

| Audience | Situation | Objections principales |
|---|---|---|
| Fleuriste indépendant·e | Site vitrine daté ou template mutualisé, pas de vente en ligne, invisible sur Google Maps | « Trop cher », « je me suis déjà fait avoir », « je n'ai pas le temps », « à quoi ça sert, j'ai Instagram », « je ne comprends pas ce que je paie » |
| Salon de coiffure premium | Dépend des plateformes de réservation, image en ligne en dessous du salon | « Planity me suffit », « un site ne m'apporte pas de clients » |
| Fondateur·rice MVP | Besoin d'un produit testable vite, budget maîtrisé | « Les agences produit sont hors budget », « les freelances disparaissent » |

Réponses intégrées : transparence des offres (§10), méthode explicite (`/methode`), FAQ d'objections sur la home et `/fleuristes`, diagnostic gratuit sans engagement comme premier pas à faible friction.

## 5. Proposition de valeur et personnalité

**Ce que le client achète** : un système de croissance digitale (site + e-commerce + SEO local + suivi), pas « un site ». Chaque section répond à : ce que vous recevez / pourquoi c'est important / quel problème c'est censé résoudre / en quoi Bloomy Studio est différent / l'étape suivante.

**Personnalité** : atelier + précision. Chaleureux, direct, expert, calme. Vouvoiement. Jamais corporate, jamais « inspirant » à vide.

## 6. Concept visuel — « Atelier floral digital »

Éditorial botanique × précision technologique. Références décomposées (jamais copiées) : planches botaniques (filets fins, numérotation, légendes), magazines indépendants (asymétrie, larges marges), studios d'architecture (retenue, typographie affirmée), sites e-commerce premium (clarté transactionnelle).

**Système de tokens** (CSS custom properties + Tailwind v4 `@theme`) :
- Fonds : crème `#FFF9F2` (base), papier `#FFFFFF` (surfaces), encre `#23202A` (sections sombres), voile lilas `#F6EEF6` / voile vert `#EFF5EB` (aplats discrets).
- Texte : encre `#23202A`, encre douce `#5C5563`, crème sur encre.
- Accents : lilas `#A873A8` (décoratif uniquement), **lilas profond `#7A4E7A`** (texte/liens accessibles sur crème, ≥ 4.5:1), vert botanique `#97C485` (décoratif), **vert profond `#3D6B35`** (texte accessible).
- Filets : `#E8DFD3` (hairlines botaniques, signature visuelle du site).
- Type scale fluide (clamp), radius sobres (2–12 px, pas de pilules partout), ombres rares et douces, durées 150/300/500 ms, easing `cubic-bezier(0.22,1,0.36,1)`.

**Typographie** : Fraunces (variable, axes optiques/soft — display, chiffres de section, titres) + Hanken Grotesk (variable — interface et corps). Deux familles maximum, chargées via `next/font` (subset latin + latin-ext pour « œ »), `display: swap`. Licences : SIL OFL (vérifié, Google Fonts).

**Anti-slop (brief §7)** : pas de blobs, pas d'orbes, pas de dark-SaaS, pas de bento-only, pas de fausses métriques/logos/témoignages, pas de cartes arrondies répétées, variation réelle des compositions de section (liste filetée, deux colonnes éditoriales, pleine largeur encre, tableau…), animations rares et utiles, `prefers-reduced-motion` respecté.

**Hero** : titre « Le studio digital qui fait fleurir les fleuristes. », sous-titre secteur, CTA primaire « Recevoir mon audit gratuit » (`/audit`), secondaire « Voir nos réalisations ». Visuel : composition 2.5D en HTML/CSS — fenêtre navigateur d'une boutique florale **fictive clairement étiquetée « Démonstration »** + fragments UI réels du système (commande mobile, fiche Google, click-and-collect). Pas de WebGL (décision : aucun moment 3D ne communiquerait mieux que le avant/après ; coût CWV non justifié — brief §10).

**Imagerie** : aucune vraie photo disponible → placeholders illustratifs stylisés (aplats + étiquette), **manifest d'assets** en §15 avec cadrage/ratio/résolution requis pour chaque remplacement. Aucune fausse devanture présentée comme un projet réel.

## 7. Arborescence (sitemap)

```
/                                Home — narrative complète (brief §12)
/fleuristes                      Pilier n°1 (SEO + conversion)
/fleuristes/site-internet        Spoke : création de site fleuriste
/fleuristes/e-commerce           Spoke : boutique en ligne, click-and-collect, livraison
/fleuristes/seo-local            Spoke : SEO local, Google Business Profile, Maps
/fleuristes/maintenance          Spoke : maintenance, évolutions, accompagnement
/salons-de-coiffure              Pilier secondaire complet (vocabulaire salon)
/developpement-mvp               Pilier secondaire MVP/app (Firebase)
/services                        Hub de tous les services + offres
/realisations                    Études de cas
/realisations/[slug]             Étude de cas détaillée
/a-propos                        Équipe, écosystème Bloomy, E-E-A-T
/methode                         Processus en étapes
/audit                           Conversion primaire : diagnostic gratuit
/contact                         Conversion secondaire + coordonnées
/blog + /blog/[slug]             Cluster éditorial
/mentions-legales, /politique-de-confidentialite, /cookies, /conditions-generales
/404 personnalisée (not-found)
```

Décisions : pas de pages villes au lancement (règle anti-doorway du skill seo-local : « swap test » ; une page ville n'est créée que si ancrage réel — projet, partenaire, étude de cas). Nantes est traitée sur `/fleuristes/seo-local`, `/a-propos` et le schema (`areaServed`). Pas de filtre projets tant qu'il n'y a pas ≥ 6 projets (brief §15).

## 8. Parcours de conversion

Primaire : **diagnostic gratuit site + visibilité locale** (`/audit`) — formulaire en 3 étapes courtes (identité → activité → objectif), divulgation progressive, aucun champ superflu, état de succès expliquant la suite (analyse humaine, réponse sous 48 h ouvrées). Secondaire : `/contact` (formulaire simple + mailto fallback `contact@bloomy.one`). CTA contextuels après chaque bloc de preuve ; barre CTA mobile discrète ; pas de popup.

**Événements analytics** (map centralisée `lib/analytics.ts`, no-op sans consentement) : `cta_audit_click`, `audit_start`, `audit_step`, `audit_submit`, `contact_submit`, `case_study_view`, `pricing_view`, `email_click`, `phone_click`, `calendly_click` (si configuré).

**Leads** : Server Action + Zod ; honeypot + piège temporel + rate-limit best-effort ; stockage Firestore (`leads`, création seule via Admin SDK server-side) quand les identifiants sont configurés, sinon log serveur explicite ; capture `utm_*` + referrer ; e-mails (notification + confirmation) via Resend **server-side uniquement** si `RESEND_API_KEY` présent. Aucun secret client-side.

## 9. Architecture SEO

### Clusters de mots-clés (intention vérifiée : requêtes transactionnelles → pages service, informationnelles → blog)

| Cluster | Page cible | Requêtes visées |
|---|---|---|
| Site fleuriste | `/fleuristes/site-internet` | création site internet fleuriste, site vitrine fleuriste, prix site fleuriste |
| E-commerce floral | `/fleuristes/e-commerce` | site e-commerce fleuriste, boutique en ligne fleuriste, click and collect fleuriste, vendre ses fleurs en ligne |
| SEO local floral | `/fleuristes/seo-local` | référencement fleuriste, SEO local fleuriste, fiche Google fleuriste, apparaître sur Google Maps fleuriste |
| Pilier fleuristes | `/fleuristes` | agence web fleuriste, site internet pour fleuriste |
| Coiffure | `/salons-de-coiffure` | création site salon de coiffure, site internet coiffeur |
| MVP | `/developpement-mvp` | développement MVP, créer une application Firebase, agence MVP |
| Éditorial | `/blog/*` | que doit contenir un site de fleuriste, combien coûte un site de fleuriste, comment apparaître sur Google Maps fleuriste, marketplace ou site en propre |

Règles appliquées (skills seo-cluster / seo-content-brief) : hub ↔ spokes liés dans les deux sens, 2–3 liens spoke↔spoke, ≥ 3 liens entrants par page, pas de page orpheline ; jamais deux pages sur la même intention (si chevauchement SERP fort → fusion) ; mot-clé dans title, H1, slug, meta description, 100 premiers mots, un alt.

### Implémentation technique (skill seo-technical)

- **Tout le SEO critique en HTML serveur** : `generateMetadata` par route, canonical absolu, JSON-LD rendu côté serveur — jamais injecté en client.
- Titles 50–60 caractères (mot-clé devant, marque en fin), meta descriptions 130–150, un seul H1/page, hiérarchie sans saut.
- `app/sitemap.ts` : `lastmod` réels issus des données de contenu ; exclusion des routes noindex. `app/robots.ts` : tout autorisé (AI crawlers inclus — décision skill seo-geo : pas de llms.txt, investissement dans le contenu daté, structuré, front-loaded), référence sitemap.
- Breadcrumbs UI + `BreadcrumbList` sur les pages profondes. 404 utile (liens piliers). En-têtes de sécurité via `next.config.ts`.
- Cibles CWV : LCP < 2,5 s, INP < 200 ms, CLS < 0,1 (budget §13).

### Structured data (skill seo-schema — JSON-LD uniquement, types actifs uniquement)

- Layout/Home : `Organization` (Bloomy Studio, `parentOrganization` Bloomy, fondateurs `Person`) + `WebSite` + `ProfessionalService` (`areaServed` : Nantes + France, `knowsAbout` secteur floral).
- Pages service : `Service` (+ `BreadcrumbList`).
- Études de cas : `Article`. Blog : `BlogPosting` avec dates réelles et `author` Person.
- **Pas de FAQPage** (rich results retirés — FAQ en UI seulement), pas de HowTo, pas d'avis auto-déclarés, aucun schema sans contenu visible correspondant.

## 10. Offres et tarifs

Config centralisée typée `lib/offers.ts`. Offres fleuristes : **Essentiel / Boutique / Croissance** ; complémentaires : SEO local, maintenance, pages saisonnières, direction photo, Google Business Profile, analytics, intégrations ; MVP : **MVP Sprint**. **Aucun prix vérifié n'existe dans le dépôt → tous les montants sont « Sur devis »** avec bascule simple (`price: null → afficher price`) le jour où les prix publics sont décidés. Chaque offre : pour qui / inclus / non inclus / déroulé. Pas de tableau comparatif manipulateur.

## 11. Contenu éditorial initial

Deux articles réellement utiles (pas de génération de masse) :
1. « Que doit contenir le site d'un fleuriste ? La checklist complète » — informationnel, lie les 4 spokes.
2. « Comment apparaître sur Google Maps quand on est fleuriste » — informationnel local, lie `/fleuristes/seo-local`.

Plan éditorial documenté (backlog dans §15) : coût d'un site fleuriste, marketplace vs site en propre, préparer la Saint-Valentin/fête des mères, photos produits qui convertissent.

## 12. Légal et vie privée (CNIL/RGPD)

- Pages : mentions légales, politique de confidentialité, cookies, CGV — squelettes complets avec **placeholders visibles `[À COMPLÉTER]`** centralisés dans `lib/legal.ts` (dénomination, forme juridique, SIREN, siège, directeur de publication, hébergeur, DPO/contact données, durées de conservation, sous-traitants). Bandeau visible en haut de chaque page légale tant que des placeholders subsistent + note « à faire valider juridiquement ».
- Consentement : bandeau accessible, **Accepter / Refuser équivalents**, personnalisation, réouverture via lien footer « Gérer les cookies », choix persistant (6 mois), aucun script non essentiel avant consentement, site pleinement fonctionnel après refus, cases marketing jamais précochées, mention d'information concise sous chaque formulaire + lien politique.
- Checklist de lancement légal : §15.

## 13. Accessibilité & performance

- **WCAG 2.2 AA** : landmarks, skip-link, focus visibles, contrastes vérifiés (variantes foncées des accents), formulaires labellisés avec erreurs reliées (`aria-describedby`), navigation mobile accessible (focus trap, Échap), `prefers-reduced-motion`, cibles tactiles ≥ 44–48 px, breadcrumbs nav.
- **Budget perf** : Server Components par défaut ; îlots client limités (header mobile, avant/après, accordéon, formulaires, consentement) ; zéro script tiers par défaut ; fonts variables subset ; images `next/image` (hero eager + `fetchPriority`, reste lazy) ; pas de lib d'icônes lourde (SVG inline maison) ; JS initial visé < 150 KB gz par page ; CLS = 0 par réservation d'espace.

## 14. Phases d'implémentation

1. Fondations : tokens, fonts, layout, header/footer, config centrale.
2. Home complète + `/audit` + `/contact` (conversion d'abord).
3. Cluster fleuristes (pilier + 4 spokes).
4. Secondaires : coiffure, MVP, services, méthode, à-propos.
5. Réalisations + blog. 6. Légal + consentement. 7. SEO infra (sitemap, robots, 404, JSON-LD). 8. QA : lint, types, tests, build, Playwright multi-viewports. 9. Docs & déploiement.

## 15. Checklists

### Assets manquants (manifest)

| Asset | Usage | Spécification |
|---|---|---|
| Logo Bloomy Studio (SVG) | Header/footer/OG | monochrome encre + variante crème |
| Photos atelier/équipe ×6+ | Home, à-propos | éditorial, lumière naturelle, 3:2 et 4:5, ≥ 2400 px, < 200 Ko hero / < 100 Ko contenu |
| Photos boutiques florales ×4 | Piliers | verticales 4:5, ≥ 1600 px |
| Captures réelles de projets livrés | Réalisations | desktop 16:10 ≥ 2560 px + mobile 390×844 |
| Portraits fondateurs ×2 | À-propos | 1:1 ≥ 800 px |
| Image OG dédiée 1200×630 | Partages | générée depuis le système visuel |

### Contenu business manquant

- [ ] Prix publics ou fourchettes des offres (`lib/offers.ts`)
- [ ] Entité juridique complète (`lib/legal.ts` — tous les `[À COMPLÉTER]`)
- [ ] Témoignages clients réels + autorisation écrite
- [ ] Études de cas clients (métriques vérifiées) — architecture prête
- [ ] Lien de prise de RDV (Calendly ou équivalent) — emplacement prêt
- [ ] Numéro de téléphone public (optionnel)
- [ ] Domaine définitif (studio.bloomy.one ou bloomystudio.fr) + redirection 301 de bloomy.one/consulting

### Lancement légal

- [ ] Faire valider les 4 pages légales par un professionnel
- [ ] Compléter registre des traitements + durées de conservation
- [ ] Vérifier DPA des sous-traitants (Firebase/Google Cloud, Resend)
- [ ] Tester le refus de consentement (aucun cookie non essentiel déposé)
- [ ] Déclarer le directeur de publication et l'hébergeur

### Skills appliqués (dépôt claude-seo-main)

| Skill | Décisions influencées |
|---|---|
| seo (orchestrateur) | Gates anti-pages-massives → pas de pages villes ; INP (pas FID) ; pas de FAQPage/HowTo schema |
| seo-technical | Metadata/canonical/JSON-LD 100 % server-rendered ; en-têtes sécurité ; cibles tactiles ; 404 avec HTML complet |
| seo-schema | Types actifs uniquement ; JSON-LD server-side ; Organization/ProfessionalService/Service/Article/BreadcrumbList |
| seo-sitemap | `lastmod` réels par contenu, pas de priority/changefreq, exclusion noindex |
| seo-local | Pilier fleuristes structuré en pages service dédiées (facteur n°1 local) ; règle anti-doorway (« swap test ») ; NAP cohérent site/schema/GBP ; cadence d'avis (18 jours) enseignée dans le contenu |
| seo-maps | Checklist GBP 25 points → contenu de `/fleuristes/seo-local` et offre GBP |
| seo-page | Title 50–60, meta 130–150, un H1, hiérarchie stricte |
| seo-content | Test Who/How/Why sur chaque page ; planchers de couverture (service ≥ 800 mots, blog ≥ 1500) ; 3–5 liens internes/1000 mots |
| seo-content-brief | Règle de pertinence (aucune promesse hors offre réelle) ; information gain par article |
| seo-images | Alt 10–125 car., fichiers kebab-case descriptifs, hero eager/fetchpriority, budgets de poids |
| seo-cluster | Hub-and-spoke fleuristes ; clusters séparés par verticale (jamais fusionnés) |
| seo-sxo | Type de page aligné sur l'intention (transactionnel → page service, pas article) |
| seo-programmatic | Refus des pages villes tant qu'absence d'ancrage réel |
| seo-geo | Pas de llms.txt ; passages citables front-loaded 130–170 mots ; AI crawlers autorisés ; contenu daté et rafraîchi |
| seo-plan | IA du site agence (services/secteurs/réalisations/méthode/blog) ; stack schema agence ; exigences études de cas (≥ 1000 mots, métriques réelles) |

Conflits skills ↔ brief : le brief suggérait « FAQPage where appropriate » ; le skill seo (source primaire, mise à jour mai 2026 : retrait mondial des rich results FAQ) l'emporte → FAQ en UI sans schema. Aucun autre conflit matériel.
