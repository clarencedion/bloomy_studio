import Link from "next/link";
import {
  CalendarCheck,
  ChartLineUp,
  PencilSimpleLine,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { FaqBlock } from "@/components/fleuristes/FaqBlock";
import { HeroActions } from "@/components/fleuristes/HeroActions";
import { InkWords } from "@/components/fleuristes/InkWords";
import { PhoneShot } from "@/components/fleuristes/PhoneShot";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getShowcaseSite } from "@/lib/portfolio";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Maintenance de site fleuriste : vivant, pas livré-oublié",
  description:
    "Maintenance et accompagnement pour fleuristes : mises à jour, sauvegardes, pages saisonnières prêtes avant les pics et rapport mensuel lisible.",
  path: "/fleuristes/maintenance",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "Maintenance", path: "/fleuristes/maintenance" },
];

/* Ouverture : un site de fleuriste en ligne, sur téléphone. Aucune
   affirmation sur la maintenance de ce client : c'est le site tel qu'il
   s'affiche aujourd'hui. */
const heroSite = getShowcaseSite("kl-fleurs");

/** Les engagements mensuels, en grille 2 × 2 à teintes croisées. */
const commitments: { icon: Icon; title: string; body: string; tone: string }[] = [
  {
    icon: ShieldCheck,
    title: "Le socle technique, surveillé",
    body: "Mises à jour de sécurité, sauvegardes automatiques, surveillance de disponibilité et de vitesse. Si quelque chose casse un dimanche de fête des mères, nous le savons avant vous. Le nom de domaine et le certificat de sécurité sont renouvelés avant échéance, jamais découverts expirés après coup.",
    tone: "bg-blush",
  },
  {
    icon: PencilSimpleLine,
    title: "Les petites évolutions, sans devis surprise",
    body: "Changer une photo, ajouter une prestation, corriger un texte\u00a0: les demandes courantes sont incluses dans le forfait, avec un délai annoncé le jour même. Les évolutions plus lourdes (une nouvelle page, une fonctionnalité) font l'objet d'un chiffrage clair, avant de commencer.",
    tone: "border border-line bg-white",
  },
  {
    icon: CalendarCheck,
    title: "Le calendrier floral, anticipé",
    body: "Nous connaissons vos échéances\u00a0: Saint-Valentin, fête des grands-mères, fête des mères, Toussaint. Les pages et les créneaux sont prêts trois semaines avant\u00a0: vous validez, c'est en ligne. Rien ne se découvre la veille.",
    tone: "border border-line bg-white",
  },
  {
    icon: ChartLineUp,
    title: "Un rapport mensuel qui se lit en cinq minutes",
    body: "Visites, appels, itinéraires, commandes, position locale\u00a0: l'essentiel, en français, avec ce que nous proposons de faire le mois suivant. Toujours le même jour, toujours le même format\u00a0: pas de jargon à décoder pour savoir ce que votre site vous rapporte.",
    tone: "bg-mint",
  },
];

/*
 * L'année d'un fleuriste, en frise : chaque période allume ses mois sur une
 * réglette de douze. Rose pour les pics de commandes, vert pour le travail
 * de fond. C'est un calendrier, pas une mesure : aucune donnée inventée.
 */
type Period = { label: string; months: number[]; peak: boolean; body: string };

const monthInitials = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const year: Period[] = [
  {
    label: "Janvier",
    months: [0],
    peak: false,
    body: "Bilan de l'année écoulée, préparation de la Saint-Valentin\u00a0: page dédiée, précommandes, créneaux renforcés.",
  },
  {
    label: "Février et mars",
    months: [1, 2],
    peak: true,
    body: "Pic Saint-Valentin absorbé, puis fête des grands-mères. Analyse de ce qui a fonctionné, ajustements.",
  },
  {
    label: "Avril et mai",
    months: [3, 4],
    peak: true,
    body: "Fête des mères, le plus gros pic de l'année\u00a0: offre resserrée, précommandes, logistique de retrait calibrée.",
  },
  {
    label: "Juin à septembre",
    months: [5, 6, 7, 8],
    peak: false,
    body: "Saison des mariages\u00a0: mise en avant des réalisations, page mariage enrichie, demandes de devis structurées.",
  },
  {
    label: "Octobre et novembre",
    months: [9, 10],
    peak: true,
    body: "Toussaint, traitée avec sobriété\u00a0: parcours deuil vérifié, livraison en cérémonie, disponibilités à jour.",
  },
  {
    label: "Décembre",
    months: [11],
    peak: false,
    body: "Fêtes de fin d'année, compositions de saison, et préparation du bilan annuel.",
  },
];

