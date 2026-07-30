"use client";

export const OPEN_COOKIE_SETTINGS_EVENT = "bloomy:open-cookie-settings";

/** Rouvre le panneau de consentement (exigence CNIL : choix modifiable à tout moment). */
export function ManageCookiesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))
      }
    >
      Gérer les cookies
    </button>
  );
}
