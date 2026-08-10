import Image from "next/image";

import { BrowserFrame } from "@/components/visuals/DeviceFrame";

/**
 * Capture réelle du produit de l'équipe (bloomy.one).
 *
 * Elle remplace les aperçus qui étaient redessinés en HTML/CSS : une
 * interface reconstituée à la main est une illustration, pas une preuve.
 *
 * Le cadrage évite volontairement la mascotte de bloomy.one. Elle appartient
 * à l'identité du produit grand public, pas à celle du studio — la faire
 * apparaître ici ferait porter au studio le ton d'une marque qui n'est pas
 * la sienne. On montre donc une section d'interface, traitée exactement
 * comme les captures de sites clients : dans un cadre de navigateur.
 */
export function BloomyAppShot({ className = "" }: { className?: string }) {
  // Pas de <figure> ici : les pages appelantes en posent une avec leur propre
  // légende, et imbriquer deux <figure> produit une structure douteuse.
  return (
    <div className={className}>
      <BrowserFrame label="bloomy.one">
        <Image
          src="/produit/bloomy-produit.webp"
          alt="Le comparatif public de bloomy.one : création sur mesure, 0 % de commission, click-and-collect."
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 34rem, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    </div>
  );
}
