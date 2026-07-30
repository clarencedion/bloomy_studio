/**
 * Carte des événements analytics. Un seul point d'entrée : track().
 * Aucune donnée n'est envoyée sans consentement « analytics » explicite
 * ni sans NEXT_PUBLIC_GA_ID configuré (voir components/consent).
 */

export type AnalyticsEvent =
  | "cta_audit_click"
  | "audit_start"
  | "audit_step"
  | "audit_submit"
  | "contact_submit"
  | "case_study_view"
  /** Projet mis au premier plan dans la vitrine de l'accueil. */
  | "showcase_project_view"
  /** Onglet consulté dans l'aperçu de l'administration. */
  | "admin_demo_tab"
  | "pricing_view"
  | "email_click"
  | "phone_click"
  | "calendly_click";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = "bloomy-studio-consent-v1";

export type ConsentState = {
  analytics: boolean;
  decidedAt: string;
};

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Le choix expire après 6 mois (recommandation CNIL).
    const age = Date.now() - new Date(parsed.decidedAt).getTime();
    if (Number.isNaN(age) || age > 1000 * 60 * 60 * 24 * 182) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (!consent?.analytics) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
