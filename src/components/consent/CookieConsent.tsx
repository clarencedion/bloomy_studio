"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { CONSENT_STORAGE_KEY, type ConsentState } from "@/lib/analytics";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/consent/ManageCookiesButton";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_CHANGED_EVENT = "bloomy:consent-changed";

/** Les deux choix globaux partagent exactement la même classe. */
const choiceClass =
  "press min-h-11 rounded-full border border-forest/25 bg-white px-3 py-2.5 text-[0.92rem] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-paper";

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
 * - « Tout accepter » et « Tout refuser » ont exactement le même style ;
 * - aucun script de mesure chargé avant consentement explicite ;
 * - choix conservé 6 mois et modifiable via « Gérer les cookies » ;
 * - le site reste pleinement fonctionnel en cas de refus.
 *
 * Forme : panneau blanc à coins feuille, boutons en pilule. Mobile : il
 * occupe la largeur de l'écran moins une marge, posé en bas.
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
          className="leaf fixed inset-x-3 bottom-3 z-50 border border-line bg-white p-5 text-forest shadow-float sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[25rem] sm:p-6"
        >
          <h2 id="cookie-titre" className="text-display-sm">
            Cookies
          </h2>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-forest-soft">
            Uniquement le strict nécessaire et, avec votre accord, une mesure
            d&apos;audience anonymisée. Refuser ne change rien à votre
            navigation.{" "}
            <Link
              href="/cookies"
              className="whitespace-nowrap font-medium text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink"
            >
              En savoir plus
            </Link>
          </p>

          {detail && (
            <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
              <legend className="sr-only">Choisir les cookies autorisés</legend>
              <label className="flex items-start gap-3 text-[0.92rem]">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 size-4 shrink-0 accent-bloom-strong"
                />
                <span>
                  <span className="font-semibold">Nécessaires</span>&nbsp;: toujours
                  actifs (sécurité, mémoire de votre choix).
                </span>
              </label>
              <label className="flex items-start gap-3 text-[0.92rem]">
                <input
                  type="checkbox"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-bloom-strong"
                />
                <span>
                  <span className="font-semibold">Mesure d&apos;audience</span>&nbsp;:
                  statistiques de fréquentation anonymisées.
                </span>
              </label>
            </fieldset>
          )}

          {/* Égalité stricte : même forme, même taille, même contraste. */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => decide(false)} className={choiceClass}>
              Tout refuser
            </button>
            <button type="button" onClick={() => decide(true)} className={choiceClass}>
              Tout accepter
            </button>
          </div>
          {detail ? (
            <button
              type="button"
              onClick={() => decide(analyticsChecked)}
              className="press mt-2.5 min-h-11 w-full rounded-full bg-bloom-strong px-4 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-forest"
            >
              Enregistrer mes choix
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetail(true)}
              className="mt-3 min-h-11 text-[0.92rem] font-medium text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink"
            >
              Personnaliser
            </button>
          )}
        </div>
      )}
    </>
  );
}
