import type { Metadata } from "next";

import { SITE_URL, absoluteUrl, site } from "@/lib/site";

type PageMeta = {
  /** Title 50–60 caractères, mot-clé devant. Le gabarit ajoute « | Bloomy Digital Studio ». */
  title: string;
  /** Meta description 130–150 caractères, sans guillemets. */
  description: string;
  /** Chemin canonique, ex. "/fleuristes". */
  path: string;
  /** Empêche l'indexation (pages utilitaires). */
  noindex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "fr_FR",
      type: ogType,
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const metadataBase = new URL(SITE_URL);
