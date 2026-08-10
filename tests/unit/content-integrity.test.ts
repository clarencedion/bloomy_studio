import { describe, expect, it } from "vitest";

import { blogPosts, getBlogPost } from "@/lib/blog";
import { caseStudies, publishedCaseStudies } from "@/lib/case-studies";
import { floristOffers, mvpOffer } from "@/lib/offers";
import { footerNav, mainNav } from "@/lib/site";

/** Routes existantes du site (doit refléter src/app). */
const KNOWN_ROUTES = new Set([
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
]);

describe("intégrité des liens internes", () => {
  it("la navigation principale ne dépasse jamais six entrées (AGENTS.md)", () => {
    expect(mainNav.length).toBeLessThanOrEqual(6);
  });

  it("la navigation principale ne pointe que vers des routes existantes", () => {
    for (const item of mainNav) {
      expect(KNOWN_ROUTES.has(item.href), `route inconnue : ${item.href}`).toBe(true);
    }
  });

  it("le footer ne pointe que vers des routes existantes", () => {
    const all = [...footerNav.fleuristes, ...footerNav.studio, ...footerNav.legal];
    for (const item of all) {
      expect(KNOWN_ROUTES.has(item.href), `route inconnue : ${item.href}`).toBe(true);
    }
  });

  it("les services liés des études de cas existent", () => {
    for (const cs of caseStudies) {
      for (const rel of cs.relatedServices) {
        expect(KNOWN_ROUTES.has(rel.href), `route inconnue : ${rel.href}`).toBe(true);
      }
    }
  });

  it("les articles référencés depuis les pages service existent", () => {
    // Slugs cités en dur dans les pages fleuristes/e-commerce.
    for (const slug of [
      "site-internet-fleuriste-checklist",
      "apparaitre-google-maps-fleuriste",
      "marketplace-ou-site-en-propre",
    ]) {
      expect(getBlogPost(slug), `article manquant : ${slug}`).toBeDefined();
    }
  });
});

describe("intégrité du contenu", () => {
  it("aucun prix inventé : les offres sans prix vérifié restent sur devis", () => {
    for (const offer of [...floristOffers, mvpOffer]) {
      // Le jour où un prix public est décidé, ce test se met à jour en même
      // temps que lib/offers.ts — il empêche un prix ajouté par accident.
      expect(offer.price).toBeNull();
    }
  });

  it("les études de cas publiées ont des résultats et une date de mise à jour", () => {
    for (const cs of publishedCaseStudies()) {
      expect(cs.results.length).toBeGreaterThan(0);
      expect(cs.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("les articles ont des descriptions de longueur méta valide (110–160)", () => {
    for (const post of blogPosts) {
      expect(post.description.length).toBeGreaterThanOrEqual(110);
      expect(post.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("les slugs d'articles sont uniques et en kebab-case", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
