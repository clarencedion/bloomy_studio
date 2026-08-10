# Suivi — refonte complète du site (studio.bloomy.one)

Fichier de continuité. Il existe pour qu'une nouvelle conversation IA (si les
crédits de celle-ci s'épuisent) puisse reprendre le travail sans repartir de
zéro : ce qui a été demandé, où en est le projet, ce qui a déjà été fait.

**Pour reprendre ce travail ailleurs :** lire ce fichier en premier, puis
`AGENTS.md`, `docs/direction-artistique.md` et `docs/bloomy-studio-blueprint.md`.
Mettre à jour la section « Journal d'avancement » ci-dessous à chaque session
de travail — ajouter une entrée, ne jamais réécrire l'historique.

---

## 1. Demande originale (verbatim, reçue le 2026-07-31)

> Le brief ci-dessous a été collé tel quel par l'utilisateur. Il décrit une
> refonte complète de studio.bloomy.one — audit, stratégie créative, design,
> build, contrôle qualité — avec 30 sites de référence à étudier comme
> bibliothèque d'inspiration (jamais à copier), et des règles anti-patterns
> IA génériques. Conservé intégralement pour qu'aucune nuance ne se perde.

```
You are acting as a world-class creative director, digital art director, UX strategist, interaction designer, conversion specialist, and senior front-end engineer.

Your task is to completely redesign and rebuild my existing website:

studio.bloomy.one

This is not a superficial reskin. Create a new, highly distinctive digital experience for Bloomy while preserving the real business information, projects, services, SEO value, functional requirements, forms, links, and useful content that already exist.

The result must feel designed by an exceptional independent creative studio—not generated from a generic AI website template.

## Core objective

Transform Bloomy into a memorable, premium, modern creative-studio website in which every page feels intentional and experiential.

The experience should be:

* Visually distinctive
* Editorial rather than template-driven
* Minimal but not empty
* Expressive but not chaotic
* Playful but still credible
* Highly polished
* Easy to navigate
* Fast and accessible
* Conversion-oriented without looking sales-heavy
* Rich in personality without becoming overloaded
* Motion-enhanced without becoming an animation demo

The website must communicate Bloomy's positioning, capabilities, personality, work, and value within seconds.

## First: audit the existing website

Before designing or coding anything, thoroughly inspect `studio.bloomy.one`.

Crawl and document:

1. Every existing public page and route
2. Navigation structure
3. Current page hierarchy
4. Existing written content
5. Services and offers
6. Portfolio projects and case studies
7. Images, videos, logos, icons, and brand assets
8. Forms, calls to action, external links, and social links
9. SEO titles, descriptions, headings, structured data, and important URLs
10. Current technology, components, CMS collections, integrations, analytics, and hosting constraints
11. Mobile and desktop problems
12. Content that should be preserved, shortened, reorganized, rewritten, or removed
13. Missing information that should be represented through visible placeholders rather than invented facts

Do not invent clients, metrics, awards, testimonials, team members, services, or business claims.

Preserve factual information from the existing website unless it is clearly outdated or duplicated.

Do not begin with a generic hero section. First understand what Bloomy is, who it serves, what makes it different, and which action visitors should take.

## Reference websites

Study the following websites as a creative reference library:

* Jomo — jomo.so
* June — june.so
* Köm / Komagence — komagence.com
* Superlist — superlist.com
* Flomodia — flomodia.com
* Pitch — pitch.com
* Cowboy — cowboy.com
* Raycast — raycast.com
* Butter — butter.us
* Pipole — pipolemedia.com
* Tella — tella.com
* Arc — arc.net
* Mercury — mercury.com
* Craft — craft.do
* Cal.com — cal.com
* Read.cv — use only if a current or archived version is available
* Arcade — arcade.software
* Equals — equals.com
* Zeda.io — zeda.io
* Spline — spline.design
* Whimsical — whimsical.com
* Notion — notion.com
* Attio — attio.com
* Jitter — jitter.video
* Heights — heights.com
* Runway — runwayml.com
* Figma — figma.com
* Miro — miro.com
* Lunchbox — lunchbox.io
* Superhuman — superhuman.com

Study them for their principles, not for direct reproduction.

Extract inspiration from:

* Information hierarchy
* Section pacing
* Hero composition
* Typography
* Grid systems
* Editorial layouts
* Art direction
* Image treatment
* Project presentation
* Navigation behavior
* Interaction patterns
* Micro-interactions
* Scroll rhythm
* Transitions
* Product or service storytelling
* Use of negative space
* Calls to action
* Mobile behavior
* Footer design
* Case-study structure
* Brand personality

Do not copy any site one-to-one.

Do not reproduce their proprietary text, illustrations, product screenshots, photographs, logos, code, distinctive compositions, or branded visual assets.

Do not combine random sections from all 30 websites into a visual collage. Create one coherent Bloomy design language.

Use the references as a design research library. Assign only two to four relevant references to each Bloomy page or major section.

## Inspiration framework

Use the references approximately as follows:

* **Jomo:** sensory storytelling, confident simplicity, experiential pacing
* **June:** clarity, structured information, clean SaaS-style hierarchy
* **Köm:** expressive identity, purpose-driven editorial design
* **Superlist:** emotional minimalism, polished transitions, visual warmth
* **Flomodia:** bold art direction, distinctive brand world
* **Pitch:** cinematic storytelling, elegant demonstrations, strong pacing
* **Cowboy:** premium product framing, typography, photography, restraint
* **Raycast:** dark-interface precision, technical confidence, compact details
* **Butter:** playful energy, friendliness, controlled use of color
* **Pipole:** pop culture, entertainment, lively but organized interactions
* **Tella:** narrative scrolling, visual explanation, video presentation
* **Arc:** cinematic atmosphere, mystery, unconventional composition
* **Mercury:** credibility, calmness, trust, refined business presentation
* **Craft:** editorial balance, refined typography, elegant feature storytelling
* **Cal.com:** simplicity, usability, direct calls to action
* **Read.cv:** extreme minimalism, typography, profile and content clarity
* **Arcade:** interactive demonstrations and modular storytelling
* **Equals:** bold visual accents and clear demonstrations
* **Zeda.io:** making complex services easy to understand
* **Spline:** spatial interaction and carefully controlled 3D
* **Whimsical:** soft visual language, playfulness, approachable diagrams
* **Notion:** flexible content systems, SEO-friendly page architecture
* **Attio:** sophisticated branding, modern grids, precise feature presentation
* **Jitter:** motion used to explain ideas rather than decorate pages
* **Heights:** optimistic art direction and emotionally reassuring storytelling
* **Runway:** experimental layouts and future-facing creative technology
* **Figma:** visual communication, modular systems, product clarity
* **Miro:** structured visual storytelling and scannable modular content
* **Lunchbox:** energetic branding, appetite, warmth, personality
* **Superhuman:** concise messaging, premium restraint, conversion focus

The final website should not look like any single reference. It should look unmistakably like Bloomy.

## Anti-AI-design rules

Actively avoid common AI-generated website patterns.

Do not use:

* A generic centered headline over a purple gradient
* Excessive glowing effects
* Random floating glass cards
* Unnecessary glassmorphism
* Endless rounded containers
* Generic bento grids on every page
* Repeated three-column feature sections
* Decorative gradients without a brand purpose
* Fake dashboard graphics
* Meaningless abstract blobs
* Excessive pills and badges
* Huge amounts of text
* Repeated "Transform your business" language
* Generic stock photographs of people in meetings
* Constant animation on every element
* Scroll hijacking
* Long intro loaders
* Custom cursors that reduce usability
* Parallax applied to everything
* Excessive 3D objects
* Sections that exist only to make the page longer
* Template-like alternating image-and-text rows
* Identical layouts across all pages
* Fake testimonials, results, logos, or statistics

Every visual decision must have a reason.

## Bloomy design system

Develop one complete and original design system based on Bloomy's actual identity.

Define:

* Creative concept
* Brand mood
* Visual narrative
* Typography system
* Display type behavior
* Body typography
* Color system
* Contrast rules
* Grid
* Spacing scale
* Border and radius logic
* Image treatment
* Video treatment
* Icon style
* Illustration style
* Button system
* Link behavior
* Card behavior
* Navigation system
* Motion language
* Page-transition behavior
* Responsive rules

If the existing identity is strong, evolve it rather than replacing it blindly.

If it is visually inconsistent, retain recognizable brand elements and build a more disciplined system around them.

Avoid choosing fashionable typefaces or colors merely because other startup websites use them. The design must fit Bloomy's positioning.

## Image and art direction

Audit all existing Bloomy imagery and decide what can be retained.

Create an image plan for every page.

Use:

* Existing Bloomy project imagery
* Original compositions made from Bloomy's work
* Art-directed crops
* Full-bleed project visuals
* Typographic imagery
* Short, optimized video loops where genuinely valuable
* Subtle image sequences
* Original graphic devices derived from Bloomy's identity
* Licensed or openly usable imagery only when existing assets are insufficient

The reference websites may be used as moodboard material, but do not download or reuse their proprietary images.

Do not fill the site with generic AI-generated illustrations.

If an original image is unavailable, create a clearly labeled placeholder with the intended subject, crop, dimensions, visual direction, and production notes.

Prioritize quality over quantity. One exceptional visual is better than ten generic visuals.

## Motion philosophy

Motion must support comprehension, atmosphere, hierarchy, or feedback.

Use restrained, high-quality motion inspired by studios that understand timing and choreography.

Good uses of motion include:

* A refined hero entrance
* Smooth navigation transitions
* Project-image reveals
* Typographic masks
* Subtle text and image sequencing
* Contextual hover states
* Section transitions
* Progress indicators
* A small number of carefully selected scroll-linked moments
* Case-study transitions that connect one chapter to another
* Responsive micro-interactions
* Subtle depth when it strengthens a composition

Motion rules:

* Most elements should remain still
* Never animate every heading, paragraph, card, and icon
* Avoid repetitive fade-up animations
* Do not delay access to content
* Do not sacrifice scrolling performance
* Respect `prefers-reduced-motion`
* Keep mobile motion simpler than desktop motion
* Animations should be interruptible
* Avoid motion that competes with the work
* Use easing and timing consistently
* Reserve the most expressive interaction for one or two memorable moments per page

The visitor should remember the experience, not the number of animations.

## Page experience

Every page should have its own narrative purpose while remaining part of the same design system.

Do not repeat the homepage hero layout on internal pages.

### Homepage

The homepage must quickly establish:

* What Bloomy is
* What Bloomy does
* Who it helps
* Why its approach is different
* The quality of its work
* The primary next action

Potential homepage sequence:

1. Distinctive opening statement and visual idea
2. Immediate positioning or concise service definition
3. Selected work presented as the primary proof
4. A brief explanation of Bloomy's approach
5. Services presented through outcomes rather than a long feature list
6. Selected capabilities or process
7. Genuine credibility signals already available on the website
8. Clear invitation to begin a project
9. Memorable but useful footer

Do not force this exact structure if the existing content suggests a better narrative.

The homepage should not explain everything. It should create clarity, confidence, and curiosity.

### Work or projects page

Make the portfolio feel curated, not like a generic card gallery.

Consider:

* Art-directed project index
* Variable project scales
* Strong image cropping
* Useful filtering only when there are enough projects
* Brief context before opening each case study
* Meaningful hover behavior
* Fast browsing
* Strong mobile presentation

Avoid giving every project the same card size and structure.

### Case-study pages

Each case study should feel like an authored story rather than a CMS template filled with images.

Build a flexible case-study system capable of supporting:

* Project overview
* Client or context
* Challenge
* Bloomy's role
* Strategy
* Creative direction
* Process
* Design system
* Key outputs
* Final experience
* Results, only when real data exists
* Credits
* Related project
* Clear next action

Allow every project to use a different rhythm while sharing consistent typography, metadata, spacing, navigation, and controls.

Use full-width media selectively. Mix image scales, captions, concise text, and moments of visual rest.

### Services page

Do not create a long catalogue of generic service cards.

Explain:

* The transformations Bloomy creates
* The problems it solves
* The types of engagements available
* What working together feels like
* Which deliverables may be involved
* How a project typically progresses
* Who Bloomy is best suited for

Keep the language concrete and based on the real offer.

### About page

Create a human, confident, concise page.

Include only information supported by the existing website:

* Point of view
* Story
* Principles
* Team
* Collaboration model
* Selected facts
* Working philosophy
* Contact invitation

Avoid vague agency language and exaggerated claims.

### Contact page

Make contacting Bloomy feel easy and inviting.

The page should:

* Set expectations
* Ask only necessary questions
* Explain what happens after submission
* Provide alternative contact information when available
* Include excellent validation and success states
* Work perfectly on mobile
* Avoid making the visitor complete an exhausting questionnaire

### Other pages

Audit all remaining pages, including journal, insights, legal, privacy, terms, booking, project archive, or campaign pages.

Give each page appropriate hierarchy and styling instead of treating it as an afterthought.

## Content direction

Preserve Bloomy's authentic voice.

Edit content for:

* Clarity
* Brevity
* Confidence
* Rhythm
* Specificity
* Natural language
* Strong page hierarchy
* Better calls to action

Do not replace all writing with generic marketing copy.

Avoid:

* Empty superlatives
* Corporate jargon
* Repeating the same claim
* Over-explaining
* Large paragraphs
* Artificially poetic language
* Claims unsupported by evidence

Use short headlines where possible, but do not make every sentence cryptic.

Use enough information to answer visitors' important questions without overloading the interface.

## Navigation

Design a navigation system that is distinctive but immediately understandable.

Requirements:

* Clear access to work, services, about, and contact
* Visible current-page state
* Strong keyboard navigation
* Excellent mobile menu
* No confusing experimental navigation
* No hidden essential links
* No hover-only access to important information
* Smooth but fast transitions
* Persistent project navigation when useful
* Clear return paths from case studies

The logo should always return to the homepage.

## Responsive behavior

Design mobile intentionally rather than shrinking the desktop version.

For every breakpoint:

* Reconsider composition
* Reorder content when useful
* Adjust typography
* Simplify animation
* Protect touch-target sizes
* Maintain visual rhythm
* Avoid horizontal overflow
* Preserve image quality
* Keep key calls to action accessible
* Ensure menus, forms, galleries, and project pages are easy to use

The mobile website should feel like a designed experience in its own right.

## Accessibility

Meet WCAG 2.2 AA wherever reasonably possible.

Include:

* Semantic HTML
* Keyboard support
* Visible focus states
* Accessible navigation
* Logical heading structure
* Sufficient contrast
* Useful alternative text
* Proper form labels
* Accessible validation
* Reduced-motion behavior
* Screen-reader-friendly interactive elements
* No essential information communicated only through animation or color

## Performance

The result must remain fast despite its visual quality.

Targets:

* Excellent Core Web Vitals
* Optimized responsive images
* Modern image formats
* Lazy loading below the fold
* Carefully compressed video
* Minimal JavaScript
* No unnecessary animation libraries
* No large 3D payload unless the concept absolutely requires it
* Font subsetting and responsible font loading
* No layout shifts
* Smooth scrolling on average mobile hardware
* Progressive enhancement

Visual ambition is not an excuse for poor performance.

## SEO and migration protection

Preserve or improve the existing website's discoverability.

Before changing routes:

* Record all current URLs
* Keep valuable URLs unchanged where possible
* Create redirects for changed URLs
* Preserve relevant metadata
* Maintain one clear H1 per page
* Improve title tags and descriptions
* Maintain image alternative text
* Add appropriate structured data
* Generate sitemap and robots configuration
* Preserve canonical URLs
* Prevent staging pages from being indexed
* Avoid deleting valuable written content without a clear migration plan

## Technical implementation

Inspect the existing stack before choosing an implementation strategy.

Prefer improving the current codebase when it is technically sound.

Rebuild only when the existing architecture prevents the required quality, performance, maintainability, or experience.

Requirements:

* Production-ready implementation
* Reusable components
* Consistent design tokens
* Clean component architecture
* CMS compatibility
* No duplicated page logic
* Maintainable motion system
* Proper error and empty states
* Optimized media handling
* Functional forms
* Analytics continuity
* Cross-browser testing
* No broken routes or links
* No placeholder lorem ipsum
* No fabricated content
* No console errors
* No unfinished interactions

## Required workflow

Follow this order:

### Phase 1 — Audit

Produce:

* Existing sitemap
* Content inventory
* Technical observations
* UX issues
* Visual issues
* Conversion issues
* Accessibility issues
* Performance risks
* Content preservation plan

### Phase 2 — Creative strategy

Produce:

* A one-sentence creative concept
* Three to five design principles
* Bloomy's proposed visual personality
* Reference-site inspiration matrix
* Proposed sitemap
* Page narratives
* Art-direction plan
* Motion principles
* Content hierarchy
* Design-system foundations

For every major page, identify which two to four reference websites influenced the approach and specify exactly what principle was borrowed.

### Phase 3 — Design

Create:

* Desktop and mobile design direction
* Core components
* Typography system
* Color system
* Navigation
* Homepage
* Work index
* One representative case study
* Services page
* About page
* Contact page
* Footer
* Loading, error, form, and empty states

Review the system for coherence before expanding it to all pages.

### Phase 4 — Build

Implement the approved design direction across the entire website.

Do not stop after generating mockups, a style guide, or a homepage concept.

Build every existing page and make all interactions functional.

### Phase 5 — Quality control

Test:

* Every route
* Every link
* Every form
* Every responsive breakpoint
* Keyboard navigation
* Reduced motion
* Image loading
* Video loading
* SEO metadata
* Redirects
* Browser compatibility
* Performance
* Accessibility
* Content accuracy
* Visual consistency

## Self-review questions

Before considering the redesign complete, ask:

1. Does this look recognizably like Bloomy?
2. Does it look like a real creative team designed it?
3. Is the visual concept coherent across every page?
4. Is any section present only because it is fashionable?
5. Is there too much text?
6. Is there too much motion?
7. Are the strongest visual moments concentrated rather than repeated?
8. Can visitors understand Bloomy quickly?
9. Is the portfolio doing most of the credibility work?
10. Does each internal page have its own meaningful experience?
11. Is mobile as considered as desktop?
12. Are all assets original, owned, licensed, or clearly marked as placeholders?
13. Have any reference websites been copied too literally?
14. Is the website fast enough for real visitors?
15. Does every call to action have a clear purpose?
16. Does the site remain usable with motion disabled?
17. Have all factual claims been verified against the existing Bloomy website?
18. Would an experienced designer identify this as generic AI output?

If the answer to question 18 is yes, revise the work before presenting it.

## Final instruction

Be bold in concept and disciplined in execution.

Do not create a website containing every current design trend.

Do not make every section interactive.

Do not use all 30 references equally or literally.

Study broadly, select intelligently, and synthesize everything into one original Bloomy experience.

The final result should feel calm, surprising, premium, human, and memorable.

It should communicate more through composition, typography, pacing, imagery, and carefully selected interactions than through large quantities of text or animation.

Audit first, establish the creative concept second, and then redesign and implement the complete website—not only the homepage.
```

