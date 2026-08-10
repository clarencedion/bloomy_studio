import {
  SketchBouquet,
  SketchBoutique,
  SketchMvp,
  SketchSaas,
  SketchSalon,
  SketchSite,
} from "@/components/visuals/Sketch";

/**
 * Aiguillage nom → dessin.
 *
 * Les données (`lib/products.ts`) ne référencent qu'une chaîne : elles n'ont
 * pas à importer de composants React. C'est ce qui permet de décrire une offre
 * ou un métier sans toucher au rendu — et de garder le contenu dans `lib/`,
 * comme l'exige la règle du projet.
 *
 * L'aplat prend la teinte de la carte qui accueille le dessin : le trait est
 * toujours l'encre, la couleur vient de la matière.
 */
const registry = {
  site: SketchSite,
  mvp: SketchMvp,
  saas: SketchSaas,
  bouquet: SketchBouquet,
  salon: SketchSalon,
  boutique: SketchBoutique,
} as const;

export type SketchName = keyof typeof registry;

export function SketchFor({
  name,
  className,
  size,
  tint,
}: {
  name: SketchName;
  className?: string;
  size?: number;
  tint?: string;
}) {
  const Drawing = registry[name];
  return <Drawing className={className} size={size} tint={tint} />;
}
