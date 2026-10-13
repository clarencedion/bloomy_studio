import Image from "next/image";

import { PhoneFrame } from "@/components/visuals/DeviceFrame";
import type { ShowcaseSite } from "@/lib/portfolio";

/**
 * La capture mobile réelle d'un site du portfolio, dans sa lunette. Rien
 * n'est rendu si le projet n'a pas de capture mobile.
 */
export function PhoneShot({
  site,
  sizes,
  eager = false,
  className = "",
}: {
  site: ShowcaseSite;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const shot = site.mobile;
  if (!shot) return null;
  return (
    <PhoneFrame className={className}>
      <Image
        src={shot.image}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-auto w-full"
      />
    </PhoneFrame>
  );
}
