import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EditorialList } from "@/components/ui/EditorialList";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteGallery } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Création de site internet et e-commerce sur mesure",
  description:
    "Sites vitrines et boutiques en ligne conçus sur mesure : identité propre, mobile impeccable, contenus que vous modifiez seul et référencement local solide.",
  path: "/sites-internet",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Sites internet", path: "/sites-internet" },
];

/**
 * Page produit « Sites internet », niveau générique.
 *
 * Elle existe parce que la navigation croise deux axes — ce que nous
 * construisons et pour quel métier. Jusqu'ici, la seule page « site » était
 * `/fleuristes/site-internet` : un fondateur ou un commerçant non fleuriste
 * n'avait aucune porte d'entrée produit. Cette page porte le discours
 * générique et renvoie vers la déclinaison métier quand elle existe.
 */

const livrables = [
  {
    title: "Une identité qui vous appartient",
    body: "Couleurs, typographies et ton dérivés de votre commerce réel, pas d'un thème acheté. Deux clients n'ont jamais le même site — c'est la raison d'être d'un studio plutôt que d'un éditeur de gabarits.",
  },
  {
    title: "Un mobile qui n'est pas une réduction",
    body: "La majorité de vos visiteurs arrivent du téléphone, souvent depuis une fiche Google. Le mobile est composé pour lui-même : appeler, trouver l'adresse ou commander tient en deux gestes.",
  },
  {
    title: "Des contenus que vous modifiez seul",
    body: "Horaires, photos, prix, fermetures, actualités : tout ce qui change souvent se change sans nous, sans ticket et sans facture. Formation d'une heure comprise à la livraison.",
  },
  {
    title: "La vente en ligne, au niveau que vous tiendrez",
    body: "D'un simple formulaire de commande jusqu'au catalogue avec paiement, créneaux de retrait et zones de livraison. Le bon niveau est celui que vous saurez tenir toute l'année, pas le plus complet.",
  },
  {
    title: "Des fondations que Google comprend",
    body: "Structure, vitesse, données structurées, cohérence avec votre fiche d'établissement. C'est invisible sur une maquette et déterminant six mois plus tard.",
  },
  {
    title: "Un site qui vous reste",
    body: "Nom de domaine à votre nom, contenus et code transférables. Si nous cessons de travailler ensemble, vous partez avec votre site — c'est écrit dans le devis.",
  },
];

const faq = [
  {
    question: "Combien de temps, et comment ça se passe ?",
    answer: (
      <p>
        Environ quatre semaines pour un site vitrine, en quatre jalons que
        vous validez : cadrage, direction visuelle, construction, lancement.
        Le détail est sur <Link href="/methode">notre méthode</Link>.
      </p>
    ),
  },
  {
    question: "Combien ça coûte ?",
    answer: (
      <p>
        Sur devis, après un échange sur votre situation réelle — le devis
        détaille ligne par ligne ce qui est inclus. Voir{" "}
        <Link href="/services">les offres</Link>{" "}pour l&apos;ordre de
        grandeur de chaque formule.
      </p>
    ),
  },
  {
    question: "Vous ne travaillez qu'avec des fleuristes ?",
    answer: (
      <p>
        Non. C&apos;est le métier que nous connaissons le mieux — nous
        construisons aussi <a href="https://bloomy.one">Bloomy</a>{" "}avec des
        fleuristes — mais nous livrons pour d&apos;autres commerces et
        d&apos;autres métiers visuels. Voir{" "}
        <Link href="/salons-de-coiffure">salons de coiffure</Link>{" "}et{" "}
        <Link href="/realisations">les réalisations</Link>.
      </p>
    ),
  },
  {
    question: "J'ai déjà un site, que devient mon référencement ?",
    answer: (
      <p>
        Les adresses qui ont de la valeur sont redirigées vers leurs nouvelles
        pages plutôt que supprimées : c&apos;est ce qui évite de perdre en une
        nuit une visibilité construite pendant des années.
      </p>
    ),
  },
];

export default function SitesInternetPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site internet et e-commerce",
          description:
            "Conception de sites vitrines et de boutiques en ligne sur mesure : identité, mobile, autonomie éditoriale et référencement local.",
          path: "/sites-internet",
          serviceType: "Création de site internet",
          audience: "Commerces indépendants et métiers visuels",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Produits · Sites internet"
        title="Des sites faits pour vendre, pas pour figurer"
        lede={
          <>
            Vitrine ou boutique en ligne, conçue autour de votre commerce
            plutôt que d&apos;un gabarit — et que vous pilotez vous-même une
            fois livrée.
          </>
        }
      />

      <section className="py-16 sm:py-24">
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow="Des sites en ligne"
            title="Ce que nous avons livré"
            lede="Des adresses publiques, pas des maquettes : chaque capture correspond à un site que vous pouvez ouvrir maintenant."
          />
          <SiteGallery className="mt-12" scope="tous" />
        </Container>
      </section>

      <section className="border-t border-hairline py-16 sm:py-24">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Ce que vous recevez"
            title="Six éléments, aucun superflu"
          />
          <EditorialList className="mt-12" items={livrables} />
        </Container>
      </section>

      {/* Déclinaisons métier : la page générique renvoie vers le vocabulaire
          du secteur dès qu'une page dédiée existe. */}
      <section className="border-t border-hairline py-16 sm:py-24">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Votre métier"
            title="Une déclinaison par secteur"
            lede="Le socle est le même ; le vocabulaire, les parcours et les saisons changent complètement d'un métier à l'autre."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              [
                "Fleuristes",
                "Saisons, deuil, mariages, click-and-collect et arrivages du matin.",
                "/fleuristes",
                "bg-tint-soie",
              ],
              [
                "Salons de coiffure",
                "Menu de prestations lisible sur mobile, réservation et recrutement.",
                "/salons-de-coiffure",
                "bg-tint-feuille",
              ],
            ].map(([nom, corps, href, tint]) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`lift group flex h-full flex-col rounded-sm border border-hairline p-7 ${tint}`}
                >
                  <h3 className="text-display-sm transition-colors group-hover:text-rose">
                    {nom}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{corps}</p>
                  <span className="plate-label mt-5 inline-flex items-center gap-1.5 text-rose">
                    Voir la page
                    <span aria-hidden="true" className="link-live-arrow">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-hairline py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            align="left"
            eyebrow="Vos questions"
            title="Avant de vous décider"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <CtaBand
        placement="sites_internet_footer"
        title="Montrez-nous votre site actuel — ou son absence"
        lede="Le diagnostic gratuit vous dit ce qui mérite d'être gardé, corrigé ou reconstruit. Sans jargon, sans engagement."
      />
    </>
  );
}
