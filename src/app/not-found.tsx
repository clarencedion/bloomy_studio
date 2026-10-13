import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { auditCta, primaryCta } from "@/lib/site";

/**
 * Les chemins utiles depuis une adresse morte. Les libellés reprennent ceux
 * du reste du site (une intention, un libellé).
 */
const destinations = [
  { label: "Accueil", href: "/", hint: "Ce que nous construisons, et pour quels métiers." },
  {
    label: "Voir les réalisations",
    href: "/realisations",
    hint: "Les sites conçus par le studio, en captures réelles.",
  },
  {
    label: auditCta.label,
    href: auditCta.href,
    hint: "Votre site et votre visibilité locale passés en revue.",
  },
  {
    label: primaryCta.label,
    href: primaryCta.href,
    hint: "Décrivez-nous votre projet, réponse sous 48\u00a0h ouvrées.",
  },
] as const;

/**
 * Page 404. Le visuel est une photo d'ambiance (une fleur fanée), posée à
 * côté d'un titre sur la page, jamais d'une affirmation sur un client.
 * Mobile : la photo passe en petit format au-dessus du titre.
 */
export default function NotFound() {
  return (
    <section className="pb-24 pt-12 sm:pb-32 sm:pt-20">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <Kicker ruled>Erreur 404</Kicker>
            <h1 className="text-display-xl mt-7">Cette page s&apos;est fanée.</h1>
            <p className="lede mt-6">
              L&apos;adresse a peut-être changé, ou la page n&apos;a jamais
              existé. Voici de quoi reprendre la visite.
            </p>

            <nav aria-label="Pages utiles" className="mt-10">
              <ul className="border-t border-line">
                {destinations.map((d) => (
                  <li key={d.href} className="group relative border-b border-line py-5">
                    <Link
                      href={d.href}
                      className="flex items-center justify-between gap-4 font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-forest transition-colors after:absolute after:inset-0 group-hover:text-bloom-ink"
                    >
                      {d.label}
                      <ArrowRight
                        aria-hidden="true"
                        weight="bold"
                        className="arrow-nudge size-5 shrink-0 text-bloom-ink"
                      />
                    </Link>
                    <p className="mt-1 pr-10 text-[0.95rem] text-forest-soft">{d.hint}</p>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="order-first lg:order-none lg:col-span-5 lg:col-start-8">
            <Image
              src="/photos/tige-coupee-square.webp"
              alt=""
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 34rem, 8rem"
              className="size-32 rounded-[1.25rem_0.3rem] object-cover lg:aspect-square lg:size-auto lg:w-full lg:rounded-[3.5rem_0.5rem]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
