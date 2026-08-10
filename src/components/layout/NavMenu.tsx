"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { NavLeaf } from "@/lib/site";

/**
 * Menu déroulant de la barre de navigation (desktop).
 *
 * Le brief interdit « l'accès par survol uniquement » : le panneau s'ouvre
 * donc au clic **et** au survol, mais il est toujours atteignable au clavier
 * — le déclencheur est un vrai `<button>` avec `aria-expanded`, Échap referme
 * et rend le focus, et une perte de focus hors du groupe referme aussi.
 *
 * Le survol n'ouvre qu'après un court délai et la fermeture est différée :
 * sans ça, traverser la barre en diagonale fait clignoter trois panneaux, et
 * le curseur qui coupe un coin ferme le menu qu'on visait.
 */
export function NavMenu({
  label,
  intro,
  items,
  isActive,
}: {
  label: string;
  intro: string;
  items: NavLeaf[];
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const openLater = () => {
    cancel();
    timer.current = setTimeout(() => setOpen(true), 90);
  };
  const closeLater = () => {
    cancel();
    timer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => cancel, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const sectionActive = items.some((i) => isActive(i.href));

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openLater}
      onMouseLeave={closeLater}
      onFocus={cancel}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-rose ${
          sectionActive ? "text-rose" : "text-ink"
        }`}
      >
        {label}
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          aria-hidden="true"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1.5L5 5.5L9 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-sm border border-hairline bg-paper shadow-float">
            <p className="border-b border-hairline bg-cream px-5 py-3 text-[0.78rem] text-ink-faint">
              {intro}
            </p>
            <ul className="p-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group block rounded-sm px-3 py-2.5 transition-colors hover:bg-cream"
                  >
                    <span
                      className={`block text-[0.92rem] font-semibold transition-colors group-hover:text-rose ${
                        isActive(item.href) ? "text-rose" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
                      {item.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
