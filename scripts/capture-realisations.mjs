import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Captures des sites livrés, depuis leur version en ligne.
 * Desktop 1600×1000 et mobile 390×844, converties en WebP sous 100 Ko.
 */
const SITES = [
  ["act4results", "https://act4results.web.app/"],
  ["flovia", "https://flovia.web.app/"],
  ["pepinieres-raffard", "https://pepinieres-raffard.web.app/"],
  ["rodolphe-dion-coiffure", "https://rodolphedioncoiffure.web.app/"],
  ["artistfloral", "https://artistfloral.web.app/"],
  ["kl-fleurs", "https://kl-fleurs.web.app/"],
  ["atelier-de-laurent", "https://atelierdelaurent.web.app/"],
  ["fleurs-ditalie", "https://fleurs-ditalie.web.app/"],
  ["maison-hortense", "https://maisonhortense.web.app/"],
  ["maison-orpha", "https://maisonorpha.web.app/"],
  ["maison-de-rose", "https://maisonderose.web.app/"],
  ["monloup", "https://monloup.web.app/"],
  ["julius", "https://fleuriste-julius.web.app/"],
  ["capifiore", "https://capifiore.web.app/"],
  ["la-fine-fleur", "https://lafinefleur.web.app/"],
  ["la-cle-des-champs", "https://lacledeschamps.web.app/"],
  ["osmose-florale", "https://osmoseflorale.web.app/"],
  ["aux-coquelicots", "https://auxcoquelicots.web.app/"],
  ["au-jardin-de-celine", "https://aujardindeceline.web.app/"],
];

const outDir = "public/realisations";
const tmp = await mkdtemp(join(tmpdir(), "shots-"));
const browser = await chromium.launch();

/** Descend la qualité jusqu'à passer sous la limite, sans jamais rogner l'image. */
async function toWebp(pngPath, target, maxBytes) {
  for (const quality of [82, 74, 66, 58, 50, 42, 35, 28, 22, 18]) {
    const buf = await sharp(pngPath).webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= maxBytes || quality === 18) {
      await writeFile(target, buf);
      const meta = await sharp(buf).metadata();
      return { bytes: buf.length, quality, w: meta.width, h: meta.height };
    }
  }
}

const results = [];
for (const [slug, url] of SITES) {
  for (const [kind, viewport, scale, maxBytes] of [
    ["desktop", { width: 1600, height: 1000 }, 1, 100_000],
    ["mobile", { width: 390, height: 844 }, 2, 80_000],
  ]) {
    try {
      const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: scale,
        isMobile: kind === "mobile",
        hasTouch: kind === "mobile",
      });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
      // Laisse les polices et les images du hero se poser.
      await page.waitForTimeout(3500);
      const png = join(tmp, `${slug}-${kind}.png`);
      await page.screenshot({ path: png });
      await ctx.close();

      const name = kind === "desktop" ? `${slug}.webp` : `${slug}-mobile.webp`;
      const r = await toWebp(png, join(outDir, name), maxBytes);
      results.push(`${name.padEnd(30)} ${String(r.w).padStart(4)}×${String(r.h).padEnd(4)} ${(r.bytes / 1024).toFixed(1)} Ko (q${r.quality})`);
      console.log(results.at(-1));
    } catch (err) {
      console.error(`Error capturing ${slug} (${kind}):`, err.message);
    }
  }
}

await browser.close();
await rm(tmp, { recursive: true, force: true });
console.log(`Captured ${results.length} assets successfully.`);
