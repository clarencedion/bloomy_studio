type Props = {
  children: string;
  as?: "p" | "span" | "div";
  className?: string;
};

/**
 * Pastille de section : trois mots pour nommer la section, posés au-dessus du
 * titre. Elle porte le repère à la place d'une phrase d'introduction — c'est
 * une ligne de texte en moins par section.
 *
 * Pas de numérotation : les sections d'une page ne forment pas une séquence.
 * Seules les vraies étapes — la méthode — portent des chiffres (`.step-num`).
 */
export function Eyebrow({ children, as: Tag = "p", className = "" }: Props) {
  return (
    <Tag className={className}>
      <span className="pill plate-label">{children}</span>
    </Tag>
  );
}
