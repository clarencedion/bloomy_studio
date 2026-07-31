import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteCardSingle, SiteShowpiece } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Création de site internet pour fleuriste, sur mesure",
  description:
    "Un site de fleuriste conçu sur mesure : identité propre, mobile impeccable, pages services qui convertissent et contenus que vous modifiez vous-même.",
  path: "/fleuristes/site-internet",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "Site internet", path: "/fleuristes/site-internet" },
];

const deliverables = [
  {
    title: "Une identité qui vous ressemble",
    body: "Couleurs, typographies et ton choisis à partir de votre boutique réelle — pas d'un thème acheté. Deux fleuristes clients n'auront jamais le même site.",
  },
  {
    title: "Des pages services qui travaillent",
    body: "Mariage, deuil, entreprises, ateliers : chaque prestation a sa page dédiée, avec le bon vocabulaire et le bon appel à l'action. C'est aussi le premier levier de visibilité locale.",
  },
  {
    title: "Un mobile réellement premium",
    body: "L'essentiel de vos visiteurs arrive du téléphone, souvent depuis votre fiche Google. Horaires, itinéraire, appel, commande : tout est accessible en deux gestes.",
  },
  {
    title: "Des contenus que vous maîtrisez",
    body: "Horaires, photos, fermetures, prix, actualités : vous modifiez tout vous-même, sans nous attendre ni payer de ticket. Formation incluse à la livraison.",
  },
  {
    title: "Une base technique rapide et saine",
    body: "Chargement rapide, images optimisées, structure comprise par Google, sécurité et sauvegardes. L'invisible qui fait la différence durable — un visiteur qui attend ne devient jamais un client.",
  },
  {
    title: "La connexion à votre fiche Google",
    body: "Site et fiche Google Business Profile racontent la même chose : mêmes horaires, mêmes services, même adresse. Cette cohérence est un fondement du référencement local, détaillé sur notre page dédiée.",
  },
];

const faq = [
  {
    question: "Pourquoi pas un site Wix ou un template à 30 € ?",
    answer: (
      <p>
        Vous pouvez tout à fait démarrer ainsi — beaucoup le font. Les limites
        arrivent vite : un design partagé avec des centaines de commerces, des
        performances moyennes sur mobile, un référencement local difficile à
        travailler sérieusement, et un temps considérable passé à bricoler.
        Notre travail se compare au vôtre : une composition sur mesure ne joue
        pas dans la même catégorie qu&apos;un bouquet de station-service.
      </p>
    ),
  },
  {
    question: "Le site m'appartient-il vraiment ?",
    answer: (
      <p>
        Oui : nom de domaine à votre nom, contenus et photos à vous, code et
        hébergement transférables. Si nous cessons de travailler ensemble, vous
        partez avec votre site — c&apos;est écrit dans nos devis.
      </p>
    ),
  },
  {
    question: "Et si je veux vendre en ligne plus tard ?",
    answer: (
      <p>
        Le site vitrine est construit sur la même base que{" "}
        <Link href="/fleuristes/e-commerce">notre offre e-commerce</Link>{" "}:
        ajouter le catalogue, le click-and-collect et le paiement se fait sans
        refonte. Beaucoup de nos échanges commencent par un site vitrine et
        grandissent ensuite.
      </p>
    ),
  },
  {
    question: "J'ai déjà un site, qu'est-ce qui se passe pour Google ?",
    answer: (
      <p>
        Les pages qui ont de la valeur (celles que Google connaît déjà, celles
        que vos clients ont mises en favori) sont redirigées vers leur
        nouvelle adresse plutôt que supprimées — c&apos;est ce qui évite de
        perdre en une nuit une visibilité construite pendant des années.
      </p>
    ),
  },
  {
    question: "Combien ça coûte ?",
    answer: (
      <p>
        Sur devis, après un échange sur votre situation — voir{" "}
        <Link href="/services">le détail des offres</Link>. Le devis liste
        précisément ce qui est inclus. Pour vous faire une idée du marché,
        lisez aussi notre article{" "}
        <Link href="/blog/site-internet-fleuriste-checklist">
          sur ce que doit contenir un site de fleuriste
        </Link>
        .
      </p>
    ),
  },
];

