"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { NavMenu } from "@/components/layout/NavMenu";
import { mainNav } from "@/lib/site";
import { track } from "@/lib/analytics";

function Wordmark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span
        className="text-[1.3rem] leading-none tracking-tight"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Bloomy
      </span>
      <span
        className="text-[1.3rem] leading-none text-rose"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        Studio
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Ferme le menu à chaque navigation (ajustement d'état pendant le rendu).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Échap + verrouillage du scroll quand le tiroir mobile est ouvert.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-cream/90 backdrop-blur-sm">
      {/* Bandeau d'annonce : une information vraie et utile, jamais un compte
          à rebours ni un nombre de places restantes. */}
      <p className="bg-ink px-5 py-2 text-center text-[0.78rem] text-cream/80">
        Diagnostic gratuit de votre présence en ligne — réponse sous 48 h ouvrées.
      </p>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Bloomy Studio — accueil" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {mainNav.map((entry) =>
              entry.kind === "menu" ? (
                <li key={entry.id}>
                  <NavMenu
                    label={entry.label}
                    intro={entry.intro}
                    items={entry.items}
                    isActive={isActive}
                  />
                </li>
              ) : (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    aria-current={isActive(entry.href) ? "page" : undefined}
                    className={`text-[0.92rem] font-medium transition-colors hover:text-rose ${
                      isActive(entry.href)
                        ? "text-rose underline decoration-2 underline-offset-8"
                        : "text-ink"
                    }`}
                  >
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/audit"
            onClick={() => track("cta_audit_click", { placement: "header" })}
            className="hidden min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold text-cream transition-colors hover:bg-rose sm:inline-flex"
          >
            Diagnostic gratuit
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-11 items-center justify-center rounded-sm border border-ink/20 lg:hidden"
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M2 5h16M2 10h16M2 15h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Portail vers <body> : le backdrop-blur du header en ferait sinon
          le bloc conteneur du position:fixed (tiroir limité à 64 px de haut). */}
      {open &&
        createPortal(
          <AnimatePresence>
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-cream lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <Wordmark />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-sm border border-ink/20"
              >
                <span className="sr-only">Fermer le menu</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M3 3l12 12M15 3L3 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <motion.nav
              aria-label="Navigation principale mobile"
              className="px-5 pt-6 sm:px-8"
              initial={reduceMotion ? undefined : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/*
                Sur mobile, pas de menu déroulant : tout est déplié. Un
                accordéon ajouterait un geste pour cacher six liens qui
                tiennent à l'écran — la profondeur sert la barre desktop,
                elle ne sert pas le pouce.
              */}
              <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto pb-8">
                {mainNav.map((entry) =>
                  entry.kind === "menu" ? (
                    <section key={entry.id} className="mb-7">
                      <h2 className="plate-label">{entry.label}</h2>
                      <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex min-h-14 items-center justify-between gap-4 py-3"
                            >
                              <span>
                                <span
                                  className="block text-lg font-medium"
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-[0.85rem] leading-snug text-ink-soft">
                                  {item.hint}
                                </span>
                              </span>
                              <span aria-hidden="true" className="text-rose">
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null,
                )}

                <ul className="divide-y divide-hairline border-y border-hairline">
                  {mainNav
                    .filter((e) => e.kind === "link")
                    .map((entry) => (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className="flex min-h-14 items-center justify-between text-lg font-medium"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {entry.label}
                          <span aria-hidden="true" className="text-rose">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <Link
                href="/audit"
                onClick={() => track("cta_audit_click", { placement: "mobile_menu" })}
                className="mt-8 flex min-h-13 w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 font-semibold text-cream"
              >
                Recevoir mon diagnostic gratuit
              </Link>
            </motion.nav>
          </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
