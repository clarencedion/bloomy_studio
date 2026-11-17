import Link from "next/link";

import { LegalShell } from "@/components/legal/LegalShell";
import { pageMetadata } from "@/lib/seo";
import { hasLegalPlaceholders, hosting, legalEntity } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Bloomy Studio : éditeur, directeur de la publication, hébergeur et propriété intellectuelle.",
  path: "/mentions-legales",
  // Tant que l'entité légale est incomplète, la page reste hors index :
  // une mention légale à trous indexée nuit plus qu'elle ne sert.
  noindex: hasLegalPlaceholders(),
});

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales" path="/mentions-legales" updatedAt="5 novembre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site {site.name} (ci-après « le Site ») est édité par :{" "}
        <strong>{legalEntity.name}</strong>, {legalEntity.form} au capital de{" "}
        {legalEntity.capital}, immatriculée au registre du commerce et des
        sociétés de {legalEntity.rcs} sous le numéro {legalEntity.siren}, dont
        le siège social est situé {legalEntity.address}.
      </p>
      <p>
        SIRET du siège : {legalEntity.siret}
        <br />
        N° de TVA intracommunautaire : {legalEntity.vat}
        <br />
        Contact : <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>
        <br />
        Téléphone : {legalEntity.phone}
      </p>

      <h2>Directeur de la publication</h2>
      <p>{legalEntity.publicationDirector}</p>

      <h2>Hébergement</h2>
      <p>
        Le Site est hébergé par {hosting.company}, {hosting.address}, dans
        le cadre des services {hosting.name}. Google Cloud France ne publie
        pas de numéro de téléphone : elle peut être contactée par le
        formulaire{" "}
        <a href={hosting.website} rel="noopener">
          {hosting.website.replace("https://", "")}
        </a>
        .
      </p>
      <p>{hosting.location}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du Site (textes, visuels, identité
        graphique, code) est protégé par le droit de la propriété
        intellectuelle. Toute reproduction, représentation ou adaptation, en
        tout ou partie, sans autorisation écrite préalable, est interdite.
        Les marques et logos de tiers cités restent la propriété de leurs
        titulaires respectifs.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {site.name}{" "}
        s&apos;efforce d&apos;assurer l&apos;exactitude des
        informations publiées sur le Site, sans pouvoir la garantir de manière
        absolue. Les liens externes proposés n&apos;engagent pas la
        responsabilité de l&apos;éditeur quant à leur contenu.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Le traitement des données personnelles et l&apos;usage des cookies sont
        décrits dans la{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>{" "}
        et la <Link href="/cookies">politique cookies</Link>.
      </p>
    </LegalShell>
  );
}
