import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * Ce que nous faisons — section 4 de la direction artistique.
 *
 * Organisée par objectif du client, jamais par technologie ni par catalogue de
 * prestations. Chaque entrée ouvre la page qui documente vraiment le sujet :
 * la profondeur SEO vit là-bas, pas ici.
 *
 * Forme : un menu à grandes lettres, découpé par des filets — ni cartes
 * bordées, ni lignes pleine largeur. La page en compte déjà deux (le constat,
 * les autres métiers) ; une troisième aurait recréé la monotonie qu'on vient
 * de casser. Ici c'est l'échelle typographique qui fait l'événement.
 *
 * Les pictogrammes botaniques ont sauté : à 30 px dans un coin de carte, ils
 * se lisaient comme des taches et n'apportaient aucune information.
 */

const needs: { title: string; body: string; href: string }[] = [
  {
    title: "Vendre vos bouquets en ligne",
    body: "Click-and-collect et livraison locale, sans commission de plateforme.",
    href: "/fleuristes/e-commerce",
  },
  {
    title: "Recevoir des demandes d'événements",
    body: "Mariages, entreprises, deuil : des demandes qui arrivent déjà qualifiées.",
    href: "/fleuristes/site-internet",
  },
  {
    title: "Être trouvé dans votre ville",
    body: "Fiche Google, pages locales, contenus de saison prêts avant les pics.",
    href: "/fleuristes/seo-local",
  },
  {
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
          align="center"
          eyebrow="Ce que nous faisons"
          title="On part de ce que vous voulez obtenir"
        />

        <div className="mt-14 grid border-t border-hairline sm:grid-cols-2">
          {needs.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={`group flex flex-col justify-between gap-6 border-b border-hairline py-9 transition-colors duration-150 hover:bg-cream sm:py-11 ${
                // Filet vertical entre les colonnes, jamais sur les bords.
                i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
              }`}
            >
              <div>
                <h3 className="text-display-md max-w-sm transition-colors group-hover:text-rose">
                  {n.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{n.body}</p>
              </div>
              <span className="plate-label inline-flex items-center gap-2 text-rose">
                En savoir plus
                <span aria-hidden="true" className="link-live-arrow">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/services" className="link-live font-semibold text-rose">
            Voir le détail des offres →
          </Link>
        </p>
      </Container>
    </section>
  );
}
