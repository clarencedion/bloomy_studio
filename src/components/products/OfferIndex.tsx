import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

export type OfferIndexGroup = {
  name: string;
  items: { label: string; href: string; detail: string }[];
};

/**
 * Le sommaire des offres, à droite du titre : toutes les formules lisibles
 * d'un coup d'œil, chacune liée à sa fiche plus bas dans la page. Une vraie
 * navigation, pas un décor.
 */
export function OfferIndex({
  groups,
  note,
  className = "",
}: {
  groups: OfferIndexGroup[];
  note: string;
  className?: string;
}) {
  return (
    <nav aria-label="Les offres en un coup d'œil" className={`leaf-lg bg-mint p-6 sm:p-9 ${className}`}>
      {groups.map((g, gi) => (
        <div key={g.name} className={gi > 0 ? "mt-8" : ""}>
          <p className="plate-label">{g.name}</p>
          <ul className="mt-2">
            {g.items.map((item) => (
              <li key={item.href} className="border-b border-forest/12 last:border-b-0">
                <a
                  href={item.href}
                  className="group flex min-h-12 items-center justify-between gap-4 py-3"
                >
                  <span className="font-display text-[1.25rem] font-semibold tracking-tight text-forest transition-colors group-hover:text-bloom-ink">
                    {item.label}
                  </span>
                  <span className="flex items-center gap-2 text-right text-[0.88rem] text-forest-soft">
                    {item.detail}
                    <ArrowDown aria-hidden="true" weight="bold" className="size-3.5 text-bloom-ink" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-8 border-t border-forest/15 pt-5 text-[0.92rem] leading-relaxed text-forest-soft">
        {note}
      </p>
    </nav>
  );
}
