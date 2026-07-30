import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { EditorialList } from "@/components/ui/EditorialList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShowpiece } from "@/components/visuals/ShowcaseSites";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SEO local fleuriste : Google Maps & fiche Google travaillées",
  description:
    "Référencement local pour fleuristes : fiche Google Business Profile complète, avis réguliers, pages services et données cohérentes pour être trouvé dans votre ville.",
  path: "/fleuristes/seo-local",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "SEO local", path: "/fleuristes/seo-local" },
];

const levers = [
  {
    title: "Une fiche Google complète — vraiment",
    body: "Catégorie principale exacte, services détaillés, horaires à jour (y compris jours fériés), photos récentes, attributs, zone desservie. La plupart des fiches de fleuristes sont remplies à moitié : c'est la moitié qui manque qui fait la différence.",
  },
  {
    title: "Des avis réguliers, jamais achetés",
    body: "Google valorise la fraîcheur des avis autant que leur note. Nous mettons en place une demande d'avis naturelle après les commandes — et jamais de filtrage des clients mécontents, une pratique illégale qui peut coûter très cher.",
  },
  {
    title: "Une page par service, pas une page « prestations »",
    body: "Mariage, deuil, entreprises, ateliers : chaque service a sa page dédiée sur votre site. C'est l'un des facteurs les plus puissants du référencement local — et le plus négligé.",
  },
  {
    title: "Des données cohérentes partout",
    body: "Nom, adresse, téléphone et horaires strictement identiques entre votre site, votre fiche Google et les annuaires qui comptent. Les incohérences sèment le doute chez Google comme chez vos clients.",
  },
  {
    title: "Un site techniquement irréprochable",
    body: "Vitesse mobile, données structurées, pages comprises par Google : le socle technique de votre site alimente directement votre visibilité locale. Les deux se construisent ensemble.",
  },
  {
    title: "Une mesure honnête, chaque mois",
    body: "Appels depuis la fiche, itinéraires lancés, visites du site, commandes : un rapport lisible en cinq minutes, pas un export de quarante pages. Vous voyez ce qui progresse et ce qu'on fait ensuite.",
  },
];

const faq = [
  {
    question: "En combien de temps voit-on des résultats ?",
    answer: (
      <p>
        Les corrections de fiche Google produisent leurs premiers effets en
        quelques semaines ; le travail de fond (pages services, avis, contenu)
        se mesure sur trois à six mois. Quiconque vous promet la première
        position en quinze jours vous ment — Google lui-même l&apos;écrit. Nous
        montrons la progression réelle, chiffres à l&apos;appui, chaque mois.
      </p>
    ),
  },
  {
    question: "Ma fiche Google existe déjà. Ça ne suffit pas ?",
    answer: (
      <p>
        Exister n&apos;est pas être choisi. Entre deux fleuristes à distance
        égale, Google favorise la fiche la plus complète, la plus active et la
        plus cohérente avec son site. Et le client, lui, choisit celle qui a
        des photos récentes, des avis frais et des horaires fiables. Le
        diagnostic gratuit vous dit exactement où en est la vôtre.
      </p>
    ),
  },
  {
    question: "Le SEO local fonctionne-t-il sans site internet ?",
    answer: (
      <p>
        Partiellement. La fiche Google seule peut vous faire apparaître sur
        Maps, mais elle plafonne vite : sans{" "}
        <Link href="/fleuristes/site-internet">site</Link>{" "}avec des pages
        services solides, vous laissez aux concurrents les recherches «
        fleuriste mariage », « livraison fleurs », « fleurs deuil » de votre
        ville. Les deux se renforcent — c&apos;est pour cela que nous les
        concevons ensemble.
      </p>
    ),
  },
  {
    question: "Achetez-vous des avis ou des annuaires en masse ?",
    answer: (
      <p>
        Jamais. Les avis achetés et les inscriptions massives dans des
        annuaires de faible qualité sont le meilleur moyen de se faire pénaliser
        — et de perdre la confiance de vos clients. Nous appliquons les
        recommandations publiques de Google, sérieusement et patiemment.
      </p>
    ),
  },
];

