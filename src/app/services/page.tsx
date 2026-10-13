import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  Camera,
  ChartLineUp,
  MagnifyingGlass,
  MapPin,
  PlugsConnected,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

import { OfferCard } from "@/components/products/OfferCard";
import { OfferIndex, type OfferIndexGroup } from "@/components/products/OfferIndex";
import { OfferPanel } from "@/components/products/OfferPanel";
import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { CtaLink } from "@/components/ui/CtaLink";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BloomyComparatifShot } from "@/components/visuals/ProductShot";
import { addOns, floristOffers, mvpOffer, type Offer } from "@/lib/offers";
import { pageMetadata } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services et offres : site, e-commerce, SEO local, MVP",
  description:
    "Les offres Bloomy Studio : Essentiel, Boutique et Croissance pour votre site, MVP Sprint pour les fondateurs, et les compléments. Tout est sur devis.",
  path: "/services",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

/**
 * Vue d'ensemble de toutes les offres (`lib/offers.ts`).
 *
 * Récit : un sommaire lisible d'un coup d'œil (à droite du titre), puis les
 * trois formules de site en bento asymétrique (cinq colonnes, sept, puis
 * pleine largeur : jamais trois cartes égales), les compléments en grille
 * de définitions sous un titre collant, et les produits (MVP en panneau
 * forest, micro SaaS en bandeau). Chaque bloc renvoie vers sa page produit
 * et vers les déclinaisons métier.
 *
 * Les prix restent `null` : « Sur devis » partout.
 */

function offer(id: string): Offer {
  const found = floristOffers.find((o) => o.id === id);
  if (!found) throw new Error(`Offre inconnue : ${id}`);
  return found;
}

const essentiel = offer("essentiel");
const boutique = offer("boutique");
const croissance = offer("croissance");

/** Durées courtes du sommaire, reprises de `process` dans `lib/offers.ts`. */
const indexGroups: OfferIndexGroup[] = [
  {
    name: "Sites & e-commerce",
    items: [
      { label: essentiel.name, href: `#${essentiel.id}`, detail: "Environ 4 semaines" },
      { label: boutique.name, href: `#${boutique.id}`, detail: "6 à 8 semaines" },
      { label: croissance.name, href: `#${croissance.id}`, detail: "Mensuel" },
    ],
  },
  {
    name: "Produits",
    items: [
      { label: mvpOffer.name, href: `#${mvpOffer.id}`, detail: "6 à 10 semaines" },
      { label: "Micro SaaS", href: "#micro-saas", detail: "Abonnement" },
    ],
  },
  {
    name: "À la carte",
    items: [{ label: "Compléments", href: "#complements", detail: `${addOns.length} services` }],
  },
];

const addOnIcons: Record<string, ReactNode> = {
  "SEO local": <MagnifyingGlass weight="regular" className="size-5" />,
  Maintenance: <Wrench weight="regular" className="size-5" />,
  "Google Business Profile": <MapPin weight="regular" className="size-5" />,
  "Pages saisonnières": <CalendarBlank weight="regular" className="size-5" />,
  "Direction photo": <Camera weight="regular" className="size-5" />,
  Analytics: <ChartLineUp weight="regular" className="size-5" />,
  Intégrations: <PlugsConnected weight="regular" className="size-5" />,
};

const sectors = [
  { label: "Fleuristes", href: "/fleuristes" },
  { label: "Salons de coiffure", href: "/salons-de-coiffure" },
  { label: "Ramoneurs", href: "/ramonage" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Offres"
        title="Des offres lisibles, des devis qui détaillent tout"
        lede="Pour chaque offre : à qui elle s'adresse, ce qu'elle inclut, ce qu'elle exclut. Les montants sont établis sur devis."
        aside={
          <OfferIndex
            groups={indexGroups}
            note="Toutes sur devis, établi après un premier échange et détaillé ligne par ligne, sans option surprise."
            className="lg:ml-6"
          />
        }
      >
        <CtaLink
          href={primaryCta.href}
          event="cta_contact_click"
          placement="services_hero"
          className={buttonClass("primary")}
        >
          {primaryCta.label}
          <ButtonArrow />
        </CtaLink>
      </PageHero>

      {/* Les trois formules de site : bento 5 / 7 / pleine largeur. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title="Trois formules pour votre site"
            lede="Selon d'où vous partez. Conçues avec des fleuristes, notre spécialité, et déclinées pour chaque métier."
          />
          <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-12">
            <OfferCard offer={essentiel} surface="white" className="lg:col-span-5" />
            <OfferCard offer={boutique} surface="blush" className="lg:col-span-7" />
            <OfferCard
              offer={croissance}
              surface="mint"
              layout="wide"
              className="lg:col-span-12"
              link={{ href: "/fleuristes/seo-local", label: "Le SEO local, expliqué pour les fleuristes" }}
            />
          </div>
          <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap items-center gap-3" aria-label="Les formules, par métier">
              {sectors.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="press group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-white px-5 text-[0.95rem] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-paper"
                  >
                    {s.label}
                    <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/sites-internet" variant="ghost" arrow className="self-start lg:self-auto">
              Sites internet & e-commerce en détail
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Compléments : titre collant à gauche, grille de définitions à droite. */}
      <section id="complements" className="scroll-mt-20 py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-display-lg">À ajouter selon vos besoins</h2>
                <p className="lede mt-5">
                  Chaque complément se greffe sur une formule ou se prend
                  séparément. Là aussi : devis détaillé, périmètre écrit.
                </p>
              </div>
            </div>
            <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {addOns.map((a) => (
                <div key={a.name} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="leaf-sm grid size-11 shrink-0 place-items-center bg-mint text-forest"
                  >
                    {addOnIcons[a.name]}
                  </span>
                  <div>
                    <dt className="text-display-sm">{a.name}</dt>
                    <dd className="mt-2 text-[0.98rem] leading-relaxed text-forest-soft">
                      {a.description}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Les produits : MVP en panneau forest, micro SaaS en bandeau. */}
      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="wide">
          <OfferPanel
            offer={mvpOffer}
            footer={
              <ButtonLink href="/developpement-mvp" variant="onDark" arrow>
                Le développement MVP en détail
              </ButtonLink>
            }
          />

          <div
            id="micro-saas"
            className="leaf-lg mt-5 grid scroll-mt-28 gap-10 overflow-hidden bg-blush px-6 pt-10 sm:px-12 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:pt-0"
          >
            <div className="lg:col-span-5 lg:py-16">
              <h2 className="text-display-lg">Micro SaaS</h2>
              <p className="mt-4 text-[1.05rem] font-medium leading-snug text-forest">
                Pour le commerçant qui veut l&apos;outil sans le projet.
              </p>
              <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-forest-soft">
                Pas de prestation ici : vous vous abonnez à un produit que nous
                exploitons déjà. Un seul est en production aujourd&apos;hui,
                Bloomy, pour les fleuristes.
              </p>
              <ButtonLink href="/micro-saas" variant="secondary" arrow className="mt-8">
                Le micro SaaS en détail
              </ButtonLink>
            </div>
            <div className="lg:col-span-7 lg:self-end lg:pt-16">
              <BloomyComparatifShot className="translate-y-8 sm:translate-y-12" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        placement="services_footer"
        title="Dites‑nous d'où vous partez."
        lede={"Un site, une boutique, un produit : décrivez votre projet, nous revenons avec un devis détaillé ligne par ligne. Réponse sous 48\u00a0h ouvrées."}
      />
    </>
  );
}
