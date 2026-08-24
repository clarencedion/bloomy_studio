import Link from "next/link";

import {
  RamonageBookingModal,
  RamonageBookingTrigger,
} from "@/components/forms/RamonageBookingModal";
import { RamonageShowcasePreview } from "@/components/ramonage/RamonageShowcasePreview";
import { RamonageSimulator } from "@/components/ramonage/RamonageSimulator";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EditorialList } from "@/components/ui/EditorialList";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Création de site pour ramoneur, réservation & tournées",
  description:
    "Sites pour ramoneurs et fumistes : prise de rendez-vous en ligne, tournées par commune, certificat dématérialisé et SEO local Google Maps.",
  path: "/ramonage",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Ramoneurs", path: "/ramonage" },
];

const features = [
  {
    title: "Prise de rendez-vous en ligne par type de conduit",
    body: "Fini les appels manqués pendant que vous êtes sur une échelle ou un toit. Vos clients sélectionnent leur appareil (poêle à bois, granulés/pellets, insert, cheminée ouverte, chaudière) et réservent en 45 secondes selon vos disponibilités.",
  },
  {
    title: "Optimisation de vos tournées par commune",
    body: "Vos créneaux de passage sont automatiquement regroupés par secteur géographique ou jour de semaine. Vous évitez les kilomètres inutiles, économisez du carburant et augmentez le nombre d'interventions par journée.",
  },
  {
    title: "Attestation et certificat de ramonage dématérialisé",
    body: "Émettez des certificats conformes à la réglementation (décret 2023 / Règlement Sanitaire Départemental) en quelques clics depuis votre smartphone. Votre client reçoit son attestation immédiatement pour son assurance habitation.",
  },
  {
    title: "Relances automatiques annuelles (SMS & e-mail)",
    body: "Le ramonage est obligatoire chaque année. Votre site relance automatiquement vos anciens clients à la fin de l'été pour bloquer leurs rendez-vous avant la saturation de la saison de chauffe, sans aucun démarchage manuel.",
  },
  {
    title: "Visibilité locale Google Maps ultra-ciblée",
    body: "Positionnez votre entreprise en tête sur les recherches stratégiques de votre secteur (« ramoneur Nantes », « ramonage poêle à granulés Rezé », « débistrage 44 ») avec une fiche Google My Business optimisée et synchronisée.",
  },
  {
    title: "Grille tarifaire claire et forfaits sans surprise",
    body: "Affichez vos forfaits de ramonage, débistrage et diagnostic en toute transparence. Vous rassurez les propriétaires, filtrez les demandes hors zone et gagnez du temps sur les devis répétitifs.",
  },
  {
    title: "Mise en avant du débistrage et chantiers techniques",
    body: "Valorisez vos équipements professionnels (débistreuse mécanique rotative, inspection vidéo par caméra, tubage inox) pour capter des chantiers à plus forte valeur ajoutée.",
  },
  {
    title: "Multi-techniciens et gestion d'équipe",
    body: "Si vous employez plusieurs ramoneurs, le planning répartit automatiquement les interventions par technicien ou par camion pour une coordination sans accroc.",
  },
];

const faq = [
  {
    question: "Comment cela s'articule-t-il avec mon agenda actuel (Google Agenda, Outlook…) ?",
    answer: (
      <p>
        Le site se connecte directement à votre outil de calendrier habituel. Dès
        qu&apos;un créneau est réservé par un client ou bloqué manuellement sur
        votre téléphone, votre planning s&apos;actualise en temps réel pour
        empêcher tout doublon.
      </p>
    ),
  },
  {
    question: "Que faire pour les clients qui préfèrent appeler ?",
    answer: (
      <p>
        Le site conserve un bouton d&apos;appel direct bien visible sur mobile. La
        réservation en ligne absorbe les demandes des clients connectés en soirée
        et le week-end, tout en laissant les personnes qui le souhaitent vous
        joindre par téléphone.
      </p>
    ),
  },
  {
    question: "Comment empêcher les réservations en dehors de mon secteur d'intervention ?",
    answer: (
      <p>
        Le formulaire vérifie automatiquement le code postal ou la commune du
        client. En dehors de votre rayon d&apos;action défini, la réservation est
        refusée poliment ou bascule sur une demande de devis avec frais de
        déplacement.
      </p>
    ),
  },
  {
    question: "En combien de temps notre site peut-il être mis en ligne ?",
    answer: (
      <p>
        En moyenne 2 à 4 semaines grâce à notre{" "}
        <Link href="/methode">méthode</Link>{" "}jalonnée : structure, rédaction des
        contenus spécialisés, paramétrage de vos forfaits et mise en ligne avant
        le démarrage de votre pic d&apos;activité d&apos;automne.
      </p>
    ),
  },
];

