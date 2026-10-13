import Image from "next/image";
import Link from "next/link";

import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeTeam } from "@/lib/home";
import { site } from "@/lib/site";

/**
 * Les deux personnes derrière le studio, nommées et photographiées.
 *
 * Portraits réels (repris de bloomy.one), détourés : ils se tiennent sur le
 * bord bas de leur panneau, l'un sur fond rose, l'autre sur fond menthe,
 * comme la fleur et la tige du logo. Le second descend d'un cran : un duo,
 * pas une grille.
 *
 * Mobile : les deux portraits restent côte à côte, à mi-largeur.
 */

const panels = ["bg-blush", "bg-mint"];

export function Founders() {
  const [first, second] = site.founders;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-xl">{homeTeam.title}</h2>
          <p className="lede mx-auto mt-6">
            {first.name} et {second.name}{" "}
            {homeTeam.bodyAfterNames}
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:mt-16 sm:gap-8">
          {site.founders.map((founder, i) => (
            <li key={founder.name} className={i === 1 ? "mt-10 sm:mt-16" : ""}>
              <figure>
                <div className={`leaf relative aspect-[4/5] overflow-hidden ${panels[i % 2]}`}>
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role.toLowerCase()} de Bloomy Studio.`}
                    width={640}
                    height={640}
                    sizes="(min-width: 768px) 22rem, 45vw"
                    className="absolute inset-x-0 bottom-0 h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 px-1">
                  <p className="text-display-sm">{founder.name}</p>
                  <p className="mt-1 text-[0.92rem] text-forest-soft">
                    {founder.role}, {homeTeam.role}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link href="/a-propos" className={buttonClass("secondary")}>
            {homeTeam.linkLabel}
            <ButtonArrow />
          </Link>
        </div>
      </Container>
    </section>
  );
}
