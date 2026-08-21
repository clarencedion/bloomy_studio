"use client";

import Image from "next/image";
import { useState } from "react";

import { LiveSiteLink } from "@/components/ui/LiveSiteLink";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { track } from "@/lib/analytics";
import { homeFeaturedSites } from "@/lib/portfolio";

/**
 * Vitrine — section 2 de la direction artistique.
 *
 * Le travail avant le discours : quatre projets livrés, quatre secteurs
 * et univers graphiques différents (Consulting B2B, Hébergement touristique,
 * Pépinière horticole, E-commerce).
 *
 * Un seul arbre pour les deux mises en page : chaque capture existe une seule
 * fois dans le DOM. Mobile, elles s'empilent et rien n'est à toucher pour tout
 * voir ; desktop, la sélection n'en montre qu'une, en grand.
 */

const SIZES = "(min-width: 1024px) 44rem, 100vw";

export function WorkShowcase() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const select = (index: number) => {
    setActive(index);
    track("showcase_project_view", { project: homeFeaturedSites[index].slug });
  };

  return (
    <div className="lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start lg:gap-12">
      <ul className="hidden lg:flex lg:flex-col lg:gap-2.5 lg:pt-14">
        {homeFeaturedSites.map((s, i) => {
          const current = i === active;
          return (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={current}
                className={`lift press w-full rounded-sm border px-4 py-3 text-left transition-all ${
                  current
                    ? "border-rose bg-paper shadow-lift"
                    : "border-hairline bg-cream/40 hover:border-ink/30 hover:bg-paper"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[0.92rem] text-ink truncate">{s.name}</span>
                  <span className="text-[0.72rem] font-medium text-rose shrink-0">{s.city}</span>
                </div>
                <span className="mt-1 block text-[0.8rem] text-ink-soft truncate">
                  {s.focus}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-10 lg:space-y-0">
        {/*
          Bascule ordinateur / mobile — visible en desktop seulement, là où il
          y a la place. Elle n'est pas décorative : la qualité mobile est un
          argument de vente que le visiteur peut ici vérifier lui-même, sur un
          site réel. Les deux captures existent, rien n'est simulé.
        */}
        <div className="mb-5 hidden items-center gap-1 lg:flex">
          {(
            [
              ["desktop", "Ordinateur"],
              ["mobile", "Mobile"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              aria-pressed={device === id}
              className={`press rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors ${
                device === id
                  ? "bg-ink text-cream"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {homeFeaturedSites.map((s, i) => (
          <figure
            key={s.slug}
            className={
              i === active ? "animate-[fade-in_220ms_var(--ease-soft)]" : "lg:hidden"
            }
          >
            {/* Mobile : la pile montre toujours la capture desktop, qui donne
                la vue d'ensemble du design. La bascule ne vaut qu'en desktop. */}
            <div className={device === "mobile" ? "lg:hidden" : ""}>
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
            </div>

            {s.mobile && device === "mobile" ? (
              <div className="mx-auto hidden w-64 lg:block">
                <PhoneFrame>
                  <Image
                    src={s.mobile.image}
                    alt={s.mobile.alt}
                    width={s.mobile.width}
                    height={s.mobile.height}
                    sizes="16rem"
                    className="h-auto w-full"
                  />
                </PhoneFrame>
              </div>
            ) : null}

            <figcaption className="mt-4">
              <p className="text-display-sm">
                {s.name} <span className="text-ink-faint">· {s.city}</span>
              </p>
              <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
                {s.note}
              </p>
              <LiveSiteLink site={s} className="mt-4" />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

