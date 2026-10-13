import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { outlineArticle } from "@/components/blog/outline";
import { RelatedReading } from "@/components/blog/RelatedReading";
import { JsonLd } from "@/components/seo/JsonLd";
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

/**
 * Page article. Récit : un en-tête qui situe (sujet, titre, métadonnées
 * réelles), le texte en colonne de lecture (~68 caractères) avec son
 * sommaire, la marque de fin, puis les lectures liées et la bande finale.
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { content, outline } = outlineArticle(post.body);
  const others = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

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
      <article>
        <ArticleHeader post={post} />

        <Container className="py-14 sm:py-20">
          {/*
            Colonne de lecture de 34 rem : environ 68 caractères par ligne en
            Geist 17 px. Le sommaire occupe une colonne fixe à gauche.
          */}
          <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20 xl:gap-28">
            <div>
              <ArticleToc outline={outline} />
            </div>

            <div className="min-w-0">
              <div className="article prose-links max-w-[34rem] [&_h2]:scroll-mt-28">{content}</div>

              {/* Marque de fin : le monogramme du logo, une seule fois. */}
              <div className="mt-14">
                <Image
                  src="/brand/bloomy-mark.svg"
                  alt=""
                  width={1386}
                  height={1437}
                  unoptimized
                  className="h-auto w-9"
                />
              </div>
            </div>
          </div>
        </Container>
      </article>

      <RelatedReading others={others} related={post.related} />

      <CtaBand
        intent="audit"
        title={"Où en est votre boutique\u00a0?"}
        lede="Le diagnostic gratuit passe votre site et votre fiche Google en revue, puis vous donne des priorités concrètes. Sans engagement."
        placement="blog_article_footer"
      />
    </>
  );
}
