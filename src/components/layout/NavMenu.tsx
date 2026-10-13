"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ArrowRight, CaretDown } from "@phosphor-icons/react";

import type { NavLeaf } from "@/lib/site";

/**
 * Menu déroulant de la barre de navigation (desktop).
 *
 * Le brief interdit « l'accès par survol uniquement » : le panneau s'ouvre
 * donc au clic **et** au survol, mais il est toujours atteignable au clavier
 * — le déclencheur est un vrai `<button>` avec `aria-expanded`. Échap referme
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
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:text-bloom-ink ${
          sectionActive
            ? "text-forest underline decoration-bloom decoration-2 underline-offset-[10px]"
            : "text-forest"
        } ${open ? "text-bloom-ink" : ""}`}
      >
        {label}
        <CaretDown
          aria-hidden="true"
          weight="bold"
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-[25rem] -translate-x-1/2 pt-3"
        >
          <div className="leaf overflow-hidden border border-line bg-white shadow-float animate-[fade-in_160ms_var(--ease-soft)]">
            <p className="px-6 pb-2 pt-5 text-[0.82rem] text-forest-faint">{intro}</p>
            <ul className="px-3 pb-3">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-start justify-between gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-mint/70"
                  >
                    <span>
                      <span
                        className={`font-display block text-[1.05rem] font-semibold tracking-tight transition-colors group-hover:text-bloom-ink ${
                          isActive(item.href) ? "text-bloom-ink" : "text-forest"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[0.84rem] leading-snug text-forest-soft">
                        {item.hint}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      weight="bold"
                      className="arrow-nudge mt-1 size-4 shrink-0 text-bloom-ink opacity-0 transition-opacity group-hover:opacity-100"
                    />
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
