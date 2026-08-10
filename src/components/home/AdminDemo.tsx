import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * L'autonomie du fleuriste — la réponse à « je ne saurai pas m'en servir ».
 *
 * Cette section montrait auparavant trois panneaux d'administration
 * **redessinés en HTML** : de faux champs, de faux créneaux, de faux statuts.
 * C'était un décor, et ça se voyait — aucune de ces interfaces n'existe. Le
 * brief du site interdit d'ailleurs explicitement les « fake dashboard
 * graphics ».
 *
 * On montre donc l'endroit réel où le geste se fait : un comptoir, un
 * téléphone posé dessus, entre deux clients. La preuve que c'est simple, ce
 * n'est pas une capture inventée — c'est que ça se fait là, sans bureau et
 * sans ordinateur.
 */

const gestes: [string, string][] = [
  [
    "Un bouquet en ligne",
    "Une photo, un prix, un stock. C'est publié avant que le café ne refroidisse.",
  ],
  [
    "Une journée fermée",
    "Vous cochez la date, les créneaux de retrait disparaissent du site tout seuls.",
  ],
  [
    "Une page de saison",
    "La Saint-Valentin se prépare en avance et se publie au bon moment.",
  ],
];

export function AdminDemo() {
  return (
    <section className="border-y border-hairline bg-cream-deep py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow>Votre espace</Eyebrow>
            <h2 className="text-display-lg mt-6">
              Vous le modifiez vous-même, depuis le comptoir
            </h2>
            <p className="lede mt-5 max-w-md">
              Les prix, les produits, les horaires, les fermetures : tout ce qui
              change souvent se modifie sans nous, sans ticket et sans délai.
            </p>

            <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
              {gestes.map(([titre, corps]) => (
                <div key={titre} className="py-4">
                  <dt className="text-display-sm">{titre}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-soft">{corps}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-ink-faint">
              Formation d&apos;une heure comprise à la livraison.
            </p>
          </div>

          {/*
            Photographie pleine hauteur plutôt que vignette : c'est elle qui
            porte la section. Le téléphone posé sur la pierre dit le propos
            mieux que n'importe quelle capture.
          */}
          <figure className="lg:-mr-8">
            <Image
              src="/photos/comptoir-matin-wide.webp"
              alt="Un comptoir de fleuriste en pierre, un téléphone posé à côté d'un seau de fleurs."
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="h-full w-full rounded-sm object-cover"
            />
            <figcaption className="caption mt-3">
              Le site se pilote d&apos;où vous travaillez déjà.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
