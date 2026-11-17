import { describe, expect, it } from "vitest";

import { blogPosts, getBlogPost } from "@/lib/blog";
import { caseStudies, publishedCaseStudies } from "@/lib/case-studies";
import { floristOffers, mvpOffer } from "@/lib/offers";
import type { ShowcaseSite } from "@/lib/portfolio";
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
  it("contient les 110 projets sans doublon de slug ou d'URL", async () => {
    const { showcaseSites } = await import("@/lib/portfolio");
    expect(showcaseSites.length).toBe(110);

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
    const sites: readonly ShowcaseSite[] = showcaseSites;
    for (const s of sites) {
      expect(s.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.city.length).toBeGreaterThan(0);
      expect(s.liveUrl).toMatch(/^https:\/\//);
      expect(s.focus.length).toBeGreaterThan(0);
      expect(s.note.length).toBeGreaterThan(0);
      expect(s.alt.length).toBeGreaterThanOrEqual(10);
      expect(s.image).toMatch(/^\/realisations\/[a-z0-9-]+\.webp$/);
      expect(s.categories.length).toBeGreaterThan(0);
      expect(s.tone).toMatch(/^#[0-9a-f]{6}$/);
      if (s.long) expect(s.long.image).toBe(`/realisations/long/${s.slug}.webp`);
    }
  });

  it("chaque fichier de capture référencé existe sur le disque", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const { showcaseSites } = await import("@/lib/portfolio");
    const sites: readonly ShowcaseSite[] = showcaseSites;
    for (const s of sites) {
      const files = [s.image, s.mobile?.image, s.long?.image].filter(Boolean) as string[];
      for (const f of files) {
        expect(existsSync(join(process.cwd(), "public", f)), `capture manquante : ${f}`).toBe(true);
      }
    }
  });

  it("un projet concept est marqué comme tel et rangé dans le filtre Concepts", async () => {
    const { showcaseSites } = await import("@/lib/portfolio");
    const sites: readonly ShowcaseSite[] = showcaseSites;
    const concepts = sites.filter((s) => s.kind === "concept");
    // Démonstrations (entreprise fictive) et propositions de refonte non
    // commandées : elles se déclarent comme telles sur leurs propres pages et
    // ne doivent jamais passer pour un travail livré.
    expect(concepts.map((s) => s.slug).sort()).toEqual(
      [
        "alliantherm",
        "atelier-laque",
        "atelier-ronce-tattoo",
        "bigoudi-coiffure-montpellier",
        "bleu-calanque-piscines",
        "cave-tire-bouchon-lille",
        "chatoyance",
        "coupechou-toulouse",
        "domaine-des-aurores",
        "domaine-hautes-prairies",
        "fanchon",
        "garage-bielle",
        "garance-coiffure-rennes",
        "glacage",
        "hanare",
        "lauro",
        "linteau-construction",
        "lunule",
        "maillard",
        "maison-lisiere",
        "maison-vaneau-coiffure",
        "marys-hair-clermont",
        "nailac-passion",
        "nails-by-cindy",
        "odette",
        "opaline",
        "paoli-immobilier",
        "rameau",
        "ramoplus",
        "sillon",
        "sitaclim",
        "soderel-refonte",
        "thermibel",
        "thiou-immobilier-annecy",
        "tison",
        "tremiere-conciergerie",
      ].sort(),
    );
    for (const s of concepts) {
      expect(s.categories as readonly string[]).toContain("concepts");
    }
    for (const s of sites.filter((x) => x.kind !== "concept")) {
      expect(s.categories as readonly string[]).not.toContain("concepts");
    }
  });

  it("aucune adresse de développement n'est jamais affichée en clair", async () => {
    const { showcaseSites, siteHost } = await import("@/lib/portfolio");
    // Demande de l'équipe (2026-10-13) : vercel.app, web.app… restent derrière
    // un lien, jamais écrits à l'écran.
    for (const s of showcaseSites) {
      expect(siteHost(s)).not.toMatch(/vercel\.app|web\.app|firebaseapp\.com|pages\.dev|netlify\.app/);
    }
  });

  it("la vitrine fleuriste de référence pointe vers le domaine d'Osmose Florale", async () => {
    const { getShowcaseSite, featuredSlugs } = await import("@/lib/portfolio");
    expect(getShowcaseSite("osmose-florale")?.liveUrl).toBe("https://osmoseflorale-ain.fr");
    expect(featuredSlugs[0]).toBe("osmose-florale");
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

describe("pages légales", () => {
  it("aucun champ légal à compléter : les pages sont publiables et indexables", async () => {
    const { hasLegalPlaceholders, legalEntity, dataProtection, PLACEHOLDER } = await import("@/lib/legal");
    expect(hasLegalPlaceholders()).toBe(false);
    // Faits repris des textes en vigueur de l'application (version 2.0 du 28/10/2026).
    const all = JSON.stringify({ legalEntity, dataProtection });
    expect(all).not.toContain(PLACEHOLDER);
    expect(all).not.toMatch(/XX|à compléter|à confirmer/i);
    expect(legalEntity.vat).toBe("FR62101421212");
    expect(legalEntity.siret.replace(/\s/g, "")).toBe("10142121200016");
  });
});
