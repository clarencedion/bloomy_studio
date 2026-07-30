import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Tout est autorisé, y compris les crawlers IA (décision documentée dans le
 * blueprint : la visibilité dans ChatGPT/Perplexity sert la marque ; pas de
 * llms.txt — aucun bénéfice Google confirmé).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
