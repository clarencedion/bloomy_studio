import { expect, test, type Page } from "@playwright/test";

/** Ferme le bandeau cookies pour libérer la zone basse de l'écran. */
async function dismissCookies(page: Page) {
  const banner = page.getByRole("dialog", { name: "Cookies" });
  if (await banner.isVisible().catch(() => false)) {
    await banner.getByRole("button", { name: "Tout refuser" }).click();
    await expect(banner).toBeHidden();
  }
}

test("le bandeau cookies s'affiche, se refuse, et le choix persiste", async ({
  page,
}) => {
  await page.goto("/");
  const banner = page.getByRole("dialog", { name: "Cookies" });
  await expect(banner).toBeVisible();

  // « Refuser » est aussi accessible que « Accepter ».
  await expect(banner.getByRole("button", { name: "Tout refuser" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Tout accepter" })).toBeVisible();

  await banner.getByRole("button", { name: "Tout refuser" }).click();
  await expect(banner).toBeHidden();

  // Aucun script GA chargé après refus.
  const gaRequests: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("googletagmanager")) gaRequests.push(req.url());
  });
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Cookies" })).toBeHidden();
  expect(gaRequests).toEqual([]);

  // Le choix se rouvre depuis le footer.
  await page.getByRole("button", { name: "Gérer les cookies" }).click();
  await expect(page.getByRole("dialog", { name: "Cookies" })).toBeVisible();
});

test("le formulaire d'audit se complète en trois étapes et aboutit", async ({
  page,
}) => {
  await page.goto("/audit");
  await dismissCookies(page);

  // Étape 1
  await page.getByLabel("Votre nom *").fill("Test Fleuriste");
  await page.getByLabel("Votre e-mail *").fill("test@exemple.fr");
  await page.getByRole("button", { name: "Continuer →" }).click();

  // Étape 2
  await expect(page.getByRole("heading", { name: "Votre activité" })).toBeVisible();
  await page.getByLabel(/nom de votre boutique/i).fill("Atelier Test");
  await page.getByLabel("Votre ville *").fill("Nantes");
  await page.getByRole("button", { name: "Continuer →" }).click();

  // Étape 3 — le piège temporel exige ≥ 3 s depuis l'affichage.
  await expect(page.getByRole("heading", { name: "Votre objectif" })).toBeVisible();
  await page.getByRole("checkbox", { name: /J'accepte que Bloomy Studio/ }).check();
  await page.waitForTimeout(3200);
  await page
    .getByRole("button", { name: "Recevoir mon diagnostic gratuit" })
    .click();

  await expect(page.getByText("Votre demande est bien arrivée")).toBeVisible({
    timeout: 15_000,
  });
});

test("le formulaire de contact valide et aboutit", async ({ page }) => {
  await page.goto("/contact");
  await dismissCookies(page);
  await page.getByLabel("Votre nom *").fill("Test Contact");
  await page.getByLabel("Votre e-mail *").fill("contact-test@exemple.fr");
  await page
    .getByLabel("Votre message *")
    .fill("Bonjour, je souhaite discuter de la refonte du site de ma boutique.");
  await page.getByRole("checkbox", { name: /J'accepte que Bloomy Studio/ }).check();
  await page.waitForTimeout(3200);
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByText("Message bien reçu")).toBeVisible({ timeout: 15_000 });
});

test("navigation mobile : le menu s'ouvre, navigue et se referme", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "test mobile uniquement");
  await page.goto("/");
  await dismissCookies(page);
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();

  // Le menu mobile est groupé (Produits, Secteurs) et chaque lien porte une
  // ligne d'explication : on cible donc la destination, pas un libellé exact,
  // sinon le test casse à la première reformulation.
  await expect(menu.getByRole("heading", { name: "Produits" })).toBeVisible();
  await expect(menu.getByRole("heading", { name: "Secteurs" })).toBeVisible();

  await menu.locator('a[href="/fleuristes"]').first().click();
  await expect(page).toHaveURL(/\/fleuristes$/);
  await expect(menu).toBeHidden();
});
