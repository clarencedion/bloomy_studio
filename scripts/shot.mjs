import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Contrôle visuel d'une page en cours de développement (AGENTS.md : « ne pas
 * considérer un changement visuel comme terminé sans l'avoir regardé dans un
 * vrai navigateur, desktop et mobile »).
 *
 * Usage : npm run shot -- <route> [dossier] [--motion] [--base=http://localhost:3000]
 *
 * Produit `desktop-full.png` (1440 px) et `mobile-full.png` (390 px, densité 2),
 * puis des tranches de la hauteur d'un écran (`desktop-01.png`…) assez petites
 * pour être relues une à une. Par défaut, émule `prefers-reduced-motion:
 * reduce` pour que les révélations au défilement soient visibles sur une
 * capture pleine page ; `--motion` garde les animations. Affiche aussi le
 * statut HTTP, le nombre de H1, le débordement horizontal et les erreurs
 * console. Le bandeau cookies est masqué (consentement « refusé » pré-rempli).
 */
const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const path = positional[0] ?? "/";
const outDir = positional[1] ?? join(".shots", path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "_"));
const motion = args.includes("--motion");
const base = (args.find((a) => a.startsWith("--base=")) ?? "--base=http://localhost:3000").slice(7);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const configs = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, scale: 1, mobile: false, slice: 1100 },
  { name: "mobile", viewport: { width: 390, height: 844 }, scale: 2, mobile: true, slice: 900 },
];

for (const c of configs) {
  const ctx = await browser.newContext({
    viewport: c.viewport,
    deviceScaleFactor: c.scale,
    isMobile: c.mobile,
    hasTouch: c.mobile,
    reducedMotion: motion ? "no-preference" : "reduce",
  });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem(
        "bloomy-studio-consent-v1",
        JSON.stringify({ analytics: false, decidedAt: new Date().toISOString() }),
      );
    } catch {}
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  const res = await page.goto(base + path, { waitUntil: "networkidle", timeout: 90_000 }).catch((e) => {
    errors.push("goto: " + e.message);
    return null;
  });
  // Défile toute la page : déclenche les révélations et le chargement différé.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  const full = join(outDir, `${c.name}-full.png`);
  await page.screenshot({ path: full, fullPage: true });
  await ctx.close();

  const meta = await sharp(full).metadata();
  const sliceH = c.slice * c.scale;
  let n = 0;
  for (let top = 0; top < meta.height; top += sliceH) {
    n += 1;
    const h = Math.min(sliceH, meta.height - top);
    await sharp(full)
      .extract({ left: 0, top, width: meta.width, height: h })
      .resize({ width: c.viewport.width })
      .toFile(join(outDir, `${c.name}-${String(n).padStart(2, "0")}.png`));
  }
  console.log(
    `${c.name}: status=${res?.status()} h1=${info.h1} overflowX=${info.overflow}px height=${info.height}px slices=${n} errors=${errors.length}`,
  );
  for (const e of errors.slice(0, 8)) console.log("  console error:", e.slice(0, 300));
}
await browser.close();
