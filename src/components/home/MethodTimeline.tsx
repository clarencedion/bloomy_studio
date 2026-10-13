import Link from "next/link";

import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { homeMethod } from "@/lib/home";

/**
 * La méthode, en frise : quatre jalons sur un filet rose continu.
 *
 * C'est la seule séquence numérotée de la page (une vraie séquence, pas un
 * ornement). Le petit trait qui coupe le filet marque le début de chaque
 * jalon : c'est une information, pas une décoration.
 *
 * Desktop : frise horizontale, chiffres au-dessus du filet, contenu dessous.
 * Mobile : le filet devient vertical, à gauche.
 */
export function MethodTimeline() {
  return (
    <section className="border-y border-line bg-white py-24 sm:py-32">
      <Container width="wide">
        <SectionHead size="xl" title={homeMethod.title} lede={homeMethod.lede} />

        <ol className="mt-14 grid sm:mt-16 lg:grid-cols-4">
          {homeMethod.steps.map((step, i) => (
            <li key={step.title} className="relative pl-9 pb-12 last:pb-0 lg:pb-0 lg:pl-0">
              {/* Filet : vertical en mobile, horizontal en desktop. */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-0.5 bg-bloom lg:hidden"
              />
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-[1.15rem] h-0.5 w-3 bg-bloom lg:hidden"
              />

              <p className="step-num text-[2.4rem] leading-none sm:text-[2.8rem] lg:pb-6">
                <span className="sr-only">Jalon </span>
                {String(i + 1).padStart(2, "0")}
              </p>

              <div className="relative lg:border-t-2 lg:border-bloom lg:pr-10 lg:pt-7">
                <span
                  aria-hidden="true"
                  className="absolute -top-[7px] left-0 hidden h-3 w-0.5 bg-bloom lg:block"
                />
                <h3 className="text-display-md mt-4 lg:mt-0">{step.title}</h3>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-forest-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Link href="/methode" className={buttonClass("secondary", "mt-14 sm:mt-16")}>
          {homeMethod.linkLabel}
          <ButtonArrow />
        </Link>
      </Container>
    </section>
  );
}
