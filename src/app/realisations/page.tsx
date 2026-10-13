import { PortfolioShowcase } from "@/components/portfolio/PortfolioShowcase";
import { CaseStudyTeaser } from "@/components/realisations/CaseStudyTeaser";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShowpiece } from "@/components/visuals/ShowcaseSites";
import { publishedCaseStudies } from "@/lib/case-studies";
import { clientSites, conceptSites, recentSites, showcaseSites, type ShowcaseSlug } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";

const total = showcaseSites.length;

export const metadata = pageMetadata({
  title: "Réalisations : portfolio des sites conçus par Bloomy Studio",
  description: `Le portfolio de Bloomy Studio : ${total} projets, du fleuriste au carrossier. Boutiques en ligne, sites d'artisans, tourisme, conseil B2B et concepts.`,
  path: "/realisations",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations" },
];

/**
 * Ordre éditorial de l'index (« Tous les projets »).
 *
 * Osmose Florale ouvre la page en grand : l'index commence donc ailleurs,
 * par les univers les plus contrastés, et alterne les métiers pour montrer
 * l'étendue du studio avant sa profondeur fleuriste. Une position sur cinq
 * passe en pleine largeur avec la capture qui défile (voir PortfolioShowcase).
 * Un projet absent de cette liste s'affiche quand même, à la suite.
 */
const indexOrder = [
  "gb-performance",
  "fleurs-ditalie",
  "rodolphe-dion-coiffure",
  "act4results",
  "monloup",
  "flovia",
  "maison-orpha",
  "net-plus-services",
  "nails-by-cindy",
  "kl-fleurs",
  "maison-de-rose",
  "osmose-florale",
  "pepinieres-raffard",
  "domaine-des-aurores",
  "artistfloral",
  "la-cle-des-champs",
  "capifiore",
  "maison-hortense",
  "la-fine-fleur",
  "atelier-de-laurent",
  "au-jardin-de-celine",
  "aux-coquelicots",
  "julius",
] as const satisfies readonly ShowcaseSlug[];

/**
 * Réalisations.
 *
 * Récit : le titre et le compte réel, puis le travail tout de suite (Osmose
 * Florale, le site fleuriste de référence, en pièce maîtresse), puis l'index
 * complet filtrable, puis l'étude de cas racontée en entier.
 */
export default function RealisationsPage() {
  const study = publishedCaseStudies()[0];

  return (
    <>
      <section className="pb-20 sm:pb-28">
        <Container width="wide" className="pt-8 sm:pt-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-display-2xl mt-12 max-w-5xl sm:mt-16">
            {total} projets, du fleuriste au <span className="text-bloom-ink">carrossier</span>.
          </h1>
          <p className="lede mt-7">
            {clientSites.length} sites livrés, {recentSites.length} projets récents pour des
            entreprises réelles et {conceptSites.length} projets concept conçus par le studio.
          </p>
          <SiteShowpiece slug="osmose-florale" eager className="mt-12 sm:mt-16" />
        </Container>
      </section>

      <section aria-labelledby="index-titre" className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <SectionHead
            title={<span id="index-titre">Trouvez un projet proche du vôtre</span>}
            lede="Filtrez par métier. Chaque capture vient du site lui-même."
            className="mb-10 sm:mb-14"
          />
          <PortfolioShowcase order={indexOrder} />
        </Container>
      </section>

      {study ? (
        <section className="pb-24 sm:pb-32">
          <Container width="wide">
            <CaseStudyTeaser cs={study} />
          </Container>
        </section>
      ) : null}

      <CtaBand placement="realisations_footer" />
    </>
  );
}
