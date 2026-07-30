"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Sprig } from "@/components/visuals/Botanical";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import { track } from "@/lib/analytics";

/**
 * L'administration — section 6 de la direction artistique.
 *
 * Elle répond à l'objection numéro un : « je ne saurai pas m'en servir ». On
 * montre trois gestes du quotidien plutôt que d'affirmer que c'est simple.
 *
 * La bande est prune — chaude, jamais noire — et les panneaux restent clairs :
 * la précision d'un outil sur une surface qui reste celle d'un atelier. Les
 * panneaux sont des aperçus étiquetés, pas des captures clientes.
 */

const tabs = [
  { id: "produit", label: "Ajouter un bouquet" },
  { id: "fermeture", label: "Fermer une journée" },
  { id: "saison", label: "Publier une page de saison" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-hairline bg-cream px-3 py-2">
      <span className="plate-label block" style={{ fontSize: "0.5rem" }}>
        {label}
      </span>
      <span className="mt-0.5 block text-[0.78rem] font-semibold">{value}</span>
    </div>
  );
}

function ProduitPanel() {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-5">
      {/*
        Taille fixe sous 640 px : en une seule colonne, `aspect-square` étirait
        la vignette sur toute la largeur du téléphone — un carré vert de 370 px
        avec une fleur minuscule au centre.
      */}
      <div className="grid size-24 place-items-center rounded-sm bg-sage-veil text-sage-deep sm:size-auto sm:aspect-square">
        <Sprig name="renoncule" size={44} />
      </div>
      <div className="grid gap-2.5">
        <Field label="Nom" value="Bouquet éclat de saison" />
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Prix" value="38,00 €" />
          <Field label="Disponible" value="6 pièces" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Retrait en boutique", "Livraison locale"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-sage-veil px-2.5 py-1 text-[0.62rem] font-semibold text-sage-deep"
            >
              ✓ {t}
            </span>
          ))}
        </div>
        <div className="mt-1 grid h-9 place-items-center rounded-full bg-ink text-[0.72rem] font-semibold text-cream">
          Mettre en ligne
        </div>
      </div>
    </div>
  );
}

function FermeturePanel() {
  const slots = ["10 h 00", "11 h 30", "15 h 00", "17 h 30"];
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between rounded-sm border border-hairline bg-cream px-3 py-2.5">
        <span className="text-[0.8rem] font-semibold">Lundi 15 septembre</span>
        <span className="rounded-full bg-rose-veil px-2.5 py-1 text-[0.62rem] font-semibold text-rose-deep">
          Boutique fermée
        </span>
      </div>
      <p className="mt-3 text-[0.72rem] text-ink-faint">
        Créneaux de retrait retirés du site
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {slots.map((s) => (
          <li
            key={s}
            className="rounded-full border border-hairline px-2.5 py-1 text-[0.68rem] text-ink-faint line-through"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SaisonPanel() {
  const pages: [string, string, string][] = [
    ["Toussaint", "Brouillon", "bg-cream-deep text-ink-soft"],
    ["Saint-Valentin", "En ligne", "bg-sage-veil text-sage-deep"],
    ["Fête des mères", "Programmée · 1 mai", "bg-rose-veil text-rose-deep"],
  ];
  return (
    <ul className="divide-y divide-hairline p-1">
      {pages.map(([name, status, tone]) => (
        <li key={name} className="flex items-center justify-between gap-3 px-3 py-3">
          <span className="text-[0.82rem] font-semibold">{name}</span>
          <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-semibold ${tone}`}>
            {status}
          </span>
        </li>
      ))}
    </ul>
  );
}

const panels: Record<TabId, { note: string; render: () => React.ReactElement }> = {
  produit: {
    note: "Une photo, un prix, un stock. Le bouquet est en ligne avant que le café ne refroidisse.",
    render: () => <ProduitPanel />,
  },
  fermeture: {
    note: "Un jour de fermeture, et les créneaux de retrait disparaissent du site tout seuls.",
    render: () => <FermeturePanel />,
  },
  saison: {
    note: "Les pages de saison se préparent à l'avance et se publient au bon moment.",
    render: () => <SaisonPanel />,
  },
};

export function AdminDemo() {
  const [active, setActive] = useState<TabId>("produit");
  const panel = panels[active];

  const select = (id: TabId) => {
    setActive(id);
    track("admin_demo_tab", { tab: id });
  };

  return (
    <section className="on-ink bg-plum py-16 text-cream sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow>Votre espace</Eyebrow>
            <h2 className="text-display-lg mt-6">
              Vous le modifiez vous-même, depuis le comptoir
            </h2>
            <p className="mt-5 leading-relaxed text-cream/75">
              Tout ce qui change souvent — les prix, les produits, les horaires,
              les fermetures — se modifie sans nous, sans ticket et sans délai.
              La formation est comprise à la livraison.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {tabs.map((t) => {
                const current = t.id === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => select(t.id)}
                    aria-pressed={current}
                    className={`press min-h-11 rounded-full border px-4 py-2 text-[0.85rem] font-semibold ${
                      current
                        ? "border-cream bg-cream text-plum"
                        : "border-cream/25 text-cream/80 hover:border-cream/60 hover:text-cream"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <PanelFrame label="Tableau de bord">
              <div key={active} className="animate-[fade-in_180ms_var(--ease-soft)] text-ink">
                {panel.render()}
              </div>
            </PanelFrame>
            <p key={`${active}-note`} className="caption mt-4">
              {panel.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
