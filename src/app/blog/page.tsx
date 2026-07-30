import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

export const metadata = pageMetadata({
  title: "Blog : conseils digitaux concrets pour fleuristes",
  description:
    "Guides pratiques pour fleuristes et commerces locaux : site internet, Google Maps, vente en ligne, saisons. Écrits par l'équipe de la plateforme Bloomy.",
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

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <ol className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-sm border border-hairline bg-paper p-7 transition-colors hover:border-rose sm:p-9"
                >
                  <p className="plate-label">
                    <time dateTime={post.datePublished}>
                      {dateFormatter.format(new Date(post.datePublished))}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min de lecture</span>
                  </p>
                  <h2 className="text-display-md mt-3 group-hover:text-rose">
                    {post.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-block font-semibold text-rose">
                    Lire l&apos;article →
                  </span>
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
