/**
 * Constructeurs JSON-LD. Types actifs uniquement (Organization,
 * ProfessionalService, Service, Article/BlogPosting, BreadcrumbList, Person).
 * Pas de FAQPage (rich results retirés), pas de HowTo, pas d'avis auto-déclarés.
 * Chaque schema doit correspondre à un contenu visible sur la page.
 */

import { SITE_URL, absoluteUrl, site } from "@/lib/site";

type JsonLdObject = Record<string, unknown>;

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    founder: site.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: site.parent.name,
      url: site.parent.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Création de site internet pour fleuriste",
      "E-commerce floral",
      "Click-and-collect",
      "SEO local",
      "Google Business Profile",
      "Développement web",
    ],
    priceRange: "Sur devis",
  };
}

export function webSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  audience?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.serviceType,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    ...(opts.audience
      ? { audience: { "@type": "Audience", audienceType: opts.audience } }
      : {}),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: opts.authorName },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Sérialisation sûre pour balise <script type="application/ld+json">. */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
