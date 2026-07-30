import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { blogPosts, getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
        })}
      />
      <article className="py-10 sm:py-16">
        <Container width="narrow">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />
          <header className="mt-8">
            <p className="plate-label">
              <time dateTime={post.datePublished}>
                {dateFormatter.format(new Date(post.datePublished))}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min de lecture</span>
              <span aria-hidden="true">·</span>
              <span>{post.authorName}</span>
            </p>
            <h1 className="text-display-lg mt-4">{post.title}</h1>
            {post.dateModified !== post.datePublished && (
              <p className="mt-3 text-sm text-ink-faint">
                Mis à jour le{" "}
                <time dateTime={post.dateModified}>
                  {dateFormatter.format(new Date(post.dateModified))}
                </time>
              </p>
            )}
          </header>
          <div className="article mt-10">{post.body}</div>

          {others.length > 0 && (
            <nav aria-label="Autres articles" className="mt-16 border-t border-hairline pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                À lire ensuite
              </h2>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="font-medium text-rose underline decoration-rose/40 underline-offset-4 hover:decoration-rose"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Container>
      </article>

      <CtaBand placement="blog_article_footer" />
    </>
  );
}
