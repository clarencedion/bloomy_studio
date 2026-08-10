/**
 * Illustrations au trait — dessinées à la main, pas générées.
 *
 * Trois principes tiennent tout le jeu, et ce sont eux qui l'empêchent de
 * ressembler à une banque d'icônes :
 *
 * 1. **L'aplat est décalé du trait.** Comme une sérigraphie mal calée, la
 *    couleur déborde d'un côté et manque de l'autre. Un outil automatique
 *    aligne toujours parfaitement remplissage et contour ; l'impression
 *    manuelle, jamais.
 * 2. **Les traits dépassent aux angles.** Un stylo ne s'arrête pas pile au
 *    coin — il file de deux ou trois unités. Les rectangles sont donc dessinés
 *    en segments ouverts, jamais avec `<rect>`.
 * 3. **Aucune ligne n'est droite.** Chaque segment est une courbe dont les
 *    points de contrôle s'écartent légèrement de l'axe. L'œil ne lit pas le
 *    détail, il lit « tracé à la main ».
 *
 * Une seule couleur d'encre (`currentColor`) et une seule teinte d'aplat par
 * dessin : la discipline chromatique du site s'applique ici aussi.
 */

type SketchProps = {
  /** Teinte de l'aplat décalé. Reprend les tokens de matière. */
  tint?: string;
  className?: string;
  size?: number;
};

