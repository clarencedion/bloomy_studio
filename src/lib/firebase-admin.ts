import "server-only";

/**
 * Initialisation paresseuse du SDK Admin Firebase — serveur uniquement.
 * Identifiants acceptés (dans l'ordre) :
 * 1. FIREBASE_SERVICE_ACCOUNT_JSON (contenu JSON du compte de service)
 * 2. Application Default Credentials (App Hosting / gcloud local)
 * Sans identifiants, retourne null : le site fonctionne, les leads sont
 * simplement journalisés côté serveur (voir lib/leads.ts).
 */

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cachedDb: Firestore | null | undefined;

function initApp(): App | null {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  try {
    if (serviceAccountJson) {
      return initializeApp({ credential: cert(JSON.parse(serviceAccountJson)) });
    }
    if (
      process.env.GOOGLE_APPLICATION_CREDENTIALS ??
      process.env.FIREBASE_CONFIG ??
      process.env.K_SERVICE
    ) {
      // App Hosting / Cloud Run : Application Default Credentials.
      return initializeApp();
    }
    return null;
  } catch (error) {
    console.error("[firebase-admin] Initialisation impossible :", error);
    return null;
  }
}

export function getDb(): Firestore | null {
  if (cachedDb !== undefined) return cachedDb;
  const app = initApp();
  cachedDb = app ? getFirestore(app) : null;
  return cachedDb;
}
