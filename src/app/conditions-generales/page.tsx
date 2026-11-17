import Link from "next/link";

import { LegalShell } from "@/components/legal/LegalShell";
import { pageMetadata } from "@/lib/seo";
import { hasLegalPlaceholders, legalEntity } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Conditions générales",
  description:
    "Conditions générales de prestation de Bloomy Studio : devis, déroulement des projets, propriété des livrables, paiement et responsabilités.",
  path: "/conditions-generales",
  // Tant que l'entité légale est incomplète, la page reste hors index :
  // une mention légale à trous indexée nuit plus qu'elle ne sert.
  noindex: hasLegalPlaceholders(),
});

export default function CgvPage() {
  return (
    <LegalShell
      title="Conditions générales"
      path="/conditions-generales"
      updatedAt="5 novembre 2026"
    >
      <p>
        Les présentes conditions encadrent les prestations de services
        digitaux (conception de sites, e-commerce, référencement,
        développement, maintenance) fournies par {legalEntity.name} sous la
        marque {site.name}, à des clients professionnels.
      </p>

      <h2>1. Devis et commande</h2>
      <p>
        Toute prestation fait l&apos;objet d&apos;un devis écrit détaillant le
        périmètre, les livrables, le calendrier et le prix. Le devis signé
        (accompagné, le cas échéant, de l&apos;acompte prévu) vaut commande.
        Les demandes hors périmètre font l&apos;objet d&apos;un devis
        complémentaire, jamais d&apos;une facturation surprise.
      </p>

      <h2>2. Déroulement et validations</h2>
      <p>
        Les projets suivent des phases jalonnées de validations client,
        décrites sur la page <Link href="/methode">Méthode</Link>. Le client
        s&apos;engage à fournir les contenus et retours nécessaires dans des
        délais raisonnables ; les retards de validation décalent d&apos;autant
        le calendrier.
      </p>

      <h2>3. Propriété des livrables</h2>
      <p>
        Après paiement intégral, le client est titulaire de son nom de domaine,
        de ses contenus et des livrables du projet, conformément au périmètre
        du devis. Les outils, bibliothèques et savoir-faire génériques du
        studio restent la propriété de {legalEntity.name}.
      </p>

      <h2>4. Prix et paiement</h2>
      <p>
        Le prix, l&apos;acompte éventuel et l&apos;échéancier de facturation
        sont fixés par le devis accepté. Sauf mention contraire du devis, les
        factures sont payables à 30 jours à compter de leur date d&apos;émission.
        Tout retard de paiement entraîne de plein droit, sans rappel
        préalable, des pénalités égales au taux de refinancement de la Banque
        centrale européenne majoré de 10 points, ainsi qu&apos;une indemnité
        forfaitaire de 40 € pour frais de recouvrement (articles L441-10 et
        D441-5 du Code de commerce). Les prestations récurrentes (maintenance,
        accompagnement) sont facturées mensuellement et résiliables selon les
        modalités du devis.
      </p>

      <h2>5. Obligations et responsabilité</h2>
      <p>
        {legalEntity.name}{" "}
        est tenue à une obligation de moyens. Aucun
        positionnement dans les moteurs de recherche ni aucun volume
        d&apos;affaires ne peut être garanti : toute promesse contraire serait
        trompeuse. La responsabilité de {legalEntity.name} est limitée au
        montant des sommes effectivement versées au titre de la prestation
        concernée. Elle ne couvre pas les dommages indirects (perte de
        chiffre d&apos;affaires, de clientèle ou de données), ni les
        interruptions imputables aux hébergeurs, aux plateformes tierces ou au
        client.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Les traitements liés aux projets sont décrits dans la{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        Lorsque le studio agit comme sous-traitant de données pour le compte du
        client (par exemple pour un site e-commerce), un accord de traitement
        est annexé au devis.
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. En cas de
        litige, une résolution amiable sera recherchée avant toute action ;
        à défaut d&apos;accord, compétence exclusive est attribuée au{" "}
        {legalEntity.court}.
      </p>
    </LegalShell>
  );
}
