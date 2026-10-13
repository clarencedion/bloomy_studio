import type { ReactNode } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/ui/Reveal";

export type Milestone = {
  title: string;
  /** Durée, telle qu'elle est déjà annoncée sur le site. */
  when: string;
  /** Ce que nous faisons pendant le jalon. */
  body: string;
  /** Ce que l'on attend de vous. */
  you: string;
  /** Ce que vous validez pour clore le jalon. */
  validate: string;
  deliverable: string;
};

/** Étape hors séquence (avant ou après les jalons) : jamais numérotée. */
export type OffStep = {
  label: string;
  title: string;
  body: ReactNode;
};

/*
 * Géométrie de la tige. Mobile : la tige court à 0,75 rem du bord gauche et le
 * contenu commence à 3 rem. Desktop : trois colonnes (numéro 10 rem, tige
 * 5 rem, contenu), la tige passe au milieu de la deuxième, à 12,5 rem.
 */
const X = "left-3 lg:left-[12.5rem]";
const ROW = "relative lg:grid lg:grid-cols-[10rem_5rem_minmax(0,1fr)]";
const COL_LEFT = "pl-12 lg:pl-0 lg:text-right";
const COL_MAIN = "pl-12 lg:col-start-3 lg:pl-0";

/**
 * La méthode en frise verticale : quatre jalons sur une tige rose continue.
 *
 * C'est la seule séquence numérotée du site. La frise de l'accueil
 * (`home/MethodTimeline.tsx`) est horizontale et résume ; celle-ci est
 * verticale et détaille : pour chaque jalon, ce que nous faisons, votre part,
 * ce que vous validez (le panneau rose) et le livrable.
 *
 * La tige est pleine et rose entre le premier et le dernier jalon, parce que
 * c'est le projet. Avant (le diagnostic) et après (la suite), elle devient
 * pointillée et grise, avec un nœud évidé : ces étapes sont facultatives et
 * ne portent pas de numéro. Les nœuds ont les coins « feuille » du logo.
 *
 * Aucune animation propre : chaque jalon passe par `<Reveal>`, une fois.
 */
export function MethodStem({
  before,
  milestones,
  after,
}: {
  before: OffStep;
  milestones: Milestone[];
  after: OffStep;
}) {
  return (
    <div>
      <OffStepRow step={before} position="before" />

      <ol>
        {milestones.map((m, i) => (
          <li key={m.title} className={`${ROW} pb-16 sm:pb-20 lg:pb-24`}>
            {/* Segment de tige : les segments bout à bout forment une tige continue. */}
            <span
              aria-hidden="true"
              className={`absolute bottom-0 top-0 w-[3px] -translate-x-1/2 bg-bloom ${X}`}
            />
            <span
              aria-hidden="true"
              className={`leaf-sm absolute top-[1.1rem] size-5 -translate-x-1/2 bg-bloom ring-[6px] ring-paper lg:top-[2.2rem] ${X}`}
            />

            <div className={COL_LEFT}>
              <p className="step-num text-[3.25rem] lg:text-[5.75rem]">
                <span className="sr-only">Jalon </span>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-[0.95rem] font-medium leading-snug text-forest-soft max-lg:hidden">
                {m.when}
              </p>
            </div>

            <Reveal className={`${COL_MAIN} mt-5 lg:mt-0 lg:pt-5`}>
              <h2 className="text-display-lg">{m.title}</h2>
              <p className="mt-3 text-[0.95rem] font-medium text-forest-soft lg:hidden">
                {m.when}
              </p>
              <p className="mt-5 max-w-[60ch] text-[1.08rem] leading-relaxed text-forest-soft">
                {m.body}
              </p>

              <div className="mt-8 grid items-start gap-7 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-10">
                <div className="leaf flex items-start gap-4 bg-blush p-6 sm:p-7">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-bloom-strong text-white">
                    <Check aria-hidden="true" weight="bold" className="size-4" />
                  </span>
                  <div>
                    <p className="plate-label text-forest">Vous validez</p>
                    <p className="mt-2 text-[1.06rem] font-medium leading-snug text-forest">
                      {m.validate}
                    </p>
                  </div>
                </div>

                <dl className="grid content-start gap-6 sm:grid-cols-2 xl:grid-cols-1">
                  <div>
                    <dt className="plate-label">Votre part</dt>
                    <dd className="mt-2 text-[0.98rem] leading-relaxed text-forest-soft">{m.you}</dd>
                  </div>
                  <div>
                    <dt className="plate-label">Livrable</dt>
                    <dd className="mt-2 text-[0.98rem] leading-relaxed text-forest-soft">
                      {m.deliverable}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <OffStepRow step={after} position="after" />
    </div>
  );
}

function OffStepRow({ step, position }: { step: OffStep; position: "before" | "after" }) {
  const before = position === "before";
  return (
    <div className={`${ROW} ${before ? "pb-16 sm:pb-20" : ""}`}>
      {/* Tige pointillée : du nœud vers le premier jalon, ou du dernier jalon vers le nœud. */}
      <span
        aria-hidden="true"
        className={`absolute w-0 -translate-x-1/2 border-l-[3px] border-dashed border-line-strong ${X} ${
          before ? "bottom-0 top-[1.6rem]" : "top-0 h-[1.6rem]"
        }`}
      />
      <span
        aria-hidden="true"
        className={`leaf-sm absolute top-[0.85rem] size-5 -translate-x-1/2 border-[3px] border-forest-faint bg-paper ${X}`}
      />

      <div className={`${COL_LEFT} lg:pt-[0.95rem]`}>
        <p className="plate-label">{step.label}</p>
      </div>
      <div className={`${COL_MAIN} mt-2 lg:mt-0 lg:pt-[0.55rem]`}>
        <h2 className="text-display-md">{step.title}</h2>
        <div className="prose-links mt-3 max-w-[60ch] text-[1.02rem] leading-relaxed text-forest-soft">
          {step.body}
        </div>
      </div>
    </div>
  );
}
