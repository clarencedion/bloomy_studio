import { Reveal } from "@/components/ui/Reveal";

export type Milestone = { title: string; body: string; deliverable: string };

/**
 * Une vraie séquence, donc numérotée : quatre jalons côte à côte, chacun
 * conclu par le livrable que le client valide. Le filet supérieur relie les
 * jalons comme une piste ; le premier est marqué en rose, c'est là que tout
 * commence.
 *
 * Mobile (< 768 px) : une colonne. Tablette : deux colonnes.
 */
export function MilestoneTrack({ steps, className = "" }: { steps: Milestone[]; className?: string }) {
  return (
    <ol className={`grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={Math.min(i, 2) * 70} className="h-full">
            <div
              className={`flex h-full flex-col border-t-2 pt-6 ${
                i === 0 ? "border-bloom" : "border-forest/20"
              }`}
            >
              <span className="step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-display-sm mt-4">{s.title}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-forest-soft">{s.body}</p>
              <p className="mt-auto pt-6 text-[0.92rem] leading-snug text-forest-soft">
                <span className="font-semibold text-forest">Livrable : </span>
                {s.deliverable}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
