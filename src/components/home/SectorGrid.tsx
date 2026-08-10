import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { sectors, tintClass } from "@/lib/products";

/**
 * Les métiers servis.
 *
 * Elle remplace l'ancienne section « Autres métiers », qui reléguait tout ce
 * qui n'était pas fleuriste à deux lignes de texte en bas de page. Le métier
 * principal garde la vedette — il occupe deux colonnes et porte la seule
 * photographie — mais les autres cessent d'être une note de bas de page.
 *
 * La photographie montre le métier, jamais un client : c'est une image
 * d'ambiance sous licence, posée à côté d'aucune affirmation sur une boutique
 * précise (règle « aucune preuve inventée »).
 */
export function SectorGrid() {
  const [principal, ...autres] = sectors;

  return (
    <section className="border-t border-hairline py-16 sm:py-24">
      <Container width="wide">
        <SectionHead
          align="split"
          eyebrow="Pour qui"
          title="Des métiers où l'image fait la vente"
          lede="Nous connaissons le vocabulaire, les saisons et les vraies journées de ces commerces — c'est ce qui change un site générique en outil de vente."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Link
              href={principal.href}
              className={`lift group flex h-full flex-col overflow-hidden rounded-sm border border-hairline ${tintClass[principal.tint]}`}
            >
              <Image
                src="/photos/fleuriste-atelier-wide.webp"
                alt="Une fleuriste emballe un bouquet dans du papier, dans sa boutique."
                width={1800}
                height={1200}
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <p className="plate-label">Notre spécialité</p>
                <h3 className="text-display-md mt-3 transition-colors group-hover:text-rose">
                  {principal.name}
                </h3>
                <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">
                  {principal.body}
                </p>
                <span className="plate-label mt-6 inline-flex items-center gap-1.5 text-rose">
                  Ce que nous faisons pour eux
                  <span aria-hidden="true" className="link-live-arrow">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <ul className="grid gap-5">
            {autres.map((s, i) => (
              <li key={s.id} className="h-full">
                <Reveal delay={(i + 1) * 70} className="h-full">
                  <Link
                    href={s.href}
                    className={`lift group flex h-full flex-col rounded-sm border border-hairline p-7 ${tintClass[s.tint]}`}
                  >
                    <h3 className="text-display-sm transition-colors group-hover:text-rose">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{s.body}</p>
                    <span className="plate-label mt-auto pt-5 inline-flex items-center gap-1.5 text-rose">
                      Voir
                      <span aria-hidden="true" className="link-live-arrow">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
