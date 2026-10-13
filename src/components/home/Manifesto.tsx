import { Container } from "@/components/ui/Container";
import { homeManifesto } from "@/lib/home";

/**
 * Manifeste : trois phrases sur la façon de travailler, en très grand.
 *
 * `.scroll-ink` fait passer chaque mot du vert pâle au vert plein à mesure
 * qu'il traverse l'écran (animation liée au défilement, CSS seul ; sans
 * support ou avec `prefers-reduced-motion`, le texte est simplement plein).
 * Seuls les enfants `span` directs s'animent : l'accent final est un
 * `strong`, rose d'emblée, qui ponctue la lecture.
 */
export function Manifesto() {
  return (
    <section className="py-24 sm:py-36">
      <Container width="wide">
        <h2 className="sr-only">{homeManifesto.srTitle}</h2>
        <p className="scroll-ink text-display-xl max-w-[64rem] lg:ml-[8.333%]">
          {homeManifesto.segments.flatMap((segment, s) =>
            "accent" in segment && segment.accent
              ? [
                  <strong key={`a-${s}`} className="font-[inherit] text-bloom-ink">
                    {segment.text}
                  </strong>,
                ]
              : segment.text.split(" ").map((word, w) => (
                  <span key={`${s}-${w}`}>{word} </span>
                )),
          )}
        </p>
      </Container>
    </section>
  );
}
