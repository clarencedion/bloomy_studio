import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Tête de section : pastille, titre display, chapô facultatif.
 *
 * Le chapô est facultatif à dessein — sur les pages de conversion, le titre
 * doit suffire. On ne l'ajoute que lorsqu'il apporte une information que le
 * titre ne porte pas.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-display-lg mt-6">{title}</h2>
      {lede ? (
        <p
          className={`prose-links mt-5 text-[1.05rem] leading-relaxed text-ink-soft ${
            centered ? "mx-auto max-w-xl" : ""
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
