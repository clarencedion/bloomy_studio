/**
 * Vérifie qu'aucune image du site ne casse, route par route.
 *
 * Usage : npm run check:images -- [base]   (défaut : https://studio.bloomy.one)
 *
 * Lit le sitemap, charge chaque page (plus une 404), relève toutes les URL
 * d'images référencées dans le HTML (`src`, chaque candidat de `srcSet`,
 * `url(...)` des styles en ligne, image Open Graph) et les demande une à une,
 * comme un navigateur (`Accept: image/avif,image/webp`). Sort en erreur si une
 * seule répond autrement que 200 avec un type `image/*`.
 *
 * À lancer après chaque déploiement : c'est ce contrôle qui aurait détecté
 * l'incident du 2026-10-03 (toutes les captures WebP en 404 sur App Hosting,
 * voir `next.config.ts`).
 */
const base = (process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "https://studio.bloomy.one").replace(/\/$/, "");

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

async function get(url, accept) {
  const res = await fetch(url, { headers: accept ? { Accept: accept } : {}, redirect: "follow" });
  return res;
}

const sitemap = await (await get(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
routes.push("/page-qui-n-existe-pas");

const images = new Map(); // url -> première route qui la référence
for (const route of routes) {
  const res = await get(base + route);
  const html = decode(await res.text());
  const found = new Set();
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (src) found.add(src);
    const srcset = tag.match(/\ssrcSet="([^"]+)"/i)?.[1];
    if (srcset) for (const part of srcset.split(",")) found.add(part.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/url\((?:&quot;|["'])?([^)"']+)(?:&quot;|["'])?\)/g)) found.add(m[1]);
  for (const m of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) found.add(m[1]);
  for (const src of found) {
    if (src.startsWith("data:")) continue;
    const abs = src.startsWith("http") ? src : base + (src.startsWith("/") ? src : `/${src}`);
    // L'image OG pointe vers le domaine canonique : on la vérifie sur la base testée.
    const url = abs.replace(/^https:\/\/studio\.bloomy\.one/, base);
    if (!images.has(url)) images.set(url, route);
  }
  console.log(`${String(res.status).padEnd(4)} ${route}  (${found.size} images)`);
}

let failures = 0;
const queue = [...images.entries()];
async function worker() {
  while (queue.length) {
    const [url, route] = queue.shift();
    const res = await get(url, "image/avif,image/webp,image/*,*/*;q=0.8").catch((e) => ({ status: 0, headers: new Headers(), error: e }));
    const type = res.headers.get("content-type") ?? "";
    if (res.status !== 200 || !type.startsWith("image/")) {
      failures += 1;
      console.log(`ÉCHEC ${res.status} ${type || res.error?.message || ""}  ${url.replace(base, "")}  (vue sur ${route})`);
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

console.log(`\n${images.size} images vérifiées sur ${routes.length} routes, ${failures} en échec.`);
if (failures) process.exitCode = 1;
