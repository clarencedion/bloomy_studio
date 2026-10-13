import { ButtonArrow, ButtonLink, buttonClass } from "@/components/ui/Button";
import { CtaLink } from "@/components/ui/CtaLink";
import { auditCta } from "@/lib/site";

/**
 * Les deux actions des en-têtes fleuristes : le diagnostic gratuit (l'offre
 * d'entrée des pages métier, suivie) puis le portfolio. Mêmes libellés sur
 * toutes les pages : une intention, un libellé.
 *
 * Mobile : deux boutons pleine largeur empilés, cibles tactiles de 48 px.
 */
export function HeroActions({ placement }: { placement: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <CtaLink
        href={auditCta.href}
        event="cta_audit_click"
        placement={placement}
        className={buttonClass("primary")}
      >
        {auditCta.label}
        <ButtonArrow />
      </CtaLink>
      <ButtonLink href="/realisations" variant="secondary">
        Voir les réalisations
      </ButtonLink>
    </div>
  );
}
