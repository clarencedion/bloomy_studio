import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { isDevUrl, siteHost, type ShowcaseSite } from "@/lib/portfolio";

/**
 * Preuve vérifiable en un clic : le lien vers le projet.
 *
 * L'étiquette dit ce que la capture ne prouve pas toute seule :
 * « Site en ligne » pour un site livré, « Projet récent » pour un site conçu
 * pour une entreprise réelle dont la mise en production n'est pas confirmée,
 * « Projet concept » pour une démonstration ou une proposition non commandée.
 *
 * Le domaine n'est écrit en clair que s'il appartient à l'entreprise ; une
 * adresse de développement (vercel.app, web.app…) reste derrière « Voir le
 * site ». Un site hors ligne n'a pas de lien du tout.
 */
export function LiveSiteLink({
  site,
  className = "",
}: {
  site: ShowcaseSite;
  className?: string;
}) {
  if (site.offline) {
    // Jamais de lien vers une adresse morte : la capture reste, le lien non.
    return (
      <p className={className}>
        <span className="plate-label">Site actuellement hors ligne</span>
      </p>
    );
  }
  const label =
    site.kind === "concept" ? "Projet concept" : site.kind === "recent" ? "Projet récent" : "Site en ligne";
  const text = isDevUrl(site.liveUrl)
    ? site.kind === "concept"
      ? "Voir le concept"
      : "Voir le site"
    : siteHost(site);
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      <span className="plate-label">{label}</span>
      <a
        href={site.liveUrl}
        target="_blank"
        rel="noopener"
        className="group link-live inline-flex items-center gap-1 text-[0.92rem] font-semibold text-bloom-ink"
      >
        {text}
        <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-3.5" />
        <span className="sr-only">{` (${site.name}, nouvel onglet)`}</span>
      </a>
    </p>
  );
}
