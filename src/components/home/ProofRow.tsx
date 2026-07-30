import { Container } from "@/components/ui/Container";

/**
 * Preuves — section 10 de la direction artistique.
 *
 * Elle ne s'appelle pas « Témoignages » : aucun client n'a donné d'autorisation
 * écrite à ce jour, et fabriquer une citation reviendrait à fabriquer une
 * preuve. Le jour où de vraies citations existent, elles prennent place ici —
 * en attendant, seuls des faits vérifiables occupent la section.
 *
 * Pas de logos empruntés, pas de « +120 projets » : nous n'en avons pas.
 */

const facts: [string, string][] = [
  ["100 %", "sur mesure — aucun modèle mutualisé"],
  ["0 %", "de commission sur vos ventes en ligne"],
  ["48 h", "ouvrées pour recevoir votre diagnostic"],
];

export function ProofRow() {
  return (
    <section aria-label="Ce qui fonde notre légitimité" className="py-14 sm:py-16">
      <Container width="wide">
        <ul className="grid gap-8 text-center sm:grid-cols-3">
          {facts.map(([figure, label]) => (
            <li key={label}>
              <p className="text-display-md text-rose">{figure}</p>
              <p className="mt-1 text-sm text-ink-soft">{label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-sm text-ink-faint">
          Des boutiques à Roanne, Saint-Nauphary et Reims — et{" "}
          <a
            href="https://bloomy.one"
            className="font-semibold text-ink underline decoration-hairline underline-offset-4 hover:decoration-rose"
          >
            bloomy.one
          </a>
          , la plateforme florale que nous construisons depuis Nantes.
        </p>
      </Container>
    </section>
  );
}
