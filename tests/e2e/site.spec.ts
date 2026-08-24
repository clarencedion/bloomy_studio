import { expect, test } from "@playwright/test";

const INDEXABLE_PAGES = [
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
  "/realisations/bloomy-plateforme-florale",
  "/a-propos",
  "/methode",
  "/audit",
  "/contact",
  "/blog",
  "/blog/site-internet-fleuriste-checklist",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/cookies",
  "/conditions-generales",
];

for (const path of INDEXABLE_PAGES) {
  test(`${path} : chargement, H1 unique, canonical, pas d'overflow horizontal`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // Un seul H1 par page.
    await expect(page.locator("h1")).toHaveCount(1);

    // Canonical absolu présent.
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /^https?:\/\//);

    // Meta description présente et non vide.
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description && description.length).toBeTruthy();

    // Pas de défilement horizontal.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow horizontal de ${overflow}px sur ${path}`).toBeLessThanOrEqual(0);

    // Espace après un lien (AGENTS.md) : un </a> rendu ne doit jamais coller à
    // la ponctuation ou au mot qui suit — sinon JSX a mangé l'espace littéral.
    const html = await page.content();
    const glued = html.match(/<\/a>(—|:|[A-Za-zÀ-ÿ])/g);
    expect(glued, `lien collé au texte suivant sur ${path} : ${glued?.join(", ")}`).toBeNull();

    // Pas d'erreur console critique.
    expect(errors, `erreurs console sur ${path} : ${errors.join(" | ")}`).toEqual([]);
  });
}

test("la page 404 est utile et renvoie un statut 404", async ({ page }) => {
  const response = await page.goto("/page-qui-n-existe-pas");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("fanée");
  await expect(
    page.locator("main").getByRole("link", { name: "Audit gratuit" }),
  ).toBeVisible();
});

test("le sitemap et robots.txt répondent", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/fleuristes");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("sitemap.xml");
});

test("le JSON-LD Organization est rendu côté serveur", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain('"@type":"ProfessionalService"');
  expect(html).toContain("Clarence Dion");
});

test("la page réalisations permet de filtrer les projets par catégorie", async ({ page }) => {
  await page.goto("/realisations");

  // Par défaut, l'onglet Fleuristes est actif (15 sites)
  const cards = page.locator("#portfolio-grid article");
  await expect(cards).toHaveCount(15);

  // Filtrer par Hôtellerie & Tourisme (1 projet : FLÖVIA)
  await page.getByRole("tab", { name: /Hôtellerie/ }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.locator("#portfolio-grid")).toContainText("FLÖVIA");

  // Filtrer par Conseil & Stratégie B2B (1 projet : ACT4RESULTS)
  await page.getByRole("tab", { name: /Conseil/ }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.locator("#portfolio-grid")).toContainText("ACT4RESULTS");

  // Filtrer par Horticulture & Pépinières (1 projet : Pépinières Raffard)
  await page.getByRole("tab", { name: /Horticulture/ }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.locator("#portfolio-grid")).toContainText("Pépinières Raffard");

  // Afficher Tous les projets (19 projets)
  await page.getByRole("tab", { name: /Tous les projets/ }).click();
  await expect(cards).toHaveCount(19);
});

