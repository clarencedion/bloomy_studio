import Image from "next/image";
import type { CSSProperties } from "react";

import { WallPause } from "@/components/home/WallPause";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { homeHero } from "@/lib/home";
import { getShowcaseSite, type ShowcaseSite, type ShowcaseSlug } from "@/lib/portfolio";

/**
 * « La serre » : le mur de travaux du hero d'accueil.
 *
 * Desktop : un panneau forest, haut comme l'écran, où deux colonnes de
 * captures mobiles réelles défilent lentement en sens inverse. Mobile : la
 * même matière en une bande horizontale, sous le texte.
 *
 * Chaque liste est dupliquée une fois pour boucler sans saut (`-50 %`) ; la
 * copie est `aria-hidden` et ses images ont un `alt` vide. L'espacement
 * vient d'un `padding` sur chaque élément, pas d'un `gap` : sinon la moitié
 * de la liste ne tomberait pas juste et la boucle sauterait d'un demi-écart.
 *
 * Le LCP de la page est le titre, pas ces images : aucune n'a de
 * `fetchPriority`. Seuls les deux premiers téléphones de chaque colonne
 * sont chargés d'emblée.
 */

/** Une même chaîne pour les deux variantes : le navigateur choisit le même fichier. */
const SIZES = "(min-width: 1024px) 13.5rem, 8rem";

function resolve(slugs: readonly ShowcaseSlug[]): ShowcaseSite[] {
  return slugs
    .map((slug) => getShowcaseSite(slug))
    .filter((s): s is ShowcaseSite => Boolean(s?.mobile));
}

function Phone({ site, copy, eager }: { site: ShowcaseSite; copy: boolean; eager: boolean }) {
  const m = site.mobile!;
  return (
    <PhoneFrame>
      <Image
        src={m.image}
        alt={copy ? "" : m.alt}
        width={m.width}
        height={m.height}
        sizes={SIZES}
        loading={eager ? "eager" : "lazy"}
        className="h-auto w-full"
      />
    </PhoneFrame>
  );
}

function track(duration: string): CSSProperties {
  return {
    "--marquee-duration": duration,
    animationPlayState: "var(--wall-state, running)",
  } as CSSProperties;
}

function Column({
  sites,
  duration,
  reverse = false,
  label,
}: {
  sites: ShowcaseSite[];
  duration: string;
  reverse?: boolean;
  label: string;
}) {
  const loop = [...sites, ...sites];
  return (
    <ul
      aria-label={label}
      className={`marquee-y ${reverse ? "marquee-y--reverse" : ""}`}
      style={track(duration)}
    >
      {loop.map((site, i) => {
        const copy = i >= sites.length;
        return (
          <li key={`${site.slug}-${i}`} aria-hidden={copy || undefined} className="pb-5">
            <Phone site={site} copy={copy} eager={i < 2} />
          </li>
        );
      })}
    </ul>
  );
}

export function WorkWall() {
  const left = resolve(homeHero.wall.left);
  const right = resolve(homeHero.wall.right);
  const strip = left.flatMap((site, i) => (right[i] ? [site, right[i]] : [site]));
  const loop = [...strip, ...strip];

  return (
    <WallPause caption={homeHero.wallCaption}>
      {/* Desktop : la serre, haute comme l'écran. */}
      <div className="leaf-lg relative hidden h-[min(78vh,46rem)] overflow-hidden bg-forest lg:block">
        <div className="absolute inset-0 grid grid-cols-2 gap-5 px-8 [mask-image:linear-gradient(to_bottom,transparent,#000_13%,#000_87%,transparent)] xl:px-11">
          <div className="-mt-28">
            <Column sites={left} duration="80s" label="Sites mobiles, première colonne" />
          </div>
          <div>
            <Column sites={right} duration="95s" reverse label="Sites mobiles, seconde colonne" />
          </div>
        </div>
      </div>

      {/* Mobile et tablette : une bande horizontale, sous le texte. */}
      <div className="leaf-lg relative overflow-hidden bg-forest py-7 [contain:inline-size] lg:hidden">
        <div className="[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
          <ul
            aria-label="Sites mobiles conçus par le studio"
            className="marquee-x flex w-max"
            style={track("70s")}
          >
            {loop.map((site, i) => {
              const copy = i >= strip.length;
              return (
                <li
                  key={`${site.slug}-${i}`}
                  aria-hidden={copy || undefined}
                  className="w-[8rem] shrink-0 pr-4 sm:w-[9.5rem]"
                >
                  <Phone site={site} copy={copy} eager={false} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </WallPause>
  );
}
