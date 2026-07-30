/**
 * Pictogrammes botaniques.
 *
 * Réduits à leur usage utile : un spécimen au trait, à la taille d'une icône,
 * pour distinguer quatre entrées d'une grille. La direction artistique révisée
 * proscrit les illustrations botaniques génériques comme décor — la grande
 * gerbe animée et le rameau de marge ont donc été retirés. Ce qui occupe
 * l'espace sur ce site, ce sont des captures de travail livré.
 *
 * Règle de couleur : les tiges prennent la couleur du texte courant
 * (`currentColor`), les corolles sont la seule tache pleine.
 */

type Ring = {
  rx: number;
  ry: number;
  dist: number;
  count: number;
  /** Décalage angulaire : c'est lui qui fait s'imbriquer les couronnes. */
  offset?: number;
};

/**
 * Couronne de pétales. La densité fait tout : peu de pétales espacés donnent
 * une marguerite d'école, beaucoup de pétales qui se chevauchent donnent une
 * corolle. On reste toujours du côté du chevauchement.
 */
function petalRing({ rx, ry, dist, count, offset = 0 }: Ring, key: string) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${key}-${i}`}
      cx={0}
      cy={-dist}
      rx={rx}
      ry={ry}
      transform={`rotate(${(360 / count) * i + offset})`}
    />
  ));
}

/** Renoncule : corolle serrée, quatre couronnes imbriquées vers le cœur. */
function Renoncule() {
  return (
    <g>
      <g fill="var(--color-rose-veil)" stroke="currentColor" strokeWidth={0.9}>
        {petalRing({ rx: 10.5, ry: 13, dist: 19, count: 11 }, "r1")}
      </g>
      <g fill="var(--color-rose-veil)" stroke="currentColor" strokeWidth={0.85}>
        {petalRing({ rx: 8.5, ry: 10.5, dist: 13, count: 9, offset: 20 }, "r2")}
      </g>
      <g fill="var(--color-rose)" fillOpacity={0.5} stroke="currentColor" strokeWidth={0.8}>
        {petalRing({ rx: 6.5, ry: 8, dist: 8, count: 7, offset: 12 }, "r3")}
      </g>
      <g fill="var(--color-rose)" fillOpacity={0.85} stroke="none">
        {petalRing({ rx: 4.5, ry: 5.5, dist: 4, count: 5, offset: 30 }, "r4")}
      </g>
      <circle r={2.2} fill="var(--color-rose-deep)" />
    </g>
  );
}

/** Dahlia : deux couronnes de pétales lancéolés, la seconde décalée. */
function Dahlia() {
  const petal = "M0 0 C 4.5 -12, 5 -25, 0 -33 C -5 -25, -4.5 -12, 0 0";
  return (
    <g>
      <g fill="var(--color-rose-veil)" stroke="currentColor" strokeWidth={0.9}>
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={petal} transform={`rotate(${(360 / 16) * i})`} />
        ))}
      </g>
      <g fill="var(--color-bloom)" fillOpacity={0.45} stroke="currentColor" strokeWidth={0.8}>
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={petal}
            transform={`rotate(${(360 / 12) * i + 15}) scale(0.62)`}
          />
        ))}
      </g>
      <g fill="var(--color-rose-deep)" stroke="none">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={petal} transform={`rotate(${(360 / 8) * i + 8}) scale(0.26)`} />
        ))}
      </g>
    </g>
  );
}

/** Tulipe : coupe à trois pétales, vue de trois quarts, avec ses nervures. */
function Tulipe() {
  return (
    <g fill="var(--color-rose-veil)" stroke="currentColor" strokeWidth={1}>
      <path d="M0 4 C -19 -6, -21 -32, -6 -44 C 2 -34, 3 -14, 0 4" />
      <path d="M0 4 C 19 -6, 21 -32, 6 -44 C -2 -34, -3 -14, 0 4" />
      <path
        d="M0 4 C -10 -8, -11 -34, 0 -47 C 11 -34, 10 -8, 0 4"
        fill="var(--color-rose)"
        fillOpacity={0.55}
      />
      <path d="M0 0 C -1 -16, -1 -32, 0 -44" fill="none" strokeWidth={0.7} />
    </g>
  );
}

/** Rameau d'eucalyptus : feuilles rondes alternées le long de la tige. */
function Eucalyptus() {
  const leaves = [
    [0, -12, -24],
    [0, -34, 26],
    [0, -56, -22],
    [0, -78, 24],
    [0, -98, -18],
    [0, -116, 20],
  ] as const;
  return (
    <g>
      <path
        d="M0 6 C 3 -30, -2 -70, 1 -124"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {leaves.map(([, y, rot], i) => (
        <ellipse
          key={i}
          cx={0}
          cy={y}
          rx={12}
          ry={8}
          fill="var(--color-sage-veil)"
          stroke="currentColor"
          strokeWidth={1.1}
          transform={`rotate(${rot} 0 ${y}) translate(${rot < 0 ? -11 : 11} 0)`}
        />
      ))}
    </g>
  );
}

/** Feuille lancéolée avec sa nervure. */
function Feuille() {
  return (
    <g fill="var(--color-sage-veil)" stroke="currentColor" strokeWidth={1.1}>
      <path d="M0 0 C 14 -12, 20 -34, 12 -52 C -2 -42, -8 -20, 0 0 Z" />
      <path d="M2 -4 C 8 -20, 11 -34, 12 -50" fill="none" strokeWidth={0.9} />
    </g>
  );
}

const specimens = {
  renoncule: Renoncule,
  dahlia: Dahlia,
  tulipe: Tulipe,
  eucalyptus: Eucalyptus,
  feuille: Feuille,
} as const;

export type SpecimenName = keyof typeof specimens;

/**
 * Spécimen isolé, à la taille d'un pictogramme. Décoratif : le sens est
 * toujours porté par le texte qui l'accompagne.
 */
export function Sprig({
  name,
  className = "",
  size = 44,
}: {
  name: SpecimenName;
  className?: string;
  size?: number;
}) {
  const Specimen = specimens[name];
  return (
    <svg
      viewBox="-60 -140 120 160"
      width={size}
      height={size * 1.33}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(0 20)">
        <path
          d="M0 0 C 2 -30, -2 -60, 0 -86"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
        <g transform="translate(0 -92)">
          <Specimen />
        </g>
      </g>
    </svg>
  );
}
