import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudyViewTracker } from "@/components/realisations/CaseStudyViewTracker";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getCaseStudy, publishedCaseStudies } from "@/lib/case-studies";
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
    title: `${cs.client} — étude de cas ${cs.sector.toLowerCase()}`,
    description: cs.summary,
    path: `/realisations/${cs.slug}`,
    ogType: "article",
  });
}

const sections = [
  { key: "problem", title: "Le problème de départ" },
  { key: "approach", title: "L'approche" },
  { key: "visualDirection", title: "La direction visuelle" },
  { key: "technical", title: "La solution technique" },
  { key: "seoWork", title: "Le travail de visibilité" },
  { key: "conversionWork", title: "Le travail de conversion" },
] as const;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <CaseStudyViewTracker slug={cs.slug} />
      <JsonLd
        data={articleSchema({
          headline: `${cs.client} — étude de cas`,
          description: cs.summary,
          path: `/realisations/${cs.slug}`,
          datePublished: "2026-07-01",
          dateModified: cs.updatedAt,
          authorName: site.name,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
          { name: cs.client, path: `/realisations/${cs.slug}` },
        ]}
        eyebrow={`Étude de cas · ${cs.sector}`}
        title={cs.client}
        lede={cs.summary}
      >
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-hairline pt-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-faint text-xs">
              Secteur
            </dt>
            <dd className="mt-1">{cs.sector}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-faint text-xs">
              Localisation
            </dt>
            <dd className="mt-1">{cs.location}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-faint text-xs">
              Période
            </dt>
            <dd className="mt-1">{cs.year}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-faint text-xs">
              Site
            </dt>
            <dd className="mt-1">
              {cs.liveUrl ? (
                <a
                  href={cs.liveUrl}
                  className="text-rose underline underline-offset-4"
                >
                  {cs.liveUrl.replace("https://", "")}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>
      </PageHero>

      <article className="py-16 sm:py-24">
        <Container width="narrow">
          <div className="space-y-12">
            {sections.map((s, i) => (
              <section key={s.key}>
                <p className="step-num text-lg" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-display-md mt-1">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{cs[s.key]}</p>
              </section>
            ))}

            <section className="rounded-sm border border-hairline bg-paper p-7 sm:p-9">
              <h2 className="text-display-md">Les résultats — vérifiables</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Nous ne publions que des faits constatables publiquement. Pas de
                pourcentages de croissance invérifiables.
              </p>
              <ul className="mt-6 space-y-3">
                {cs.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 text-sage-deep">
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
              {cs.testimonial && (
                <blockquote className="mt-8 border-l-2 border-rose pl-5 italic text-ink-soft">
                  « {cs.testimonial.quote} »
                  <footer className="mt-2 not-italic font-medium text-ink">
                    — {cs.testimonial.author}
                  </footer>
                </blockquote>
              )}
            </section>

            <nav aria-label="Services liés" className="border-t border-hairline pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Services liés à ce projet
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {cs.relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="inline-flex rounded-sm border border-hairline bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-rose hover:text-rose"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </article>

      <CtaBand
        placement="case_study_footer"
        title="Votre projet mérite le même niveau d'attention"
        lede="Racontez-nous votre situation : le diagnostic gratuit est la première étape de chacun de nos projets."
      />
    </>
  );
}
