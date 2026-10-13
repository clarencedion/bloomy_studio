export type Fact = { value: string; label: string };

/**
 * Faits vérifiables, en grand. Uniquement des faits déjà publiés (étude de
 * cas, bloomy.one) : jamais de chiffre arrondi pour faire joli.
 *
 * Mobile (< 1024 px) : deux colonnes.
 */
export function FactRow({ facts, className = "" }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 lg:gap-x-10 ${className}`}>
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col-reverse justify-end gap-2.5 border-t border-line-strong pt-5">
          <dt className="text-[0.95rem] leading-snug text-forest-soft">{f.label}</dt>
          <dd className="text-display-lg">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
