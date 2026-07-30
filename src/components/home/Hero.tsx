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

const REASSURANCE = [
  "Sites vitrines",
  "E-commerce",
  "Commandes en ligne",
  "SEO local",
  "Applications",
];

function HeroComposition() {
  const site = floristSites[0];
  return (
    <div className="relative pb-12 sm:pb-16">
      <BrowserFrame label={`${site.name} — ${site.city}`}>
        <Image
          src={site.image}
          alt={site.alt}
          width={site.width}
          height={site.height}
          // Next 16 : `priority` est déprécié. La capture du hero est l'élément
          // LCP à toutes les largeurs — on la charge tout de suite et en haute
          // priorité, sans passer par `preload` (exclusif de `loading`).
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
        <div className="absolute bottom-0 right-6 hidden w-32 sm:block lg:w-36">
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
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden pb-14 pt-10 sm:pt-14">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="fade-up">
            <Eyebrow>Studio digital pour fleuristes</Eyebrow>
            <h1 className="text-display-xl mt-6">
              Nous créons l&apos;expérience digitale que{" "}
              <span className="text-rose">votre savoir-faire</span> mérite.
            </h1>
            <p className="lede mt-6 max-w-xl">
              Bloomy Studio conçoit des sites de fleuristes qui font grandir votre
              image, votre visibilité et vos commandes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink
                href="/audit"
                event="cta_audit_click"
                placement="hero"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-rose px-7 py-3.5 text-[0.95rem] font-semibold text-cream transition-colors hover:bg-rose-deep"
              >
                Recevoir mon diagnostic gratuit
              </CtaLink>
              <Link
                href="/realisations"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-[0.95rem] font-semibold transition-colors hover:border-ink/40"
              >
                Découvrir nos créations
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