export default function SiteInternetPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Création de site internet pour fleuriste",
          description:
            "Conception de sites sur mesure pour fleuristes : identité visuelle, pages services, mobile premium, SEO de base et autonomie de mise à jour.",
          path: "/fleuristes/site-internet",
          serviceType: "Création de site internet",
          audience: "Fleuristes indépendants",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · Site internet"
        title="Un site de fleuriste sur mesure, à la hauteur de votre vitrine"
        lede={
          <>
            La création d&apos;un site internet pour fleuriste ne consiste pas à
            poser vos photos dans un template. Nous concevons un site qui
            raconte votre maison, guide vers la commande et pose les fondations
            de votre <Link href="/fleuristes/seo-local">visibilité locale</Link>.
          </>
        }
        visual={<SiteShowpiece slug="maison-hortense" eager />}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHead
          align="split"
                eyebrow="Ce que vous recevez"
                title="Six éléments, aucun superflu"
                lede="Chaque élément répond à un problème que nous avons observé chez de vrais fleuristes — pas à une case de plaquette commerciale."
              />
              <p className="mt-6 leading-relaxed text-ink-soft">
                Votre boutique physique est votre meilleur argument : lumière,
                odeurs, compositions du jour. Le site a un seul travail —
                prolonger cette impression chez quelqu&apos;un qui ne vous
                connaît pas encore, puis l&apos;amener à pousser votre porte ou
                à commander.
              </p>
            </div>
            <SiteCardSingle index={0} />
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <article key={d.title} className="border-t border-hairline pt-5">
                <h3 className="text-display-sm">{d.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
          <p className="prose-links mt-12 max-w-2xl leading-relaxed text-ink-soft">
            Ce site convient aux boutiques qui vendent déjà au comptoir et
            veulent qu&apos;on cesse de leur faire honte en ligne — la vitrine
            d&apos;abord, la vente en ligne ensuite si le besoin se confirme.
            Si commander depuis le site est votre priorité immédiate dès le
            lancement, notre offre{" "}
            <Link href="/fleuristes/e-commerce">e-commerce</Link>{" "}est le
            point de départ le plus direct.
          </p>
        </Container>
      </section>

      <section className="border-y border-hairline bg-sage-veil/50 py-16 sm:py-24">
        <Container>
          <SectionHead
          align="left"
            eyebrow="Le déroulé"
            title="Quatre semaines, quatre jalons validés ensemble"
          />
          <ol className="mt-10 space-y-0 divide-y divide-hairline border-y border-hairline">
            {[
              [
                "Semaine 1 — Cadrage",
                "Visite (ou visio) de votre boutique, revue de vos services et de votre clientèle, collecte des contenus existants. Vous validez l'architecture des pages avant qu'une seule ligne de design ne soit dessinée.",
              ],
              [
                "Semaine 2 — Direction visuelle",
                "Deux pistes d'identité, appliquées à votre page d'accueil réelle plutôt qu'à une maquette abstraite. Vous choisissez, nous affinons jusqu'à ce que ça vous ressemble vraiment.",
              ],
              [
                "Semaine 3 — Construction",
                "Toutes les pages sont montées avec vos contenus réels, pas du texte de remplissage. Vous suivez l'avancement sur un lien privé, à votre rythme.",
              ],
              [
                "Semaine 4 — Lancement",
                "Tests mobiles, connexion de la fiche Google, mise en ligne, formation d'une heure sur votre propre contenu. Le site est à vous, avec ses accès.",
              ],
            ].map(([t, b]) => (
              <li key={t} className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-semibold">{t}</h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">{b}</p>
              </li>
            ))}
          </ol>
          <p className="prose-links mt-8 text-sm text-ink-soft">
            La version détaillée de ce processus :{" "}
            <Link href="/methode">notre méthode</Link>.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
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
        placement="site_internet_footer"
        title="Montrez-nous votre site actuel — ou dites-nous qu'il n'existe pas"
        lede="Le diagnostic gratuit vous dit ce qui mérite d'être gardé, corrigé ou reconstruit. Sans jargon, sans engagement."
      />
    </>
  );
}
