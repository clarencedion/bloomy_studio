import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteGallery } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Création de site pour salon de coiffure, image premium",
  description:
    "Sites pour salons de coiffure : identité premium, menu de prestations pensé mobile, réservation intégrée, SEO local et recrutement. Sans dépendre des plateformes.",
  path: "/salons-de-coiffure",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Salons de coiffure", path: "/salons-de-coiffure" },
];

const features = [
  {
    title: "Une identité au niveau de votre salon",
    body: "Vous avez investi dans votre lieu : matériaux, lumière, ambiance. Votre site doit produire la même impression — direction artistique dédiée, photographies mises en scène, ton juste. Pas un thème « coiffure » acheté en ligne.",
  },
  {
    title: "Un menu de prestations pensé pour le téléphone",
    body: "Coupe, couleur, balayage, soins, barbe : vos prestations et vos prix, lisibles en deux gestes sur mobile, sans PDF à télécharger. La transparence tarifaire rassure et filtre les demandes.",
  },
  {
    title: "La réservation là où vous la gérez déjà",
    body: "Vous travaillez avec Planity, Treatwell ou un agenda maison ? Le site s'y connecte proprement : le client réserve dans votre outil, sans ressaisie. Nous n'imposons jamais un système de réservation propriétaire.",
  },
  {
    title: "Votre équipe, mise en avant",
    body: "Portraits, spécialités, parcours : les clients choisissent souvent une personne autant qu'un salon. Et une page équipe soignée est votre meilleur outil de recrutement dans un métier en tension.",
  },
  {
    title: "Vos réalisations, avant/après",
    body: "Colorations, transformations, coiffures d'événement : une galerie structurée qui montre votre niveau — avec l'accord de vos clients, et sans filtre trompeur.",
  },
  {
    title: "Visibilité locale sérieuse",
    body: "Fiche Google complète, avis réguliers, cohérence site-fiche, pages par prestation : les mêmes fondamentaux que nous appliquons aux fleuristes, adaptés aux recherches « coiffeur », « balayage », « coloriste » de votre ville.",
  },
  {
    title: "Cartes cadeaux et vente de produits",
    body: "Une carte cadeau achetable en ligne en trois minutes, et la possibilité de vendre vos gammes de produits capillaires — sans transformer le site en supermarché.",
  },
  {
    title: "Plusieurs salons, une seule cohérence",
    body: "Si vous avez deux ou trois adresses, chaque salon garde sa page, ses horaires et sa fiche Google, dans une identité commune. L'architecture est prévue pour grandir avec vous.",
  },
];

const faq = [
  {
    question: "Planity me suffit, non ?",
    answer: (
      <p>
        Planity est un excellent agenda — gardez-le, nous nous y connectons.
        Mais votre profil y ressemble à celui de tous les salons voisins, et
        les clients qui vous découvrent par Google atterrissent sur une page
        qui ne vous appartient pas. Votre site est le seul endroit où votre
        positionnement, vos prix et votre équipe s&apos;expriment pleinement —
        et il alimente votre fiche Google, pas celle d&apos;une plateforme.
      </p>
    ),
  },
  {
    question: "Qu'est-ce qui vous distingue d'une agence généraliste ?",
    answer: (
      <p>
        Notre spécialité, ce sont les commerces locaux indépendants à forte
        identité — fleuristes d&apos;abord, salons ensuite. Concrètement :
        nous savons travailler un référencement de proximité, des prestations à
        forte dimension visuelle et une clientèle qui réserve depuis son
        téléphone. Et notre <Link href="/methode">méthode</Link>{" "}est la même
        pour tous : transparente, jalonnée, mesurée.
      </p>
    ),
  },
  {
    question: "Pouvez-vous nous aider à recruter ?",
    answer: (
      <p>
        Le site y contribue directement : page équipe vivante, page « nous
        rejoindre » avec vos conditions réelles et votre ambiance, photos du
        salon. Les candidats se renseignent exactement comme les clients — un
        salon sans site soigné part avec un handicap.
      </p>
    ),
  },
];

export default function SalonsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site pour salon de coiffure",
          description:
            "Sites premium pour salons de coiffure : identité, menu de prestations mobile, réservation intégrée, SEO local, recrutement et cartes cadeaux.",
          path: "/salons-de-coiffure",
          serviceType: "Création de site internet",
          audience: "Salons de coiffure",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Salons de coiffure"
        title="Votre salon soigne chaque détail. Votre site devrait aussi."
        lede={
          <>
            Nous concevons des sites pour salons de coiffure premium :
            l&apos;image de votre lieu, un menu de prestations pensé mobile, la
            réservation intégrée à vos outils et une visibilité locale
            travaillée sérieusement — sans dépendre entièrement des plateformes.
          </>
        }
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Ce que nous construisons"
            title="Huit sujets propres au métier de la coiffure"
            lede="Un salon ne se vend pas comme une boutique de fleurs : réservation, équipe, avant/après, recrutement. La page que vous lisez a été écrite pour votre métier — le site que nous vous livrerons aussi."
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {features.map((f) => (
              <article key={f.title} className="border-t border-hairline pt-5">
                <h3 className="text-display-sm">{f.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/*
        Aucune capture de salon n'existe encore. Plutôt que de laisser la page
        sans preuve — ou pire, d'en fabriquer une — on montre le travail livré
        en le nommant pour ce qu'il est : des sites de fleuristes. Le savoir-
        faire se voit, l'honnêteté aussi.
      */}
      <section className="border-y border-hairline bg-cream-deep py-16 sm:py-20">
        <Container width="wide">
          <SectionHead
            eyebrow="Notre travail"
            title="Ce que nous livrons, en ligne aujourd'hui"
            lede="Nos sites livrés sont pour l'instant des boutiques de fleuristes : nous préférons vous montrer du travail réel plutôt qu'une maquette de salon. Le soin, la structure et le niveau de finition sont les mêmes."
            className="mb-12"
          />
          <SiteGallery />
        </Container>
      </section>

      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            eyebrow="Vos questions"
            title="Ce que les salons nous demandent"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Nos offres et compléments s&apos;appliquent aussi aux salons —{" "}
            <Link href="/services">voir les services</Link>. Pour comprendre
            notre façon de travailler : <Link href="/methode">la méthode</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="salons_footer"
        title="Votre présence en ligne est-elle au niveau de votre salon ?"
        lede="Le diagnostic gratuit analyse votre site, votre fiche Google et votre visibilité face aux salons voisins. Concret, honnête, sans engagement."
      />
    </>
  );
}
