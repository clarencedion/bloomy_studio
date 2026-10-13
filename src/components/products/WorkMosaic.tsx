import { SiteCard } from "@/components/visuals/ShowcaseSites";
import { getShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * Galerie à deux largeurs : sept colonnes puis cinq, et l'inverse à la ligne
 * suivante. La grande carte de chaque ligne fait défiler sa capture longue ;
 * la petite descend d'un cran pour casser l'alignement de tableau.
 *
 * Mobile (< 1024 px) : une seule colonne, sans décalage.
 */
export function WorkMosaic({
  slugs,
  className = "",
}: {
  slugs: readonly ShowcaseSlug[];
  className?: string;
}) {
  const sites = slugs
    .map((slug) => getShowcaseSite(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className={`grid gap-x-10 gap-y-14 lg:grid-cols-12 lg:gap-y-20 ${className}`}>
      {sites.map((site, i) => {
        const row = Math.floor(i / 2);
        const first = i % 2 === 0;
        // Ligne paire : grande à gauche. Ligne impaire : grande à droite.
        const wide = row % 2 === 0 ? first : !first;
        return (
          <SiteCard
            key={site.slug}
            site={site}
            scrolling={wide}
            sizes={
              wide
                ? "(min-width: 1024px) 46rem, 100vw"
                : "(min-width: 1024px) 32rem, 100vw"
            }
            className={wide ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24"}
          />
        );
      })}
    </div>
  );
}