export default function SeoLocalPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "SEO local pour fleuriste",
          description:
            "Référencement local pour fleuristes : Google Business Profile, avis, pages services, cohérence des données locales et mesure mensuelle.",
          path: "/fleuristes/seo-local",
          serviceType: "Référencement local",
          audience: "Fleuristes indépendants",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · SEO local"
        title="Être le fleuriste que Google montre en premier dans votre ville"
        lede={
          <>
            Le référencement local d&apos;un fleuriste se joue sur trois
            terrains : votre fiche Google, votre site et la cohérence entre les
            deux. Nous travaillons les trois — méthodiquement, sans promesse
            magique, avec une mesure honnête des résultats. Basés à Nantes, nous
            accompagnons des boutiques partout en France.
          </>
        }
        visual={<SiteShowpiece slug="monloup" eager />}
      />

      {/* Contexte : pourquoi c'est décisif */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHead
          align="left"
                eyebrow="Pourquoi c'est décisif"
                title="« Fleuriste » se cherche d'abord sur Maps"
              />
              <p className="mt-6 leading-relaxed text-ink-soft">
                Quand quelqu&apos;un cherche un fleuriste, il tape « fleuriste »
                ou « fleuriste + votre ville » — et Google affiche d&apos;abord
                trois fiches locales avec carte, avis et itinéraire. Être dans
                ces trois-là, ou juste derrière, change concrètement le nombre
                d&apos;appels, d&apos;itinéraires et de commandes que vous
                recevez chaque semaine.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                La bonne nouvelle : la plupart des fleuristes ne travaillent pas
                sérieusement leur visibilité locale. Une fiche complète, des
                avis réguliers et des pages services bien construites suffisent
                souvent à se démarquer durablement dans une ville.
              </p>
            </div>
            <div className="rounded-sm border border-hairline bg-paper p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Aperçu — recherche locale type
              </p>
              <div className="mt-4 space-y-3" aria-hidden="true">
                <div className="rounded-full bg-cream px-4 py-2.5 text-sm text-ink-soft">
                  🔍 fleuriste mariage nantes
                </div>
                {[
                  ["Votre boutique", "4,9 ★ · avis récents · fiche complète", true],
                  ["Concurrent A", "4,2 ★ · dernières photos : 2023", false],
                  ["Concurrent B", "3,8 ★ · horaires non confirmés", false],
                ].map(([name, sub, you]) => (
                  <div
                    key={name as string}
                    className={`flex items-center gap-3 rounded-sm border px-4 py-3 ${
                      you
                        ? "border-rose bg-rose-veil/60"
                        : "border-hairline"
                    }`}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full text-sm ${
                        you ? "bg-rose text-cream" : "bg-cream text-ink-soft"
                      }`}
                    >
                      ✦
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-ink-soft">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-faint">
                Illustration de principe — aucun classement n&apos;est garanti.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-hairline bg-paper py-16 sm:py-24">
        <Container>
          <SectionHead
          align="split"
            eyebrow="Notre travail"
            title="Six leviers, appliqués sans raccourci"
            lede="Rien d'ésotérique : les fondamentaux publics du référencement local, appliqués avec la rigueur que la plupart des prestataires s'épargnent."
          />
          <EditorialList className="mt-12" items={levers} />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
          align="left"
            eyebrow="Vos questions"
            title="Parlons franchement de Google"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Pour comprendre le sujet en profondeur :{" "}
            <Link href="/blog/apparaitre-google-maps-fleuriste">
              comment apparaître sur Google Maps quand on est fleuriste
            </Link>
            . Le SEO local s&apos;entretient dans la durée — voir{" "}
            <Link href="/fleuristes/maintenance">notre accompagnement</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="seo_local_footer"
        title="Où en est votre visibilité locale, honnêtement ?"
        lede="Le diagnostic gratuit analyse votre fiche Google, votre site et votre position face aux fleuristes voisins. Vous repartez avec des actions concrètes — même sans travailler avec nous."
      />
    </>
  );
}
