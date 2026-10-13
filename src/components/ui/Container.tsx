import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** "narrow" pour les colonnes de lecture (légal, blog, FAQ). */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  default: "max-w-[76rem]",
  narrow: "max-w-[46rem]",
  wide: "max-w-[88rem]",
} as const;

/** Gouttières : 20 px sur téléphone, 32 px sur tablette, 40 px au-delà. */
export function Container({ children, className = "", width = "default" }: Props) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
