import Link from "next/link";
import type { CSSProperties } from "react";

import { WorkWall } from "@/components/home/WorkWall";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Kicker } from "@/components/ui/Kicker";
import { homeHero } from "@/lib/home";
import { primaryCta } from "@/lib/site";

/**
 * Hero d'accueil : une agence de développement, pas un spécialiste
 * mono-métier.
 *
 * Quatre éléments de texte, pas un de plus : le libellé à filets du logo,
 * le titre (trois lignes qui montent derrière leur masque, une fois), le
 * chapô, les deux actions. À droite, la preuve : le mur de travaux.
 *
 * Le titre est l'élément LCP : aucune image du hero ne passe devant lui.
 */
export function HomeHero() {
  const lastLine = homeHero.lines.length - 1;

  return (
    <section className="pb-20 pt-8 sm:pt-12 lg:pb-24 lg:pt-8">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <Kicker ruled>{homeHero.kicker}</Kicker>
            <h1 className="text-display-3xl mt-7 lg:mt-9">
              {homeHero.lines.map((line, i) => (
                <span key={i} className="line-mask">
                  <span style={{ "--line": i } as CSSProperties}>
                    {line.map((segment) =>
                      "accent" in segment && segment.accent ? (
                        <span key={segment.text} className="text-bloom-ink">
                          {segment.text}
                        </span>
                      ) : (
                        segment.text
                      ),
                    )}
                    {/* Espace de fin : le texte du titre se lit d'une traite hors CSS. */}
                    {i < lastLine ? " " : null}
                  </span>
                </span>
              ))}
            </h1>
            <p className="lede mt-7 max-w-[33rem] lg:mt-9">{homeHero.lede}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-11">
              <CtaLink
                href={primaryCta.href}
                event="cta_contact_click"
                placement="hero"
                className={buttonClass("primary", "min-h-14 px-8 text-base")}
              >
                {primaryCta.label}
                <ButtonArrow />
              </CtaLink>
              <Link href="/realisations" className={buttonClass("secondary", "min-h-14 px-8 text-base")}>
                {homeHero.portfolioLabel}
              </Link>
            </div>
          </div>

          {/* `min-w-0` : sans lui, la bande mobile (largeur `w-max`) élargit la
              piste de grille jusqu'à sa longueur totale et la page déborde. */}
          <div className="min-w-0 lg:col-span-5">
            <WorkWall />
          </div>
        </div>
      </Container>
    </section>
  );
}
