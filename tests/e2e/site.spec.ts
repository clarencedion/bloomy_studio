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

    // Règle taste-skill : aucun tiret cadratin ni demi-cadratin dans le texte
    // visible, ni dans le titre de la page.
    const visible = (await page.locator("body").innerText()) + (await page.title());
    const dashes = visible.match(/.{0,30}[—–].{0,30}/g);
    expect(dashes, `tirets interdits sur ${path} : ${dashes?.join(" | ")}`).toBeNull();

    // Aucune adresse de développement écrite à l'écran (demande du 2026-10-13).
    const devHosts = visible.match(/[\w-]+\.(?:vercel\.app|web\.app|firebaseapp\.com|pages\.dev)/g);
    expect(devHosts, `adresses de dev visibles sur ${path} : ${devHosts?.join(", ")}`).toBeNull();

    // Pas d'erreur console critique.
    expect(errors, `erreurs console sur ${path} : ${errors.join(" | ")}`).toEqual([]);
  });
}

test("la page 404 est utile et renvoie un statut 404", async ({ page }) => {
  const response = await page.goto("/page-qui-n-existe-pas");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("fanée");
  await expect(
    page.locator("main").getByRole("link", { name: "Diagnostic gratuit" }),
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

  // Le bandeau cookies se pose en bas à gauche, sur la liste des filtres :
  // comme un vrai visiteur, on y répond d'abord.
  const banner = page.getByRole("dialog", { name: "Cookies" });
  if (await banner.isVisible().catch(() => false)) {
    await banner.getByRole("button", { name: "Tout refuser" }).click();
    await expect(banner).toBeHidden();
  }

  // Par défaut, tous les projets (21 livrés, 12 récents, 25 concepts), par
  // lots de douze : le bouton ajoute le lot suivant jusqu'au dernier.
  const cards = page.locator("#portfolio-grid article");
  const more = page.getByRole("button", { name: /^Afficher \d+ projets? de plus$/ });
  await expect(cards).toHaveCount(12);
  for (const expected of [24, 36, 48, 58]) {
    await more.click();
    await expect(cards).toHaveCount(expected);
  }
  await expect(more).toBeHidden();

  // Changer de filtre repart du premier lot.
  await page.getByRole("tab", { name: /^Fleuristes/ }).click();
  await expect(cards).toHaveCount(12);
  await more.click();
  await expect(cards).toHaveCount(21);
  await expect(page.locator("#portfolio-grid")).toContainText("Osmose Florale");

  await page.getByRole("tab", { name: /Hôtellerie/ }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.locator("#portfolio-grid")).toContainText("FLÖVIA");

  await page.getByRole("tab", { name: /Conseil/ }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.locator("#portfolio-grid")).toContainText("ACT4RESULTS");

  await page.getByRole("tab", { name: /Artisans/ }).click();
  await expect(cards).toHaveCount(7);
  await expect(page.locator("#portfolio-grid")).toContainText("Net Plus Services");
  await expect(page.locator("#portfolio-grid")).toContainText("WAW Carrosserie");

  await page.getByRole("tab", { name: /Automobile|Garages/ }).click();
  await expect(cards).toHaveCount(5);

  // Les projets concept sont regroupés et étiquetés comme tels.
  await page.getByRole("tab", { name: /Restaurants/ }).click();
  await expect(cards).toHaveCount(8);
  await expect(page.locator("#portfolio-grid")).toContainText("Hanare");

  await page.getByRole("tab", { name: /concept/i }).click();
  await expect(cards).toHaveCount(12);
  await more.click();
  await expect(cards).toHaveCount(24);
  await more.click();
  await expect(cards).toHaveCount(25);
  await expect(page.locator("#portfolio-grid")).toContainText("Projet concept");

  await page.getByRole("tab", { name: /Horticulture/ }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.locator("#portfolio-grid")).toContainText("Pépinières Raffard");

  await page.getByRole("tab", { name: /Tous les projets/ }).click();
  await expect(cards).toHaveCount(12);
});
