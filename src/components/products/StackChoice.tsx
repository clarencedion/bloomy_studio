import type { ReactNode } from "react";

export type StackTool = {
  name: string;
  /** Quand cet outil s'impose : la condition, pas une qualité générique. */
  when: string;
  /** Une preuve ou un usage réel. */
  proof: string;
  /** Icône Phosphor (version `dist/ssr`), décorative. */
  icon: ReactNode;
};

/**
 * La pile technique en composition asymétrique : les deux choix d'interface
 * côte à côte (sept colonnes puis cinq), et le socle commun en pleine largeur
 * dessous, comme une fondation. Trois cellules pour trois outils, aucune
 * cellule vide.
 *
 * Mobile (< 1024 px) : les trois panneaux s'empilent dans le même ordre ; le
 * socle passe en une colonne.
 */
export function StackChoice({
  primary,
  secondary,
  base,
  className = "",
}: {
  primary: StackTool;
  secondary: StackTool;
  base: StackTool;
  className?: string;
}) {
  return (
    <div className={`grid gap-5 lg:grid-cols-12 ${className}`}>
      <ToolCell tool={primary} className="bg-blush lg:col-span-7" tile="bg-white" large />
      <ToolCell tool={secondary} className="border border-line bg-white lg:col-span-5" tile="bg-mint" />
      <div className="leaf grid gap-6 bg-mint p-7 sm:p-10 md:grid-cols-12 md:items-center lg:col-span-12">
        <div className="flex items-center gap-4 md:col-span-4">
          <span aria-hidden="true" className="leaf-sm grid size-12 shrink-0 place-items-center bg-white text-forest">
            {base.icon}
          </span>
          <h3 className="text-display-lg">{base.name}</h3>
        </div>
        <div className="md:col-span-8">
          <p className="text-[1.08rem] font-medium leading-snug text-forest">{base.when}</p>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-forest-soft">{base.proof}</p>
        </div>
      </div>
    </div>
  );
}

function ToolCell({
  tool,
  className,
  tile,
  large = false,
}: {
  tool: StackTool;
  className: string;
  /** Fond de la pastille d'icône, contrasté avec celui de la cellule. */
  tile: string;
  large?: boolean;
}) {
  return (
    <div className={`leaf-lg flex flex-col p-7 sm:p-10 ${large ? "lg:p-14" : ""} ${className}`}>
      <span aria-hidden="true" className={`leaf-sm grid size-12 place-items-center text-forest ${tile}`}>
        {tool.icon}
      </span>
      <h3 className={`mt-10 ${large ? "text-display-xl" : "text-display-lg"} lg:mt-auto lg:pt-16`}>{tool.name}</h3>
      <p className="mt-4 max-w-md text-[1.08rem] font-medium leading-snug text-forest">{tool.when}</p>
      <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-forest-soft">{tool.proof}</p>
    </div>
  );
}
