import { SectorAccordion, type SectorStrip } from "@/components/home/SectorAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { homeSectors } from "@/lib/home";
import { getShowcaseSite, siteHost } from "@/lib/portfolio";

/**
 * « Pour quels métiers » : les fleuristes en tête (la spécialité), puis la
 * beauté, les artisans et les autres commerces. Chaque métier est montré par
 * un site réellement conçu pour lui, jamais par une photo d'ambiance.
 *
 * Les données du portfolio sont résolues ici, côté serveur : le composant
 * client ne reçoit que ce qu'il affiche.
 */
export function Sectors() {
  const items: SectorStrip[] = homeSectors.items.flatMap((sector) => {
    const site = getShowcaseSite(sector.slug);
    if (!site) return [];
    return [
      {
        id: sector.id,
        name: sector.name,
        line: sector.line,
        href: sector.href,
        tone: site.tone,
        host: siteHost(site),
        image: site.image,
        width: site.width,
        height: site.height,
        alt: site.alt,
      },
    ];
  });

  return (
    <section className="py-24 sm:py-32">
      <Container width="wide">
        <SectionHead size="xl" title={homeSectors.title} lede={homeSectors.lede} />
        <div className="mt-12 sm:mt-14 lg:-mx-1.5">
          <SectorAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
