# Checklist de contenu avant lancement public

Le site est fonctionnel et déployable, mais ces éléments doivent être fournis
ou décidés par l'équipe avant (ou juste après) la mise en ligne publique.
Aucun d'eux n'a été inventé : les emplacements affichent des placeholders
visibles ou des formulations neutres en attendant.

## 1. Bloquant avant lancement

- [ ] **Entité légale** — compléter tous les `[À COMPLÉTER]` de `src/lib/legal.ts`
      (dénomination, forme, capital, SIREN, RCS, TVA, siège, directeur de
      publication, téléphone, durées de conservation, sous-traitant e-mail).
      Le bandeau « document de travail » des pages légales disparaît
      automatiquement une fois les champs critiques remplis.
- [ ] **Validation juridique** des 4 pages légales par un professionnel
      (mentions légales, confidentialité, cookies, CGV — la clause de
      facturation et la juridiction sont volontairement incomplètes).
- [ ] **Destination des leads** — activer Firestore (rien à faire sur App
      Hosting) et vérifier qu'une soumission de test apparaît dans la
      collection `leads` ; sinon configurer `RESEND_API_KEY` +
      `LEADS_FROM_EMAIL` pour la notification e-mail.
- [ ] **Domaine définitif** (`studio.bloomy.one` ou autre) + mise à jour de
      `NEXT_PUBLIC_SITE_URL` + redirection **301** de `bloomy.one/consulting/`.
- [ ] **Test Safari/iOS réel** — la QA automatisée a couvert Chromium desktop
      et mobile (Pixel 7) ; un passage sur iPhone réel reste nécessaire.

## 2. Fortement recommandé au lancement

- [ ] **Prix ou fourchettes publics** — renseigner `price` dans
      `src/lib/offers.ts` (le site bascule automatiquement de « Sur devis »
      au prix affiché). Mettre à jour le test `content-integrity` en même temps.
- [ ] **Photos réelles** (voir manifest complet dans le blueprint §15) :
      atelier/équipe, boutiques, portraits fondateurs. Le site est conçu pour
      les recevoir sans casser la mise en page.
- [ ] **Search Console** — vérifier la propriété, soumettre `sitemap.xml`.
- [ ] **Mesure d'audience** — décider si GA4 est activé (`NEXT_PUBLIC_GA_ID`) ;
      sans lui, le site fonctionne et le bandeau cookies reste pertinent
      (cookies nécessaires uniquement).

## 3. Dès que disponible

- [ ] **Témoignages clients réels** avec autorisation écrite
      (`testimonial` dans `src/lib/case-studies.ts`).
- [ ] **Études de cas clients** — l'architecture est prête ; ajouter une
      entrée dans `case-studies.ts` par projet livré (captures desktop +
      mobile réelles, métriques vérifiées uniquement).
- [ ] **Lien de prise de RDV** (Calendly ou équivalent) — renseigner
      `bookingUrl` dans `src/lib/site.ts`.
- [ ] **Téléphone public** — `phone` dans `src/lib/site.ts` (l'événement
      analytics `phone_click` existe déjà).
- [ ] **Réseaux sociaux** — `social.instagram` / `social.linkedin` dans
      `site.ts` (à ajouter ensuite au footer et au JSON-LD `sameAs`).
- [ ] **Fiche Google Business Profile de Bloomy Studio** — cohérente avec le
      site (catégorie « Concepteur de sites Web », zone desservie, lien).

## 4. Backlog éditorial (blog)

Articles suivants, par ordre de valeur estimée :
1. Combien coûte réellement un site de fleuriste (fourchettes du marché).
2. Préparer la Saint-Valentin / fête des mères : checklist digitale à J-21.
3. Quelles photos de bouquets convertissent (avec exemples réels).
4. Click-and-collect : organiser ses créneaux sans désorganiser l'atelier.

Cadence recommandée : 1 article sérieux/mois, avec mise à jour des dates
`dateModified` lors de toute révision substantielle (le sitemap les reflète).
