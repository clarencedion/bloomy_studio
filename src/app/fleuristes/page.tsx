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
  title: "Agence web pour fleuristes — site, e-commerce, SEO local",
  description:
    "Bloomy Studio conçoit sites, boutiques en ligne et visibilité Google pour fleuristes indépendants. Une expertise née de la plateforme florale bloomy.one.",
  path: "/fleuristes",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
];

const seasons = [
  {
    title: "Saint-Valentin & fête des mères",
    body: "Vos deux plus gros pics de l'année se jouent en quelques jours. Pages dédiées prêtes trois semaines avant, créneaux de retrait renforcés, précommandes : le site absorbe la demande au lieu de la perdre.",
  },
  {
    title: "Mariages",
    body: "Un mariage se prépare des mois à l'avance et se choisit sur dossier. Une page mariage avec vos réalisations, votre démarche et un formulaire de brief attire des demandes qualifiées — pas des curieux.",
  },
  {
    title: "Deuil",
    body: "Les familles cherchent dans l'urgence, souvent depuis un téléphone, avec une charge émotionnelle forte. Un parcours sobre, clair, avec livraison directe en cérémonie, est un vrai service rendu.",
  },
  {
    title: "Entreprises & abonnements",
    body: "Bureaux, hôtels, restaurants : des revenus récurrents que peu de fleuristes valorisent en ligne. Une page dédiée avec demande de devis structure cette clientèle.",
  },
  {
    title: "Le quotidien",
    body: "Anniversaires, naissances, « je passe ce soir » : le client veut savoir si c'est ouvert, ce qui est disponible et si on peut lui préparer quelque chose pour 18 h. Click-and-collect et catalogue à jour répondent à ça.",
  },
  {
    title: "Le stock qui change chaque matin",
    body: "Votre catalogue n'est pas figé : arrivages, saisons, météo. Votre site doit se mettre à jour en deux minutes depuis le comptoir — pas via un ticket à votre prestataire.",
  },
];

const pillars = [
  {
    title: "Un site à la hauteur de votre boutique",
    body: "Identité visuelle propre à votre maison, photos mises en valeur, textes qui parlent votre langue. Rapide et impeccable sur mobile — là où vos clients vous cherchent.",
    href: "/fleuristes/site-internet",
    label: "Création de site pour fleuriste",
  },
  {
    title: "Vendre en ligne sans reverser de commission",
    body: "Catalogue saisonnier, click-and-collect avec créneaux, livraison locale par zones, paiement sécurisé. Chaque commande passée sur votre site est une commande que les plateformes ne prélèvent pas.",
    href: "/fleuristes/e-commerce",
    label: "E-commerce & click-and-collect",
  },
  {
    title: "Être trouvé sur Google et Google Maps",
    body: "Fiche Google Business Profile complète et cohérente avec votre site, pages services dédiées, stratégie d'avis régulière : les fondamentaux du référencement local, appliqués sérieusement.",
    href: "/fleuristes/seo-local",
    label: "SEO local pour fleuriste",
  },
  {
    title: "Un site vivant, pas un site livré",
    body: "Mises à jour, sauvegardes, pages saisonnières préparées avant les pics, rapport mensuel lisible. Vous savez ce qui se passe et ce que ça rapporte.",
    href: "/fleuristes/maintenance",
    label: "Maintenance & accompagnement",
  },
];

const faq = [
  {
    question: "Mon stock change tous les jours. Comment un site peut-il suivre ?",
    answer: (
      <p>
        C&apos;est précisément pour cela que nous ne vendons pas de catalogue
        figé. Vous gérez des disponibilités : un bouquet passe « épuisé » en un
        geste, une nouvelle création se publie depuis le téléphone, et les
        gammes de prix (« bouquet du marché dès 25 € ») évitent de photographier
        chaque composition. Voir{" "}
        <Link href="/fleuristes/e-commerce">notre approche e-commerce</Link>.
      </p>
    ),
  },
  {
    question: "Que penser des grandes plateformes de transmission florale ?",
    answer: (
      <p>
        Elles apportent des commandes, mais au prix de commissions importantes
        et d&apos;un catalogue standardisé qui efface votre identité. Notre
        position est pragmatique : gardez-les si elles vous rapportent, mais
        construisez en parallèle un canal qui vous appartient — votre site, vos
        prix, vos marges, vos clients. C&apos;est la conviction qui a fondé{" "}
        <a href="https://bloomy.one">Bloomy</a>{" "}: 0 % de commission pour
        l&apos;artisan.
      </p>
    ),
  },
  {
    question: "Je n'ai pas de belles photos de mes créations.",
    answer: (
      <p>
        C&apos;est le cas de la plupart de nos interlocuteurs, et ça se résout.
        Nous concevons d&apos;abord un site qui met en valeur des photos
        simples prises au téléphone dans de bonnes conditions — nous vous
        montrons comment. Et si vous voulez aller plus loin, la direction photo
        fait partie de <Link href="/services">nos services complémentaires</Link>.
      </p>
    ),
  },
  {
    question: "En combien de temps mon site peut-il être en ligne ?",
    answer: (
      <p>
        Un site vitrine soigné : environ quatre semaines. Une boutique en ligne
        complète : six à huit semaines selon le catalogue. Si vous visez un pic
        (Saint-Valentin, fête des mères), parlons-en tôt : nous planifions pour
        que le site travaille pendant le pic, pas qu&apos;il sorte juste après.
      </p>
    ),
  },
];

