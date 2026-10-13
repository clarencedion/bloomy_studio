import type { ReactNode } from "react";

/**
 * Cadres d'appareil : ce qui donne sa cohérence à tout ce que le studio
 * montre (captures de sites, aperçus d'interface, mobiles).
 *
 * Règle de composition : un appareil est toujours posé sur un panneau, une
 * bande ou une photo. Jamais incliné, jamais en perspective, jamais flottant
 * dans le vide. La profondeur vient de l'ombre teintée, pas de la 3D.
 *
 * Les cadres gardent un rayon uniforme (ce sont des objets), là où les
 * panneaux qui les portent ont les coins « feuille » du système.
 */

type Tone = "light" | "dark";

type Props = {
  children: ReactNode;
  /** Adresse affichée dans la barre (browser) ou titre du bandeau (panel). */
  label?: string;
  tone?: Tone;
  className?: string;
};

const chrome = {
  light: {
    shell: "border-forest/10 bg-white",
    bar: "border-forest/8 bg-white",
    dot: "bg-forest/15",
    field: "bg-mint/70 text-forest-soft",
  },
  dark: {
    shell: "border-white/10 bg-forest-deep",
    bar: "border-white/10 bg-forest-deep",
    dot: "bg-white/25",
    field: "bg-white/10 text-paper/75",
  },
} as const;

/** Fenêtre de navigateur : situe une capture comme un site en ligne. */
export function BrowserFrame({ children, label, tone = "light", className = "" }: Props) {
  const c = chrome[tone];
  return (
    <div className={`overflow-hidden rounded-xl border shadow-float ${c.shell} ${className}`}>
      <div className={`flex items-center gap-3 border-b px-3.5 py-2.5 ${c.bar}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className={`size-2 rounded-full ${c.dot}`} />
          <span className={`size-2 rounded-full ${c.dot}`} />
          <span className={`size-2 rounded-full ${c.dot}`} />
        </span>
        {label ? (
          <span
            className={`mx-auto max-w-[70%] truncate rounded-full px-3 py-0.5 text-center text-[0.66rem] font-medium tracking-wide ${c.field}`}
          >
            {label}
          </span>
        ) : null}
        <span className="w-[2.6rem]" aria-hidden="true" />
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
      className={`overflow-hidden rounded-[1.9rem] border-[6px] border-forest-deep bg-forest-deep shadow-float ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.45rem] bg-white">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-[0.32rem] w-12 -translate-x-1/2 rounded-full bg-forest-deep/80"
        />
        {children}
      </div>
    </div>
  );
}

/**
 * Panneau d'application : pas de barre d'adresse, ce n'est pas une page web
 * mais un outil. Toujours estampillé « Aperçu » : ce n'est jamais une capture
 * client.
 */
export function PanelFrame({ children, label, tone = "light", className = "" }: Props) {
  const c = chrome[tone];
  return (
    <div className={`overflow-hidden rounded-xl border shadow-float ${c.shell} ${className}`}>
      {label ? (
        <div className={`flex items-center justify-between border-b px-4 py-2.5 ${c.bar}`}>
          <span
            className={`font-display text-[0.8rem] font-semibold ${
              tone === "dark" ? "text-paper" : "text-forest"
            }`}
          >
            {label}
          </span>
          <span
            className={`text-[0.62rem] font-medium uppercase tracking-[0.2em] ${
              tone === "dark" ? "text-leaf" : "text-forest-faint"
            }`}
          >
            Aperçu
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
