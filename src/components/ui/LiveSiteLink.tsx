import type { ShowcaseSite } from "@/lib/portfolio";

/**
 * Preuve vérifiable en un clic.
 *
 * Un portfolio de captures, aussi belles soient-elles, se lit comme une série
 * de maquettes tant que le visiteur ne peut pas aller voir. C'est le lien qui
 * fait basculer la perception — pas la légende.
 *
 * L'étiquette « Site en production » n'est pas décorative : elle nomme
 * explicitement ce que la capture ne prouve pas toute seule.
 */
export function LiveSiteLink({
  site,
  className = "",
}: {
  site: ShowcaseSite;
  className?: string;
}) {
  const host = site.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-sage-deep">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-deep" />
        Site en production
      </span>
      <a
        href={site.liveUrl}
        target="_blank"
        rel="noopener"
        className="link-live text-[0.9rem] font-semibold text-rose"
      >
        {host}
        <span aria-hidden="true" className="link-live-arrow"> ↗</span>
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    </p>
  );
}
