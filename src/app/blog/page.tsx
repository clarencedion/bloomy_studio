import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { formatDate, frenchSpacing } from "@/components/blog/outline";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

export const metadata = pageMetadata({
  title: "Blog : conseils digitaux concrets pour les fleuristes",
  description:
    "Guides pratiques pour fleuristes : site internet, Google Maps et vente en ligne, écrits par l'équipe qui construit la plateforme Bloomy.",
  path: "/blog",
});

/**
 * Index du blog. Récit : le dernier article mis en avant dans un grand
 * panneau rose (titre en grand, chapô, métadonnées), puis les autres en
 * sommaire de revue, date en colonne étroite. Deux familles de mise en page,
 * aucune rangée de cartes égales.
 */
export default function BlogPage() {
  const [lead, ...rest] = [...blogPosts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        eyebrow="Le blog"
        title="Des réponses concrètes, pas du remplissage"
        lede="Chaque article répond à une question que des fleuristes nous posent vraiment. Peu d'articles, tenus à jour."
      />

      {lead ? (
        <section aria-label="Dernier article" className="pb-6">
          <Container width="wide">
            <Link
              href={`/blog/${lead.slug}`}
              className="group leaf-lg relative block bg-blush px-6 py-10 transition-colors hover:bg-blush-deep sm:px-12 sm:py-16 lg:px-16 lg:py-20"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p className="plate-label">
                    Dernier article, {lead.topic.toLowerCase()}
                  </p>
                  <h2 className="text-display-lg mt-5 max-w-3xl transition-colors group-hover:text-bloom-ink">
                    {frenchSpacing(lead.title)}
                  </h2>
                  <p className="mt-6 max-w-2xl text-[1.06rem] leading-relaxed text-forest-soft">
                    {frenchSpacing(lead.description)}
                  </p>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end">
                  <p className="text-[0.92rem] text-forest-soft lg:text-right">
                    <time dateTime={lead.datePublished}>{formatDate(lead.datePublished)}</time>
                    <br />
                    {lead.readingMinutes}&nbsp;min de lecture
                  </p>
                  <span className="inline-flex min-h-12 w-fit items-center gap-2.5 rounded-full bg-bloom-strong px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors group-hover:bg-forest">
                    Lire l&apos;article
                    <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      {/*
        Sommaire de revue : la date en colonne étroite, le titre en grand, un
        filet entre les entrées. Mobile : la date passe au-dessus du titre.
      */}
      {rest.length > 0 ? (
        <section aria-labelledby="tous-les-articles" className="py-16 sm:py-24">
          <Container width="wide">
            <h2 id="tous-les-articles" className="text-display-md">
              Les articles précédents
            </h2>
            <ol className="mt-8 border-t border-line">
              {rest.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-x-10 gap-y-3 py-9 sm:py-11 md:grid-cols-12"
                  >
                    <p className="plate-label md:col-span-3 md:pt-2">
                      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                      <span className="mt-1.5 block normal-case tracking-normal">
                        {post.topic}, {post.readingMinutes}&nbsp;min de lecture
                      </span>
                    </p>
                    <div className="md:col-span-8">
                      <h3 className="text-display-md max-w-3xl transition-colors group-hover:text-bloom-ink">
                        {frenchSpacing(post.title)}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-forest-soft">
                        {frenchSpacing(post.description)}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      weight="bold"
                      className="arrow-nudge mt-2 size-5 text-bloom-ink max-md:hidden md:col-span-1 md:justify-self-end"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      <CtaBand placement="blog_footer" />
    </>
  );
}
