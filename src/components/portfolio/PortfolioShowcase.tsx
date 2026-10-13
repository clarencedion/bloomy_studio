"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";

import { ProjectCard, type CardShape } from "@/components/portfolio/ProjectCard";
import { buttonClass } from "@/components/ui/Button";
import {
  portfolioCategories,
  showcaseSites,
  type PortfolioCategory,
  type ShowcaseSite,
  type ShowcaseSlug,
} from "@/lib/portfolio";

/**
 * Index filtrable des réalisations.
 *
 * Disposition :
 *   - < 768 px  : une colonne ; les filtres forment une rangée qui défile à
 *     l'horizontale et reste collée sous l'en-tête pendant la lecture.
 *   - 768–1279  : filtres en pilules sur plusieurs lignes, grille rythmée.
 *   - ≥ 1280 px : filtres en colonne collante à gauche, comme le sommaire
 *     d'une archive ; la grille occupe le reste.
 *
 * Rythme de la grille, par cycle de cinq : une carte pleine largeur, puis
 * une paire 7/5, puis une paire 5/7. Une carte qui resterait seule sur sa
 * rangée passe en pleine largeur : jamais de trou en fin de grille.
 *
 * Accessibilité : motif d'onglets ARIA (flèches, Début, Fin, tabulation
 * itinérante). Le nombre de projets affichés est annoncé par une région
 * `aria-live` dédiée, pas par la grille entière.
 *
 * Par lots de douze : avec plus de cinquante projets, la grille entière
 * faisait 22 000 px et chargeait toutes les captures d'un coup. Le bouton
 * « Afficher… » ajoute le lot suivant ; changer de filtre repart du premier.
 */

/** Nombre de projets par lot. */
const PAGE = 12;

