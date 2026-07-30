import type { ReactNode } from "react";

/**
 * Cadre d'appareil — le composant qui donne sa cohérence à tout ce que le
 * studio montre : captures de sites livrés, aperçus d'interface, mobiles.
 *
 * Règle de composition (direction artistique §4.3) : un appareil est toujours
 * ancré — à un bord, une bande ou une photo. Jamais incliné, jamais en
 * perspective, jamais flottant dans le vide. La profondeur vient de la
 * superposition et de l'ombre, pas de la 3D.
 *
 * `tone="dark"` sert aux bandes prune : le chrome s'inverse pour que le cadre
 * reste lisible sans virer au noir de SaaS.
 */

type Tone = "light" | "dark";

type Props = {
  children: ReactNode;
  /** Texte de la barre d'adresse (browser) ou du bandeau (panel). */
  label?: string;
  tone?: Tone;
  className?: string;
};

const chrome = {
  light: {
    shell: "border-hairline bg-paper",
    bar: "border-hairline bg-cream",
    dot: "bg-hairline",
    field: "bg-paper text-ink-faint",
  },
  dark: {
    shell: "border-hairline-dark bg-plum",
    bar: "border-hairline-dark bg-plum-soft/40",
    dot: "bg-cream/25",
    field: "bg-plum/70 text-cream/60",
  },
} as const;

/** Fenêtre de navigateur : elle situe une capture comme un site en ligne. */
export function BrowserFrame({ children, label, tone = "light", className = "" }: Props) {
  const c = chrome[tone];
  return (
    <div
      className={`overflow-hidden rounded-lg border shadow-float ${c.shell} ${className}`}
    >
      <div className={`flex items-center gap-2.5 border-b px-3 py-2 ${c.bar}`}>
        <span className="flex gap-1" aria-hidden="true">
          <span className={`size-1.5 rounded-full ${c.dot}`} />
          <span className={`size-1.5 rounded-full ${c.dot}`} />
          <span className={`size-1.5 rounded-full ${c.dot}`} />
        </span>
        {label ? (
          <span
            className={`flex-1 truncate rounded-full px-2.5 py-0.5 text-center text-[0.58rem] ${c.field}`}
          >
            {label}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/**
 * Téléphone : la lunette est un vrai bord, pas une ombre. Elle donne l'échelle
 * qui manque à une capture mobile posée seule.
 */
export function PhoneFrame({ children, className = "" }: Omit<Props, "label" | "tone">) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-float ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1rem] bg-paper">
        {/* Encoche : deux pixels de crédibilité, pas un ornement. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-ink/70"
        />
        {children}
      </div>
    </div>
  );
}

/**
 * Panneau d'application : pas de barre d'adresse — ce n'est pas une page web,
 * c'est un outil. Sert aux aperçus d'administration et de produit.
 */
export function PanelFrame({ children, label, tone = "light", className = "" }: Props) {
  const c = chrome[tone];
  return (
    <div className={`overflow-hidden rounded-lg border shadow-float ${c.shell} ${className}`}>
      {label ? (
        <div className={`flex items-center justify-between border-b px-4 py-2.5 ${c.bar}`}>
          <span
            className={`text-[0.72rem] ${tone === "dark" ? "text-cream" : "text-ink"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {label}
          </span>
          <span className={`plate-label ${tone === "dark" ? "text-cream/55" : ""}`} style={{ fontSize: "0.5rem" }}>
            Aperçu
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