export default function FleuristesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Services digitaux pour fleuristes",
          description:
            "Création de site internet, e-commerce, click-and-collect et SEO local pour fleuristes indépendants.",
          path: "/fleuristes",
          serviceType: "Création de site internet et SEO local pour fleuristes",
          audience: "Fleuristes indépendants",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes"
        title={
          <>
            Votre boutique mérite mieux qu&apos;un template — et mieux
            qu&apos;une commission.
          </>
        }
        lede={
          <>
            Nous construisons des sites e-commerce et une visibilité locale
            pour fleuristes indépendants. Pas une déclinaison « métiers de
            bouche et artisans » : une spécialisation née en créant{" "}
            <a href="https://bloomy.one">bloomy.one</a>, la plateforme de
            composition florale, aux côtés de vrais artisans.
          </>
        }
      />

      {/* La vitrine avant l'argumentaire : sur la page où un fleuriste décide,
          montrer le travail vaut mieux que le décrire. Les trois captures sont
          montrées entières — sur un pilier, on a la place de tout voir. */}
      <section className="border-b border-hairline bg-cream-deep py-14 sm:py-20">
        <Container width="wide">
          <SectionHead
            eyebrow="Sites livrés"
            title="Quatre boutiques, quatre univers"
            lede="Aucun modèle décliné : chaque site part de la boutique, de ses matières et de sa façon de vendre."
          />
          <SiteGallery className="mt-12" />
        </Container>
      </section>

      {/* Preuve de compréhension métier */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Votre métier, pas un secteur"
            title="Un site de fleuriste se pense autour de vos vraies journées"
            lede="Un prestataire généraliste voit un « commerce de détail ». Nous voyons des arrivages du matin, des pics saisonniers, des mariages sur dossier et des familles en deuil qui commandent depuis un téléphone."
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {seasons.map((s) => (
              <article key={s.title} className="border-t border-hairline pt-5">
                <h3 className="text-display-sm">{s.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Les 4 piliers → spokes */}
      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Ce que nous construisons"
            title="Le système complet, brique par brique"
            lede="Chaque brique a sa page dédiée — parce que chaque sujet mérite mieux que trois lignes dans une liste."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col rounded-sm border border-hairline bg-cream p-7 transition-colors hover:border-rose"
              >
                <h3 className="text-display-md transition-colors group-hover:text-rose">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{p.body}</p>
                <span className="mt-5 font-semibold text-rose">
                  {p.label} →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Indépendance — angle différenciant */}
      <section className="on-ink bg-plum py-16 text-cream sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHead
              eyebrow="Notre conviction"
              title="Votre canal en propre d'abord, les plateformes ensuite"
              align="center"
            />
            <p className="mt-6 text-left leading-relaxed text-cream/75 sm:text-center">
              La transmission florale prélève sa marge sur chaque bouquet et
              standardise votre catalogue. Nous avons construit Bloomy sur le
              principe inverse — 0 % de commission pour l&apos;artisan — et
              votre site suit la même logique : vos commandes vous appartiennent
              entièrement. Un site en propre ne remplace pas votre présence
              ailleurs ; il vous rend le choix.
            </p>
            <p className="prose-links mt-8 text-sm text-cream/60">
              Pour approfondir :{" "}
              <Link
                href="/blog/marketplace-ou-site-en-propre"
                className="text-cream underline underline-offset-4 hover:text-rose-veil"
              >
                marketplace ou site en propre, le vrai calcul
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            eyebrow="Vos questions"
            title="Questions de fleuristes, réponses concrètes"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            À lire aussi :{" "}
            <Link href="/blog/site-internet-fleuriste-checklist">
              que doit contenir le site d&apos;un fleuriste ?
            </Link>{" "}
            et{" "}
            <Link href="/blog/apparaitre-google-maps-fleuriste">
              comment apparaître sur Google Maps
            </Link>
            .
          </p>
        </Container>
      </section>

      <CtaBand
        placement="fleuristes_footer"
        title="Commençons par un diagnostic honnête de votre présence en ligne"
        lede="Site actuel, fiche Google, visibilité locale face à vos concurrents : vous recevez une analyse humaine et concrète, gratuite et sans engagement."
      />
    </>
  );
}
