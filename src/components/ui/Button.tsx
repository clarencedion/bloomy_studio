import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "onInk" | "ghost";

const base =
  "press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.95rem] font-semibold transition-colors duration-150";

/** L'encre porte l'action, la fleur porte le survol : un seul point de couleur. */
const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-rose",
  outline:
    "border border-ink/15 bg-paper text-ink hover:border-ink/40",
  onInk: "bg-cream text-rose-deep hover:bg-ink hover:text-cream",
  ghost:
    "text-rose underline decoration-rose/40 underline-offset-4 hover:decoration-rose",
};

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "data-event"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: LinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
