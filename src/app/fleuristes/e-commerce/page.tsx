import Image from "next/image";
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
  title: "Site e-commerce fleuriste : click-and-collect & livraison",
  description:
    "Boutique en ligne pensée pour le métier de fleuriste : catalogue saisonnier, click-and-collect, livraison locale, paiement sécurisé, 0 commission.",
  path: "/fleuristes/e-commerce",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Fleuristes", path: "/fleuristes" },
  { name: "E-commerce", path: "/fleuristes/e-commerce" },
];

const features = [
  {
    title: "Catalogue saisonnier, pas catalogue figé",
    body: "Des gammes (« bouquet du marché dès 25 € ») plutôt qu'une photo par composition, des disponibilités modifiables en un geste, des collections par saison et par occasion. Le catalogue suit vos arrivages, pas l'inverse.",
  },
  {
    title: "Click-and-collect avec créneaux",
    body: "Le client commande, choisit son créneau de retrait, paie en ligne. Vous préparez entre deux clients au comptoir. Les créneaux se règlent selon vos journées — resserrés le samedi, élargis en semaine.",
  },
  {
    title: "Livraison locale par zones",
    body: "Vos zones, vos frais, vos horaires de tournée. Livraison le jour même si la commande arrive avant l'heure que vous fixez. Adresse et créneau vérifiés à la commande — fini les allers-retours téléphoniques.",
  },
  {
    title: "Paiement sécurisé, encaissé chez vous",
    body: "Paiement par carte via un prestataire certifié, versé directement sur votre compte. Aucune commission Bloomy Studio sur vos ventes — nous vendons un outil, pas un pourcentage.",
  },
  {
    title: "Le deuil traité avec soin",
    body: "Un parcours dédié, sobre, avec livraison en cérémonie, message d'accompagnement et facturation adaptée. C'est souvent la première commande d'un client qui ne vous connaît pas : elle doit être irréprochable.",
  },
  {
    title: "Pages saisonnières prêtes avant les pics",
    body: "Saint-Valentin, fête des mères, Toussaint : précommandes ouvertes en amont, créneaux renforcés, offre resserrée. Le site absorbe le pic au lieu de le subir.",
  },
];

const faq = [
  {
    question: "Je n'ai pas le temps de gérer une boutique en ligne.",
    answer: (
      <p>
        C&apos;est l&apos;objection la plus fréquente — et la plus juste. Notre
        réponse tient en deux principes : ne mettre en ligne que ce qui se gère
        en gammes (pas une photo par bouquet), et regrouper les actions dans
        des moments courts (valider les commandes du matin, fermer un créneau).
        Comptez dix minutes par jour, pas une heure. La{" "}
        <Link href="/fleuristes/maintenance">maintenance</Link>{" "}couvre le reste.
      </p>
    ),
  },
  {
    question: "Quelle différence avec vendre via une grande plateforme ?",
    answer: (
      <p>
        Sur votre boutique en ligne : vos prix, votre identité, vos clients
        (avec leur accord, vous pouvez les recontacter), et 100 % du montant
        encaissé chez vous. Sur une plateforme : une commission sur chaque
        commande et un client qui appartient à la plateforme. Notre analyse
        complète :{" "}
        <Link href="/blog/marketplace-ou-site-en-propre">
          marketplace ou site en propre
        </Link>
        .
      </p>
    ),
  },
  {
    question: "Et les compositions personnalisées ?",
    answer: (
      <p>
        Le sur-mesure reste votre cœur de métier. Le site le sert avec un
        parcours « bouquet personnalisé » : budget, occasion, couleurs,
        message — vous recevez un brief clair et confirmez par téléphone si
        besoin. Nous avons construit ce type de parcours pour{" "}
        <Link href="/realisations/bloomy-plateforme-florale">Bloomy</Link>, où
        le client compose fleur par fleur.
      </p>
    ),
  },
  {
    question: "Faut-il déjà avoir un site vitrine ?",
    answer: (
      <p>
        Non. L&apos;offre Boutique inclut tout le socle du{" "}
        <Link href="/fleuristes/site-internet">site sur mesure</Link>{" "}— identité,
        pages services, mobile — plus la vente en ligne. Si vous avez déjà un
        site récent et sain, nous étudions s&apos;il peut servir de base ;
        s&apos;il dessert votre image, nous vous le dirons honnêtement.
      </p>
    ),
  },
];

