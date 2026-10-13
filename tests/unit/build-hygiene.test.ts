import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Garde-fous de fabrication qui ne sont vérifiés nulle part ailleurs :
 * budget de poids des captures de réalisations, et présence du garde-fou
 * `server-only` sur les modules qui manipulent des secrets. Ces règles
 * viennent d'AGENTS.md mais n'étaient couvertes par aucun test.
 */

describe("budget de poids des réalisations", () => {
  const dir = join(process.cwd(), "public/realisations");
  const maxBytes = 100_000;

  it("chaque capture WebP reste sous 100 Ko", () => {
    const offenders: string[] = [];
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".webp")) continue;
      const { size } = statSync(join(dir, file));
      if (size >= maxBytes) offenders.push(`${file} (${Math.round(size / 1000)} Ko)`);
    }
    expect(offenders, `captures au-delà du budget : ${offenders.join(", ")}`).toEqual([]);
  });
});

describe("budget de poids des captures longues", () => {
  const dir = join(process.cwd(), "public/realisations/long");
  const maxBytes = 190_000;

  it("chaque capture longue reste sous 190 Ko", () => {
    const offenders: string[] = [];
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".webp")) continue;
      const { size } = statSync(join(dir, file));
      if (size >= maxBytes) offenders.push(`${file} (${Math.round(size / 1000)} Ko)`);
    }
    expect(offenders, `captures longues au-delà du budget : ${offenders.join(", ")}`).toEqual([]);
  });
});

describe("règle taste-skill : aucun tiret cadratin dans le contenu", () => {
  /*
   * Le tiret cadratin (—) et le demi-cadratin (–) sont bannis du texte
   * visible. On vérifie les chaînes de contenu de `src/lib`, là où vit la
   * copie : les commentaires (lignes qui commencent par *, // ou /*) sont
   * ignorés. Le rendu HTML est vérifié route par route dans les tests e2e.
   */
  const libDir = join(process.cwd(), "src/lib");

  it("aucune ligne de contenu de src/lib ne contient — ou –", () => {
    const offenders: string[] = [];
    for (const file of readdirSync(libDir)) {
      if (!/\.(ts|tsx)$/.test(file)) continue;
      const lines = readFileSync(join(libDir, file), "utf8").split("\n");
      lines.forEach((line, i) => {
        const t = line.trim();
        if (t.startsWith("*") || t.startsWith("//") || t.startsWith("/*")) return;
        if (/[—–]/.test(line)) offenders.push(`${file}:${i + 1}`);
      });
    }
    expect(offenders, `tirets interdits : ${offenders.join(", ")}`).toEqual([]);
  });
});

describe("déploiement Firebase App Hosting", () => {
  /*
   * Incident du 2026-10-03 : l'image Open Graph lisait le logo dans
   * `public/brand/`. Le traçage de Next a donc créé `.next/standalone/public`
   * avec ces seuls SVG, l'adaptateur App Hosting a sauté la copie de
   * `public/`, et toutes les captures WebP répondaient 404 en production.
   * Ces deux réglages de `next.config.ts` l'empêchent ; ce test les verrouille.
   */
  it("exclut public/ du traçage et garde l'optimisation d'images active", async () => {
    const { default: config } = await import("../../next.config");
    expect(config.outputFileTracingExcludes?.["**"]).toContain("public/**/*");
    // Sans `false` explicite, l'adaptateur impose `unoptimized: true`.
    expect(config.images?.unoptimized).toBe(false);
  });
});

describe("garde-fou server-only", () => {
  const guardedModules = [
    "src/lib/leads.ts",
    "src/lib/anti-spam.ts",
    "src/lib/firebase-admin.ts",
  ];

  it("les modules qui manipulent des secrets importent bien server-only", () => {
    for (const relPath of guardedModules) {
      const source = readFileSync(join(process.cwd(), relPath), "utf8");
      expect(source, `${relPath} n'importe pas "server-only"`).toMatch(
        /import\s+["']server-only["']/,
      );
    }
  });
});
