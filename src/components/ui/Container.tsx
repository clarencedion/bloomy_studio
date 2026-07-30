import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** "narrow" pour les colonnes de lecture (légal, blog). */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
} as const;

export function Container({ children, className = "", width = "default" }: Props) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
