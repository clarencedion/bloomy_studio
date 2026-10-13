import Image from "next/image";
import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowUpRight,
  ChatCircleText,
  Eye,
  Key,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";

import { FounderDuo } from "@/components/studio/FounderDuo";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EditorialList, type EditorialItem } from "@/components/ui/EditorialList";
import { EmailLink } from "@/components/ui/EmailLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "À propos : l'équipe Bloomy derrière le studio, à Nantes",
  description:
    "Bloomy Studio, c'est l'équipe nantaise qui a conçu bloomy.one : deux co-fondateurs qui construisent sites, boutiques en ligne, MVP et micro SaaS.",
  path: "/a-propos",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

const [first, second] = site.founders.map((f) => f.name.split(" ")[0]);

/** Faits tirés de l'étude de cas publiée (`lib/case-studies.ts`). */
const productFacts = [
  { value: "1\u00a0000+", label: "utilisateurs inscrits" },
  { value: "0\u00a0%", label: "de commission prélevée sur les artisans partenaires" },
  { value: "4\u00a0villes", label: "en extension après Nantes\u00a0: Paris, Bordeaux, Marseille, Toulouse" },
];

const principles: EditorialItem[] = [
  {
    title: "Nous testons sur nous-mêmes",
    body: "Les choix techniques que nous vous recommandons (vitesse, mobile, contenus que vous modifiez seul) sont ceux que nous faisons tourner en production sur notre propre plateforme.",
  },
  {
    title: "Nous parlons aussi chiffres",
    body: "Panier moyen, saisonnalité, coût réel des commissions\u00a0: nous parlons la langue économique de votre activité, pas seulement celle du design.",
  },
  {
    title: "Aucune preuve inventée",
    body: "Pas de faux témoignages, pas de trafic garanti, pas de classement Google promis. Nos projets concept sont signalés comme tels, et nos prix restent sur devis.",
  },
  {
    title: "Nous resterons là",
    body: "Le studio n'est pas une activité opportuniste\u00a0: il finance et nourrit la même mission que la plateforme. Votre prestataire ne disparaîtra pas au premier pivot.",
  },
];

const ways: { icon: Icon; title: string; body: string }[] = [
  {
    icon: ChatCircleText,
    title: "Vous parlez à ceux qui construisent",
    body: `${first} ou ${second} lit votre message, vous répond sous 48 h ouvrées et conçoit votre projet. Personne d'autre entre vous et nous.`,
  },
  {
    icon: Storefront,
    title: "Chez vous ou en visio",
    body: `L'atelier de cadrage se tient dans vos locaux quand c'est possible, en visio sinon. Nous sommes à ${site.city} et travaillons partout en France.`,
  },
  {
    icon: Eye,
    title: "Un lien privé, pas d'effet tunnel",
    body: "Vous suivez l'avancement en continu sur un lien privé et vous validez chaque jalon avant le suivant.",
  },
  {
    icon: Key,
    title: "Tout reste à votre nom",
    body: "Nom de domaine, contenus, code et accès vous appartiennent dès le premier jour. Une heure de formation vous rend autonome.",
  },
];

/**
 * À propos : qui nous sommes, d'où vient le studio, ce que cela change.
 *
 * Récit : les deux fondateurs dans un même cadre (en-tête), l'histoire en
 * colonne de lecture, le produit que nous exploitons (téléphone sur panneau
 * menthe), nos principes en liste éditoriale, puis la façon de travailler
 * ensemble en grille à icônes. Cinq familles de mise en page, aucune répétée,
 * et une composition d'équipe différente de celle de l'accueil.
 */
