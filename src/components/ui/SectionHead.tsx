import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /**
   * `center` est réservé aux moments forts d'une page — deux au maximum.
   * Centrer chaque tête de section produit une page symétrique du haut en bas,
   * sans hiérarchie : c'est le premier signe d'une mise en page automatique.
   * `split` pose le titre à gauche et le chapô à droite, sur deux colonnes :
   * la tête devient elle-même un élément de composition.
   */
  align?: "left" | "center" | "split";
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: Props) {
  if (align === "split") {
    return (
      <div
        className={`grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-end ${className}`}
      >
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-display-lg mt-6 max-w-xl">{title}</h2>
        </div>
        {lede ? (
          <p className="prose-links max-w-lg leading-relaxed text-ink-soft lg:pb-2">
            {lede}
          </p>
        ) : null}
      </div>
    );
  }

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