export default function RamonagePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site pour ramoneur et fumiste",
          description:
            "Conception de sites internet spécialisés pour artisans ramoneurs et entreprises de fumisterie : réservation en ligne, gestion des tournées, certificats et visibilité locale.",
          path: "/ramonage",
          serviceType: "Création de site internet spécialisé",
          audience: "Ramoneurs et entreprises de fumisterie",
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Ramoneurs & Fumistes"
        title="Moins d'appels sur les toits, des tournées pleines tout l'automne."
        lede={
          <>
            Nous concevons des sites spécialisés pour ramoneurs et fumistes :
            prise de rendez-vous en ligne par type de conduit, regroupement des
            tournées par commune, certificats dématérialisés et référencement
            local de proximité.
          </>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <RamonageBookingTrigger variant="primary">
            Prendre rendez-vous / Échanger
          </RamonageBookingTrigger>
          <Link
            href="#fonctionnalites"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-rose hover:text-rose"
          >
            Découvrir les fonctionnalités ↓
          </Link>
        </div>
      </PageHero>

      {/* Section 1 : Ce que nous construisons */}
      <section id="fonctionnalites" className="py-16 sm:py-24">
        <Container>
          <SectionHead
            align="split"
            eyebrow="Ce que cela inclut"
            title="Huit atouts pensés pour le quotidien d'un ramoneur"
            lede="Un artisan ramoneur passe ses journées en déplacement et sur les toits. Votre site doit travailler pour vous : filtrer les demandes, organiser vos trajets et fidéliser vos clients d'une année sur l'autre."
          />
          <EditorialList className="mt-12" items={features} />
        </Container>
      </section>

      {/* Section 2 : Démonstration interactive */}
      <section className="border-y border-hairline bg-cream-deep py-16 sm:py-24">
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow="Démonstration"
            title="La réservation simplifiée pour vos clients particuliers"
            lede="Testez le parcours que vos clients suivront pour réserver leur ramonage. En 3 étapes, le rendez-vous est calé et le dossier d'intervention est prêt."
            className="mb-12"
          />
          <RamonageSimulator />
        </Container>
      </section>

      {/* Section 3 : Aperçu visuel du futur site */}
      <section className="py-16 sm:py-24">
        <Container width="wide">
          <SectionHead
            align="split"
            eyebrow="Univers visuel"
            title="Une présence digitale moderne et rassurante"
            lede="Finis les sites génériques et vieillots. Offrez à votre entreprise de ramonage une image professionnelle et soignée qui inspire immédiatement confiance aux propriétaires."
            className="mb-12"
          />
          <RamonageShowcasePreview />
        </Container>
      </section>

      {/* Section 4 : FAQ */}
      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            align="left"
            eyebrow="Vos questions"
            title="Ce que les artisans ramoneurs nous demandent"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Vous souhaitez analyser votre présence actuelle ? Consultez notre{" "}
            <Link href="/audit">diagnostic gratuit</Link>{" "}ou découvrez notre{" "}
            <Link href="/methode">méthode de travail</Link>.
          </p>
        </Container>
      </section>

      {/* Section 5 : CTA Band & Modale de RDV */}
      <CtaBand
        placement="ramonage_footer"
        title="Prêt à automatiser vos prises de rendez-vous pour la saison ?"
        lede="Échangeons pendant 15 minutes sur votre secteur, vos tarifs et vos objectifs. Gratuit, direct et sans engagement."
      />

      {/* Modale accessible pour prise de RDV ramoneur */}
      <RamonageBookingModal />
    </>
  );
}
