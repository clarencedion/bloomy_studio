import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmailLink } from "@/components/ui/EmailLink";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { auditCta, primaryCta } from "@/lib/site";

type Props = {
  title?: string;
  lede?: string;
  /** Emplacement, transmis à l'événement analytics. */
  placement: string;
  /**
   * `projet` (par défaut) mène au formulaire de contact ; `audit` mène au
   * diagnostic gratuit, l'offre d'entrée des pages métier.
   */
  intent?: "projet" | "audit";
};

/**
 * Bande de conversion finale. Elle ouvre le grand aplat vert qui se prolonge
 * dans le pied de page : la page se referme sur la couleur de la tige.
 *
 * Le monogramme du logo y apparaît une seule fois, en très grand et en
 * ton sur ton, rogné par le bord : la signature de la marque, pas un décor.
 *
 * Jamais de fausse urgence : ni compte à rebours, ni places restantes.
 */
export function CtaBand({
  title = "Parlons de votre projet.",
  lede = "Un site, une boutique, une première version de votre application : décrivez-nous où vous en êtes. Réponse sous 48 h ouvrées.",
  placement,
  intent = "projet",
}: Props) {
  const cta = intent === "audit" ? auditCta : primaryCta;
  const event = intent === "audit" ? "cta_audit_click" : "cta_contact_click";

  return (
    <section className="on-forest relative isolate overflow-hidden bg-forest">
      {/*
        Monogramme en masque CSS plutôt qu'en <img> : purement décoratif, il
        ne doit jamais être retenu comme plus grand élément affiché (LCP).
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 -z-10 aspect-[1386/1437] w-[22rem] bg-forest-mid sm:w-[30rem] lg:-bottom-40 lg:right-0 lg:w-[38rem]"
        style={{
          maskImage: "url(/brand/bloomy-mark.svg)",
          WebkitMaskImage: "url(/brand/bloomy-mark.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      <Container width="wide" className="py-20 sm:py-28">
        <div className="max-w-3xl">
          <h2 className="text-display-2xl text-paper">{title}</h2>
          <p className="lede mt-7 max-w-xl">{lede}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <CtaLink
              href={cta.href}
              event={event}
              placement={placement}
              className={buttonClass("primary", "min-h-14 px-8 text-base hover:bg-paper hover:text-forest")}
            >
              {cta.label}
              <ButtonArrow />
            </CtaLink>
            <p className="text-[0.95rem] text-paper/80">
              ou écrivez-nous :{" "}
              <EmailLink className="font-semibold text-paper underline decoration-bloom-light/60 underline-offset-4 hover:decoration-bloom-light" />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
