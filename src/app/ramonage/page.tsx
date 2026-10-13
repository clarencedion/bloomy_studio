import Image from "next/image";
import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowDown,
  CalendarCheck,
  Certificate,
  Check,
  Funnel,
  Path,
} from "@phosphor-icons/react/dist/ssr";

import {
  RamonageBookingModal,
  RamonageBookingTrigger,
} from "@/components/forms/RamonageBookingModal";
import { RamonageSimulator } from "@/components/ramonage/RamonageSimulator";
import { RamonageSiteShowcase } from "@/components/ramonage/RamonageSiteShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Kicker } from "@/components/ui/Kicker";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { ramonagePage as copy } from "@/lib/ramonage";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Site internet pour ramoneur : réservations & tournées",
  description:
    "Un site pensé pour les ramoneurs : réservation en ligne, tournées par commune et suivi des interventions. Ouvrez le site que nous avons conçu.",
  path: "/ramonage",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Ramoneurs", path: "/ramonage" },
];

/** Une icône par repère, dans l'ordre de `copy.markers`. */
const markerIcons: Icon[] = [CalendarCheck, Funnel, Path, Certificate];

/**
 * Hero : le métier d'abord (la photographie), le site ensuite (le mobile de
 * RamoPlus, ancré au bord bas de la photo). Desktop : colonne de droite.
 * Mobile : sous le texte, téléphone plus petit, toujours ancré au même bord.
 */
function HeroVisual() {
  return (
    <figure className="relative pb-10 sm:pb-14">
      <div className="leaf-lg relative aspect-[4/3] overflow-hidden bg-mint">
        <Image
          src="/ramonage/ramoneur-intervention.webp"
          alt={copy.hero.imageAlt}
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[42%_center]"
        />
      </div>
      <PhoneFrame className="absolute bottom-0 right-5 w-[6.75rem] sm:right-10 sm:w-36 lg:right-8 lg:w-[8.5rem] xl:w-40">
        <Image
          src="/ramonage/ramoplus-accueil-mobile.webp"
          alt={copy.hero.phoneAlt}
          width={780}
          height={1688}
          sizes="10rem"
          className="h-auto w-full"
        />
      </PhoneFrame>
    </figure>
  );
}

/**
 * /ramonage : une seule ligne narrative.
 *
 * 1. Hero (texte, photo du métier + mobile du site).
 * 2. Repères : quatre tuiles soudées en un seul bandeau (2 × 2 en tablette,
 *    une colonne en mobile).
 * 3. Vitrine : titre au-dessus, capture réelle en grand.
 * 4. Parcours jouable (#reservation) : titre collant à gauche, panneau à
 *    droite. Mobile : titre puis panneau.
 * 5. Diptyque avant / après : deux volets côte à côte, le second décalé.
 *    Mobile : l'un sous l'autre.
 * 6. Questions, en colonne de lecture. Puis la bande finale (diagnostic).
 *
 * Les deux déclencheurs de la modale (hero et parcours) portent l'appel
 * principal ; la bande finale offre l'entrée la plus légère.
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
            "Conception de sites internet spécialisés pour artisans ramoneurs et entreprises de fumisterie : réservation en ligne, gestion des tournées, certificats et visibilité locale.",
          path: "/ramonage",
          serviceType: "Création de site internet spécialisé",
          audience: "Ramoneurs et entreprises de fumisterie",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lede={copy.hero.lede}
        aside={<HeroVisual />}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <RamonageBookingTrigger variant="primary">
            {copy.hero.primaryCta}
            <ButtonArrow />
          </RamonageBookingTrigger>
          <a href="#reservation" className={buttonClass("secondary")}>
            {copy.hero.secondaryCta}
            <ArrowDown aria-hidden="true" weight="bold" className="size-4" />
          </a>
        </div>
      </PageHero>

      {/* 2. Repères : ce que le site fait, en quatre lignes. */}
      <section aria-label="Ce que fait le site" className="pb-24 sm:pb-32">
        <Container width="wide">
          <dl className="leaf-lg grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {copy.markers.map((marker, index) => {
              const MarkerIcon = markerIcons[index] ?? Check;
              return (
                <div key={marker.label} className="bg-white px-6 py-8 sm:px-8 sm:py-10">
                  <MarkerIcon aria-hidden="true" className="size-8 text-bloom-ink" />
                  <dt className="text-display-sm mt-6">{marker.label}</dt>
                  <dd className="mt-2 max-w-[30ch] text-[0.98rem] leading-relaxed text-forest-soft">
                    {marker.body}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      </section>

      {/* 3. Montrer avant de raconter : la capture réelle du site en ligne. */}
      <section className="pb-24 sm:pb-32">
        <Container width="wide">
          <SectionHead title={copy.showcase.title} lede={copy.showcase.lede} className="mb-12 sm:mb-14" />
          <Reveal>
            <RamonageSiteShowcase />
          </Reveal>
        </Container>
      </section>

      {/* 4. Le moteur du site précédent, cette fois jouable. */}
      <section id="reservation" className="scroll-mt-24 border-y border-line bg-mint/45 py-24 sm:py-32">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Kicker ruled className="mb-6">
                  {copy.booking.eyebrow}
                </Kicker>
                <h2 className="text-display-lg">{copy.booking.title}</h2>
                <p className="lede mt-5">{copy.booking.lede}</p>
                <p className="caption mt-8 max-w-xs">{copy.booking.note}</p>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <RamonageSimulator />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Diptyque : avant le passage, après le passage. */}
      <section className="py-24 sm:py-32">
        <Container width="wide">
          <SectionHead title={copy.field.title} lede={copy.field.lede} />
          <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-14">
            {copy.field.panels.map((panel, index) => (
              <Reveal key={panel.title} delay={index * 80} className={index === 1 ? "md:mt-24" : ""}>
                <article>
                  <div className="leaf relative aspect-[4/3] overflow-hidden bg-mint">
                    <Image
                      src={panel.image}
                      alt={panel.imageAlt}
                      fill
                      sizes="(min-width: 768px) 44vw, 100vw"
                      className={`object-cover ${index === 1 ? "object-[50%_42%]" : "object-center"}`}
                    />
                  </div>
                  <p className="mt-8 text-[0.95rem] font-semibold text-bloom-ink">{panel.eyebrow}</p>
                  <h3 className="text-display-md mt-2">{panel.title}</h3>
                  <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-forest-soft">
                    {panel.body}
                  </p>
                  <ul className="mt-6 max-w-xl space-y-3">
                    {panel.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.98rem] leading-relaxed text-forest">
                        <Check aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-bloom-ink" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Questions de terrain, en colonne de lecture. */}
      <section className="border-t border-line py-24 sm:py-32">
        <Container width="narrow">
          <SectionHead title={copy.faq.title} className="mb-10" />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-10 text-[0.98rem] leading-relaxed text-forest-soft">
            Découvrez aussi notre <Link href="/sites-internet">approche des sites internet</Link>{" "}
            ou notre <Link href="/methode">méthode de travail</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="ramonage_footer"
        intent="audit"
        title={copy.closing.title}
        lede={copy.closing.lede}
      />

      <RamonageBookingModal />
    </>
  );
}
