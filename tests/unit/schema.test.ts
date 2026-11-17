import { describe, expect, it } from "vitest";

import {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
  serializeJsonLd,
  serviceSchema,
} from "@/lib/schema";

describe("serializeJsonLd", () => {
  it("échappe les chevrons pour prévenir l'injection XSS", () => {
    const out = serializeJsonLd({ name: "<script>alert(1)</script>" });
    expect(out).not.toContain("<script>");
    expect(out).toContain("\\u003cscript>");
  });
});

describe("organizationSchema", () => {
  it("expose les champs essentiels et les fondateurs réels", () => {
    const org = organizationSchema();
    expect(org["@type"]).toBe("ProfessionalService");
    expect(org.name).toBe("Bloomy Digital Studio");
    const founders = org.founder as { name: string }[];
    expect(founders.map((f) => f.name)).toEqual([
      "Clarence Dion",
      "Tom Rodrigues",
    ]);
  });

  it("n'inclut aucun agrégat d'avis auto-déclaré", () => {
    const org = organizationSchema();
    expect(org).not.toHaveProperty("aggregateRating");
    expect(org).not.toHaveProperty("review");
  });
});

describe("breadcrumbSchema", () => {
  it("numérote les positions à partir de 1 avec URL absolues", () => {
    const bc = breadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Fleuristes", path: "/fleuristes" },
    ]);
    const items = bc.itemListElement as { position: number; item: string }[];
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(items[1].item).toMatch(/^https:\/\/.+\/fleuristes$/);
  });
});

describe("serviceSchema", () => {
  it("référence l'organisation par @id", () => {
    const svc = serviceSchema({
      name: "Test",
      description: "Desc",
      path: "/fleuristes",
      serviceType: "Test",
    });
    expect(svc.provider).toHaveProperty("@id");
  });
});

describe("articleSchema", () => {
  it("utilise dateModified fournie ou retombe sur datePublished", () => {
    const withModified = articleSchema({
      headline: "T",
      description: "D",
      path: "/blog/x",
      datePublished: "2026-07-10",
      dateModified: "2026-07-24",
      authorName: "A",
    });
    expect(withModified.dateModified).toBe("2026-07-24");

    const withoutModified = articleSchema({
      headline: "T",
      description: "D",
      path: "/blog/x",
      datePublished: "2026-07-10",
      authorName: "A",
    });
    expect(withoutModified.dateModified).toBe("2026-07-10");
  });
});
