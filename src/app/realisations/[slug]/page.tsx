import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";

import { CaseStudyViewTracker } from "@/components/realisations/CaseStudyViewTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import { getCaseStudy, publishedCaseStudies, type CaseStudy } from "@/lib/case-studies";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.metaTitle,
    description: cs.summary,
    path: `/realisations/${cs.slug}`,
    ogType: "article",
  });
}

/**
 * Les chapitres du récit, dans l'ordre où le projet s'est réellement joué.
 * Pas de numéro : ce sont des angles de lecture, pas des étapes.
 */
const chapters = [
  { key: "problem", id: "probleme", title: "Le problème de départ" },
  { key: "approach", id: "approche", title: "Partir du comptoir" },
  { key: "visualDirection", id: "direction-visuelle", title: "La direction visuelle" },
  { key: "technical", id: "technique", title: "La solution technique" },
  { key: "seoWork", id: "visibilite", title: "Être trouvé localement" },
  { key: "conversionWork", id: "conversion", title: "Un parcours de commande court" },
] as const satisfies readonly { key: keyof CaseStudy; id: string; title: string }[];

function liveHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Étude de cas : un récit écrit, pas un gabarit de CMS rempli d'images.
 *
 * Rythme : l'en-tête et ses métadonnées, la capture du produit en grand, les
 * faits vérifiables tout de suite (la preuve avant le récit), puis les
 * chapitres avec un sommaire collant en desktop, et les services liés.
 */
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const meta = [
    { label: "Secteur", value: cs.sector },
    { label: "Lieu", value: cs.location },
    { label: "Période", value: cs.year },
  ];

  return (
    <>
      <CaseStudyViewTracker slug={cs.slug} />
      <JsonLd
        data={articleSchema({
          headline: `${cs.client}, étude de cas`,
          description: cs.summary,
          path: `/realisations/${cs.slug}`,
          datePublished: "2026-07-01",
          dateModified: cs.updatedAt,
          authorName: site.name,
        })}
      />

      {/* En-tête : le projet, ce qu'il permet, et ses repères. */}
      <section className="pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Container width="wide">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Réalisations", path: "/realisations" },
              { name: cs.client, path: `/realisations/${cs.slug}` },
            ]}
          />
          <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Kicker ruled>{`Étude de cas : ${cs.client}`}</Kicker>
              <h1 className="text-display-xl mt-7">{cs.headline}</h1>
              <p className="lede mt-7 max-w-2xl">{cs.summary}</p>
            </div>
            <dl className="grid content-start gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="plate-label">{m.label}</dt>
                  <dd className="mt-1.5 text-[1rem] leading-snug text-forest">{m.value}</dd>
                </div>
              ))}
              {cs.liveUrl ? (
                <div>
                  <dt className="plate-label">En ligne</dt>
                  <dd className="mt-1.5">
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="group link-live inline-flex items-center gap-1 font-semibold text-bloom-ink"
                    >
                      {liveHost(cs.liveUrl)}
                      <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-3.5" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </Container>
      </section>

      {/* Le produit, en grand, posé sur un panneau à coins feuille. */}
      <section aria-label={`Capture de ${cs.client}`}>
        <Container width="wide">
          <Reveal>
            <figure className="leaf-lg bg-mint px-4 pt-6 sm:px-10 sm:pt-12 lg:px-20 lg:pt-16">
              <PanelFrame label={cs.client} className="mx-auto max-w-5xl">
                <Image
                  src="/produit/bloomy-produit.webp"
                  alt="Page comparatif de bloomy.one : composition fleur par fleur, 0 % de commission, livraison locale et aperçu photo avant envoi."
                  width={1600}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 64rem, 100vw"
                  className="h-auto w-full"
                />
              </PanelFrame>
              <figcaption className="caption mx-auto max-w-5xl py-5 text-center">
                La page comparatif de bloomy.one, telle qu&apos;elle est en ligne.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* La preuve avant le récit : uniquement des faits constatables. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-display-lg">Ce qui se vérifie aujourd&apos;hui.</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-forest-soft">
                Aucun pourcentage de croissance, aucune projection : ce
                qui est en place aujourd&apos;hui, et rien d&apos;autre.
              </p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {cs.results.map((r, i, all) => (
                <li
                  key={r}
                  className={`flex gap-4 border-t border-line py-6 ${
                    all.length % 2 === 1 && i === all.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <Check aria-hidden="true" weight="bold" className="mt-1 size-5 shrink-0 text-bloom-ink" />
                  <span className="font-display text-[1.2rem] font-semibold leading-snug tracking-tight">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Le récit : sommaire collant à gauche en desktop, chapitres à droite. */}
      <article className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <nav aria-label="Chapitres de l'étude" className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <p className="plate-label">Le récit</p>
                <ul className="mt-5 space-y-1 border-l border-line">
                  {chapters.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.92rem] text-forest-soft transition-colors hover:border-bloom hover:text-forest"
                      >
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="space-y-16 sm:space-y-20 lg:col-span-8 lg:col-start-5">
              {chapters.map((c, i) => (
                <section key={c.id} id={c.id} className="scroll-mt-28">
                  <h2 className="text-display-md">{c.title}</h2>
                  <p
                    className={`mt-5 max-w-[62ch] leading-relaxed text-forest-soft ${
                      i === 0 ? "text-[1.2rem] text-forest" : "text-[1.06rem]"
                    }`}
                  >
                    {cs[c.key]}
                  </p>
                </section>
              ))}

              {cs.testimonial ? (
                <figure className="leaf bg-blush p-8 sm:p-10">
                  <blockquote className="font-display text-[1.4rem] font-semibold leading-snug tracking-tight">
                    « {cs.testimonial.quote} »
                  </blockquote>
                  <figcaption className="mt-4 text-forest-soft">{cs.testimonial.author}</figcaption>
                </figure>
              ) : null}
            </div>
          </div>
        </Container>
      </article>

      {/* Ce que le studio a fait, et où aller ensuite. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="leaf-lg grid gap-12 bg-blush px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-16">
            <div>
              <h2 className="text-display-md">Ce que nous avons construit</h2>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {cs.services.map((s) => (
                  <li key={s} className="pill text-[0.9rem] text-forest">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-label="Services liés">
              <h2 className="text-display-md">Le même travail, pour vous</h2>
              <ul className="mt-6 border-t border-forest/15">
                {cs.relatedServices.map((s) => (
                  <li key={s.href} className="border-b border-forest/15">
                    <Link
                      href={s.href}
                      className="group flex min-h-14 items-center justify-between gap-4 py-3 font-semibold text-forest transition-colors hover:text-bloom-ink"
                    >
                      {s.label}
                      <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4 text-bloom-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      <CtaBand
        placement="case_study_footer"
        title="Votre projet mérite le même soin."
        lede="Un site, une boutique ou une première version de votre application : racontez‑nous où vous en êtes. Réponse sous 48 h ouvrées."
      />
    </>
  );
}
