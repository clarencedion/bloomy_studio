import { ContactForm } from "@/components/forms/ContactForm";
import { FormStage } from "@/components/studio/FormStage";
import { NextSteps, type NextStep } from "@/components/studio/NextSteps";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { EmailLink } from "@/components/ui/EmailLink";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact : parlons de votre site, boutique ou application",
  description:
    "Écrivez à Bloomy Studio : un message, une réponse humaine sous 48 h ouvrées. Basés à Nantes, disponibles partout en France, joignables par e-mail.",
  path: "/contact",
});

const [first, second] = site.founders.map((f) => f.name.split(" ")[0]);

/**
 * Ce qui suit l'envoi du formulaire. Chaque repère reprend une étape réelle
 * de la méthode (réponse, échange de cadrage, devis ligne par ligne) : rien
 * n'est promis ici qui ne soit déjà écrit sur /methode.
 */
const nextSteps: NextStep[] = [
  {
    when: "Sous 48\u00a0h ouvrées",
    title: "Une réponse personnelle",
    body: `${first} ou ${second} lit votre message et vous répond lui-même. Personne d'autre entre vous et nous.`,
    visual: "founders",
  },
  {
    when: "Ensuite",
    title: "Un premier échange",
    body: "En visio, ou dans vos locaux quand c'est possible. Vous parlez de votre projet, nous posons des questions précises.",
    visual: "call",
  },
  {
    when: "Avant tout engagement",
    title: "Une proposition écrite",
    body: "Un périmètre clair et un devis détaillé ligne par ligne. Vous décidez ensuite, en connaissance de cause.",
    visual: "quote",
  },
];

/**
 * Contact : la conversion principale du site. « Démarrer un projet » mène
 * ici depuis toutes les pages.
 *
 * Desktop : le texte à gauche (titre, chapô, puis ce qui se passe ensuite),
 * le formulaire à droite sur toute la hauteur. Mobile : titre, formulaire,
 * puis la suite. Le formulaire arrive avant l'explication, parce que le
 * visiteur est venu pour écrire.
 */
export default function ContactPage() {
  return (
    <>
      <section className="relative">
        <Container width="wide" className="pb-20 pt-8 sm:pb-28 sm:pt-10">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />

          <div className="mt-10 grid gap-y-12 sm:mt-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-4">
              <h1 className="text-display-xl">Racontez-nous votre projet</h1>
              <p className="lede mt-6 max-w-[34rem]">
                Un site, une boutique en ligne, une application&nbsp;: dites-nous
                où vous en êtes. Nous répondons sous 48&nbsp;h ouvrées.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <FormStage tone="blush">
                <ContactForm />
              </FormStage>
            </div>

            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <h2 className="text-display-md">Après votre message</h2>
              <div className="mt-8">
                <NextSteps steps={nextSteps} />
              </div>
              <p className="mt-10 border-t border-line pt-6 text-[0.98rem] leading-relaxed text-forest-soft">
                Vous préférez l&apos;e-mail&nbsp;? Écrivez-nous à{" "}
                <EmailLink className="font-semibold text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink" />
                . Nous sommes à {site.city} et travaillons partout en France.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        intent="audit"
        placement="contact_footer"
        title={"Vous avez déjà un site\u00a0?"}
        lede={
          "Le diagnostic gratuit commence par lui\u00a0: votre site, votre fiche Google et votre visibilité locale, examinés par l'un de nous deux."
        }
      />
    </>
  );
}
