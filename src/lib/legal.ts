/**
 * Informations légales centralisées.
 *
 * Source : les textes légaux en vigueur de l'application Bloomy (version 2.0
 * du 28/10/2026, `bloomy_app/lib/screens/legal/`, vérifiés par
 * `test/legal/legal_facts_test.dart` contre les registres) et les mentions
 * légales de bloomy.one (`bloomy_static/app/legal/`). Une seule société,
 * BLOOMY SAS, édite la plateforme et le studio.
 *
 * `PLACEHOLDER` reste exporté pour le contrôle : tant qu'un champ
 * obligatoire le contient, les pages légales passent en `noindex` et
 * affichent un bandeau « document de travail ».
 */

export const PLACEHOLDER = "[À COMPLÉTER]";

export const legalEntity = {
  name: "BLOOMY",
  form: "société par actions simplifiée (SAS)",
  capital: "1 000 €",
  siren: "101 421 212",
  siret: "101 421 212 00016",
  rcs: "Nantes",
  vat: "FR62101421212",
  address: "38 rue d’Arbois, 44700 Orvault, France",
  publicationDirector: "Clarence Dion, Président de BLOOMY",
  email: "contact@bloomy.one",
  phone: "06 72 54 11 85",
  /** Juridiction compétente entre professionnels (comme pour bloomy.one). */
  court: "Tribunal de commerce de Nantes",
} as const;

/**
 * Hébergeur : Firebase App Hosting et Cloud Firestore, services Google Cloud
 * fournis en France par Google Cloud France SARL (et non Google Ireland,
 * comme l'indiquait la version précédente de ces mentions).
 */
export const hosting = {
  name: "Firebase App Hosting et Cloud Firestore (Google Cloud)",
  company: "Google Cloud France SARL (RCS Paris 881 721 583)",
  address: "8 rue de Londres, 75009 Paris, France",
  website: "https://cloud.google.com/contact",
  /** Où tournent le site et sa base de données. */
  location:
    "Le site s’exécute aux Pays-Bas (région europe-west4) ; les demandes envoyées par les formulaires sont stockées dans Cloud Firestore, multirégion « eur3 » (Belgique et Pays-Bas).",
} as const;

export const dataProtection = {
  /** Contact pour l'exercice des droits RGPD. */
  contactEmail: "contact@bloomy.one",
  /** Même durée que les prospects de l'application (`prospectDays: 1095`). */
  leadRetention: "3 ans après le dernier contact",
  processors: [
    {
      name: "Google Cloud France SARL, 8 rue de Londres, 75009 Paris (Firebase App Hosting, Cloud Firestore : hébergement du site et des demandes)",
      location: "Union européenne",
      dpa: "https://cloud.google.com/terms/data-processing-addendum",
    },
    {
      name: "Plus Five Five, Inc. (Resend), San Francisco : envoi à l’équipe des e-mails de notification des demandes, depuis contact@bloomy.one",
      location: "États-Unis, encadré par les clauses contractuelles types de la Commission européenne",
      dpa: "https://resend.com/legal/dpa",
    },
  ],
} as const;

/** Vrai si au moins un champ légal obligatoire reste à compléter. */
export function hasLegalPlaceholders(): boolean {
  const required: readonly string[] = [
    legalEntity.name,
    legalEntity.form,
    legalEntity.siren,
    legalEntity.address,
    legalEntity.publicationDirector,
  ];
  return required.some((v) => v === PLACEHOLDER);
}
