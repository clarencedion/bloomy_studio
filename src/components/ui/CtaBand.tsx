import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmailLink } from "@/components/ui/EmailLink";

type Props = {
  title?: string;
  lede?: string;
  placement: string;
};

/**
 * Bande de conversion finale — section 12 de la direction artistique.
 *
 * Le seul moment où l'on demande quelque chose, et le seul endroit où une
 * photographie occupe tout l'écran. Le cadrage privilégie la droite de
 * l'image, déjà sombre, et le voile prune à 80 % achève le contraste : le
 * texte reste lisible, la matière reste visible. Un voile plus opaque
 * effaçait la photo, ce qui revenait à ne pas en avoir.
 *
 * Jamais de fausse urgence : ni compte à rebours, ni places restantes.
 */
export function CtaBand({
  title = "Voyons ce que votre boutique mérite en ligne",
  lede = "Envoyez-nous votre site actuel — ou son absence. Vous recevez un diagnostic humain et concret, gratuit et sans engagement.",
  placement,
}: Props) {
  return (
    <section className="on-ink relative overflow-hidden bg-plum text-cream">
      {/*
        La dérive est isolée dans son propre conteneur : appliquée à la section,
        elle étirerait aussi le voile et le contenu, qui sont ses autres enfants
        directs.
      */}
      <div aria-hidden="true" className="band-drift absolute inset-0">
        <Image
          src="/photos/cta-final-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-plum/80" />

      <Container className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-lg">{title}</h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-cream/80">{lede}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaLink
              href="/audit"
              event="cta_audit_click"
              placement={placement}
              className="press inline-flex min-h-13 w-full items-center justify-center rounded-full bg-cream px-8 py-3.5 font-semibold text-plum transition-colors hover:bg-rose hover:text-cream sm:w-auto"
            >
              Recevoir mon diagnostic gratuit
            </CtaLink>
            <p className="text-sm text-cream/70">
              ou écrivez-nous :{" "}
              <EmailLink className="text-cream underline underline-offset-4" />
            </p>
          </div>
          <p className="mt-6 text-xs text-cream/60">
            Réponse sous 48 h ouvrées. Aucun démarchage, aucune relance automatique.
          </p>
        </div>
      </Container>
    </section>
  );
}
