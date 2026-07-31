import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

export const metadata = pageMetadata({
  title: "Blog : conseils digitaux concrets pour fleuristes",
  description:
    "Guides pratiques pour fleuristes : site internet, Google Maps, vente en ligne, saisons — écrits par l'équipe de la plateforme Bloomy.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) =>
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
        title="Des réponses concrètes, pas du remplissage SEO"
        lede="Chaque article répond à une question que de vrais fleuristes nous posent. Peu d'articles, écrits sérieusement, mis à jour quand les choses changent."
      />

      {/*
        Un sommaire de revue, pas une pile de cartes : la date en colonne
        étroite, le titre en grand, et un filet pour séparer. Encadrer chaque
        article dans une boîte blanche donnait à une liste de trois textes
        l'allure d'un catalogue de produits.
      */}
      <section className="py-16 sm:py-24">
        <Container>
          <ol className="border-t border-hairline">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-hairline">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-x-10 gap-y-3 py-9 transition-colors duration-150 hover:bg-cream-deep/40 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)] sm:py-12"
                >
                  <p className="plate-label flex flex-wrap items-center gap-x-2">
                    <time dateTime={post.datePublished}>
                      {dateFormatter.format(new Date(post.datePublished))}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min de lecture</span>
                  </p>
                  <div>
                    <h2 className="text-display-md max-w-2xl transition-colors group-hover:text-rose">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                      {post.description}
                    </p>
                    <span className="plate-label mt-5 inline-flex items-center gap-2 text-rose">
                      Lire l&apos;article
                      <span aria-hidden="true" className="link-live-arrow">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand placement="blog_footer" />
    </>
  );
}
