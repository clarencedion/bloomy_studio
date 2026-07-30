"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Révélation au défilement — la seule animation de contenu du site.
 *
 * 16 px vers le haut, 500 ms, jouée une seule fois. Le décalage sert à donner
 * un ordre de lecture à trois éléments au maximum ; au-delà, la page donne
 * l'impression de charger lentement plutôt que de se composer.
 *
 * L'état masqué vit dans la feuille de style, sous `[data-js]` : sans
 * JavaScript, le contenu est rendu visible et immobile plutôt que bloqué à
 * opacity 0. C'est la raison pour laquelle l'animation n'est pas confiée à
 * `motion` ici — son état initial serait sérialisé dans le HTML.
 *
 * `prefers-reduced-motion` la supprime entièrement (voir globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Décalage en millisecondes. Trois valeurs maximum par section : 0, 80, 160. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
