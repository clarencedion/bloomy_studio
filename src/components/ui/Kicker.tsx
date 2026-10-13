type Props = {
  children: string;
  as?: "p" | "span" | "div";
  /** Ajoute les deux filets roses du logo, de part et d'autre du libellé. */
  ruled?: boolean;
  className?: string;
};

/**
 * Le libellé du logo : capitales très espacées, comme « DIGITAL STUDIO ».
 *
 * Rationné : un libellé pour trois sections au maximum sur une page. Le titre
 * seul suffit presque toujours ; le libellé ne sert que quand il apporte un
 * repère que la position de la section ne donne pas déjà.
 */
export function Kicker({ children, as: Tag = "p", ruled = false, className = "" }: Props) {
  return (
    <Tag className={`kicker ${ruled ? "kicker--ruled" : ""} ${className}`}>{children}</Tag>
  );
}
