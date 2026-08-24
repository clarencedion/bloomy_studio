import Image from "next/image";
import Link from "next/link";

import {
  RamonageBookingModal,
  RamonageBookingTrigger,
} from "@/components/forms/RamonageBookingModal";
import { RamonageSimulator } from "@/components/ramonage/RamonageSimulator";
import { RamonageSiteShowcase } from "@/components/ramonage/RamonageSiteShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHead } from "@/components/ui/SectionHead";
import { ramonagePage as copy } from "@/lib/ramonage";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Site internet pour ramoneur : réservations & tournées",
  description:
    "Un site pensé pour les ramoneurs : réservation en ligne, tournées par commune et suivi des interventions. Ouvrez le site que nous avons conçu.",
  path: "/ramonage",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Ramoneurs", path: "/ramonage" },
];

/**
 * Page ramoneur — une seule ligne narrative, six bandes.
 *
 * Rythme des fonds : paper (hero) → cream (vitrine) → cream-deep (parcours)
 * → paper (diptyque) → cream (questions) → plum (appel). Chaque bande est
 * séparée par un filet, et tous les visuels passent par la même famille de
 * cadres : capture réelle en `BrowserFrame` / `PhoneFrame`, parcours jouable
 * en `PanelFrame`, photographie et illustrations dans le même cadre `rounded-sm`
 * au même rapport 4/3.
 */
export default function RamonagePage() {
  const faq = copy.faq.items.map((item) => ({
    question: item.question,
    answer: <p>{item.answer}</p>,
  }));

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site pour ramoneur et fumiste",
          description:
            "Conception de sites internet spécialisés pour artisans ramoneurs et entreprises de fumisterie : réservation en ligne, gestion des tournées, certificats et visibilité locale.",
          path: "/ramonage",
          serviceType: "Création de site internet spécialisé",
          audience: "Ramoneurs et entreprises de fumisterie",
        })}
      />

      {/* 1 — Hero et repères, une seule bande : le titre et ses quatre preuves
          de fonctionnement ne se lisent pas séparément. */}
      <section className="overflow-hidden border-b border-hairline bg-paper">
        <Container width="wide" className="py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="max-w-2xl">
              <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
              <h1 className="text-display-xl mt-6">{copy.hero.title}</h1>
              <p className="lede mt-6 max-w-xl">{copy.hero.lede}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <RamonageBookingTrigger variant="primary">
                  {copy.hero.primaryCta}
                </RamonageBookingTrigger>
                <Link
                  href="#reservation"
                  className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-7 py-3 text-[0.95rem] font-semibold text-ink transition-colors duration-150 hover:border-ink/40"
                >
                  {copy.hero.secondaryCta} ↓
                </Link>
              </div>
            </div>

            <figure className="relative min-w-0 lg:pl-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-cream-deep shadow-lift">
                <Image
                  src="/ramonage/ramoneur-intervention.webp"
                  alt={copy.hero.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 54vw"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover object-[56%_center] lg:object-[48%_center]"
                />
              </div>
              <figcaption className="relative -mt-8 ml-5 max-w-xs rounded-sm border border-hairline bg-cream p-4 text-sm leading-relaxed text-ink shadow-lift sm:ml-auto sm:mr-6">
                {copy.hero.imageCaption}
              </figcaption>
            </figure>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {copy.markers.map((marker) => (
              <li key={marker.label} className="border-t border-hairline pt-4">
                <p className="plate-label text-ink">{marker.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {marker.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 2 — Montrer avant de raconter : la capture réelle du site en ligne. */}
      <section className="py-16 sm:py-24">
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow={copy.showcase.eyebrow}
            title={copy.showcase.title}
            lede={copy.showcase.lede}
            className="mb-12"
          />
          <RamonageSiteShowcase />
        </Container>
      </section>

      {/* 3 — Le moteur du site précédent, cette fois jouable. */}
      <section
        id="reservation"
        className="scroll-mt-24 border-y border-hairline bg-cream-deep py-16 sm:py-24"
      >
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow={copy.booking.eyebrow}
            title={copy.booking.title}
            lede={copy.booking.lede}
            className="mb-12"
          />
          <RamonageSimulator />
        </Container>
      </section>

      {/* 4 — Diptyque : deux volets de même gabarit, en miroir. */}
      <section className="border-b border-hairline bg-paper py-16 sm:py-24">
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow={copy.field.eyebrow}
            title={copy.field.title}
            lede={copy.field.lede}
          />

          {copy.field.panels.map((panel, index) => (
            <div
              key={panel.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                index === 0 ? "mt-12" : "mt-12 border-t border-hairline pt-12 lg:mt-16 lg:pt-16"
              }`}
            >
              <figure
                className={`relative aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-cream-deep shadow-lift ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  className="object-cover"
                />
              </figure>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <Eyebrow>{panel.eyebrow}</Eyebrow>
                <h3 className="text-display-md mt-5">{panel.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{panel.body}</p>
                <ul className="mt-7 divide-y divide-hairline border-y border-hairline">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 py-3.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-rose"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* 5 — Questions de terrain. */}
      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            align="left"
            eyebrow={copy.faq.eyebrow}
            title={copy.faq.title}
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Découvrez aussi notre <Link href="/sites-internet">approche des sites internet</Link>{" "}
            ou notre <Link href="/methode">méthode de travail</Link>.
          </p>
        </Container>
      </section>

      {/* 6 — L'appel, seule bande sombre de la page. */}
      <section className="on-ink border-t border-hairline bg-plum py-16 text-cream sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{copy.closing.eyebrow}</Eyebrow>
            <h2 className="text-display-lg mt-6">{copy.closing.title}</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/75">
              {copy.closing.lede}
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <RamonageBookingTrigger variant="onInk">
                {copy.closing.cta}
              </RamonageBookingTrigger>
              <p className="text-xs text-cream/60">{copy.closing.reassurance}</p>
            </div>
          </div>
        </Container>
      </section>

      <RamonageBookingModal />
    </>
  );
}
