import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { floristSites } from "@/lib/portfolio";

/**
 * Hero — section 1 de la direction artistique.
 *
 * Le texte dit à qui l'on s'adresse, la composition prouve qu'on sait le faire.
 * Une réalisation domine, deux détails l'accompagnent : le tableau de bord qui
 * la pilote, et sa version mobile dès qu'une capture réelle existe. Pas dix
 * interfaces — le titre doit rester la première chose lue.
 */

/**
 * Réassurance du premier écran : ce sont des engagements, pas un catalogue.
 * « Applications » n'y figure pas — la capacité produit se découvre plus bas,
 * elle diluerait la spécialisation dans les dix premières secondes.
 */
const REASSURANCE = [
  "Sur mesure",
  "Mobile-first",
  "Administrable",
  "Sans commission sur vos ventes",
];

function HeroComposition() {
  const site = floristSites[0];
  return (
    <div className="relative pb-12 sm:pb-16">
      {/*
        Sous 640 px, la capture desktop tombe à 370 px de large : on ne lit plus
        rien du site montré, et la preuve ne prouve plus. Le téléphone prend
        alors toute la place — c'est aussi l'écran sur lequel le visiteur est en
        train de nous lire.
      */}
      {site.mobile ? (
        <div className="mx-auto w-56 sm:hidden">
          <PhoneFrame>
            <Image
              src={site.mobile.image}
              alt={site.mobile.alt}
              width={site.mobile.width}
              height={site.mobile.height}
              loading="eager"
              fetchPriority="high"
              sizes="14rem"
              className="h-auto w-full"
            />
          </PhoneFrame>
        </div>
      ) : null}

      <div className="relative hidden sm:block">
        {/*
          La matière avant le logiciel (Gisou) : une vraie photo d'atelier
          ancrée au coin supérieur, derrière le cadre du site. Elle ne décore
          pas — elle situe la preuve technique dans un vrai métier.
        */}
        <div className="absolute -top-8 -left-8 hidden w-28 overflow-hidden rounded-sm shadow-lift md:block lg:-top-10 lg:-left-10 lg:w-32">
          <Image
            src="/photos/tige-coupee-square.webp"
            alt=""
            width={1200}
            height={1200}
            sizes="8rem"
            className="aspect-square h-auto w-full object-cover"
          />
        </div>

        <BrowserFrame label={`${site.name} — ${site.city}`}>
          <Image
            src={site.image}
            alt={site.alt}
            width={site.width}
            height={site.height}
            // Next 16 : `priority` est déprécié. La capture du hero est
            // l'élément LCP — on la charge tout de suite et en haute priorité,
            // sans passer par `preload` (exclusif de `loading`).
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="h-auto w-full"
          />
        </BrowserFrame>

        {/*
          Ancré au bord bas du cadre, jamais flottant : c'est ce qui distingue
          une composition d'un empilement de mockups.

          L'aperçu de commandes qui occupait ce coin était une interface
          redessinée en HTML — un faux tableau de bord. Il est remplacé par la
          version mobile réelle du même site, seule preuve qui vaille ici.
        */}
        {site.mobile ? (
          <div className="absolute -bottom-6 left-4 w-32 lg:w-36">
            <PhoneFrame>
              <Image
                src={site.mobile.image}
                alt={site.mobile.alt}
                width={site.mobile.width}
                height={site.mobile.height}
                sizes="9rem"
                className="h-auto w-full"
              />
            </PhoneFrame>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden pb-14 pt-10 sm:pt-14">
      <Container width="wide">
        {/*
          Composition éditoriale (Craft, Attio) : la phrase d'ouverture occupe
          toute la largeur, en très grand — pas une colonne parmi deux. La
          preuve visuelle vient ensuite, décalée, pas alignée en symétrie avec
          le texte. C'est ce décalage qui distingue une une de magazine d'un
          gabarit de landing page.
        */}
        <div className="fade-up max-w-4xl">
          <Eyebrow>Studio digital spécialisé fleuristes</Eyebrow>
          <h1 className="text-display-2xl mt-6">
            Des sites qui vendent{" "}
            <span className="text-rose">vos fleurs</span> sans effacer votre
            identité.
          </h1>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-10">
          <div className="fade-up lg:pt-4">
            <p className="lede max-w-sm">
              Sites vitrines, e-commerce, commandes locales et SEO — conçus par
              l&apos;équipe qui construit Bloomy aux côtés des fleuristes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <CtaLink
                href="/audit"
                event="cta_audit_click"
                placement="hero"
                className="press inline-flex min-h-13 items-center justify-center rounded-full bg-rose px-7 py-3.5 text-[0.95rem] font-semibold text-cream transition-colors hover:bg-rose-deep sm:w-auto"
              >
                Recevoir mon diagnostic gratuit
              </CtaLink>
              <Link
                href="/realisations"
                className="press inline-flex min-h-13 items-center justify-center rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-[0.95rem] font-semibold transition-colors hover:border-ink/40 sm:w-auto"
              >
                Voir nos sites en ligne
              </Link>
            </div>

            <ul className="mt-9 flex flex-col gap-2.5 text-[0.82rem] text-ink-faint">
              {REASSURANCE.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1 rounded-full bg-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/*
            Décalée vers le bas : la composition ne démarre pas au même niveau
            que le texte, elle vient s'ancrer après — une lecture en deux temps
            plutôt qu'un bloc symétrique.
          */}
          <div className="fade-up-late lg:mt-10">
            <HeroComposition />
          </div>
        </div>
      </Container>
    </section>
  );
}