export default function EcommercePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Site e-commerce pour fleuriste",
          description:
            "Création de boutiques en ligne pour fleuristes : catalogue saisonnier, click-and-collect, livraison locale, paiement sécurisé.",
          path: "/fleuristes/e-commerce",
          serviceType: "Création de site e-commerce",
          audience: "Fleuristes indépendants",
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Fleuristes · E-commerce"
        title="Une boutique en ligne pensée pour un comptoir de fleuriste"
        lede={
          <>
            Un site e-commerce de fleuriste n&apos;est pas un e-commerce
            générique avec des photos de fleurs. Stock du matin,
            click-and-collect, tournées de livraison, deuil, pics saisonniers :
            nous avons construit ces parcours en production sur{" "}
            <a href="https://bloomy.one">bloomy.one</a>{" "}— votre boutique en
            profite.
          </>
        }
        visual={<SiteShowpiece slug="monloup" eager />}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead
          align="split"
            eyebrow="Ce que votre boutique en ligne sait faire"
            title="Conçue autour de six réalités du métier"
            lede="Chaque fonctionnalité existe parce qu'un vrai fleuriste en a eu besoin — jamais parce qu'elle remplissait une grille tarifaire."
          />
          <EditorialList className="mt-12" items={features} />

          {/* Ce que le fleuriste voit le matin : la contrepartie concrète des
              six fonctionnalités ci-dessus, montrée plutôt que promise. */}
          <div className="mt-14 grid items-center gap-8 rounded-sm border border-hairline bg-cream-deep p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <h3 className="text-display-sm">
                Et le matin, tout tient sur un écran
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">
                Les commandes du jour, leur créneau de retrait et leur état
                d&apos;avancement au même endroit. Plus de cahier, plus de
                captures d&apos;écran Instagram, plus de « on avait dit quelle
                heure ? ».
              </p>
            </div>
            {/*
              Photographie réelle plutôt qu'un tableau de bord redessiné en
              HTML : nous n'avons pas de capture d'administration client à
              montrer, et en inventer une reviendrait à fabriquer une preuve.
            */}
            <Image
              src="/photos/comptoir-matin-wide.webp"
              alt="Un téléphone posé sur le comptoir d'une boutique, à côté d'un seau de fleurs."
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 18rem, 100vw"
              className="h-full w-full rounded-sm object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Le calcul économique — honnête, sans fausses métriques */}
      <section className="on-ink bg-plum py-16 text-cream sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHead
          align="left"
                eyebrow="Le calcul"
                title="Une commission économisée est une marge retrouvée"
              />
              <p className="mt-6 leading-relaxed text-cream/75">
                Les plateformes de transmission florale prélèvent un pourcentage
                sur chaque commande, auquel s&apos;ajoutent souvent des frais
                d&apos;abonnement. Sur un panier moyen de bouquet, faites le
                calcul sur une année : c&apos;est fréquemment le prix d&apos;un
                site entier. Nous ne vous dirons jamais de quitter ces canaux du
                jour au lendemain — mais chaque commande qui passe par votre
                propre boutique vous revient en totalité.
              </p>
              <p className="mt-4 text-sm text-cream/60">
                Aucune promesse de chiffre d&apos;affaires ici : le résultat
                dépend de votre zone, de votre offre et de votre régularité.
                Nous mesurons tout, honnêtement, avec vous.
              </p>
            </div>
            <div className="rounded-sm border border-hairline-dark bg-plum-soft/35 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
                Ce qui reste chez vous avec votre boutique en ligne
              </p>
              <ul className="mt-5 space-y-4 text-sm">
                {[
                  ["100 % du prix payé", "encaissé directement sur votre compte"],
                  ["Votre identité", "votre nom, votre univers, vos photos"],
                  ["Vos clients", "et le droit de les recontacter, avec leur accord"],
                  ["Vos prix", "fixés par vous, ajustés quand vous le décidez"],
                ].map(([t, b]) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 text-sage">
                      ✓
                    </span>
                    <span>
                      <span className="font-semibold">{t}</span>{" "}
                      <span className="text-cream/70">— {b}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <SectionHead
          align="left"
            eyebrow="Vos questions"
            title="Ce que les fleuristes nous demandent"
            className="mb-10"
          />
          <FaqAccordion items={faq} />
          <p className="prose-links mt-8 text-sm text-ink-soft">
            Vendre en ligne sans être trouvé ne sert à rien : voyez aussi{" "}
            <Link href="/fleuristes/seo-local">le SEO local</Link>{" "}et{" "}
            <Link href="/fleuristes/maintenance">l&apos;accompagnement continu</Link>.
          </p>
        </Container>
      </section>

      <CtaBand
        placement="ecommerce_footer"
        title="Et si vos clients commandaient chez vous plutôt que sur une plateforme ?"
        lede="Le diagnostic gratuit évalue votre potentiel de vente en ligne : zone, concurrence, offre. Réponse concrète, sans engagement."
      />
    </>
  );
}
