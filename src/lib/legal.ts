/**
 * Informations légales centralisées.
 * Tout champ `PLACEHOLDER` doit être complété puis validé juridiquement
 * avant la mise en production publique (voir docs/content-checklist.md).
 * Tant qu'un placeholder subsiste, les pages légales affichent un bandeau
 * « document de travail ».
 */

export const PLACEHOLDER = "[À COMPLÉTER]";

export const legalEntity = {
  name: PLACEHOLDER, // dénomination sociale exacte (ex. Bloomy SAS)
  form: PLACEHOLDER, // forme juridique
  capital: PLACEHOLDER, // capital social
  siren: PLACEHOLDER,
  rcs: PLACEHOLDER, // ville d'immatriculation
  vat: PLACEHOLDER, // n° TVA intracommunautaire
  address: PLACEHOLDER, // siège social
  publicationDirector: PLACEHOLDER, // directeur·rice de la publication
  email: "contact@bloomy.one",
  phone: PLACEHOLDER,
} as const;

export const hosting = {
  name: "Google Cloud / Firebase App Hosting",
  company: "Google Ireland Limited",
  address: "Gordon House, Barrow Street, Dublin 4, Irlande",
  website: "https://firebase.google.com",
} as const;

export const dataProtection = {
  /** Contact pour l'exercice des droits RGPD. */
  contactEmail: "contact@bloomy.one",
  /** Durées de conservation à confirmer avec le conseil juridique. */
  leadRetention: `36 mois après le dernier contact ${PLACEHOLDER}`,
  processors: [
    {
      name: "Google Cloud / Firebase (hébergement, base de données)",
      location: "Union européenne",
      dpa: "https://cloud.google.com/terms/data-processing-addendum",
    },
    {
      name: `Prestataire d'envoi d'e-mails ${PLACEHOLDER}`,
      location: PLACEHOLDER,
      dpa: PLACEHOLDER,
    },
  ],
} as const;

/** Vrai si au moins un champ légal obligatoire reste à compléter. */
export function hasLegalPlaceholders(): boolean {
  return [
    legalEntity.name,
    legalEntity.form,
    legalEntity.siren,
    legalEntity.address,
    legalEntity.publicationDirector,
  ].some((v) => v === PLACEHOLDER);
}
