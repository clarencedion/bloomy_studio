import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * L'adresse publique d'un produit de l'équipe, précédée de son statut réel
 * (« En production »). Même grammaire que `LiveSiteLink` pour les sites
 * livrés, mais pour un produit qui n'est pas une entrée du portfolio.
 */
export function ProductLiveLink({
  href = "https://bloomy.one",
  label = "bloomy.one",
  status = "En production",
  className = "",
}: {
  href?: string;
  label?: string;
  status?: string;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      <span className="plate-label">{status}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="group link-live inline-flex min-h-11 items-center gap-1 text-[0.95rem] font-semibold text-bloom-ink"
      >
        {label}
        <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-4" />
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    </p>
  );
}
