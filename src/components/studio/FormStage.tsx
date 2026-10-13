import type { ReactNode } from "react";

/**
 * Plateau d'un formulaire : le panneau blanc du formulaire posé sur un
 * panneau teinté à coins « feuille », exactement comme une capture de site
 * est posée sur le panneau de sa couleur dans les vitrines. Le formulaire
 * est traité comme une pièce du travail, pas comme un encadré administratif.
 *
 * La teinte (`blush` pour le contact, `mint` pour le diagnostic) est un fond
 * de panneau, jamais un état ni une action.
 */
export function FormStage({
  tone = "blush",
  children,
  className = "",
}: {
  tone?: "blush" | "mint";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`leaf-lg p-3 sm:p-6 xl:p-8 ${
        tone === "blush" ? "bg-blush" : "bg-mint"
      } ${className}`}
    >
      <div className="leaf border border-line bg-white px-5 py-7 shadow-lift sm:px-9 sm:py-10">
        {children}
      </div>
    </div>
  );
}
