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
