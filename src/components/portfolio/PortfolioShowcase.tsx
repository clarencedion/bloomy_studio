"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import {
  portfolioCategories,
  showcaseSites,
  type PortfolioCategory,
  type ShowcaseSite,
} from "@/lib/portfolio";

/**
 * Grille de réalisations avec filtrage par catégorie.
 *
 * Sur grand écran : 2 colonnes avec de grands aperçus de sites réels.
 * Filtrage instantané : Tous, E-commerce & Retail, Floristry, Hospitality,
 * Consulting, Events & Creative, Horticulture.
 */
export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("floristry");

  const filteredSites = useMemo(() => {
    if (activeCategory === "all") return showcaseSites;
    return showcaseSites.filter((site) =>
      (site.categories as readonly PortfolioCategory[]).includes(activeCategory),
    );
  }, [activeCategory]);

  // Calcul du nombre d'éléments par catégorie pour les badges
  const counts = useMemo(() => {
    const map: Record<PortfolioCategory, number> = {
      all: showcaseSites.length,
      "ecommerce-retail": 0,
      floristry: 0,
      hospitality: 0,
      consulting: 0,
      "events-creative": 0,
      horticulture: 0,
    };
    for (const site of showcaseSites) {
      for (const cat of site.categories) {
        if (cat in map) {
          map[cat as PortfolioCategory] = (map[cat as PortfolioCategory] || 0) + 1;
        }
      }
    }
    return map;
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Barre de filtres par secteur & catégorie */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-hairline pb-6">
        <div
          role="tablist"
          aria-label="Filtrer les réalisations par secteur"
          className="flex flex-wrap items-center gap-2"
        >
          {portfolioCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = counts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isSelected}
                aria-controls="portfolio-grid"
                onClick={() => setActiveCategory(cat.id)}
                className={`press group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.84rem] font-medium transition-all ${
                  isSelected
                    ? "bg-ink text-cream shadow-sm"
                    : "border border-hairline bg-paper text-ink-soft hover:border-ink/30 hover:bg-cream hover:text-ink"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[0.7rem] font-semibold tabular-nums ${
                    isSelected
                      ? "bg-white/20 text-cream"
                      : "bg-cream-deep text-ink-faint group-hover:text-ink"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-right text-[0.82rem] text-ink-faint tabular-nums">
          {filteredSites.length}{" "}
          {filteredSites.length > 1 ? "sites présentés" : "site présenté"}
        </p>
      </div>

      {/* Grille responsive avec grandes prévisualisations */}
      <div
        id="portfolio-grid"
        role="region"
        aria-live="polite"
        className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-14"
      >
        {filteredSites.map((site: ShowcaseSite, index: number) => {
          const isLcp = index < 2;

          return (
            <article
              key={site.slug}
              className="group flex flex-col justify-between rounded-sm border border-hairline bg-paper p-5 sm:p-6 transition-all hover:border-ink/25 hover:shadow-lift"
            >
              <div>
                {/* Cadre de navigateur avec capture haute résolution */}
                <div className="overflow-hidden rounded-md transition-transform duration-300 group-hover:-translate-y-0.5">
                  <BrowserFrame label={`${site.name} — ${site.liveUrl.replace(/^https?:\/\//, "")}`}>
                    <Image
                      src={site.image}
                      alt={site.alt}
                      width={site.width}
                      height={site.height}
                      loading={isLcp ? "eager" : "lazy"}
                      fetchPriority={isLcp ? "high" : undefined}
                      sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 46vw, 100vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </BrowserFrame>
                </div>

                {/* Métadonnées & Description */}
                <div className="mt-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="plate-label text-[0.7rem] uppercase tracking-wider text-rose">
                      {site.sectorLabel}
                    </span>
                    <span className="text-[0.8rem] text-ink-faint">{site.city}</span>
                  </div>

                  <h3 className="text-display-md mt-2.5 transition-colors group-hover:text-rose">
                    {site.name}
                  </h3>

                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                    {site.note}
                  </p>
                </div>
              </div>

              {/* Pied de carte : Focus + Lien vérifiable */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-4">
                <span className="caption inline-flex items-center gap-1.5 text-[0.8rem]">
                  <span className="size-1.5 rounded-full bg-rose/70" aria-hidden="true" />
                  {site.focus}
                </span>

                <LiveSiteLink site={site} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
