import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/Container";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { SectionHead } from "@/components/ui/SectionHead";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { ScrollingCapture } from "@/components/visuals/ScrollingCapture";
import { homeWork } from "@/lib/home";
import {
  featuredSlugs,
  getShowcaseSite,
  showcaseSites,
  type ShowcaseSite,
  type ShowcaseSlug,
} from "@/lib/portfolio";

/**
 * « Le travail, d'abord » : les projets mis en avant, en grille à échelles
 * variables. Trois rangées, trois proportions (8/4, 5/7, 4/8) : jamais deux
 * cartes de même taille côte à côte.
 *
 * Deux façons de montrer un site, choisies selon ce qu'il a de plus fort :
 * - `scroll` : la page d'accueil entière défile dans sa fenêtre au survol
 *   (ou au focus du lien) : la démonstration la plus forte du site ;
 * - `phone`  : la version mobile, posée sur la teinte du projet et ancrée au
 *   bord bas du panneau, pour les sites dont le mobile est le plus parlant.
 *
 * Desktop : chaque carte occupe deux rangées d'une sous-grille (panneau,
 * légende), si bien que les panneaux d'une même rangée ont exactement la
 * même hauteur et que les légendes s'alignent. Mobile : une colonne.
 */

type Tile = {
  slug: ShowcaseSlug;
  mode: "scroll" | "phone";
  span: string;
  sizes?: string;
};

/** Ordre de lecture : Osmose Florale ouvre, les univers les plus contrastés suivent. */
const tiles: Tile[] = [
  { slug: "osmose-florale", mode: "scroll", span: "lg:col-span-8", sizes: "(min-width: 1024px) 52rem, 100vw" },
  { slug: "gb-performance", mode: "phone", span: "lg:col-span-4" },
  { slug: "nails-by-cindy", mode: "scroll", span: "lg:col-span-5", sizes: "(min-width: 1024px) 32rem, 100vw" },
  { slug: "domaine-des-aurores", mode: "scroll", span: "lg:col-span-7", sizes: "(min-width: 1024px) 46rem, 100vw" },
  { slug: "fleurs-ditalie", mode: "phone", span: "lg:col-span-4" },
  { slug: "net-plus-services", mode: "scroll", span: "lg:col-span-8", sizes: "(min-width: 1024px) 52rem, 100vw" },
];

function PhonePanel({ site }: { site: ShowcaseSite }) {
  const m = site.mobile!;
  return (
    <div
      className="leaf relative h-[30rem] overflow-hidden sm:h-[34rem] lg:h-auto lg:min-h-[24rem]"
      style={{ backgroundColor: site.tone }}
    >
      <div className="absolute left-1/2 top-10 w-[min(15rem,64%)] -translate-x-1/2 transition-transform duration-500 ease-soft group-hover:-translate-y-2 sm:top-12">
        <PhoneFrame>
          <Image
            src={m.image}
            alt={m.alt}
            width={m.width}
            height={m.height}
            sizes="(min-width: 1024px) 15rem, 64vw"
            className="h-auto w-full"
          />
        </PhoneFrame>
      </div>
    </div>
  );
}

function ScrollPanel({ site, sizes }: { site: ShowcaseSite; sizes: string }) {
  return (
    <div
      className="leaf flex items-center p-4 sm:p-8 lg:p-10"
      style={{ backgroundColor: site.tone }}
    >
      <ScrollingCapture site={site} sizes={sizes} className="w-full" />
    </div>
  );
}

function WorkTile({ tile, site }: { tile: Tile; site: ShowcaseSite }) {
  return (
    <figure className={`group lg:row-span-2 lg:grid lg:grid-rows-subgrid ${tile.span}`}>
      {tile.mode === "phone" && site.mobile ? (
        <PhonePanel site={site} />
      ) : (
        <ScrollPanel site={site} sizes={tile.sizes ?? "100vw"} />
      )}
      <figcaption className="mt-5 px-1 lg:pb-20">
        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-display-sm">{site.name}</span>
          <span className="plate-label">{site.city}</span>
        </p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">{site.focus}</p>
        <LiveSiteLink site={site} className="mt-3" />
      </figcaption>
    </figure>
  );
}

export function FeaturedWork() {
  // Garde-fou : la vitrine d'accueil ne montre que des projets « mis en avant ».
  const resolved = tiles
    .filter((t) => (featuredSlugs as readonly string[]).includes(t.slug))
    .map((tile) => ({ tile, site: getShowcaseSite(tile.slug) }))
    .filter((t): t is { tile: Tile; site: ShowcaseSite } => Boolean(t.site));

  return (
    <section id="realisations" aria-labelledby="travail-titre" className="py-24 sm:py-32">
      <Container width="wide">
        <SectionHead
          size="xl"
          title={<span id="travail-titre">{homeWork.title}</span>}
          lede={homeWork.lede}
        />

        <div className="mt-14 grid gap-y-16 sm:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {resolved.map(({ tile, site }) => (
            <WorkTile key={site.slug} tile={tile} site={site} />
          ))}
        </div>

        <Link
          href="/realisations"
          className="group mt-4 inline-flex min-h-12 items-center gap-2.5 rounded-full border border-forest/20 bg-white px-6 text-[0.95rem] font-semibold text-forest transition-colors hover:border-forest lg:mt-0"
        >
          Voir les {showcaseSites.length} réalisations
          <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
        </Link>
      </Container>
    </section>
  );
}
