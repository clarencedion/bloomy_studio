import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export type ButtonVariant = "primary" | "secondary" | "outline" | "onDark" | "onInk" | "ghost";

/**
 * Système de boutons. Tout ce qui se clique est en pilule, comme les
 * extrémités arrondies des lettres du logo.
 *
 * - `primary`   : l'action de la page. Rose plein, devient vert au survol.
 * - `secondary` : contour vert, pour une seconde intention distincte.
 * - `onDark`    : sur les surfaces forest. Papier plein, rose clair au survol.
 * - `ghost`     : lien texte avec flèche, pour une action tertiaire.
 *
 * `outline` et `onInk` sont les anciens noms de `secondary` et `onDark`.
 */
const base =
  "press group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-bloom-strong text-white hover:bg-forest",
  secondary: "border border-forest/25 bg-white/60 text-forest hover:border-forest hover:bg-forest hover:text-paper",
  outline: "border border-forest/25 bg-white/60 text-forest hover:border-forest hover:bg-forest hover:text-paper",
  onDark: "bg-paper text-forest hover:bg-bloom-light hover:text-forest-deep",
  onInk: "bg-paper text-forest hover:bg-bloom-light hover:text-forest-deep",
  ghost: "min-h-11 px-0 text-bloom-ink underline decoration-bloom-ink/35 decoration-1 underline-offset-[6px] hover:decoration-bloom-ink",
};

/**
 * Classes d'un bouton du système, pour les déclencheurs qui ne peuvent pas
 * utiliser `<ButtonLink>` (composants client avec leur propre `onClick`).
 */
export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

/** Flèche de bouton : avance de trois pixels au survol du bouton parent. */
export function ButtonArrow({ className = "" }: { className?: string }) {
  return <ArrowRight aria-hidden="true" weight="bold" className={`arrow-nudge size-4 ${className}`} />;
}

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Ajoute la flèche du système après le libellé. */
  arrow?: boolean;
  "data-event"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
  ...rest
}: LinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow ? <ButtonArrow /> : null}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  arrow = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${buttonClass(variant, className)} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
      {arrow ? <ButtonArrow /> : null}
    </button>
  );
}
