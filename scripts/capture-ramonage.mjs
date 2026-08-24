import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Captures du site de démonstration ramoneur (RamoPlus), utilisées par la
 * vitrine de `/ramonage`.
 *
 * RamoPlus est une démonstration conçue par le studio, réellement en ligne :
 * ce n'est pas un site client, et la page le dit dans sa légende. À
 * régénérer après toute évolution de ce site.
 *
 * Desktop 1600 × 1000 et mobile 390 × 844 en densité 2, converties en WebP
 * sous 100 Ko — mêmes réglages que `capture-realisations.mjs`.
 */
const BASE = "https://ramoplus.pages.dev/";
const SHOTS = [
  ["ramoplus-accueil", BASE, "desktop"],
  ["ramoplus-accueil", BASE, "mobile"],
];

const outDir = "public/ramonage";
const tmp = await mkdtemp(join(tmpdir(), "ramo-"));
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

for (const [slug, url, kind] of SHOTS) {
  const desktop = kind === "desktop";
  const ctx = await browser.newContext({
    viewport: desktop ? { width: 1600, height: 1000 } : { width: 390, height: 844 },
    deviceScaleFactor: desktop ? 1 : 2,
    isMobile: !desktop,
    hasTouch: !desktop,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  // Laisse les polices et les images du hero se poser.
  await page.waitForTimeout(4000);
  const png = join(tmp, `${slug}-${kind}.png`);
  await page.screenshot({ path: png });
  await ctx.close();

  const name = desktop ? `${slug}.webp` : `${slug}-mobile.webp`;
  const r = await toWebp(png, join(outDir, name), desktop ? 100_000 : 80_000);
  console.log(
    `${name.padEnd(32)} ${r.w}×${r.h} ${(r.bytes / 1024).toFixed(1)} Ko (q${r.quality})`,
  );
}

await browser.close();
await rm(tmp, { recursive: true, force: true });
