import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Captures des sites livrés, depuis leur version en ligne.
 * Desktop 1600×1000 et mobile 390×844, converties en WebP sous 100 Ko.
 */
const SITES = [
  ["monloup", "https://monloup.web.app/"],
  ["maison-hortense", "https://maisonhortense.web.app/"],
  ["kl-fleurs", "https://kl-fleurs.web.app/"],
  ["maison-orpha", "https://maisonorpha.web.app/"],
  ["flovia", "https://flovia.web.app/"],
];

const outDir = "public/realisations";
const tmp = await mkdtemp(join(tmpdir(), "shots-"));
const browser = await chromium.launch();

/** Descend la qualité jusqu'à passer sous la limite, sans jamais rogner l'image. */
async function toWebp(pngPath, target, maxBytes) {
  for (const quality of [82, 74, 66, 58, 50, 42]) {
    const buf = await sharp(pngPath).webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= maxBytes || quality === 42) {
      await sharp(buf).toFile(target);
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
    const ctx = await browser.newContext({
      viewport,
      deviceScaleFactor: scale,
      isMobile: kind === "mobile",
      hasTouch: kind === "mobile",
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    // Laisse les polices et les images du hero se poser.
    await page.waitForTimeout(5000);
    const png = join(tmp, `${slug}-${kind}.png`);
    await page.screenshot({ path: png });
    await ctx.close();

    const name = kind === "desktop" ? `${slug}.webp` : `${slug}-mobile.webp`;
    const r = await toWebp(png, join(outDir, name), maxBytes);
    results.push(`${name.padEnd(28)} ${String(r.w).padStart(4)}×${String(r.h).padEnd(4)} ${(r.bytes / 1024).toFixed(1)} Ko (q${r.quality})`);
    console.log(results.at(-1));
  }
}

await browser.close();
await rm(tmp, { recursive: true, force: true });
