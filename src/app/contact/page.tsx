import Link from "next/link";

import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { EmailLink } from "@/components/ui/EmailLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact : parlons de votre boutique ou de votre projet",
  description:
    "Écrivez à Bloomy Studio : un message, une réponse humaine sous 48 h ouvrées. Basés à Nantes, disponibles partout en France, joignables par e-mail.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-display-xl mt-4">Parlons-en simplement</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Une question, un projet, un doute sur votre site actuel : écrivez-nous.
              Vous recevez une réponse humaine sous 48 h ouvrées.
            </p>
            <dl className="mt-9 space-y-6 text-[0.98rem]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Par e-mail
                </dt>
                <dd className="mt-1.5">
                  <EmailLink className="font-medium text-rose underline underline-offset-4" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Où nous sommes
                </dt>
                <dd className="mt-1.5 text-ink-soft">
                  {site.city}, France — déplacements en boutique possibles,
                  visio partout ailleurs.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Pour un état des lieux complet
                </dt>
                <dd className="prose-links mt-1.5 text-ink-soft">
                  Le <Link href="/audit">diagnostic gratuit</Link>{" "}reste le
                  meilleur point de départ : il structure la conversation autour
                  de faits.
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
