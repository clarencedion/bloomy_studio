import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OrdersPeek } from "@/components/visuals/AdminPreview";
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
          Ancrés au bord bas du cadre, jamais flottants : c'est ce qui distingue
          une composition d'un empilement de mockups.
        */}
        <div className="absolute bottom-0 left-0 hidden w-48 -translate-x-8 md:block">
          <OrdersPeek />
        </div>

        {site.mobile ? (
          <div className="absolute bottom-0 right-6 w-32 lg:w-36">
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="fade-up">
            <Eyebrow>Studio digital spécialisé fleuristes</Eyebrow>
            {/*
              Le titre nomme le métier et la promesse commerciale dans la même
              phrase. La version précédente — « l'expérience digitale que votre
              savoir-faire mérite » — aurait pu servir à une agence pour
              hôtels ou bijoutiers : élégante, mais interchangeable.
            */}
            <h1 className="text-display-xl mt-6">
              Des sites qui vendent{" "}
              <span className="text-rose">vos fleurs</span> sans effacer votre
              identité.
            </h1>
            <p className="lede mt-6 max-w-xl">
              Sites vitrines, e-commerce, commandes locales et SEO — conçus par
              l&apos;équipe qui construit Bloomy aux côtés des fleuristes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink
                href="/audit"
                event="cta_audit_click"
                placement="hero"
                className="press inline-flex min-h-13 items-center justify-center rounded-full bg-rose px-7 py-3.5 text-[0.95rem] font-semibold text-cream transition-colors hover:bg-rose-deep"
              >
                Recevoir mon diagnostic gratuit
              </CtaLink>
              <Link
                href="/realisations"
                className="press inline-flex min-h-13 items-center justify-center rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-[0.95rem] font-semibold transition-colors hover:border-ink/40"
              >
                Voir nos sites en ligne
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] text-ink-faint">
              {REASSURANCE.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="size-1 rounded-full bg-hairline" />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up-late">
            <HeroComposition />
          </div>
        </div>
      </Container>
    </section>
  );
}