export default function AProposPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="À propos"
        title="Une équipe produit qui construit aussi pour vous"
        lede="Nous avons conçu, développé et nous exploitons bloomy.one. Le studio met la même exigence au service de votre projet."
        aside={<FounderDuo eager />}
      />

      {/* L'histoire : une colonne de lecture, le titre reste en vue. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-display-lg lg:sticky lg:top-28">
                D&apos;un produit à nous à un studio pour les autres
              </h2>
            </div>
            <div className="prose-links max-w-[40rem] space-y-6 text-[1.06rem] leading-[1.75] text-forest-soft lg:col-span-7 lg:col-start-6">
              <p className="text-[clamp(1.2rem,1.05rem+0.5vw,1.4rem)] leading-relaxed text-forest">
                Bloomy est parti d&apos;un constat&nbsp;: les plateformes de transmission
                florale prélèvent des commissions importantes sur le travail des
                artisans, standardisent leurs catalogues et s&apos;interposent entre
                eux et leurs clients. {first} et {second}{" "}ont construit
                l&apos;inverse.
              </p>
              <p>
                Sur <a href="https://bloomy.one">bloomy.one</a>, on compose son
                bouquet fleur par fleur chez un artisan proche, le prix est
                transparent et l&apos;artisan ne reverse aucune commission. Pour y
                arriver, il a fallu passer des heures avec de vrais fleuristes&nbsp;:
                les arrivages du matin, le stock qui varie, les créneaux de
                livraison, la Saint-Valentin qui se joue en trois jours. Nous
                avons appris un métier en production, pas dans une étude de
                marché.
              </p>
              <p>
                En chemin, un deuxième constat s&apos;est imposé&nbsp;: beaucoup des
                commerçants que nous rencontrions étaient aussi mal servis par
                leur site que par les plateformes. Devis disproportionnés,
                modèles impersonnels, prestataires disparus. Le studio est né
                pour eux.
              </p>
              <p>
                Aujourd&apos;hui, nous mettons la même exigence dans des{" "}
                <Link href="/sites-internet">sites et boutiques en ligne</Link>,
                des <Link href="/developpement-mvp">MVP</Link>{" "}et des{" "}
                <Link href="/micro-saas">micro SaaS</Link>, pour les{" "}
                <Link href="/fleuristes">fleuristes</Link>, notre spécialité, comme
                pour les <Link href="/salons-de-coiffure">salons</Link>, les
                artisans et les fondateurs qui lancent un produit.
              </p>
              <p className="border-l-2 border-bloom pl-5 text-[0.98rem]">
                Une précision&nbsp;: les fleuristes partenaires de la plateforme ne
                sont pas des clients du studio, et nous ne mélangeons jamais les
                deux.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Le produit : la preuve que nous construisons du logiciel. */}
      <section className="border-y border-line bg-white py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="leaf-lg relative aspect-[5/6] overflow-hidden bg-mint px-[14%] pt-[12%]">
                <PhoneFrame>
                  <Image
                    src="/produit/bloomy-accueil-mobile.webp"
                    alt="La page d'accueil de bloomy.one sur un téléphone : composer son bouquet chez un artisan proche."
                    width={780}
                    height={1688}
                    sizes="(min-width: 1024px) 18rem, 70vw"
                    className="h-auto w-full"
                  />
                </PhoneFrame>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-display-lg">
                bloomy.one, conçu, développé et exploité par nous deux
              </h2>
              <p className="mt-6 max-w-[52ch] text-[1.06rem] leading-relaxed text-forest-soft">
                Une application multiplateforme avec catalogue en temps réel par
                boutique, retrait en boutique, livraison locale et tableau de
                bord pour les fleuristes. Nous l&apos;exploitons nous-mêmes.
              </p>
              <dl className="mt-10 border-t border-line">
                {productFacts.map((fact) => (
                  <div
                    key={fact.value}
                    className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-x-6 border-b border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)]"
                  >
                    <dt className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.03em] text-bloom-ink [font-variation-settings:'wdth'_84] sm:text-[2.2rem]">
                      {fact.value}
                    </dt>
                    <dd className="text-[0.98rem] leading-snug text-forest-soft">{fact.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/realisations/bloomy-plateforme-florale"
                  className={buttonClass("secondary")}
                >
                  Lire l&apos;étude de cas
                  <ButtonArrow />
                </Link>
                <a
                  href={site.parent.url}
                  target="_blank"
                  rel="noopener"
                  className="link-live inline-flex min-h-11 items-center gap-1 text-[0.95rem] font-semibold text-bloom-ink"
                >
                  bloomy.one
                  <ArrowUpRight aria-hidden="true" weight="bold" className="arrow-nudge-up size-3.5" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Les principes : une liste éditoriale, pas une grille de cartes. */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-2xl">Ce que cette double casquette change pour vous</h2>
          <EditorialList items={principles} className="mt-12" />
        </Container>
      </section>

      {/* La collaboration : quatre faits concrets, en grille à icônes. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-display-lg">Travailler avec nous</h2>
              <p className="mt-5 max-w-[34ch] text-[1.02rem] leading-relaxed text-forest-soft">
                Une question avant de vous lancer&nbsp;? Écrivez à{" "}
                <EmailLink className="font-semibold text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink" />
                .
              </p>
              <Link href="/methode" className={buttonClass("secondary", "mt-8")}>
                Le déroulé complet
                <ButtonArrow />
              </Link>
            </div>
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {ways.map(({ icon: WayIcon, title, body }) => (
                <li key={title} className="border-t border-line-strong pt-6">
                  <WayIcon aria-hidden="true" className="size-7 text-bloom-ink" />
                  <h3 className="text-display-sm mt-5">{title}</h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-forest-soft">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand placement="apropos_footer" />
    </>
  );
}
