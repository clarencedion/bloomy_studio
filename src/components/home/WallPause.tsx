"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "@phosphor-icons/react";

/**
 * Enveloppe du mur de travaux : légende, et l'interrupteur qui arrête le
 * défilement (WCAG 2.2.2 : un contenu qui bouge seul plus de cinq secondes
 * doit pouvoir être mis en pause au clavier, pas seulement au survol).
 *
 * Le défilement lit `--wall-state` : le survol et le focus le posent à
 * `paused` par CSS, le bouton le fige en style en ligne. Sans JavaScript,
 * le survol suffit ; avec `prefers-reduced-motion`, rien ne bouge et le
 * bouton disparaît.
 */
export function WallPause({ children, caption }: { children: ReactNode; caption: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <figure
      className="hover:[--wall-state:paused] focus-within:[--wall-state:paused]"
      style={paused ? ({ "--wall-state": "paused" } as CSSProperties) : undefined}
    >
      {children}
      <figcaption className="mt-3 flex items-center justify-between gap-4 pl-1">
        <span className="caption">{caption}</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-[0.8rem] font-medium text-forest-soft hover:text-forest motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" weight="fill" className="size-3.5" />
          ) : (
            <Pause aria-hidden="true" weight="fill" className="size-3.5" />
          )}
          {paused ? "Relancer" : "Mettre en pause"}
        </button>
      </figcaption>
    </figure>
  );
}
