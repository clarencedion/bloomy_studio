import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * La méthode — section 7 de la direction artistique.
 *
 * Elle lève le risque : ce qui se passe, dans quel ordre, et ce que vous
 * validez. C'est juste après cette section que le diagnostic gratuit se
 * demande le plus naturellement.
 *
 * Seul endroit du site où la numérotation est autorisée : c'est une vraie
 * séquence, pas un ornement.
 */

const steps: [string, string][] = [
  ["Diagnostic", "Gratuit, et déjà utile même si vous en restez là."],
  ["Cadrage", "Un atelier, puis un devis détaillé ligne par ligne."],
  ["Conception", "Vous validez chaque jalon avant qu'on avance."],
  ["Lancement", "Mise en ligne, formation, puis mesure des résultats."],
];

export function MethodSteps() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHead
          align="center"
          eyebrow="La méthode"
          title="Quatre étapes, et vous validez chacune"
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, body], i) => (
            <li key={title} className="border-t border-hairline pt-5">
              <Reveal delay={Math.min(i, 2) * 80}>
                <p className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-display-sm mt-3">{title}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CtaLink
            href="/audit"
            event="cta_audit_click"
            placement="home_method"
            className="press inline-flex min-h-13 items-center justify-center rounded-full bg-rose px-8 py-3.5 font-semibold text-cream transition-colors hover:bg-rose-deep"
          >
            Recevoir mon diagnostic gratuit
          </CtaLink>
          <p className="text-sm text-ink-faint">
            Réponse sous 48 h ouvrées, sans engagement.
          </p>
          {/* La méthode a quitté la navigation principale : ce lien reste sa
              porte d'entrée depuis l'accueil. */}
          <Link
            href="/methode"
            className="plate-label text-rose underline decoration-rose/30 underline-offset-4 hover:decoration-rose"
          >
            Le déroulé complet →
          </Link>
        </div>
      </Container>
    </section>
  );
}
