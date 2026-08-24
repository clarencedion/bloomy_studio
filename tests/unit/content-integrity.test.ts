import { describe, expect, it } from "vitest";

import { blogPosts, getBlogPost } from "@/lib/blog";
import { caseStudies, publishedCaseStudies } from "@/lib/case-studies";
import { floristOffers, mvpOffer } from "@/lib/offers";
import { footerNav, mainNav, mainNavLinks } from "@/lib/site";

/** Routes existantes du site (doit refléter src/app). */
const KNOWN_ROUTES = new Set([
  "/",
  "/fleuristes",
  "/fleuristes/site-internet",
  "/fleuristes/e-commerce",
  "/fleuristes/seo-local",
  "/fleuristes/maintenance",
  "/salons-de-coiffure",
  "/ramonage",
  "/developpement-mvp",
  "/sites-internet",
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
  it("la barre de navigation ne dépasse jamais six entrées visibles", () => {
    // Ce sont les entrées de premier niveau qui débordent la barre, pas les
    // liens repliés dans un menu déroulant.
    expect(mainNav.length).toBeLessThanOrEqual(6);
  });

  it("la navigation principale ne pointe que vers des routes existantes", () => {
    for (const item of mainNavLinks) {
      expect(KNOWN_ROUTES.has(item.href), `route inconnue : ${item.href}`).toBe(true);
    }
  });

  it("chaque menu déroulant a un identifiant unique et au moins deux entrées", () => {
    const menus = mainNav.filter((e) => e.kind === "menu");
    const ids = menus.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const m of menus) {
      // Un menu déroulant d'une seule entrée est un lien déguisé : il ajoute
      // un geste sans rien organiser.
      expect(m.items.length, `menu trop court : ${m.id}`).toBeGreaterThanOrEqual(2);
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

describe("intégrité du portfolio", () => {
  it("contient les 19 projets sans doublon de slug ou d'URL", async () => {
    const { showcaseSites } = await import("@/lib/portfolio");
    expect(showcaseSites.length).toBe(19);

    const slugs = showcaseSites.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(showcaseSites.length);

    const urls = showcaseSites.map((s) => s.liveUrl);
    expect(new Set(urls).size).toBe(showcaseSites.length);
  });

  it("exclut explicitement les URLs dupliquées interdites", async () => {
    const { showcaseSites } = await import("@/lib/portfolio");
    const urls = showcaseSites.map((s) => s.liveUrl);
    for (const url of urls) {
      expect(url).not.toContain("bloomy-fleuriste.web.app");
      expect(url).not.toContain("fleursdelisa.web.app");
    }
  });

  it("chaque projet a des métadonnées complètes et valides", async () => {
    const { showcaseSites } = await import("@/lib/portfolio");
    for (const s of showcaseSites) {
      expect(s.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.city.length).toBeGreaterThan(0);
      expect(s.liveUrl).toMatch(/^https:\/\//);
      expect(s.focus.length).toBeGreaterThan(0);
      expect(s.note.length).toBeGreaterThan(0);
      expect(s.alt.length).toBeGreaterThanOrEqual(10);
      expect(s.image).toMatch(/^\/realisations\/[a-z0-9-]+\.webp$/);
      expect(s.categories.length).toBeGreaterThan(0);
    }
  });

  it("le filtrage par catégorie retourne les bons éléments pour tous les filtres", async () => {
    const { portfolioCategories, getSitesByCategory, showcaseSites } = await import(
      "@/lib/portfolio"
    );
    for (const cat of portfolioCategories) {
      const filtered = getSitesByCategory(cat.id);
      expect(filtered.length, `catégorie vide : ${cat.id}`).toBeGreaterThan(0);
      if (cat.id === "all") {
        expect(filtered.length).toBe(showcaseSites.length);
      } else {
        for (const site of filtered) {
          expect(site.categories).toContain(cat.id);
        }
      }
    }
  });
});
