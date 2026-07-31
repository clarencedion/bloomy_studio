import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { pageMetadata } from "@/lib/seo";
import { publishedCaseStudies } from "@/lib/case-studies";
import { showcaseSites } from "@/lib/portfolio";

export const metadata = pageMetadata({
  title: "Réalisations : sites de fleuristes conçus par Bloomy Studio",
  description:
    "Les sites livrés par Bloomy Studio : Monloup, Maison Hortense, KL Fleurs, Maison Orpha, Flōvia — et bloomy.one, la plateforme florale de l'équipe.",
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
            Quatre boutiques de fleuristes, un concept touristique, et la
            plateforme florale que nous construisons nous-mêmes. Pas de logos
            décoratifs, pas de pourcentages sortis de nulle part : ce que vous
            voyez est en ligne.
          </>
        }
      />

      {/*
        Le portfolio : une réalisation par bloc, en grand, côtés alternés. Sur
        la page où l'on vient précisément pour voir, une grille de vignettes
        serait un aveu de faiblesse — la capture doit être lisible.
      */}
      <section className="border-b border-hairline py-16 sm:py-20">
        <Container width="wide">
          <SectionHead
          align="center"
            eyebrow="Sites livrés"
            title="Cinq sites, cinq univers"
            lede="Chaque site part du lieu lui-même — son nom, ses couleurs, sa façon de vendre. Quatre fleuristes et, pour finir, un projet qui n'a rien de floral : la méthode ne change pas."
            className="mb-14"
          />
          <div className="space-y-16 sm:space-y-24">
            {showcaseSites.map((site, i) => (
              <Reveal key={site.slug}>
                <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
                  <figure className={i % 2 === 1 ? "lg:order-2" : undefined}>
                    <BrowserFrame label={`${site.name} — ${site.city}`}>
                      <Image
                        src={site.image}
                        alt={site.alt}
                        width={site.width}
                        height={site.height}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : undefined}
                        sizes="(min-width: 1024px) 46rem, 100vw"
                        className="h-auto w-full"
                      />
                    </BrowserFrame>
                  </figure>
                  <div>
                    <p className="plate-label">{site.city}</p>
                    <h3 className="text-display-lg mt-3">{site.name}</h3>
                    <p className="mt-4 leading-relaxed text-ink-soft">{site.note}</p>
                    <LiveSiteLink site={site} className="mt-6" />
                    <p className="caption mt-4">{site.focus}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
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
