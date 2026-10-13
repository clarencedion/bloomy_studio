import Image from "next/image";

import { site } from "@/lib/site";

/**
 * Les deux fondateurs dans un même cadre, épaule contre épaule.
 *
 * La section équipe de l'accueil (`home/Founders.tsx`) pose chaque portrait
 * sur son propre panneau, décalés l'un de l'autre. Ici, l'inverse : une seule
 * « photo de groupe » sur un panneau rose, les deux portraits détourés posés
 * sur le bord bas et qui se chevauchent aux épaules. Le second passe devant le
 * premier : deux personnes qui travaillent ensemble, pas deux fiches.
 *
 * Les noms sont alignés sous chaque visage, sous le panneau (jamais posés
 * sur l'image). Même composition en mobile, à pleine largeur.
 */
export function FounderDuo({ eager = false }: { eager?: boolean }) {
  const [first, second] = site.founders;

  return (
    <figure>
      <div className="leaf-lg relative aspect-[6/5] overflow-hidden bg-blush">
        <Image
          src={first.photo}
          alt={`${first.name}, ${first.role.toLowerCase()} de Bloomy Studio.`}
          width={640}
          height={640}
          sizes="(min-width: 1024px) 24rem, 64vw"
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="absolute bottom-0 left-[-5%] h-auto w-[66%]"
        />
        <Image
          src={second.photo}
          alt={`${second.name}, ${second.role.toLowerCase()} de Bloomy Studio.`}
          width={640}
          height={640}
          sizes="(min-width: 1024px) 24rem, 64vw"
          className="absolute bottom-0 right-[-5%] h-auto w-[66%]"
        />
      </div>
      <figcaption className="mt-5 grid grid-cols-2 gap-6 px-1">
        {site.founders.map((founder, i) => (
          <p key={founder.name} className={i === 1 ? "text-right" : ""}>
            <span className="text-display-sm block">{founder.name}</span>
            <span className="mt-1 block text-[0.92rem] text-forest-soft">{founder.role}</span>
          </p>
        ))}
      </figcaption>
    </figure>
  );
}
