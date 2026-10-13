import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Captures des sites du portfolio, depuis leur version en ligne.
 *
 * Trois formats par site :
 *   - desktop  1600×1000, densité 1  → public/realisations/<slug>.webp (< 100 Ko)
 *   - mobile   390×844,  densité 2   → public/realisations/<slug>-mobile.webp (< 80 Ko)
 *   - long     page entière à 1440 px de large, réduite à 960 px et plafonnée
 *              à 3 000 px de haut → public/realisations/long/<slug>.webp (< 190 Ko).
 *              C'est elle que la vitrine fait défiler dans son cadre au survol.
 *
 * Usage : `npm run captures` (tous) ou `npm run captures -- slug1 slug2`.
 */
const SITES = [
  ["osmose-florale", "https://osmoseflorale-ain.fr/"],
  ["gb-performance", "https://gb-performance.vercel.app/"],
  ["nails-by-cindy", "https://nails-by-cindy-beta.vercel.app/#/"],
  ["domaine-des-aurores", "https://domaine-des-aurores.vercel.app/"],
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
  ["aux-coquelicots", "https://auxcoquelicots.web.app/"],
  ["au-jardin-de-celine", "https://aujardindeceline.web.app/"],
  ["net-plus-services", "https://www.netplusservices.fr/"],
  // Projets ajoutés le 2026-10-13 (liste fournie par l'équipe). Adresses de
  // développement : elles servent aux captures et aux liens, jamais à
  // l'affichage (voir `siteHost` dans lib/portfolio.ts).
  ["lagave", "https://lagave-laturballe.vercel.app/"],
  ["blandine-valle", "https://blandine-valle-fleuriste.vercel.app/"],
  ["maison-mana", "https://maison-mana-fleuriste.vercel.app/"],
  ["manon-fleurs-du-sud", "https://manon-fleurs-du-sud.vercel.app/"],
  // Sites à animation d'introduction : délai d'attente allongé (ms).
  ["nature-et-sens", "https://nature-et-sens-fleuriste.vercel.app/", 7000],
  ["bonheurs-nature", "https://bonheurs-nature-jardin-rose.vercel.app/"],
  ["rosset-ugine", "https://rosset-ugine.vercel.app/"],
  ["ptits-gouters-elise", "https://ptits-gouters-elise.vercel.app/"],
  ["aidf", "https://aidf-refonte.vercel.app/"],
  ["garage-industrie", "https://garage-industrie-longperrier.vercel.app/"],
  ["milesi-services", "https://milesi-services.vercel.app/"],
  ["isler-construction", "https://isler-construction.vercel.app/"],
  ["opaline", "https://opaline-onglerie.vercel.app/"],
  ["sitaclim", "https://sitaclim-refonte.vercel.app/"],
  ["thermibel", "https://thermibel-refonte.vercel.app/"],
  ["paoli-immobilier", "https://paoli-immobilier-refonte.vercel.app/"],
  ["nailac-passion", "https://nailac-passion-formation.vercel.app/", 7000],
  ["alliantherm", "https://alliantherm-maquette.vercel.app/"],
  ["maison-lisiere", "https://maison-lisiere.vercel.app/", 7000],
  ["chatoyance", "https://chatoyance-onglerie.vercel.app/"],
  ["glacage", "https://glacage-nails.vercel.app/"],
  ["odette", "https://odette-ongles.vercel.app/"],
  ["ecrin", "https://ecrin-salon-five.vercel.app/"],
  ["lunule", "https://lunule-atelier.vercel.app/"],
  ["atelier-laque", "https://atelier-laque.vercel.app/"],
  ["garage-bielle", "https://garage-bielle.vercel.app/"],
  ["milesi-atelier", "https://milesi-atelier.vercel.app/"],
  ["morgane-perrion", "https://morgane-perrion-reflexologue.vercel.app/"],
  // Restaurants (démonstrations, ajoutés le 2026-10-13).
  ["sillon", "https://sillon-restaurant.vercel.app/"],
  ["fanchon", "https://fanchon-bistrot.vercel.app/"],
  ["rameau", "https://rameau-bistrot.vercel.app/"],
  ["lauro", "https://lauro-ristorante.vercel.app/"],
  ["hanare", "https://hanare-paris.vercel.app/"],
  ["tison", "https://tison-bayonne.vercel.app/"],
  ["maillard", "https://maillard-lille.vercel.app/"],
];

const only = process.argv.slice(2);
const targets = only.length ? SITES.filter(([slug]) => only.includes(slug)) : SITES;

