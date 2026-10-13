import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { frenchSpacing } from "@/components/blog/outline";
import { Container } from "@/components/ui/Container";
import type { BlogPost } from "@/lib/blog";

/**
 * Fin d'article : les autres articles en liste éditoriale à gauche, et les
 * pages du site qui prolongent le sujet dans un panneau rose à droite.
 * Deux familles distinctes plutôt qu'une rangée de cartes égales.
 * Mobile : les deux blocs s'empilent, la liste d'abord.
 */
export function RelatedReading({
  others,
  related,
}: {
  others: BlogPost[];
  related: BlogPost["related"];
}) {
  return (
    <section aria-labelledby="a-lire-ensuite" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="a-lire-ensuite" className="text-display-lg">
              À lire ensuite
            </h2>
            <ul className="mt-10 border-t border-line">
              {others.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-6 py-7"
                  >
                    <span>
                      <span className="plate-label block">
                        {post.topic}, {post.readingMinutes}&nbsp;min
                      </span>
                      <span className="text-display-sm mt-2.5 block transition-colors group-hover:text-bloom-ink">
                        {frenchSpacing(post.title)}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      weight="bold"
                      className="arrow-nudge mt-7 size-5 shrink-0 text-bloom-ink"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 ? (
            <aside
              aria-label="Nos offres sur ce sujet"
              className="leaf self-start bg-blush p-7 sm:p-10 lg:col-span-4 lg:col-start-9"
            >
              <p className="text-display-sm">Pour passer à la pratique</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-forest-soft">
                Ce que nous construisons sur ce sujet, pour les fleuristes.
              </p>
              <ul className="mt-7 space-y-3">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group press flex min-h-12 items-center justify-between gap-4 whitespace-nowrap rounded-full bg-white px-5 py-3 font-semibold text-forest transition-colors hover:bg-forest hover:text-paper"
                    >
                      {item.label}
                      <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
