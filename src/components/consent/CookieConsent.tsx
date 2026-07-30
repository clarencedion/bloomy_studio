"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { CONSENT_STORAGE_KEY, type ConsentState } from "@/lib/analytics";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/consent/ManageCookiesButton";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_CHANGED_EVENT = "bloomy:consent-changed";

/** Le stockage local est la source de vérité, lue via useSyncExternalStore. */
function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  };
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    // Le choix expire après 6 mois (recommandation CNIL).
    const age = Date.now() - new Date(parsed.decidedAt).getTime();
    if (Number.isNaN(age) || age > 1000 * 60 * 60 * 24 * 182) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Bandeau de consentement conforme CNIL :
 * — « Accepter » et « Refuser » présentés à égalité ;
 * — aucun script de mesure chargé avant consentement explicite ;
 * — choix conservé 6 mois et modifiable via « Gérer les cookies » ;
 * — le site reste pleinement fonctionnel en cas de refus.
 */
export function CookieConsent() {
  // useSyncExternalStore gère l'hydratation : rendu serveur sans consentement
  // (bandeau visible), puis relecture du stockage local côté client.
  const rawConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent = useMemo(() => parseConsent(rawConsent), [rawConsent]);
  const [reopened, setReopened] = useState(false);
  const [detail, setDetail] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);

  // Réouverture depuis le footer (« Gérer les cookies »).
  useEffect(() => {
    const onOpen = () => {
      setAnalyticsChecked(parseConsent(getSnapshot())?.analytics ?? false);
      setDetail(true);
      setReopened(true);
      setSessionDismissed(false);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  const decide = useCallback((analytics: boolean) => {
    const state: ConsentState = {
      analytics,
      decidedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour la session.
      setSessionDismissed(true);
    }
    setReopened(false);
    setDetail(false);
  }, []);

  const visible = !sessionDismissed && (reopened || consent === null);
  const loadAnalytics = Boolean(GA_ID) && consent?.analytics === true;

  return (
    <>
      {loadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-titre"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper p-5 shadow-float sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md sm:rounded-sm sm:border"
        >
          <h2 id="cookie-titre" className="text-display-sm">
            Cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Nous utilisons uniquement des cookies strictement nécessaires et,
            avec votre accord, une mesure d&apos;audience anonymisée. Refuser ne
            change rien à votre navigation.{" "}
            <Link href="/cookies" className="text-rose underline underline-offset-4">
              En savoir plus
            </Link>
          </p>

          {detail && (
            <fieldset className="mt-4 space-y-3 border-t border-hairline pt-4">
              <legend className="sr-only">Choisir les cookies autorisés</legend>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 size-4 accent-rose"
                />
                <span>
                  <span className="font-semibold">Nécessaires</span> — toujours
                  actifs (sécurité, consentement).
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  className="mt-0.5 size-4 accent-rose"
                />
                <span>
                  <span className="font-semibold">Mesure d&apos;audience</span>{" "}
                  — statistiques anonymisées de fréquentation.
                </span>
              </label>
            </fieldset>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => decide(false)}
              className="min-h-11 rounded-full border border-ink/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-rose hover:text-rose"
            >
              Tout refuser
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="min-h-11 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose"
            >
              Tout accepter
            </button>
          </div>
          {detail ? (
            <button
              type="button"
              onClick={() => decide(analyticsChecked)}
              className="mt-2 min-h-11 w-full rounded-full border border-ink/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-rose hover:text-rose"
            >
              Enregistrer mes choix
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetail(true)}
              className="mt-3 text-sm text-rose underline underline-offset-4"
            >
              Personnaliser
            </button>
          )}
        </div>
      )}
    </>
  );
}
