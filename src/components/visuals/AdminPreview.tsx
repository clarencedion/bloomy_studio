import { PanelFrame } from "@/components/visuals/DeviceFrame";

/**
 * Aperçus d'interface de gestion.
 *
 * Aucune capture d'un back-office livré n'est disponible : ces panneaux sont
 * donc des reconstitutions fidèles de ce que l'équipe construit tous les jours
 * pour bloomy.one, et ils sont **étiquetés « Aperçu »** par `PanelFrame`.
 * Jamais présentés comme la capture d'un client (règle : aucune preuve
 * inventée).
 *
 * Ils portent l'influence Linear — densité, alignements stricts, aucun
 * ornement — mais sur une surface prune chaude, jamais un fond noir.
 */

const statusTone = {
  ready: "bg-sage-veil text-sage-deep",
  todo: "bg-rose-veil text-rose-deep",
  sent: "bg-cream-deep text-ink-soft",
} as const;

type Order = {
  label: string;
  detail: string;
  status: string;
  tone: keyof typeof statusTone;
};

const orders: Order[] = [
  { label: "Bouquet éclat de saison", detail: "Retrait 17 h 30", status: "Prêt", tone: "ready" },
  { label: "Composition deuil", detail: "Livraison 11 h", status: "À composer", tone: "todo" },
  { label: "Mariage Lefebvre", detail: "Devis envoyé", status: "En attente", tone: "sent" },
];

/**
 * Fragment compact pour les compositions du hero : la preuve, en trois lignes,
 * qu'un site livré par le studio se pilote depuis un vrai tableau de bord.
 */
export function OrdersPeek({ className = "" }: { className?: string }) {
  return (
    <PanelFrame label="Commandes" className={className}>
      <ul className="divide-y divide-hairline">
        {orders.map((o) => (
          <li key={o.label} className="flex items-center gap-2 px-3 py-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.62rem] font-semibold">{o.label}</span>
              <span className="block text-[0.55rem] text-ink-faint">{o.detail}</span>
            </span>
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[0.5rem] font-semibold ${statusTone[o.tone]}`}
            >
              {o.status}
            </span>
          </li>
        ))}
      </ul>
    </PanelFrame>
  );
}
