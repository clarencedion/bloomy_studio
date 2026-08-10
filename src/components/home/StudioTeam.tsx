import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

/**
 * Qui répond quand vous écrivez.
 *
 * Le site n'avait aucun visage. Pour un studio de deux personnes qui vend de
 * la proximité — « une réponse humaine sous 48 h » — c'était le contresens le
 * plus coûteux : on promettait de l'humain en ne montrant que des cadres
 * d'appareil et des filets gris.
 *
 * Les portraits sont réels et déjà publics sur bloomy.one. Aucune photo
 * d'équipe générique, aucune silhouette de banque d'images.
 */
export function StudioTeam() {
  return (
    <section className="border-t border-hairline py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-14">
          <ul className="flex -space-x-4">
            {site.founders.map((f) => (
              <li key={f.name}>
                <Image
                  src={f.photo}
                  alt={`${f.name}, ${f.role.toLowerCase()} de Bloomy Studio.`}
                  width={640}
                  height={640}
                  sizes="9rem"
                  className="size-28 rounded-full border-4 border-cream bg-cream-deep object-cover sm:size-36"
                />
              </li>
            ))}
          </ul>

          <div>
            <Eyebrow>Le studio</Eyebrow>
            <h2 className="text-display-lg mt-5 max-w-xl">
              Deux personnes, pas un service client
            </h2>
            <p className="lede mt-5 max-w-xl">
              {site.founders[0].name} et {site.founders[1].name}{" "}
              construisent Bloomy et les sites du studio. C&apos;est l&apos;un des deux qui
              lit votre message, fait votre diagnostic et conçoit votre site —
              il n&apos;y a personne d&apos;autre entre vous et nous.
            </p>
            <Link
              href="/a-propos"
              className="link-live mt-6 inline-block font-semibold text-rose"
            >
              Pourquoi les fleuristes{" "}
              <span aria-hidden="true" className="link-live-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
