"use client";

import Image from "next/image";
import { useState } from "react";

import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { track } from "@/lib/analytics";
import { floristSites } from "@/lib/portfolio";

/**
 * Vitrine — section 2 de la direction artistique.
 *
 * Le travail avant le discours : quatre boutiques livrées, quatre univers
 * graphiques différents. C'est la preuve que rien n'est décliné d'un modèle, et c'est la
 * réponse à la seule question du visiteur — « est-ce que c'est beau ? ».
 *
 * Un seul arbre pour les deux mises en page : chaque capture existe une seule
 * fois dans le DOM. Mobile, elles s'empilent et rien n'est à toucher pour tout
 * voir ; desktop, la sélection n'en montre qu'une, en grand.
 */

const SIZES = "(min-width: 1024px) 44rem, 100vw";

export function WorkShowcase() {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    setActive(index);
    track("showcase_project_view", { project: floristSites[index].slug });
  };

  return (
    <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-center lg:gap-10">
      <ul className="hidden lg:flex lg:flex-col lg:gap-2">
        {floristSites.map((s, i) => {
          const current = i === active;
          return (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={current}
                className={`w-full rounded-sm border px-4 py-3.5 text-left transition-all duration-200 ${
                  current
                    ? "border-rose bg-paper shadow-lift"
                    : "border-hairline hover:-translate-y-0.5 hover:border-ink/30 hover:bg-paper"
                }`}
              >
                <span className="block font-semibold">{s.name}</span>
                <span className="mt-0.5 block text-[0.82rem] text-ink-soft">
                  {s.city} · {s.focus}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-10 lg:space-y-0">
        {floristSites.map((s, i) => (
          <figure
            key={s.slug}
            className={
              i === active ? "animate-[fade-in_220ms_var(--ease-soft)]" : "lg:hidden"
            }
          >
            <BrowserFrame label={`${s.name} — ${s.city}`}>
              <Image
                src={s.image}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes={SIZES}
                className="h-auto w-full"
              />
            </BrowserFrame>
            <figcaption className="mt-4">
              <p className="text-display-sm">
                {s.name} <span className="text-ink-faint">· {s.city}</span>
              </p>
              <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
                {s.note}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
