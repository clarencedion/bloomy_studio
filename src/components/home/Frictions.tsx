import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Le constat — section 3 de la direction artistique.
 *
 * Nommer le problème, sans vendre dans la foulée. Pas de cartes, pas
 * d'icônes : la sobriété fait l'empathie. Une section qui met le doigt sur une
 * difficulté et enchaîne sur un bouton se lit comme un argumentaire.
 */

const frictions: [string, string][] = [
  [
    "Le site ne ressemble pas à la boutique",
    "Un modèle acheté il y a cinq ans, des photos qui ne sont pas les vôtres, et rien de ce qui fait votre travail.",
  ],
  [
    "Les commandes arrivent de partout",
    "Instagram, le téléphone, les SMS, le comptoir. À la fin de la journée, personne ne sait plus ce qui est payé ni ce qui part demain.",
  ],
  [
    "On vous cherche, on trouve quelqu'un d'autre",
    "Un deuil, un mariage, un anniversaire : la recherche commence par « fleuriste » et le nom de votre ville. C'est là que tout se joue.",
  ],
];

export function Frictions() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow>Le constat</Eyebrow>
            <h2 className="text-display-lg mt-6">
              Votre métier est remarquable. Votre présence en ligne, rarement.
            </h2>
            {/*
              La colonne de gauche restait vide sous le titre. Un fragment de
              matière la referme sans ajouter une ligne à lire — et il refroidit
              une page qui, sans lui, n'est que texte sur ivoire.
            */}
            <Image
              src="/photos/eau-tiges-square.webp"
              alt=""
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 20rem, 100vw"
              className="mt-10 hidden aspect-square w-full max-w-xs rounded-sm object-cover lg:block"
            />
          </div>

          <ul className="border-t border-hairline">
            {frictions.map(([title, body], i) => (
              <li key={title} className="border-b border-hairline">
                <Reveal
                  delay={i * 80}
                  className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8"
                >
                  <h3 className="text-display-sm">{title}</h3>
                  <p className="leading-relaxed text-ink-soft">{body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
