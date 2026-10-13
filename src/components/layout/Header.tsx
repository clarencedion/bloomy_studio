"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowRight, List, X } from "@phosphor-icons/react";

import { NavMenu } from "@/components/layout/NavMenu";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { mainNav, primaryCta } from "@/lib/site";
import { track } from "@/lib/analytics";

function Wordmark({ eager = false }: { eager?: boolean }) {
  return (
    <Image
      src="/brand/bloomy-wordmark.svg"
      alt="Bloomy Digital Studio"
      width={98}
      height={32}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className="h-8 w-auto"
    />
  );
}

/**
 * En-tête. Une seule ligne en desktop : le logo, cinq entrées, une action.
 *
 * Le filet du bas n'apparaît qu'une fois la page défilée : en haut de page,
 * l'en-tête se fond dans le papier ; ensuite, il se détache juste assez pour
 * rester lisible au-dessus des captures.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Un seul changement d'état au franchissement du seuil, pas un rendu par pixel.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    if (next !== scrolled) setScrolled(next);
  });

  // Ferme le menu à chaque navigation (ajustement d'état pendant le rendu).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Échap + verrouillage du défilement quand le menu mobile est ouvert.
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

  // Un menu déroulant ne s'allume pas pour une page qui a déjà sa propre
  // entrée dans la barre (« Autres commerces » mène à /realisations) : sinon
  // deux entrées seraient soulignées en même temps.
  const topLevel = new Set(mainNav.flatMap((e) => (e.kind === "link" ? [e.href] : [])));
  const isMenuItemActive = (href: string) => !topLevel.has(href) && isActive(href);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Bloomy Studio, accueil" className="shrink-0">
          <Wordmark eager />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((entry) =>
              entry.kind === "menu" ? (
                <li key={entry.id}>
                  <NavMenu
                    label={entry.label}
                    intro={entry.intro}
                    items={entry.items}
                    isActive={isMenuItemActive}
                  />
                </li>
              ) : (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    aria-current={isActive(entry.href) ? "page" : undefined}
                    className={`inline-flex rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:text-bloom-ink ${
                      isActive(entry.href)
                        ? "text-forest underline decoration-bloom decoration-2 underline-offset-[10px]"
                        : "text-forest"
                    }`}
                  >
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href={primaryCta.href}
            onClick={() => track("cta_contact_click", { placement: "header" })}
            className={buttonClass("primary", "min-h-11 px-5 py-2.5 text-[0.9rem] max-sm:hidden")}
          >
            {primaryCta.label}
            <ButtonArrow />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/20 bg-white px-4 text-[0.9rem] font-semibold text-forest lg:hidden"
          >
            <List aria-hidden="true" weight="bold" className="size-4" />
            <span aria-hidden="true">Menu</span>
            <span className="sr-only">Ouvrir le menu</span>
          </button>
        </div>
      </div>

      {/* Portail vers <body> : le backdrop-blur du header en ferait sinon
          le bloc conteneur du position:fixed. */}
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="on-forest fixed inset-0 z-50 flex flex-col bg-forest lg:hidden"
            >
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 sm:px-8">
                <Link href="/" aria-label="Bloomy Studio, accueil" onClick={() => setOpen(false)}>
                  <Wordmark />
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-[0.9rem] font-semibold text-paper"
                >
                  <X aria-hidden="true" weight="bold" className="size-4" />
                  <span aria-hidden="true">Fermer</span>
                  <span className="sr-only">Fermer le menu</span>
                </button>
              </div>

              <motion.nav
                aria-label="Navigation principale mobile"
                className="flex min-h-0 flex-1 flex-col px-5 sm:px-8"
                initial={reduceMotion ? undefined : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              >
                {/*
                  Sur mobile, pas de menu déroulant : tout est déplié. La
                  profondeur sert la barre desktop, elle ne sert pas le pouce.
                */}
                <div className="min-h-0 flex-1 overflow-y-auto pb-6 pt-4">
                  {mainNav.map((entry) =>
                    entry.kind === "menu" ? (
                      <section key={entry.id} className="mb-9">
                        <h2 className="kicker kicker--ruled">{entry.label}</h2>
                        <ul className="mt-4">
                          {entry.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="group flex min-h-14 items-center justify-between gap-4 py-2.5"
                              >
                                <span>
                                  <span className="font-display block text-[1.45rem] font-semibold leading-tight tracking-tight text-paper">
                                    {item.label}
                                  </span>
                                  <span className="mt-0.5 block text-[0.88rem] leading-snug text-leaf">
                                    {item.hint}
                                  </span>
                                </span>
                                <ArrowRight
                                  aria-hidden="true"
                                  weight="bold"
                                  className="arrow-nudge size-5 shrink-0 text-bloom-light"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ) : null,
                  )}

                  <ul className="border-t border-line-dark pt-4">
                    {mainNav
                      .filter((e) => e.kind === "link")
                      .map((entry) => (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            className="group font-display flex min-h-14 items-center justify-between text-[1.45rem] font-semibold tracking-tight text-paper"
                          >
                            {entry.label}
                            <ArrowRight
                              aria-hidden="true"
                              weight="bold"
                              className="arrow-nudge size-5 text-bloom-light"
                            />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="shrink-0 border-t border-line-dark py-5">
                  <Link
                    href={primaryCta.href}
                    onClick={() => track("cta_contact_click", { placement: "mobile_menu" })}
                    className={buttonClass("primary", "min-h-14 w-full text-base")}
                  >
                    {primaryCta.label}
                    <ButtonArrow />
                  </Link>
                </div>
              </motion.nav>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
