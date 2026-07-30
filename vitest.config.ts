import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
  resolve: {
    alias: {
      // Neutralise le garde-fou "server-only" dans l'environnement de test.
      "server-only": path.resolve(__dirname, "tests/unit/mocks/server-only.ts"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
