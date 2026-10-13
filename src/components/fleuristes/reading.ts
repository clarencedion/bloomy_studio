import type { ReadingLink } from "@/components/fleuristes/FaqBlock";
import { frenchSpacing } from "@/components/blog/outline";
import { getBlogPost } from "@/lib/blog";

/**
 * Lien de lecture vers un article du blog : titre et durée tirés de
 * `lib/blog.tsx`, jamais recopiés à la main. Un slug inconnu fait échouer le
 * rendu plutôt que de publier un lien mort.
 */
export function articleLink(slug: string): ReadingLink {
  const post = getBlogPost(slug);
  if (!post) throw new Error(`Article inconnu : ${slug}`);
  return {
    href: `/blog/${post.slug}`,
    kind: `Article · ${post.readingMinutes}\u00a0min de lecture`,
    label: frenchSpacing(post.title),
  };
}