const outDir = "public/realisations";
const longDir = join(outDir, "long");
await mkdir(longDir, { recursive: true });
const tmp = await mkdtemp(join(tmpdir(), "shots-"));
const browser = await chromium.launch();

/** Descend la qualité jusqu'à passer sous la limite, sans jamais rogner l'image. */
async function toWebp(input, target, maxBytes, resize) {
  for (const quality of [82, 74, 66, 58, 50, 44, 38, 32, 26, 20]) {
    let pipeline = sharp(input);
    if (resize) pipeline = pipeline.resize(resize);
    const buf = await pipeline.webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= maxBytes || quality === 20) {
      await writeFile(target, buf);
      const meta = await sharp(buf).metadata();
      return { bytes: buf.length, quality, w: meta.width, h: meta.height };
    }
  }
}

/**
 * Referme les bandeaux cookies et les fenêtres d'accueil les plus courants :
 * la capture montre le site, pas la question qu'il pose au premier passage.
 */
async function dismissOverlays(page) {
  const labels = [
    /^tout refuser$/i,
    /^refuser$/i,
    /^continuer sans accepter$/i,
    /^tout accepter$/i,
    /^accepter$/i,
    /^j'accepte$/i,
    /^ok$/i,
    /^fermer$/i,
  ];
  for (const name of labels) {
    const button = page.getByRole("button", { name }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(400);
    }
  }
}

/** Fait défiler toute la page pour déclencher les révélations au défilement. */
async function primeScroll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  // Laisse l'en-tête quitter son état « défilé » et le hero revenir en place :
  // à 900 ms, La Fine Fleur gardait sa barre au milieu du titre (2026-10-13).
  await page.waitForTimeout(2000);
}

const results = [];
const failures = [];

for (const [slug, url, introWait = 2500] of targets) {
  const shots = [
    {
      kind: "desktop",
      viewport: { width: 1600, height: 1000 },
      scale: 1,
      file: join(outDir, `${slug}.webp`),
      maxBytes: 99_000,
    },
    {
      kind: "mobile",
      viewport: { width: 390, height: 844 },
      scale: 2,
      file: join(outDir, `${slug}-mobile.webp`),
      maxBytes: 80_000,
    },
    {
      kind: "long",
      viewport: { width: 1440, height: 900 },
      scale: 1,
      file: join(longDir, `${slug}.webp`),
      maxBytes: 190_000,
      resize: { width: 960 },
      maxHeight: 4500,
    },
  ];

  for (const shot of shots) {
    try {
      const ctx = await browser.newContext({
        viewport: shot.viewport,
        deviceScaleFactor: shot.scale,
        isMobile: shot.kind === "mobile",
        hasTouch: shot.kind === "mobile",
        locale: "fr-FR",
        // Capture longue : sans les transitions ni les diaporamas, la page se
        // fige dans son état final au lieu d'être prise au milieu d'un fondu.
        reducedMotion: shot.kind === "long" ? "reduce" : "no-preference",
      });
      const page = await ctx.newPage();
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      // Un site en erreur (404 Firebase « Site Not Found »…) ne doit jamais
      // écraser la capture du site réel : on garde l'ancienne et on signale.
      if (!response || response.status() >= 400) {
        await ctx.close();
        throw new Error(`HTTP ${response?.status() ?? "sans réponse"} : capture existante conservée`);
      }
      await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
      // Laisse les polices, les images du hero et l'éventuelle intro se poser.
      await page.waitForTimeout(introWait);
      await dismissOverlays(page);

      const png = join(tmp, `${slug}-${shot.kind}.png`);
      if (shot.kind === "long") {
        await primeScroll(page);
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        await page.screenshot({
          path: png,
          fullPage: true,
          clip: { x: 0, y: 0, width: shot.viewport.width, height: Math.min(height, shot.maxHeight) },
        });
      } else {
        await page.screenshot({ path: png });
      }
      await ctx.close();

      const r = await toWebp(png, shot.file, shot.maxBytes, shot.resize);
      const line = `${shot.file.padEnd(48)} ${String(r.w).padStart(4)}×${String(r.h).padEnd(5)} ${(r.bytes / 1024).toFixed(1)} Ko (q${r.quality})`;
      results.push(line);
      console.log(line);
    } catch (err) {
      failures.push(`${slug} (${shot.kind}) : ${err.message}`);
      console.error(`Échec ${slug} (${shot.kind}) :`, err.message);
    }
  }
}

await browser.close();
await rm(tmp, { recursive: true, force: true });
console.log(`\n${results.length} captures produites, ${failures.length} échec(s).`);
if (failures.length) {
  console.log(failures.join("\n"));
  process.exitCode = 1;
}
