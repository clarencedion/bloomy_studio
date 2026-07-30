import { describe, expect, it } from "vitest";

import { isBotSubmission, isRateLimited } from "@/lib/anti-spam";

function makeForm(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, v);
  return fd;
}

describe("isBotSubmission", () => {
  it("détecte le honeypot rempli", () => {
    const fd = makeForm({
      website_url_confirm: "http://spam.example",
      form_started_at: String(Date.now() - 10_000),
    });
    expect(isBotSubmission(fd)).toBe(true);
  });

  it("détecte une soumission trop rapide", () => {
    const fd = makeForm({
      website_url_confirm: "",
      form_started_at: String(Date.now() - 500),
    });
    expect(isBotSubmission(fd)).toBe(true);
  });

  it("détecte un horodatage absent ou invalide", () => {
    expect(isBotSubmission(makeForm({ website_url_confirm: "" }))).toBe(true);
    expect(
      isBotSubmission(
        makeForm({ website_url_confirm: "", form_started_at: "abc" }),
      ),
    ).toBe(true);
  });

  it("laisse passer une soumission humaine plausible", () => {
    const fd = makeForm({
      website_url_confirm: "",
      form_started_at: String(Date.now() - 30_000),
    });
    expect(isBotSubmission(fd)).toBe(false);
  });
});

describe("isRateLimited", () => {
  it("bloque au-delà de 5 requêtes sur la fenêtre", () => {
    const ip = `test-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(ip)).toBe(false);
    }
    expect(isRateLimited(ip)).toBe(true);
  });

  it("ne mélange pas les adresses IP", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) isRateLimited(a);
    expect(isRateLimited(b)).toBe(false);
  });
});
