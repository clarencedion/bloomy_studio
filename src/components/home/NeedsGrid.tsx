import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Sprig, type SpecimenName } from "@/components/visuals/Botanical";

/**
 * Ce que nous faisons — section 4 de la direction artistique.
 *
 * Organisée par objectif du client, jamais par technologie ni par catalogue de
 * prestations. Chaque panneau ouvre la page qui documente vraiment le sujet :
 * la profondeur SEO vit là-bas, pas ici.
 */

const needs: {
  specimen: SpecimenName;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    specimen: "tulipe",
    title: "Vendre vos bouquets en ligne",
    body: "Click-and-collect et livraison locale, sans commission de plateforme.",
    href: "/fleuristes/e-commerce",
  },
  {
    specimen: "renoncule",
    title: "Recevoir des demandes d'événements",
    body: "Mariages, entreprises, deuil : des demandes qui arrivent déjà qualifiées.",
    href: "/fleuristes/site-internet",
  },
  {
    specimen: "dahlia",
    title: "Être trouvé dans votre ville",
    body: "Fiche Google, pages locales, contenus de saison prêts avant les pics.",
    href: "/fleuristes/seo-local",
  },
  {
    specimen: "eucalyptus",
    title: "Garder la main sur vos contenus",
    body: "Prix, produits, horaires, fermetures : modifiables depuis le comptoir.",
    href: "/fleuristes/maintenance",
  },
];

export function NeedsGrid() {
  return (
    <section className="border-y border-hairline bg-cream-deep py-16 sm:py-24">
      <Container>
        <SectionHead
          eyebrow="Ce que nous faisons"
          title="On part de ce que vous voulez obtenir"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {needs.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group rounded-sm border border-hairline bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-rose/40 hover:shadow-lift"
            >
              <span className="grid size-14 place-items-center rounded-sm bg-sage-veil text-sage-deep">
                <Sprig name={n.specimen} size={30} />
              </span>
              <p className="text-display-sm mt-5 transition-colors group-hover:text-rose">
                {n.title}
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{n.body}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/services"
            className="plate-label text-rose underline decoration-rose/30 underline-offset-4 hover:decoration-rose"
          >
            Voir le détail des offres →
          </Link>
        </p>
      </Container>
    </section>
  );
}
