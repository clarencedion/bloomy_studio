import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EditorialList } from "@/components/ui/EditorialList";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BloomyAppShot } from "@/components/visuals/ProductShot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Micro SaaS : nos propres produits, en abonnement",
  description:
    "Bloomy Studio construit et exploite ses propres logiciels. Le premier est Bloomy, plateforme florale en production : vous vous abonnez plutôt que de financer un développement.",
  path: "/micro-saas",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Micro SaaS", path: "/micro-saas" },
];

/**
 * Micro SaaS — la troisième façon de travailler avec le studio.
 *
 * Honnêteté d'inventaire : **un seul** de ces produits est en production
 * aujourd'hui, bloomy.one. La page ne parle donc jamais d'un « catalogue » ni
 * d'une « suite ». Elle explique le modèle, montre le produit qui existe, et
 * dit clairement ce qui n'existe pas encore. Aucun autre nom de produit, aucun
 * chiffre qui ne soit déjà publié sur bloomy.one.
 */

const modele = [
  {
    title: "Vous vous abonnez, vous ne financez pas",
    body: "Un développement sur mesure se paie une fois, cher, et vieillit à vos frais. Un produit que nous exploitons déjà se paie au mois : le coût d'entrée est faible, et les évolutions profitent à tout le monde en même temps.",
  },
  {
    title: "Nous le faisons tourner, pas seulement livré",
    body: "Hébergement, sécurité, mises à jour, corrections : c'est notre produit, donc c'est notre travail. Vous n'avez pas de prestataire à relancer parce que le logiciel est aussi le nôtre.",
  },
  {
    title: "Ce que nous apprenons revient dans nos prestations",
    body: "Exploiter un produit face à de vrais utilisateurs nous apprend des choses qu'aucune mission ne nous apprendrait — sur les paiements, les commandes, les pics de saison. C'est ce qui nourrit les sites que nous livrons.",
  },
];

const faq = [
  {
    question: "Combien de produits proposez-vous aujourd'hui ?",
    answer: (
      <p>
        Un seul en production : <a href="https://bloomy.one">Bloomy</a>. Nous
        préférons le dire franchement plutôt que d&apos;afficher une gamme qui
        n&apos;existe pas. D&apos;autres idées sont à l&apos;étude, mais tant
        qu&apos;elles ne sont pas devant de vrais utilisateurs, elles
        n&apos;ont rien à faire sur cette page.
      </p>
    ),
  },
  {
    question: "Quelle différence avec l'offre MVP ?",
    answer: (
      <p>
        Le <Link href="/developpement-mvp">MVP</Link>{" "}est une prestation :
        vous êtes propriétaire du produit et nous le construisons pour vous. Le
        micro SaaS est l&apos;inverse — le produit est le nôtre, vous
        l&apos;utilisez en abonnement. L&apos;un s&apos;adresse à un fondateur,
        l&apos;autre à un commerçant qui veut l&apos;outil sans le projet.
      </p>
    ),
  },
  {
    question: "Et si j'ai besoin d'une fonction qui n'existe pas ?",
    answer: (
      <p>
        Dites-le-nous. Si le besoin est partagé par d&apos;autres commerçants,
        il rejoint la feuille de route du produit. S&apos;il vous est vraiment
        propre, c&apos;est un projet sur mesure — et là, on parle plutôt
        d&apos;un <Link href="/fleuristes/site-internet">site</Link>{" "}ou
        d&apos;un <Link href="/developpement-mvp">MVP</Link>.
      </p>
    ),
  },
];

export default function MicroSaasPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Produits · Micro SaaS"
        title="Nos propres produits, plutôt qu'un devis de plus"
        lede={
          <>
            Nous ne faisons pas que livrer des sites : nous construisons et
            exploitons nos propres logiciels. Vous vous abonnez à quelque chose
            qui tourne déjà, au lieu de financer un développement qui reste à
            écrire.
          </>
        }
      />

      {/* Le produit réel, montré tel qu'il est */}
      <section className="border-b border-hairline bg-tint-soie py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
            <div>
              <p className="plate-label">Le produit en production</p>
              <h2 className="text-display-lg mt-4">Bloomy</h2>
              <p className="lede mt-5 max-w-lg">
                Une plateforme où l&apos;on compose son bouquet fleur par fleur
                chez un artisan proche, avec retrait en boutique ou livraison —
                et zéro commission prélevée sur le fleuriste.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
                {[
                  ["1 000+", "utilisateurs inscrits"],
                  ["0 %", "de commission artisan"],
                  ["5", "villes après Nantes"],
                ].map(([chiffre, libelle]) => (
                  <div key={libelle}>
                    <dt className="text-display-md">{chiffre}</dt>
                    <dd className="mt-1 text-[0.8rem] leading-snug text-ink-soft">
                      {libelle}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://bloomy.one"
                  className="press inline-flex min-h-12 items-center rounded-full bg-rose px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose-deep"
                >
                  Voir bloomy.one
                </a>
                <Link
                  href="/realisations/bloomy-plateforme-florale"
                  className="press inline-flex min-h-12 items-center rounded-full border border-ink/15 bg-paper px-7 py-3 font-semibold transition-colors hover:border-ink/40"
                >
                  Lire l&apos;étude de cas
                </Link>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-[19rem]">
              <BloomyAppShot />
              <figcaption className="caption mt-4 text-center">
                L&apos;application Bloomy, sur iOS et Android
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Le modèle"
            title="Pourquoi l'abonnement plutôt que le projet"
          />
          <EditorialList className="mt-12" items={modele} />
        </Container>
      </section>

      <section className="border-t border-hairline py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
            align="left"
            eyebrow="Vos questions"
            title="Ce qui existe, et ce qui n'existe pas encore"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <CtaBand
        placement="micro_saas_footer"
        title="Un besoin que notre produit ne couvre pas ?"
        lede="Dites-nous ce que vous cherchez. Si Bloomy n'est pas la bonne réponse, nous vous le dirons — et nous vous orienterons vers la bonne."
      />
    </>
  );
}
