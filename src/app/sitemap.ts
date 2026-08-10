import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
import { publishedCaseStudies } from "@/lib/case-studies";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap XML. Règles appliquées : lastmod reflète la dernière modification
 * réelle du contenu (dates portées par les données, pas la date de build) ;
 * pas de <priority>/<changefreq> (ignorés par Google) ; uniquement des URL
 * canoniques indexables.
 */

/** Date de dernière évolution significative des pages statiques (mise à jour à chaque refonte de contenu). */
const STATIC_CONTENT_UPDATED = new Date("2026-07-24");

const staticPaths = [
  "/",
  "/fleuristes",
  "/fleuristes/site-internet",
  "/fleuristes/e-commerce",
  "/fleuristes/seo-local",
  "/fleuristes/maintenance",
  "/salons-de-coiffure",
  "/developpement-mvp",
  "/micro-saas",
  "/services",
  "/realisations",
  "/a-propos",
  "/methode",
  "/audit",
  "/contact",
  "/blog",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/cookies",
  "/conditions-generales",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: STATIC_CONTENT_UPDATED,
    })),
    ...publishedCaseStudies().map((cs) => ({
      url: absoluteUrl(`/realisations/${cs.slug}`),
      lastModified: new Date(cs.updatedAt),
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.dateModified),
    })),
  ];
}
