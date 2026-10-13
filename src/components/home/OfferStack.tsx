import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { homeOffers } from "@/lib/home";
import { getShowcaseSite, siteHost } from "@/lib/portfolio";
import { products, type Product, type ProductVisual } from "@/lib/products";

/**
 * « Ce que nous construisons » : trois offres en cartes qui s'empilent au
 * défilement. Du CSS seul (`position: sticky`) : aucun JavaScript, aucun
 * détournement du défilement. Chaque carte colle un cran plus bas que la
 * précédente, si bien que leurs bords forment une pile lisible.
 *
 * Chaque carte porte un visuel réel, jamais une interface en `div` : un site
 * livré, la pile technique de nos produits, un fait publié sur bloomy.one.
 *
 * Mobile : cartes empilées simplement, sans effet collant.
 */

const surfaces: Record<Product["surface"], string> = {
  white: "bg-white border border-line",
  blush: "bg-blush",
  mint: "bg-mint",
};

/** Décalage collant de chaque carte : 1,5 rem de plus que la précédente. */
const stickyTop = ["lg:top-24", "lg:top-[7.5rem]", "lg:top-[9rem]"];

function SiteVisual({ slug }: { slug: Extract<ProductVisual, { kind: "site" }>["slug"] }) {
  const site = getShowcaseSite(slug);
  if (!site) return null;
  return (
    <div className="relative pb-10 pr-10 sm:pb-12 sm:pr-16">
      <BrowserFrame label={siteHost(site)}>
        <Image
          src={site.image}
          alt={site.alt}
          width={site.width}
          height={site.height}
          sizes="(min-width: 1024px) 40rem, 90vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
      {site.mobile ? (
        <div className="absolute bottom-0 right-0 w-[28%] max-w-[10rem]">
          <PhoneFrame>
            <Image
              src={site.mobile.image}
              alt={site.mobile.alt}
              width={site.mobile.width}
              height={site.mobile.height}
              sizes="10rem"
              className="h-auto w-full"
            />
          </PhoneFrame>
        </div>
      ) : null}
    </div>
  );
}

function StackVisual({ visual }: { visual: Extract<ProductVisual, { kind: "stack" }> }) {
  return (
    <div className="leaf bg-white px-6 py-7 sm:px-10 sm:py-9">
      <dl className="divide-y divide-line">
        {visual.items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-1.5 py-5 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <dt className="text-display-xl">{item.name}</dt>
            <dd className="text-[0.95rem] leading-snug text-forest-soft sm:max-w-[15rem] sm:text-right">
              {item.role}
            </dd>
          </div>
        ))}
      </dl>
      <p className="caption mt-2">{visual.caption}</p>
    </div>
  );
}

function FigureVisual({ visual }: { visual: Extract<ProductVisual, { kind: "figure" }> }) {
  return (
    <div className="leaf flex flex-col justify-between gap-8 bg-white px-6 py-8 sm:min-h-[22rem] sm:px-10 sm:py-10">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(6.5rem,4rem+10vw,12.5rem)] font-bold leading-[0.8] tracking-[-0.04em] text-bloom [font-variation-settings:'wdth'_84]"
      >
        {visual.value}
      </p>
      <div>
        <p className="text-display-sm max-w-md">
          <span className="sr-only">{visual.value} </span>
          {visual.label}
        </p>
        <a
          href={visual.sourceHref}
          target="_blank"
          rel="noopener"
          className="group link-live mt-4 inline-flex min-h-11 items-center gap-1 text-[0.92rem] font-semibold text-bloom-ink"
        >
          {visual.source}
          <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-3.5" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </div>
    </div>
  );
}

function Visual({ visual }: { visual: ProductVisual }) {
  if (visual.kind === "site") return <SiteVisual slug={visual.slug} />;
  if (visual.kind === "stack") return <StackVisual visual={visual} />;
  return <FigureVisual visual={visual} />;
}

export function OfferStack() {
  return (
    <section aria-labelledby="offres-titre" className="pb-24 pt-8 sm:pb-32 sm:pt-12">
      <Container width="wide">
        <SectionHead size="xl" title={<span id="offres-titre">{homeOffers.title}</span>} />

        <ol className="mt-12 space-y-6 sm:mt-14 lg:space-y-10">
          {products.map((product, i) => (
            <li
              key={product.id}
              className={`leaf-lg lg:sticky ${stickyTop[i] ?? "lg:top-24"} ${surfaces[product.surface]} shadow-lift`}
            >
              <article className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-14">
                <div className="lg:col-span-5">
                  <h3 className="text-display-lg">{product.name}</h3>
                  <p className="text-display-sm mt-5 max-w-md">{product.promise}</p>
                  <p className="mt-4 max-w-md leading-relaxed text-forest-soft">{product.body}</p>
                  <p className="mt-6 max-w-md border-l-2 border-bloom pl-3 text-[0.92rem] font-medium text-forest">
                    {product.detail}
                  </p>
                  <Link href={product.href} className={buttonClass("secondary", "mt-8")}>
                    {product.linkLabel}
                    <ButtonArrow />
                  </Link>
                </div>
                <div className="lg:col-span-7">
                  <Visual visual={product.visual} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
