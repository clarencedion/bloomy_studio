import Link from "next/link";

import { PortfolioShowcase } from "@/components/portfolio/PortfolioShowcase";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { pageMetadata } from "@/lib/seo";
import { publishedCaseStudies } from "@/lib/case-studies";

export const metadata = pageMetadata({
  title: "Réalisations : portfolio des sites conçus par Bloomy Studio",
  description:
    "Découvrez les réalisations de Bloomy Studio : sites e-commerce, vitrines d'artisans, hébergements touristiques, conseil B2B et outils sur mesure.",
  path: "/realisations",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations" },
];

export default function RealisationsPage() {
  const studies = publishedCaseStudies();

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Réalisations"
        title="Des sites en ligne, pas des maquettes"
        lede={
          <>
            Boutiques e-commerce, vitrines d&apos;artisans, hébergements touristiques,
            conseil B2B et horticulture : découvrez 19 sites en production. Pas de faux
            logos, pas de promesses en l&apos;air : chaque projet est accessible en ligne.
          </>
        }
      />

      {/* Le portfolio complet avec filtrage par catégorie */}
      <section className="border-b border-hairline py-16 sm:py-20">
        <Container width="wide">
          <SectionHead
            align="center"
            eyebrow="Sites livrés"
            title="19 réalisations, 19 univers en ligne"
            lede="Chaque site part du lieu et de l'activité réelle — son identité, ses produits, sa manière de vendre. Filtrez par secteur pour explorer nos créations."
            className="mb-12"
          />
          <PortfolioShowcase />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
          align="left"
            eyebrow="Études de cas"
            title="Racontées en entier, résultats vérifiables"
            className="mb-12"
          />
          <div className="border-t border-hairline">
            {studies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/realisations/${cs.slug}`}
                className="group grid gap-x-12 gap-y-6 border-b border-hairline py-10 sm:py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
              >
                <div>
                  <p className="plate-label">
                    <span>{cs.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cs.year}</span>
                  </p>
                  <h2 className="text-display-lg mt-3 group-hover:text-rose">
                    {cs.client}
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                    {cs.summary}
                  </p>
                  <p className="mt-5 flex flex-wrap gap-2">
                    {cs.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-sm border border-hairline bg-cream px-2.5 py-1 text-xs font-medium text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </p>
                  <span className="mt-6 inline-block font-semibold text-rose">
                    Lire l&apos;étude de cas →
                  </span>
                </div>
                <ul className="space-y-2.5 self-center border-l-2 border-rose pl-5 text-sm text-ink-soft">
                  {cs.results.slice(0, 4).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

          {/* Honnêteté d'un studio récent — transformée en offre */}
          <aside className="mt-10 rounded-sm border border-dashed border-rose/40 bg-rose-veil/40 p-7 sm:p-9">
            <h2 className="text-display-md">Votre boutique pourrait être la prochaine</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              Bloomy Studio est un studio récent : nous préférons peu d&apos;études
              de cas honnêtes à une galerie gonflée. C&apos;est aussi une
              opportunité — nos premiers clients fleuristes reçoivent une
              attention de premier projet et des conditions de lancement, en
              échange d&apos;une étude de cas documentée (avec votre accord
              écrit).
            </p>
            <Link
              href="/audit"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 font-semibold text-cream transition-colors hover:bg-rose"
            >
              Commencer par le diagnostic gratuit
            </Link>
          </aside>
        </Container>
      </section>

      <CtaBand placement="realisations_footer" />
    </>
  );
}