/** Forme de la carte selon sa position dans la liste filtrée. */
function cardShape(index: number, total: number): CardShape {
  const p = index % 5;
  const last = index === total - 1;
  // Une carte qui ouvrirait une paire sans partenaire prend toute la largeur.
  if (p === 0 || (last && (p === 1 || p === 3))) return "feature";
  return p === 1 || p === 4 ? "wide" : "narrow";
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n > 1 ? many : one}`;
}

export function PortfolioShowcase({ order }: { order?: readonly ShowcaseSlug[] }) {
  const [active, setActive] = useState<PortfolioCategory>("all");
  const [touched, setTouched] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Ordre éditorial de « Tous les projets » : les slugs absents de `order`
  // gardent leur ordre d'origine, à la suite. Un projet ajouté dans
  // lib/portfolio.ts apparaît donc toujours, même sans retouche ici.
  const ordered = useMemo<readonly ShowcaseSite[]>(() => {
    if (!order) return showcaseSites;
    const rank = new Map<string, number>(order.map((slug, i) => [slug, i]));
    return [...showcaseSites].sort(
      (a, b) => (rank.get(a.slug) ?? order.length) - (rank.get(b.slug) ?? order.length),
    );
  }, [order]);

  const counts = useMemo(() => {
    const map = new Map<PortfolioCategory, number>();
    for (const cat of portfolioCategories) {
      map.set(
        cat.id,
        cat.id === "all"
          ? showcaseSites.length
          : showcaseSites.filter((s) =>
              (s.categories as readonly PortfolioCategory[]).includes(cat.id),
            ).length,
      );
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      active === "all"
        ? ordered
        : ordered.filter((s) => (s.categories as readonly PortfolioCategory[]).includes(active)),
    [active, ordered],
  );

  const shown = useMemo(() => visible.slice(0, limit), [visible, limit]);
  const remaining = visible.length - shown.length;

  // Forme de chaque carte ; une carte pleine largeur sur deux met sa légende
  // à gauche, pour que les grandes cartes ne s'empilent pas du même côté.
  // Calculée sur le lot affiché : la dernière carte visible ne reste jamais
  // seule sur sa rangée.
  const cards = useMemo(() => {
    let features = 0;
    return shown.map((site, i) => {
      const shape = cardShape(i, shown.length);
      const flip = shape === "feature" && features++ % 2 === 1;
      return { site, shape, flip };
    });
  }, [shown]);

  function select(id: PortfolioCategory) {
    if (id === active) return;
    setActive(id);
    setTouched(true);
    setLimit(PAGE);

    // Si le visiteur a déjà descendu dans la grille, on le ramène en haut de
    // l'index : sinon une grille qui passe de 23 à 2 cartes le laisse au
    // milieu du pied de page. `scrollTo` suit le `scroll-behavior` du CSS,
    // donc reste instantané avec `prefers-reduced-motion`.
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 88 });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = portfolioCategories.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(portfolioCategories[next].id);
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <div
      ref={wrapRef}
      className="xl:grid xl:grid-cols-[14.5rem_minmax(0,1fr)] xl:items-start xl:gap-14 2xl:gap-16"
    >
      {/* Filtres. Mobile : rangée collante qui défile ; tablette : pilules sur
          plusieurs lignes ; desktop large : colonne collante. */}
      <div className="sticky top-[4.5rem] z-30 -mx-5 border-b border-line bg-paper/95 py-3 backdrop-blur-md sm:-mx-8 md:static md:mx-0 md:border-0 md:bg-transparent md:py-0 md:backdrop-blur-none xl:sticky xl:top-28">
        <p className="plate-label mb-4 hidden pl-4 xl:block">Filtrer par métier</p>
        <div
          role="tablist"
          aria-label="Filtrer les réalisations par métier"
          className="flex snap-x gap-2 overflow-x-auto px-5 pr-12 [mask-image:linear-gradient(to_right,#000_calc(100%-3rem),transparent)] [scrollbar-width:none] sm:px-8 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] xl:flex-col xl:gap-1 [&::-webkit-scrollbar]:hidden"
        >
          {portfolioCategories.map((cat, i) => {
            const selected = active === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={selected}
                aria-controls="portfolio-grid"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`press inline-flex min-h-11 shrink-0 snap-start items-center justify-between gap-3 whitespace-nowrap rounded-full border px-4 text-[0.9rem] font-medium xl:w-full ${
                  selected
                    ? "border-forest bg-forest text-paper"
                    : "border-line-strong bg-white text-forest-soft hover:border-forest/40 hover:text-forest xl:border-transparent xl:bg-transparent xl:hover:border-line xl:hover:bg-white"
                }`}
              >
                {cat.label}
                <span
                  aria-hidden="true"
                  className={`text-[0.78rem] tabular-nums ${selected ? "text-leaf" : "text-forest-faint"}`}
                >
                  {counts.get(cat.id) ?? 0}
                </span>
              </button>
            );
          })}
        </div>
        <p className="caption mt-6 hidden pl-4 xl:block">
          {plural(shown.length, "projet affiché", "projets affichés")} sur {visible.length}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {plural(shown.length, "projet affiché", "projets affichés")} sur {visible.length}
      </p>

      <div
        key={active}
        id="portfolio-grid"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className={`mt-10 grid grid-cols-1 gap-y-14 md:mt-12 md:grid-cols-12 md:gap-x-8 md:gap-y-20 lg:gap-x-10 xl:mt-0 ${
          touched ? "animate-[fade-in_420ms_cubic-bezier(0.22,1,0.36,1)_both]" : ""
        }`}
      >
        {cards.map(({ site, shape, flip }) => (
          <ProjectCard key={site.slug} site={site} shape={shape} flip={flip} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-line pt-10 xl:col-start-2">
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE)}
            className={buttonClass("secondary", "min-h-12 px-7")}
          >
            {`Afficher ${plural(Math.min(PAGE, remaining), "projet de plus", "projets de plus")}`}
          </button>
          <p className="caption">
            {shown.length} sur {visible.length}
          </p>
        </div>
      ) : null}
    </div>
  );
}
