"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

import { BrowserFrame } from "@/components/visuals/DeviceFrame";

export type SectorStrip = {
  id: string;
  name: string;
  line: string;
  href: string;
  tone: string;
  host: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * Accordéon de bandes (desktop) : quatre bandes hautes, une par métier. Celle
 * que l'on survole, ou qui reçoit le focus clavier, s'élargit et dévoile le
 * site entier dans sa fenêtre ; les autres n'en montrent que le bord, comme
 * des tranches. La fenêtre de navigateur a une largeur fixe et reste ancrée
 * en haut à gauche de son panneau : l'élargissement ne redimensionne rien,
 * il découvre. Sans JavaScript, la première bande reste ouverte et tous les
 * liens fonctionnent.
 *
 * Mobile : les mêmes liens, empilés, toujours ouverts.
 *
 * `flex-grow` s'anime (c'est le principe même du motif) ; la durée tombe à
 * zéro avec `prefers-reduced-motion` (globals.css).
 */
export function SectorAccordion({ items }: { items: SectorStrip[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-12 lg:h-[36rem] lg:flex-row lg:gap-0">
      {items.map((item, i) => {
        const open = i === active;
        return (
          <li
            key={item.id}
            onMouseEnter={() => setActive(i)}
            className={`lg:min-w-0 lg:basis-0 lg:overflow-hidden lg:p-1.5 lg:transition-[flex-grow] lg:duration-700 lg:ease-soft ${
              open ? "lg:grow-[3.4]" : "lg:grow"
            }`}
          >
            <Link
              href={item.href}
              onFocus={() => setActive(i)}
              className="group flex h-full flex-col"
            >
              <div
                className="leaf relative h-52 overflow-hidden sm:h-72 lg:h-auto lg:flex-1"
                style={{ backgroundColor: item.tone }}
              >
                <BrowserFrame
                  label={item.host}
                  className="absolute left-5 top-5 w-[34rem] sm:left-8 sm:top-8 sm:w-[40rem] lg:left-7 lg:top-7 lg:w-[41rem]"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 640px) 41rem, 34rem"
                    className="h-auto w-full"
                  />
                </BrowserFrame>
              </div>
              <div className="pt-5 lg:h-36">
                <h3 className="flex items-start justify-between gap-3">
                  <span className="text-display-md transition-colors group-hover:text-bloom-ink">
                    {item.name}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    weight="bold"
                    className="arrow-nudge mt-1.5 size-5 shrink-0 text-bloom-ink"
                  />
                </h3>
                <p
                  className={`mt-2 max-w-md text-[0.98rem] leading-relaxed text-forest-soft lg:w-[26rem] lg:transition-opacity lg:duration-500 ${
                    open ? "lg:opacity-100 lg:delay-200" : "lg:opacity-0"
                  }`}
                >
                  {item.line}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