/** Le démarrage : une vraie chronologie, repérée par le temps, pas par un rang. */
const start = [
  {
    when: "Avant le premier mois",
    title: "Audit initial",
    body: "Sécurité, vitesse, contenus obsolètes, cohérence de la fiche Google\u00a0: nous partons d'un état des lieux complet, pas d'une supposition.",
  },
  {
    when: "Le premier mois",
    title: "L'année calée",
    body: "Le calendrier saisonnier de votre boutique est posé sur les douze mois à venir, et les évolutions en attente sont priorisées avec vous.",
  },
  {
    when: "Ensuite, chaque mois",
    title: "Rythme de croisière",
    body: "Rapport mensuel, échéances anticipées, petites évolutions traitées au fil de l'eau. C'est le mois type de l'accompagnement.",
  },
];

const faq: FaqItem[] = [
  {
    question: "Suis-je engagé sur la durée\u00a0?",
    answer: (
      <p>
        Non&nbsp;: l&apos;accompagnement est mensuel, sans engagement de longue
        durée. Notre pari est simple&nbsp;: si le rapport mensuel montre de la
        valeur, vous restez. Sinon, vous partez avec votre site, vos contenus
        et vos accès. La rétention par la qualité, pas par le contrat.
      </p>
    ),
  },
  {
    question: "Que se passe-t-il si mon site tombe en panne\u00a0?",
    answer: (
      <p>
        La surveillance nous alerte automatiquement, et les incidents critiques
        sont traités en priorité absolue, particulièrement en période de pic,
        où chaque heure compte. Les sauvegardes quotidiennes permettent de
        restaurer rapidement en cas de problème grave.
      </p>
    ),
  },
  {
    question: "Puis-je prendre la maintenance sans avoir fait mon site chez vous\u00a0?",
    answer: (
      <p>
        C&apos;est possible après un audit technique&nbsp;: nous devons savoir ce
        que nous reprenons. Si le site est sain, nous le reprenons volontiers.
        S&apos;il ne l&apos;est pas, nous vous expliquons pourquoi et ce que
        coûterait sa remise à niveau, ou sa{" "}
        <Link href="/fleuristes/site-internet">reconstruction</Link>.
      </p>
    ),
  },
  {
    question: "Combien de temps avant que l'accompagnement soit vraiment utile\u00a0?",
    answer: (
      <p>
        Dès le premier mois&nbsp;: l&apos;audit initial identifie déjà ce qui
        freine votre visibilité ou votre vitesse, et le premier rapport arrive
        avant la fin du mois. Le bénéfice s&apos;installe ensuite avec le
        calendrier&nbsp;: c&apos;est un accompagnement, pas une intervention
        ponctuelle.
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

      {/* Ouverture : un site de fleuriste en ligne, sur téléphone, posé sur
          le bord bas d'un panneau à sa couleur. Desktop : texte 7 / panneau 5.
          Mobile : texte puis panneau. */}
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · Maintenance"
        title={
          <>
            Un site de fleuriste vit au rythme des{" "}
            <span className="text-bloom-ink">saisons</span>
          </>
        }
        lede="Pages saisonnières prêtes avant les pics, sauvegardes, rapport mensuel lisible&nbsp;: votre site progresse au lieu de s'éroder."
        aside={
          heroSite?.mobile ? (
            <figure>
              <div
                className="leaf-lg overflow-hidden px-6 pt-10 sm:pt-12"
                style={{ backgroundColor: heroSite.tone }}
              >
                <div className="mx-auto -mb-24 w-[56%] max-w-[15rem] sm:-mb-28">
                  <PhoneShot
                    site={heroSite}
                    eager
                    sizes="(min-width: 1024px) 15rem, 56vw"
                  />
                </div>
              </div>
              <figcaption className="mt-5 px-1">
                <p className="text-display-sm">
                  {heroSite.name} <span className="text-forest-faint">· {heroSite.city}</span>
                </p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">
                  Version mobile, telle qu&apos;elle s&apos;affiche en ligne aujourd&apos;hui.
                </p>
                <LiveSiteLink site={heroSite} className="mt-3" />
              </figcaption>
            </figure>
          ) : null
        }
      >
        <HeroActions placement="maintenance_hero" />
      </PageHero>

      {/* Le constat, à l'encre : la phrase se remplit en traversant l'écran,
          le raisonnement suit, décalé à droite en desktop. */}
      <section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
        <Container width="wide">
          <h2 className="scroll-ink text-display-xl max-w-5xl">
            <InkWords text="Le pire moment d'un site, c'est l'année d'après." />
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6 lg:col-start-6">
              <p className="prose-links text-[1.08rem] leading-relaxed text-forest-soft">
                Le prestataire a disparu, les photos datent, la Saint-Valentin
                arrive et rien n&apos;est prêt. Notre accompagnement existe pour
                que votre <Link href="/fleuristes/site-internet">site</Link>{" "}et
                votre <Link href="/fleuristes/seo-local">visibilité locale</Link>{" "}
                progressent chaque mois au lieu de s&apos;éroder.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Quatre engagements en grille 2 × 2, teintes croisées.
          Mobile : une colonne, dans l'ordre de lecture. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-3xl">Quatre engagements, tenus chaque mois</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {commitments.map(({ icon: ItemIcon, title, body, tone }, i) => (
              <Reveal key={title} delay={(i % 2) * 80} className="flex">
                <article className={`leaf flex w-full flex-col gap-6 p-7 sm:p-10 ${tone}`}>
                  <span
                    className={`grid size-12 place-items-center rounded-full text-bloom-ink ${
                      tone.includes("bg-white") ? "bg-blush" : "bg-paper"
                    }`}
                  >
                    <ItemIcon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-display-md">{title}</h3>
                    <p className="mt-3 leading-relaxed text-forest-soft">{body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* L'année d'un fleuriste, en frise : libellé, réglette des douze mois,
          puis ce que nous préparons. Desktop : trois colonnes alignées.
          Mobile : libellé et réglette sur une ligne, texte dessous. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="max-w-3xl">
            <h2 className="text-display-lg">
              Nous travaillons avec votre calendrier, pas contre lui
            </h2>
            <p className="lede mt-6">
              Chaque échéance est préparée en amont. Voici à quoi ressemble une
              année d&apos;accompagnement type.
            </p>
          </div>

          <p className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-forest-soft">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-6 rounded-full bg-bloom" />
              Pics de commandes
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-6 rounded-full bg-forest" />
              Travail de fond
            </span>
          </p>

          <div className="mt-6 border-t border-line-strong">
            {/* Repères des mois, alignés sur les réglettes (desktop). */}
            <div
              aria-hidden="true"
              className="hidden gap-10 border-b border-line py-3 md:grid md:grid-cols-[11rem_15rem_minmax(0,1fr)]"
            >
              <span />
              <span className="grid grid-cols-12 gap-1 text-center text-[0.7rem] font-medium text-forest-faint">
                {monthInitials.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </span>
              <span />
            </div>
            <ol>
              {year.map((p) => (
                <li
                  key={p.label}
                  className="grid gap-x-10 gap-y-3 border-b border-line py-6 md:grid-cols-[11rem_15rem_minmax(0,1fr)] md:items-center"
                >
                  <div className="flex items-center justify-between gap-6 md:contents">
                    <h3 className="text-display-sm">{p.label}</h3>
                    <span aria-hidden="true" className="grid w-40 shrink-0 grid-cols-12 gap-1 md:w-auto">
                      {monthInitials.map((_, i) => (
                        <span
                          key={i}
                          className={`h-2.5 rounded-full ${
                            p.months.includes(i)
                              ? p.peak
                                ? "bg-bloom"
                                : "bg-forest"
                              : "border border-line-strong"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="text-[0.98rem] leading-relaxed text-forest-soft">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Le démarrage, sur le seul panneau vert de la page : une chronologie
          verticale. Desktop : titre 5 / étapes 7. Mobile : l'un sous l'autre. */}
      <section className="py-6 sm:py-10">
        <Container width="wide">
          <div className="on-forest leaf-lg bg-forest px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-display-lg text-paper">
                  Du premier audit au rythme de croisière
                </h2>
                <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-paper/80">
                  Nous ne reprenons jamais un site à l&apos;aveugle&nbsp;: un
                  état des lieux d&apos;abord, puis l&apos;année calée avec vous.
                </p>
              </div>
              <ol className="border-l border-line-dark lg:col-span-7">
                {start.map((s) => (
                  <li key={s.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-bloom-light"
                    />
                    <p className="plate-label">{s.when}</p>
                    <h3 className="text-display-md mt-2 text-paper">{s.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-paper/80">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <FaqBlock
        title="Engagement, pannes, reprise de l'existant"
        items={faq}
        reading={[
          {
            href: "/services",
            kind: "Page · offre Croissance, avec SEO local actif",
            label: "Le détail des offres",
          },
          {
            href: "/fleuristes/seo-local",
            kind: "Page · ce que le rapport suit",
            label: "SEO local pour fleuriste",
          },
        ]}
      />

      <CtaBand
        intent="audit"
        placement="maintenance_footer"
        title="Votre site, laissé à lui-même&nbsp;?"
        lede="Le diagnostic gratuit fait le point sur son état technique, sa visibilité et ce qu'un accompagnement changerait. Sans engagement."
      />
    </>
  );
}
