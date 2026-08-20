import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { getShowcaseSite } from "@/lib/portfolio";

/**
 * Hero — l'ouverture d'une agence de développement, pas d'un spécialiste
 * mono-métier.
 *
 * Composition : une phrase courte au centre, puis le travail posé dessous
 * comme un objet sur un plan de travail. La matière (papier, ciseaux, ficelle)
 * entre par les bords plutôt que d'occuper une vignette — c'est elle qui donne
 * la chaleur, la capture donne la preuve.
 *
 * Le titre ne dit plus « spécialisé fleuristes » : le studio construit des
 * sites, des MVP et ses propres produits, et la spécialisation se découvre
 * une section plus bas. La promesse d'abord, le créneau ensuite.
 */

const PREUVES = ["Sites & e-commerce", "MVP", "Micro SaaS"];

export function Hero() {
  const site = getShowcaseSite("maison-hortense")!;

  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pt-16">
      {/*
        Matière aux bords, jamais au centre : elle encadre le titre sans lui
        disputer la lecture. Masquée sous 1024 px, où toute la largeur
        appartient au texte.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden xl:block"
      >
        <Image
          src="/photos/atelier-matieres-wide.webp"
          alt=""
          width={1800}
          height={1200}
          sizes="20rem"
          className="absolute -left-28 top-24 w-[20rem] opacity-70 [mask-image:radial-gradient(closest-side,#000_35%,transparent_100%)]"
        />
        <Image
          src="/photos/papier-soie-square.webp"
          alt=""
          width={1200}
          height={1200}
          sizes="15rem"
          className="absolute -right-24 top-10 w-[15rem] opacity-60 [mask-image:radial-gradient(closest-side,#000_35%,transparent_100%)]"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="fade-up mx-auto max-w-3xl text-center">
          <p className="plate-label">Studio de développement · Nantes</p>
          <h1 className="text-display-2xl mt-5">
            On construit le <span className="text-rose">logiciel</span> qui fait
            tourner votre commerce.
          </h1>
          <p className="lede mx-auto mt-6 max-w-xl">
            Sites, boutiques en ligne, applications sur mesure et produits en
            abonnement — construits par deux personnes qui exploitent aussi les
            leurs.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaLink
              href="/audit"
              event="cta_audit_click"
              placement="hero"
              className="press inline-flex min-h-13 w-full items-center justify-center rounded-full bg-rose px-8 py-3.5 text-[0.95rem] font-semibold text-cream transition-colors hover:bg-rose-deep sm:w-auto"
            >
              Recevoir mon diagnostic gratuit
            </CtaLink>
            <Link
              href="/realisations"
              className="press inline-flex min-h-13 w-full items-center justify-center rounded-full border border-ink/15 bg-paper px-8 py-3.5 text-[0.95rem] font-semibold transition-colors hover:border-ink/40 sm:w-auto"
            >
              Voir nos réalisations
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.82rem] text-ink-faint">
            {PREUVES.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden="true" className="size-1 rounded-full bg-hairline" />
                ) : null}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/*
          Le travail, posé sous le titre. Une capture réelle domine, sa version
          mobile s'appuie sur son bord — jamais de cadre flottant dans le vide.
        */}
        <div className="fade-up-late relative mx-auto mt-14 max-w-4xl">
          <BrowserFrame label={`${site.name} — ${site.city}`}>
            <Image
              src={site.image}
              alt={site.alt}
              width={site.width}
              height={site.height}
              // Next 16 : `priority` est déprécié. Capture LCP.
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>

          {site.mobile ? (
            <div className="absolute -bottom-8 -left-4 hidden w-32 sm:block lg:-left-12 lg:w-40">
              <PhoneFrame>
                <Image
                  src={site.mobile.image}
                  alt={site.mobile.alt}
                  width={site.mobile.width}
                  height={site.mobile.height}
                  sizes="10rem"
                  className="h-auto w-full"
                />
              </PhoneFrame>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
