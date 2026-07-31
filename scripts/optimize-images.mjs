import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

/**
 * Optimisation des images déposées à la main.
 *
 * Déposer les fichiers bruts (PNG/JPG) dans `assets/photos-raw/`, lancer
 * `npm run images` : chaque fichier est redimensionné à sa largeur cible,
 * converti en WebP sous son budget de poids, et écrit dans `public/photos/`.
 *
 * La largeur et le budget se déduisent du suffixe du nom de fichier :
 *   *-hero    2400 px, < 220 Ko   (fonds pleine largeur)
 *   *-wide    1800 px, < 160 Ko   (bandes, 3:2)
 *   *-tall    1400 px, < 140 Ko   (portraits 4:5)
 *   *-square  1200 px, < 120 Ko   (carrés, vignettes)
 *   défaut    1600 px, < 150 Ko
 *
 * Le fichier source n'est jamais modifié : `assets/photos-raw/` reste la
 * référence. Ce dossier vit hors de `public/` volontairement : un déploiement
 * depuis la source locale (voir README) embarque aussi les fichiers
 * gitignorés sous `public/` — des PNG sources de 2-3 Mo n'ont rien à y faire.
 */

const RAW = "assets/photos-raw";
const OUT = "public/photos";

const PROFILES = [
  ["-hero", 2400, 220_000],
  ["-wide", 1800, 160_000],
  ["-tall", 1400, 140_000],
  ["-square", 1200, 120_000],
];

function profileFor(name) {
  const hit = PROFILES.find(([suffix]) => name.endsWith(suffix));
  return hit ? { width: hit[1], maxBytes: hit[2] } : { width: 1600, maxBytes: 150_000 };
}

await mkdir(RAW, { recursive: true });
const files = (await readdir(RAW)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

if (files.length === 0) {
  console.log(`Aucune image dans ${RAW}/ — rien à faire.`);
  process.exit(0);
}

for (const file of files) {
  const { name } = parse(file);
  const { width, maxBytes } = profileFor(name);
  const src = join(RAW, file);
  const dest = join(OUT, `${name}.webp`);

  const base = sharp(src).resize({ width, withoutEnlargement: true });

  let written = null;
  for (const quality of [84, 76, 68, 60, 52, 45]) {
    const buf = await base.clone().webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= maxBytes || quality === 45) {
      await sharp(buf).toFile(dest);
      written = { bytes: buf.length, quality };
      break;
    }
  }

  const meta = await sharp(dest).metadata();
  const over = written.bytes > maxBytes ? "  ⚠ au-dessus du budget" : "";
  console.log(
    `${`${name}.webp`.padEnd(34)} ${String(meta.width).padStart(4)}×${String(meta.height).padEnd(4)} ` +
      `${(written.bytes / 1024).toFixed(1).padStart(6)} Ko (q${written.quality})${over}`,
  );
}

const { size } = await stat(OUT).catch(() => ({ size: 0 }));
void size;
