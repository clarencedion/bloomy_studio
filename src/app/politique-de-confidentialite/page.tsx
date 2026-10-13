import Link from "next/link";

import { LegalShell } from "@/components/legal/LegalShell";
import { pageMetadata } from "@/lib/seo";
import { dataProtection, hasLegalPlaceholders, legalEntity } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Bloomy Studio traite vos données personnelles : finalités, base légale, durées de conservation, destinataires et exercice de vos droits RGPD.",
  path: "/politique-de-confidentialite",
  // Tant que l'entité légale est incomplète, la page reste hors index :
  // une mention légale à trous indexée nuit plus qu'elle ne sert.
  noindex: hasLegalPlaceholders(),
});

export default function ConfidentialitePage() {
  return (
    <LegalShell
      title="Politique de confidentialité"
      path="/politique-de-confidentialite"
      updatedAt="24 juillet 2026"
    >
      <p>
        Cette politique décrit comment {site.name} traite vos données
        personnelles, conformément au Règlement général sur la protection des
        données (RGPD) et à la loi Informatique et Libertés.
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        {legalEntity.name}, {legalEntity.address}. Contact pour toute question
        relative aux données :{" "}
        <a href={`mailto:${dataProtection.contactEmail}`}>
          {dataProtection.contactEmail}
        </a>
        .
      </p>

      <h2>Données collectées et finalités</h2>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Traitement</th>
            <th>Données</th>
            <th>Finalité</th>
            <th>Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Formulaire d&apos;audit</td>
            <td>
              Nom, e-mail, nom et ville de la boutique, secteur, site actuel,
              objectif, échéance, budget (facultatif), message (facultatif)
            </td>
            <td>Établir et vous envoyer votre diagnostic, puis y donner suite</td>
            <td>Mesures précontractuelles (art. 6.1.b) et consentement</td>
          </tr>
          <tr>
            <td>Formulaire de contact</td>
            <td>Nom, e-mail, message</td>
            <td>Répondre à votre demande</td>
            <td>Consentement (art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Mesure d&apos;audience</td>
            <td>Données de navigation anonymisées</td>
            <td>Comprendre l&apos;usage du site pour l&apos;améliorer</td>
            <td>Consentement (jamais activée sans votre accord)</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        Aucune donnée n&apos;est vendue, louée ni utilisée pour de la
        prospection automatisée. Les demandes de contact et un éventuel
        abonnement à des communications sont des traitements distincts : aucune
        case n&apos;est jamais précochée.
      </p>

      <h2>Durées de conservation</h2>
      <p>
        Demandes et diagnostics : {dataProtection.leadRetention}. Données de
        mesure d&apos;audience : selon les durées standard de l&apos;outil,
        après anonymisation.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <ul>
        {dataProtection.processors.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong>, hébergé en {p.location}. Accord de
            traitement des données :{" "}
            {p.dpa.startsWith("https://") ? (
              <a href={p.dpa} rel="noopener">
                {p.dpa.replace("https://", "")}
              </a>
            ) : (
              p.dpa
            )}
          </li>
        ))}
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous disposez des droits d&apos;accès, de rectification,
        d&apos;effacement, de limitation, d&apos;opposition et de portabilité.
        Pour les exercer, écrivez à{" "}
        <a href={`mailto:${dataProtection.contactEmail}`}>
          {dataProtection.contactEmail}
        </a>{" "}
        en précisant votre demande ; nous répondons sous un mois. Vous pouvez
        également saisir la CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).
      </p>

      <h2>Cookies</h2>
      <p>
        L&apos;usage des cookies et votre contrôle sur ceux-ci sont détaillés
        dans la <Link href="/cookies">politique cookies</Link>. Vous pouvez modifier
        votre choix à tout moment via le lien « Gérer les cookies » en pied de
        page.
      </p>
    </LegalShell>
  );
}
