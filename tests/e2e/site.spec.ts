import { expect, test } from "@playwright/test";

const INDEXABLE_PAGES = [
  "/",
  "/fleuristes",
  "/fleuristes/site-internet",
  "/fleuristes/e-commerce",
  "/fleuristes/seo-local",
  "/fleuristes/maintenance",
  "/salons-de-coiffure",
  "/developpement-mvp",
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
