import type { ReactNode } from "react";

import { Kicker } from "@/components/ui/Kicker";

type Props = {
  /**
   * Libellé facultatif au-dessus du titre. Un pour trois sections au
   * maximum : la plupart des sections n'en ont pas besoin.
   */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /**
   * `center` est réservé à un ou deux moments forts par page. `split` est
   * conservé pour compatibilité mais rend désormais un empilement à gauche :
   * le gabarit « grand titre à gauche, petit paragraphe flottant à droite »
   * est un réflexe de gabarit que le système proscrit.
   */
  align?: "left" | "center" | "split";
  /** Taille du titre : `lg` par défaut, `xl` pour une section maîtresse. */
  size?: "lg" | "xl";
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  size = "lg",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow ? (
        <Kicker ruled={centered} className="mb-6">
          {eyebrow}
        </Kicker>
      ) : null}
      <h2 className={size === "xl" ? "text-display-xl" : "text-display-lg"}>{title}</h2>
      {lede ? (
        <p className={`lede prose-links mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      ) : null}
    </div>
  );
}