**Note importante :** ce brief a été rédigé comme s'il s'adressait à un site
externe inconnu (« inspecter studio.bloomy.one », « crawl the existing
website »). Or ce dépôt **est** le code source de studio.bloomy.one — c'est
un projet Next.js déjà construit, avec son propre système de conception déjà
documenté (voir §2). Une partie du travail de « Phase 1 — Audit » consiste
donc à lire le code et `docs/` plutôt qu'à crawler le site en ligne à l'aveugle.

## 2. État du projet au moment de la demande (2026-07-31)

Ce n'est **pas** un projet vierge. Un système de conception « atelier clair »
existe déjà et est documenté dans `AGENTS.md` :

- **Stack** : Next.js 16 (App Router, Turbopack), TypeScript strict,
  Tailwind v4, Motion for React, Zod, firebase-admin, Vitest + Playwright.
- **Système visuel actuel** : fond ivoire (`cream`/`cream-deep`), texte
  `ink` anthracite, une seule couleur d'action par page (`rose`, bourgogne),
  `plum` en surface sombre, `bloom` en micro-dose, `sage` décoratif. Display
  Cal Sans, corps Inter. Boutons pilule, cartes `rounded-sm`. Détail complet :
  `docs/direction-artistique.md` (fait autorité sur le visuel et l'accueil).
- **SEO/contenu** : `docs/bloomy-studio-blueprint.md` (offres, légal, SEO),
  contenu typé dans `src/lib/` (jamais en dur dans les composants), prix
  verrouillés à « Sur devis » (`tests/unit/content-integrity.test.ts`).
- **Routes existantes** (`src/app/`) : accueil, `a-propos`, `audit`, `blog`
  + `blog/[slug]`, `conditions-generales`, `contact`, `cookies`,
  `developpement-mvp`, `fleuristes` + 4 sous-pages (e-commerce, maintenance,
  seo-local, site-internet), `mentions-legales`, `methode`,
  `politique-de-confidentialite`, `realisations` + `realisations/[slug]`,
  `salons-de-coiffure`, `services`.
- **Portfolio réel** (`src/lib/portfolio.ts`, `public/realisations/`) : trois
  sites livrés avec captures desktop + mobile (Monloup, Maison Hortense,
  KL Fleuriste), plus l'étude de cas Bloomy elle-même (plateforme de
  l'équipe, 1000+ inscrits, 0 % commission).
- **Historique git** : `first commit` → mise en place initiale ; `update 1`
  → captures réalisations desktop/mobile réelles ; `update 2` → refonte
  visuelle vers le système « atelier clair » actuel (Hero, WorkShowcase,
  NeedsGrid, Frictions, CtaBand, EditorialList, etc.).

**Conséquence pour ce brief** : le système de conception, la voix, et les
preuves réelles existent déjà et sont *bons* — l'enjeu n'est pas de partir
de zéro mais de faire l'audit critique du travail existant à la lumière de
ce brief (cohérence, personnalité, densité de mouvement, page par page) et
de faire évoluer plutôt que remplacer, comme le brief lui-même le demande
en cas d'identité déjà forte (« Bloomy design system » ci-dessus).

## 3. Journal d'avancement

Ajouter une entrée par session. Ne jamais supprimer une entrée passée.

| Date | Ce qui a été demandé | Ce qui a été fait | Reste à faire |
|---|---|---|---|
| 2026-07-31 | Refonte complète (brief ci-dessus) + création d'un fichier de suivi pour continuité inter-conversation | Lecture de l'état actuel du dépôt (routes, `docs/`, historique git). Création de ce fichier (`docs/refonte-suivi.md`). **Aucun changement de code, de contenu ou de design n'a encore été fait pour ce brief.** | Phase 1 (audit formel page par page par rapport au brief), Phase 2 (stratégie créative : concept en une phrase, principes, matrice de références), puis Phases 3–5 (design, build, QA) — voir §1 « Required workflow ». |
| 2026-07-31 | « on y va tu fais tout » — exécution autonome des Phases 1–5 | **Conclusion stratégique (Phase 2) :** le système « atelier clair » documenté dans `AGENTS.md`/`direction-artistique.md` est déjà cohérent, discipliné et conforme à l'esprit anti-patterns-IA du brief (pas de glassmorphism, pas de bento, pas de gradient, pas de preuve inventée) — décision : **évoluer/corriger l'existant plutôt que le remplacer**, conformément à la clause du brief « if the existing identity is strong, evolve it rather than replacing it blindly ». Audit complet (3 agents en parallèle : contenu/SEO, système de design/animation, tests/intégrité) puis corrections réelles : <br>• **Budget d'animation** — `band-drift` (parallaxe scroll sur 4 bandes photo) supprimé de `globals.css` et de ses 4 usages : ce pattern n'est pas dans les 5 animations autorisées par `direction-artistique.md` §4.4 et recoupe l'interdit explicite « parallaxe lourde ». `fade-up-late` restreint au Hero (`PageHero.tsx` utilise désormais `<Reveal>`, déjà comptée dans le budget, au lieu de réutiliser l'animation d'entrée du hero sur chaque page intérieure). <br>• **Discipline `bloom`** vérifiée : n'apparaît que via la pastille `.pill` (un usage explicitement sanctionné par la règle), jamais combiné à un autre usage bloom dans un même écran — conforme, aucun changement. <br>• **Hygiène technique** : `public/photos/_raw/` (18 Mo de PNG sources, gitignorés mais servis publiquement lors d'un déploiement depuis la source locale) déplacé vers `assets/photos-raw/`, hors de `public/` ; script `optimize-images.mjs` et `.gitignore` mis à jour. Deux photos orphelines supprimées. Champ mort `site.legalName` supprimé (jamais lu, redondant avec `legal.ts`). <br>• **SEO** : titles/descriptions hors clou (50–60/130–150 car.) corrigés sur 11 pages + 2 articles de blog (mesuré précisément par script, pas à l'estimation). <br>• **Intégrité du contenu** : légende de `CaseSpotlight` reformulée (affirmation d'usage non vérifiable → principe de conception assumé, cohérent avec la règle « aucune preuve inventée »). URLs `liveUrl` du portfolio vérifiées par fetch réel (domaine perso + repli `.web.app` = même site, conforme). <br>• **Tests de garde-fou ajoutés** (rules d'`AGENTS.md` jusqu'ici non testées) : `mainNav.length <= 6`, budget de poids `< 100 Ko` sur `public/realisations/*.webp`, présence de `"server-only"` sur les modules sensibles (nouveau fichier `tests/unit/build-hygiene.test.ts`), et règle d'espacement après un lien (`</a>` collé au texte suivant) vérifiée sur le HTML rendu de chaque route dans `tests/e2e/site.spec.ts`. <br>• **Contenu** : accueil dégraissé (~65 mots, FAQ redondante avec la démo d'administration retirée, aparté technique de `ProductLab` coupé — sans toucher à une section). Les 3 articles de blog étoffés de ~650–900 mots chacun (contenu réel : pièges UX, accessibilité, calendrier de visibilité, exemple de calcul chiffré explicitement labellisé illustratif, questions à poser à une plateforme) pour dépasser 1500 mots (mesuré par script sur le texte réellement rendu). `/fleuristes/maintenance` et `/fleuristes/site-internet` étoffées (nouvelle section « démarrage » à 3 étapes, nouveau FAQ, paragraphe de positionnement) pour dépasser 800 mots. <br>• **Vérification** : `npm run lint`, `typecheck`, `test` (26 tests, tous verts), `build` et `e2e` (55 passés / 1 skip) tous verts. Contrôle visuel réel via Playwright (desktop + mobile, `prefers-reduced-motion: reduce` pour vérifier le contenu sans dépendre du timing du scroll-reveal) sur l'accueil, les deux pages fleuristes étoffées et un article de blog — rendu conforme au système, aucune régression. | **Non fait dans cette session, à faire ensuite si l'utilisateur le souhaite :** (1) pages légales toujours `noindex` — `lib/legal.ts` a besoin de vraies données d'entité (SIREN, forme juridique, adresse du siège...) qu'aucune IA ne peut inventer ; (2) le reste du site (`/services`, `/salons-de-coiffure`, `/realisations`, `/methode`, `/a-propos`, etc.) n'a pas eu la même passe de relecture ligne à ligne que les pages touchées ici — l'audit initial n'a rien signalé de cassé dessus, mais elles n'ont pas été retravaillées activement ; (3) Phase 5 du brief demande aussi un test de compatibilité multi-navigateurs (Safari/iOS réel) — seul Chromium a été testé ici, conformément à `playwright.config.ts` actuel. |

### Session 2026-08-10 — « le site n'a pas d'âme et fait trop IA »

**Diagnostic demandé par l'utilisateur, puis appliqué.** Références données :
`acctual.com` (design aimé) et `swap-commerce.com` (complétude/structure).
Les deux ont été capturées et analysées avec Playwright.

**Causes identifiées (dans l'ordre d'impact) :**

1. **Les visuels étaient codés.** `AdminPreview.tsx`, `BloomyComposer`,
   `OrdersPeek` et `Botanical.tsx` (fleurs SVG) étaient des interfaces et des
   illustrations redessinées en HTML/CSS — de faux tableaux de bord, que le
   brief d'origine interdisait explicitement. Trois des douze sections de
   l'accueil reposaient dessus.
2. **Les vraies photos étaient gâchées.** `atelier-matieres-wide.webp`
   (ciseaux, ficelle, papier kraft) et `comptoir-matin-wide.webp` (comptoir +
   téléphone) — exactement la « scène de bureau » d'Acctual en version
   fleuriste — servaient de bandelettes décoratives de 48 px.
3. **Monochromie.** La règle « une seule couleur d'action » avait été étendue
   de fait à toute la palette : beige, gris, bordeaux. Acctual utilise six
   teintes pastel de fond.
4. **Trop de texte** : chaque section suivait le même gabarit titre +
   paragraphe + liste.
5. **Aucun humain, aucune matière** — alors que le métier vendu est le plus
   sensoriel qui soit.

**Cause racine :** le site n'avait aucune métaphore physique. Il appliquait un
règlement (`AGENTS.md`) au lieu d'incarner une idée. Un site conforme, pas un
site habité.

**Corrections apportées :**

- **Actifs réels récupérés** : capture de l'app bloomy.one
  (`public/produit/composer-app.webp`), mascotte, et surtout les **vrais
  portraits de l'équipe** (`public/equipe/clarence.webp`, `tom.webp`) qui
  existaient sur bloomy.one sans être utilisés. Plus deux photographies
  humaines sous licence Unsplash (fleuriste en boutique, mains qui composent),
  créditées dans `docs/credits-photos.md`.
- **Faux visuels supprimés du dépôt** : `AdminPreview.tsx`, `Botanical.tsx`,
  `AdjacentSectors.tsx` et `BloomyComposer` (tronqué de `ShowcaseSites.tsx`).
  Remplacés par `ProductShot.tsx`, qui affiche la capture réelle.
- **Palette élargie** : cinq teintes de matière (`--color-tint-kraft`, `soie`,
  `feuille`, `eau`, `lin`) en **fond de carte uniquement** — la couleur
  d'action reste le bourgogne seul, la règle n'est pas cassée.
- **Échelle `text-display-2xl`** construite (documentée en §4.2 mais absente
  du CSS jusqu'ici) et appliquée au hero.
- **Nouvelles sections d'accueil** : `ProductGrid` (Sites / MVP / Micro SaaS)
  et `SectorGrid` (Fleuristes en vedette avec photo, puis salons et autres
  métiers), `StudioTeam` (les deux visages). `AdminDemo` passe du faux
  tableau de bord à la photographie du comptoir.
- **Nouvelle route `/micro-saas`** + entrée de navigation (le blog cède sa
  place, comme la règle des six entrées l'exige) + sitemap + tests.

**Vérification :** lint, typecheck, 23 tests unitaires, build, et 57 tests e2e
(desktop + mobile) tous verts. Contrôle visuel réel desktop et mobile.

**Piège rencontré, à retenir :** un ancien `next start` restait accroché au
port 3000 et servait un build périmé dont le chunk CSS renvoyait 500 — d'où
des captures où *aucun* utilitaire Tailwind ne s'appliquait et une page de
26 500 px. Toujours `lsof -ti:3000 | xargs kill -9` avant de relancer, et
vérifier que le CSS servi n'est pas vide avant de conclure à un bug de mise
en page.

## 4. Prochaine étape suggérée

Le gros du travail mécanique/structurel (Phases 1–5 au sens restreint :
audit, corrections de conformité au système existant, contenu, vérification)
est fait pour un premier passage — voir le journal 2026-07-31 ci-dessus.
Ce qui reste, par ordre de valeur probable :

1. **Complétude légale** (`lib/legal.ts`) : bloque l'indexation de 4 pages
   (`/mentions-legales`, `/conditions-generales`, `/cookies`,
   `/politique-de-confidentialite`). Nécessite des informations réelles côté
   utilisateur (SIREN, forme juridique, adresse, hébergeur) — pas quelque
   chose qu'une IA peut compléter seule.
2. **Relecture ligne à ligne des pages non touchées** cette session
   (`/services`, `/salons-de-coiffure`, `/realisations`, `/methode`,
   `/a-propos`, `/audit`, `/contact`) avec la même grille que l'audit du
   2026-07-31 — rien n'y a été signalé de cassé, mais elles n'ont pas reçu
   la même passe active.
3. **Compatibilité navigateur réelle** (Safari/iOS) — seul Chromium a été
   vérifié (config Playwright actuelle).
4. Si l'utilisateur veut aller au-delà d'une évolution du système existant
   vers une refonte plus radicale de l'identité visuelle (nouvelle palette,
   nouvelle typographie) : ce serait contraire à la conclusion de Phase 2
   ci-dessus (« évoluer, pas remplacer ») et mérite d'être validé
   explicitement avec l'utilisateur avant d'être entrepris — c'est un choix
   qui lui appartient, pas une déduction technique.
