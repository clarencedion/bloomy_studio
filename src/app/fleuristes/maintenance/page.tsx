import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShowpiece } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Maintenance site fleuriste : un site vivant, pas livré-oublié",
  description:
    "Maintenance et accompagnement pour fleuristes : mises à jour, sauvegardes, pages saisonnières prêtes avant les pics et rapport mensuel lisible.",
  path: "/fleuristes/maintenance",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "Maintenance", path: "/fleuristes/maintenance" },
];

const included = [
  {
    title: "Le socle technique, surveillé",
    body: "Mises à jour de sécurité, sauvegardes automatiques, surveillance de disponibilité et de vitesse. Si quelque chose casse un dimanche de fête des mères, nous le savons avant vous.",
  },
  {
    title: "Les petites évolutions, sans devis surprise",
    body: "Changer une photo, ajouter une prestation, corriger un texte : les demandes courantes sont incluses dans le forfait, avec un délai annoncé. Les évolutions plus lourdes font l'objet d'un chiffrage clair, avant de commencer.",
  },
  {
    title: "Le calendrier floral, anticipé",
    body: "Nous connaissons vos échéances : Saint-Valentin, fête des grands-mères, fête des mères, Toussaint. Les pages et les créneaux sont prêts trois semaines avant — vous validez, c'est en ligne.",
  },
  {
    title: "Un rapport mensuel qui se lit en cinq minutes",
    body: "Visites, appels, itinéraires, commandes, position locale : l'essentiel, en français, avec ce que nous proposons de faire le mois suivant. Vous savez toujours ce que votre site vous rapporte.",
  },
];

const faq = [
  {
    question: "Suis-je engagé sur la durée ?",
    answer: (
      <p>
        Non — l&apos;accompagnement est mensuel, sans engagement de longue
        durée. Notre pari est simple : si le rapport mensuel montre de la
        valeur, vous restez. Sinon, vous partez avec votre site, vos contenus
        et vos accès. La rétention par la qualité, pas par le contrat.
      </p>
    ),
  },
  {
    question: "Que se passe-t-il si mon site tombe en panne ?",
    answer: (
      <p>
        La surveillance nous alerte automatiquement, et les incidents critiques
        sont traités en priorité absolue — particulièrement en période de pic,
        où chaque heure compte. Les sauvegardes quotidiennes permettent de
        restaurer rapidement en cas de problème grave.
      </p>
    ),
  },
  {
    question: "Puis-je prendre la maintenance sans avoir fait mon site chez vous ?",
    answer: (
      <p>
        C&apos;est possible après un audit technique : nous devons savoir ce
        que nous reprenons. Si le site est sain, nous le reprenons volontiers.
        S&apos;il ne l&apos;est pas, nous vous expliquons pourquoi et ce que
        coûterait sa remise à niveau — ou sa{" "}
        <Link href="/fleuristes/site-internet">reconstruction</Link>.
      </p>
    ),
  },
];

export default function MaintenancePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Maintenance de site pour fleuriste",
          description:
            "Maintenance, évolutions et accompagnement continu de sites de fleuristes : sécurité, sauvegardes, pages saisonnières, rapport mensuel.",
          path: "/fleuristes/maintenance",
          serviceType: "Maintenance de site internet",
          audience: "Fleuristes indépendants",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · Maintenance"
        title="Un site de fleuriste vit au rythme des saisons — le vôtre aussi"
        lede={
          <>
            Le pire moment d&apos;un site, c&apos;est l&apos;année d&apos;après
            : le prestataire a disparu, les photos datent, la Saint-Valentin
            arrive et rien n&apos;est prêt. Notre accompagnement existe pour que
            votre <Link href="/fleuristes/site-internet">site</Link>{" "}et votre{" "}
            <Link href="/fleuristes/seo-local">visibilité locale</Link>{" "}
            progressent chaque mois au lieu de s&apos;éroder.
          </>
        }
        visual={<SiteShowpiece slug="kl-fleuriste" eager />}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Ce qui est inclus"
            title="Quatre engagements, tenus chaque mois"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {included.map((item) => (
              <article
                key={item.title}
                className="rounded-sm border border-hairline bg-paper p-7"
              >
                <h3 className="text-display-sm">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Calendrier floral */}
      <section className="border-y border-hairline bg-sage-veil/50 py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="L'année d'un fleuriste"
            title="Nous travaillons avec votre calendrier, pas contre lui"
            lede="Chaque échéance est préparée en amont. Voici à quoi ressemble une année d'accompagnement type."
          />
          <ol className="mt-10 divide-y divide-hairline border-y border-hairline">
            {[
              ["Janvier", "Bilan de l'année écoulée, préparation de la Saint-Valentin : page dédiée, précommandes, créneaux renforcés."],
              ["Février — mars", "Pic Saint-Valentin absorbé, puis fête des grands-mères. Analyse de ce qui a fonctionné, ajustements."],
              ["Avril — mai", "Fête des mères, le plus gros pic de l'année : offre resserrée, précommandes, logistique de retrait calibrée."],
              ["Juin — septembre", "Saison des mariages : mise en avant des réalisations, page mariage enrichie, demandes de devis structurées."],
              ["Octobre — novembre", "Toussaint, traitée avec sobriété : parcours deuil vérifié, livraison en cérémonie, disponibilités à jour."],
              ["Décembre", "Fêtes de fin d'année, compositions de saison, et préparation du bilan annuel."],
            ].map(([month, body]) => (
              <li key={month} className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
                <h3 className="step-num text-lg">{month}</h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            eyebrow="Vos questions"
            title="Engagement, pannes, reprise de l'existant"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            L&apos;accompagnement complet avec SEO local actif correspond à
            l&apos;offre Croissance — voir{" "}
            <Link href="/services">le détail des offres</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="maintenance_footer"
        title="Votre site est en ligne mais laissé à lui-même ?"
        lede="Le diagnostic gratuit fait le point sur son état technique, sa visibilité et ce qu'un accompagnement changerait. Sans engagement."
      />
    </>
  );
}
