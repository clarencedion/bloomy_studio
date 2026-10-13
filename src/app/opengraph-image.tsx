import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE_URL } from "@/lib/site";

export const alt =
  "Bloomy Studio, agence de développement web : des sites qui font éclore votre activité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Image de partage, sur le système « Tige & fleur ».
 *
 * Le vrai logo (fichiers vectoriels de `public/brand/`) est lu sur le disque
 * et intégré en data URI : aucune réinterprétation. À droite, le panneau
 * forest à coins feuille porte le monogramme rose, comme le logo sur fond
 * sombre.
 *
 * Les polices viennent de Google Fonts, réduites aux seuls caractères
 * affichés. Si le réseau manque au moment de la génération, l'image tombe
 * sur la police par défaut de `next/og` plutôt que d'échouer.
 */

const PAPER = "#FCFBF9";
const FOREST = "#0E3F2F";
const FOREST_SOFT = "#3D5A50";
const BLOOM_INK = "#C81D5E";

/** Le titre de l'accueil, mot par mot : « éclore » porte l'accent rose. */
const headline = "Des sites qui font éclore votre activité.".split(" ");
const accent = "éclore";
const footnote = "Sites vitrines, e-commerce, MVP et micro SaaS sur mesure.";
const host = SITE_URL.replace(/^https?:\/\//, "");

function svgDataUri(file: string): string {
  const svg = readFileSync(join(process.cwd(), "public/brand", file));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

async function googleFont(query: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`,
        { signal: AbortSignal.timeout(5000) },
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    googleFont("Bricolage+Grotesque:opsz,wdth,wght@96,90,700", headline.join(" ")),
    googleFont("Geist:wght@500", footnote + host),
  ]);

  const fonts = [
    ...(display ? [{ name: "Bricolage", data: display, weight: 700 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Geist", data: body, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 820,
            padding: "64px 0 60px 72px",
          }}
        >
          <img src={svgDataUri("bloomy-logo.svg")} width={316} height={116} alt="" />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Bricolage",
              fontWeight: 700,
              fontSize: 86,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              color: FOREST,
              paddingRight: 40,
            }}
          >
            {headline.map((word, i) => (
              <span
                key={i}
                style={{ marginRight: "0.24em", color: word === accent ? BLOOM_INK : FOREST }}
              >
                {word}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 25,
              color: FOREST_SOFT,
            }}
          >
            <span>{footnote}</span>
            <span style={{ color: FOREST, fontWeight: 500 }}>{host}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: "40px 40px 40px 0",
            background: FOREST,
            borderRadius: "96px 14px 96px 14px",
          }}
        >
          <img src={svgDataUri("bloomy-mark.svg")} width={210} height={218} alt="" />
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
