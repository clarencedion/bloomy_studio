import Image from "next/image";
import { FileText, VideoCamera } from "@phosphor-icons/react/dist/ssr";

import { site } from "@/lib/site";

export type NextStep = {
  /** Repère temporel : il remplace un numéro, réservé à la méthode. */
  when: string;
  title: string;
  body: string;
  visual: "founders" | "call" | "quote";
};

const icons = {
  call: VideoCamera,
  quote: FileText,
} as const;

/**
 * « Après votre message » : ce qui se passe une fois le formulaire envoyé.
 *
 * Trois repères reliés par un filet vertical, comme une tige courte. Pas de
 * numéros (la numérotation est réservée aux quatre jalons de la méthode) :
 * le repère temporel suffit à dire l'ordre. La première étape montre les
 * deux visages de l'équipe, parce que c'est eux qui lisent le message.
 *
 * Tous les repères partagent une colonne de la largeur des deux portraits,
 * icônes centrées : le texte ne passe jamais sous un visage.
 */
export function NextSteps({ steps }: { steps: NextStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const Icon = step.visual === "founders" ? null : icons[step.visual];
        return (
          <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5">
            {/* Filet qui relie ce repère au suivant, au centre de la colonne. */}
            {last ? null : (
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[2.375rem] top-12 w-px bg-line-strong"
              />
            )}
            {/* Colonne de repère commune : le texte de chaque étape part du même bord. */}
            <div className="relative flex w-[4.75rem] shrink-0 justify-center">
              {Icon === null ? (
                <span className="relative block h-11 w-[4.75rem]">
                  {site.founders.map((f, j) => (
                    <Image
                      key={f.name}
                      src={f.photo}
                      alt=""
                      width={96}
                      height={96}
                      sizes="2.75rem"
                      className={`absolute top-0 size-11 rounded-full border-2 border-paper bg-blush object-cover ${
                        j === 0 ? "left-0" : "left-8"
                      }`}
                    />
                  ))}
                </span>
              ) : (
                <span className="grid size-11 place-items-center rounded-full border border-line-strong bg-white text-forest">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="plate-label">{step.when}</p>
              <h3 className="text-display-sm mt-1.5">{step.title}</h3>
              <p className="mt-1.5 max-w-[42ch] text-[0.98rem] leading-relaxed text-forest-soft">
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
