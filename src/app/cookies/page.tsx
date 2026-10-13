import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
import { LegalShell } from "@/components/legal/LegalShell";
import { hasLegalPlaceholders } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique cookies",
  description:
    "Les cookies utilisés par Bloomy Studio : strictement nécessaires, et mesure d'audience anonymisée avec votre accord, modifiable à tout moment.",
  path: "/cookies",
  // Tant que l'entité légale est incomplète, la page reste hors index :
  // une mention légale à trous indexée nuit plus qu'elle ne sert.
  noindex: hasLegalPlaceholders(),
});

export default function CookiesPage() {
  return (
    <LegalShell title="Politique cookies" path="/cookies" updatedAt="24 juillet 2026">
      <p>
        Ce site utilise le strict minimum. Aucun cookie publicitaire, aucun
        traceur tiers de réseau social, aucune revente de données.
      </p>

      <h2>Cookies strictement nécessaires</h2>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bloomy-studio-consent-v1 (stockage local)</td>
            <td>Mémoriser votre choix en matière de cookies</td>
            <td>6 mois</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        Ces éléments fonctionnent sans consentement car ils sont indispensables
        au service demandé (article 82 de la loi Informatique et Libertés).
      </p>

      <h2>Mesure d&apos;audience, uniquement avec votre accord</h2>
      <p>
        Si vous l&apos;acceptez, nous activons une mesure d&apos;audience
        (Google Analytics 4, IP anonymisée) pour comprendre quelles pages sont
        utiles et lesquelles doivent être améliorées. Si vous refusez,{" "}
        <strong>rien n&apos;est chargé</strong>, et le site fonctionne
        exactement de la même manière.
      </p>

      <h2>Modifier votre choix</h2>
      <p>
        Votre choix est conservé 6 mois et modifiable à tout moment :{" "}
        <ManageCookiesButton className="font-semibold text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink" />
        .
      </p>
    </LegalShell>
  );
}