function Frame({
  children,
  className = "",
  size = 96,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={size}
      height={size * (100 / 120)}
      className={className}
      role="img"
      aria-label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Sites internet — une fenêtre de navigateur griffonnée. */
export function SketchSite({ tint = "var(--color-tint-kraft)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis d'une fenêtre de navigateur">
      {/* Aplat décalé vers le bas-droite */}
      <path
        d="M22 26 C 60 24, 96 25, 104 27 C 106 50, 105 74, 103 80 C 66 82, 34 81, 24 79 C 22 58, 21 36, 22 26 Z"
        fill={tint}
        stroke="none"
      />
      {/* Cadre, en quatre traits qui se dépassent */}
      <path d="M16 20 C 54 18, 90 19, 99 20.5" />
      <path d="M99 18 C 100 42, 99.5 64, 98 76" />
      <path d="M100 75 C 62 77, 28 76, 17 74.5" />
      <path d="M18 77 C 16 54, 16.5 32, 17.5 19" />
      {/* Barre de titre */}
      <path d="M17 31 C 54 29.5, 88 30, 98.5 31" />
      {/* Trois pastilles, jamais rondes */}
      <path d="M24 25.5 C 26 24, 27.5 26, 26 27.5 C 24.5 28.5, 23 27, 24 25.5 Z" />
      <path d="M32 25.5 C 34 24.2, 35.5 26, 34 27.5 C 32.4 28.6, 31 27, 32 25.5 Z" />
      <path d="M40 25.7 C 42 24.3, 43.5 26.2, 42 27.6 C 40.4 28.7, 39 27.1, 40 25.7 Z" />
      {/* Contenu : un bloc et deux lignes */}
      <path d="M26 41 C 42 40, 56 40.5, 60 41.5 C 61 50, 60.5 57, 59.5 60 C 43 61, 30 60.5, 26 59.5 C 25 51, 25.2 44, 26 41 Z" />
      <path d="M70 43 C 78 42.3, 86 42.6, 91 43.2" />
      <path d="M70 51 C 80 50.4, 87 50.7, 89 51.2" />
      <path d="M70 59 C 76 58.4, 82 58.7, 86 59.1" />
      <path d="M26 68 C 40 67.2, 54 67.6, 61 68.3" />
    </Frame>
  );
}

/** MVP — un avion en papier : la première version qu'on lance vraiment. */
export function SketchMvp({ tint = "var(--color-tint-eau)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis d'un avion en papier">
      <path
        d="M28 46 C 54 34, 82 24, 98 20 C 92 38, 84 58, 78 72 C 68 64, 58 58, 50 54 C 42 52, 33 49, 28 46 Z"
        fill={tint}
        stroke="none"
      />
      {/* Corps de l'avion */}
      <path d="M22 44 C 48 32, 78 21, 95 16.5" />
      <path d="M95 15 C 89 34, 80 55, 74 69.5" />
      <path d="M74.5 71 C 65 62, 55 55, 45 50.5" />
      <path d="M45 52 C 38 49.5, 28 46.5, 21.5 45" />
      {/* Pli central */}
      <path d="M94 17 C 74 33, 56 45, 45 51" />
      {/* Sillage : trois traits courts et inégaux */}
      <path d="M14 62 C 20 60.5, 26 60, 30 60.2" />
      <path d="M20 72 C 27 70.2, 34 69.6, 39 69.8" />
      <path d="M32 81 C 38 79.6, 44 79.2, 47 79.4" />
    </Frame>
  );
}

/** Micro SaaS — des cartes empilées qui reviennent chaque mois. */
export function SketchSaas({ tint = "var(--color-tint-soie)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis de cartes empilées">
      <path
        d="M34 34 C 62 32, 88 33, 96 35 C 97 54, 96 70, 95 76 C 66 78, 40 77, 32 75 C 31 56, 32 40, 34 34 Z"
        fill={tint}
        stroke="none"
      />
      {/* Carte du fond : elle dépasse en haut et à droite, et son bord
          inférieur disparaît derrière la carte du dessus. */}
      <path d="M38 24 C 62 22.5, 84 23, 93 24.4" />
      <path d="M93 22.5 C 94 36, 93.5 50, 92.5 62" />
      <path d="M93 61 C 90 61.6, 88 62, 85.5 62.2" />
      <path d="M37 25.5 C 36.6 29, 36.4 32, 36.4 34.5" />
      {/* Carte du dessus */}
      <path d="M26 36 C 52 34.4, 76 35, 84 36.2" />
      <path d="M84 34.5 C 85 50, 84.5 66, 83.5 73" />
      <path d="M85 72 C 60 74, 36 73.4, 27 72" />
      <path d="M28 73.5 C 26 58, 26.5 44, 27.5 35" />
      {/* Deux lignes de contenu */}
      <path d="M36 49 C 48 48.2, 60 48.6, 66 49.3" />
      <path d="M36 59 C 45 58.3, 53 58.7, 57 59.2" />
      {/* Flèche d'abonnement, qui boucle */}
      <path d="M44 84 C 56 88, 72 87, 80 81" />
      <path d="M74 79 C 78 80.4, 80 81.2, 81 82" />
      <path d="M77 86 C 79 84.6, 80.4 83.4, 81 82.2" />
    </Frame>
  );
}

/** Fleuristes — un bouquet dans son cornet de papier. */
export function SketchBouquet({ tint = "var(--color-tint-soie)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis d'un bouquet dans son papier">
      <path
        d="M44 50 C 56 46, 72 46, 84 51 C 78 68, 70 82, 64 88 C 56 82, 48 66, 44 50 Z"
        fill={tint}
        stroke="none"
      />
      {/* Cornet de papier, ouvert en haut */}
      <path d="M36 44 C 50 39.5, 70 39, 84 43.5" />
      <path d="M84 45 C 77 62, 68 78, 61 86" />
      <path d="M61 87 C 53 78, 43 60, 36.5 45" />
      {/* Ficelle */}
      <path d="M46 66 C 54 69.5, 64 69, 72 65.5" />
      {/* Trois tiges de hauteurs différentes */}
      <path d="M52 43 C 50 34, 49 26, 50 20" />
      <path d="M60 42 C 60 34, 60.5 28, 61 22" />
      <path d="M70 43 C 71 35, 72.5 28, 74 23" />
      {/* Corolles : des pétales bosselés, jamais des cercles. Chacune est
          dessinée d'un trait qui revient sur lui-même, comme une rosace
          griffonnée d'un seul geste. */}
      <path d="M43 20 C 41 15, 45 11, 49 13 C 50 8.5, 56 8.5, 57 13 C 61 12, 63 16, 60 19.5 C 62 23, 58 26.5, 54.5 24.5 C 51 27, 46.5 24.5, 47 21 C 44.6 21.6, 43.4 21, 43 20 Z" />
      <path d="M55 16 C 53 11, 57.6 7.5, 61.5 9.6 C 63 6, 68.5 7, 68.6 11 C 72.6 10.4, 74.4 14.6, 71.4 17.6 C 73 21, 69 24.4, 65.6 22.4 C 62 24.6, 57.6 22, 58.4 18.6 C 56.4 19, 55.4 17.6, 55 16 Z" />
      <path d="M68 22 C 66.4 18, 70 15, 73.4 16.6 C 74.6 13, 79.4 13.6, 80 17.4 C 83.4 16.6, 85 20.4, 82.4 23 C 84 26, 80.4 28.6, 77.4 27 C 74.4 29, 70.6 26.8, 71.2 23.8 C 69.2 24.2, 68.3 23.2, 68 22 Z" />
      {/* Une feuille, attachée à la tige de gauche */}
      <path d="M51 32 C 43 28.6, 36 30.4, 33.6 34.6 C 39 38.4, 47 37, 51 32.6 Z" />
      <path d="M50.6 33 C 45.6 33.4, 40.6 34.4, 35.6 35.6" />
    </Frame>
  );
}

/** Salons de coiffure — ciseaux et peigne croisés. */
export function SketchSalon({ tint = "var(--color-tint-feuille)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis de ciseaux et d'un peigne">
      <path
        d="M30 60 C 44 52, 62 42, 78 34 C 82 38, 84 42, 85 46 C 70 55, 50 66, 36 72 C 32 69, 30 65, 30 60 Z"
        fill={tint}
        stroke="none"
      />
      {/* Lames croisées */}
      <path d="M24 26 C 42 40, 62 54, 82 66" />
      <path d="M24 68 C 42 54, 62 40, 82 27" />
      {/* Anneaux, ovales et irréguliers */}
      <path d="M86 62 C 94 60, 99 65, 96 71 C 92 77, 84 75, 83 69 C 82.4 65.6, 83.6 62.8, 86 62 Z" />
      <path d="M86 24 C 94 22.4, 99 27.4, 96 33.4 C 92 39.4, 84 37.6, 83 31.6 C 82.4 28.2, 83.6 25 86 24 Z" />
      {/* Rivet */}
      <path d="M52 45.6 C 55 44.4, 57 46.6, 55.6 48.8 C 54 50.6, 51.4 49.4, 51.6 47.4 Z" />
      {/* Peigne, sous les ciseaux */}
      <path d="M18 82 C 40 79.5, 66 79, 88 81" />
      <path d="M24 82 C 24 86, 24 89, 24 91" />
      <path d="M34 81.5 C 34 85.6, 34 88.6, 34 90.6" />
      <path d="M44 81.2 C 44 85.4, 44 88.4, 44 90.4" />
      <path d="M54 81 C 54 85.2, 54 88.2, 54 90.2" />
      <path d="M64 81 C 64 85.2, 64 88.2, 64 90.2" />
      <path d="M74 81.2 C 74 85.4, 74 88.4, 74 90.4" />
    </Frame>
  );
}

/** Autres commerces — une devanture avec son store. */
export function SketchBoutique({ tint = "var(--color-tint-lin)", className, size }: SketchProps) {
  return (
    <Frame className={className} size={size} label="Croquis d'une devanture de boutique">
      <path
        d="M26 34 C 52 31, 84 32, 98 35 C 96 44, 94 50, 92 53 C 66 55, 38 54, 28 51 C 26 45, 25.6 39, 26 34 Z"
        fill={tint}
        stroke="none"
      />
      {/* Store, en festons inégaux */}
      <path d="M18 28 C 46 24.6, 78 25.2, 96 28.4" />
      <path d="M17 29 C 20 36, 22 42, 23 47" />
      <path d="M96 28 C 95 35, 93.5 41, 92 46" />
      <path d="M23 47 C 33 51, 44 47, 53 50.5 C 62 54, 74 49.5, 82 51.5 C 87 52.6, 90 49, 92 46" />
      {/* Façade */}
      <path d="M24 52 C 24 64, 24 76, 24 86" />
      <path d="M92 51 C 92 63, 92 75, 92 86" />
      <path d="M18 86.5 C 46 84.6, 76 85, 98 86.6" />
      {/* Porte */}
      <path d="M46 86 C 46 76, 46.4 70, 47 66 C 54 64.4, 62 64.6, 68 66.2 C 68.6 71, 69 78, 69 86" />
      {/* Vitrine */}
      <path d="M30 60 C 34 58.6, 39 58.8, 41 60 C 41.4 65, 41.2 69, 40.6 71.6 C 36 72.6, 32 72.4, 29.6 71.4 C 29 67, 29.2 62.6, 30 60 Z" />
      {/* Enseigne : un trait, pas un mot */}
      <path d="M74 60 C 78 59, 83 59.2, 86 60" />
    </Frame>
  );
}
