import "server-only";

/**
 * Protections anti-spam des formulaires, sans service tiers :
 * — honeypot (champ caché que seuls les robots remplissent) ;
 * — piège temporel (soumission < 3 s après affichage = robot) ;
 * — limitation de débit en mémoire par IP (meilleur effort ; App Hosting
 *   peut faire tourner plusieurs instances — documenté dans le README).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Nettoyage opportuniste pour borner la mémoire.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export function isBotSubmission(formData: FormData): boolean {
  // Honeypot : le champ « website_url_confirm » est invisible pour un humain.
  const honeypot = formData.get("website_url_confirm");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  // Piège temporel.
  const startedAt = Number(formData.get("form_started_at"));
  if (!Number.isFinite(startedAt)) return true;
  const elapsed = Date.now() - startedAt;
  return elapsed < 3000 || elapsed > 1000 * 60 * 60 * 6;
}
