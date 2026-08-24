"use client";

import { useState } from "react";

import { openRamonageModal } from "@/components/forms/RamonageBookingModal";

type ApplianceType = {
  id: string;
  name: string;
  desc: string;
  duration: string;
  basePrice: string;
  icon: string;
};

const APPLIANCES: ApplianceType[] = [
  {
    id: "poele-bois",
    name: "Poêle à bois (bûches)",
    desc: "Conduit simple ou tubé, ramonage mécanique rotatif",
    duration: "45 min",
    basePrice: "75 — 90 €",
    icon: "🪵",
  },
  {
    id: "poele-granules",
    name: "Poêle à granulés / pellets",
    desc: "Nettoyage conduit + extracteur et creuset",
    duration: "60 min",
    basePrice: "90 — 120 €",
    icon: "⚡",
  },
  {
    id: "insert",
    name: "Insert / Foyer fermé",
    desc: "Démontage déflecteur, aspiration suies et contrôle",
    duration: "50 min",
    basePrice: "80 — 95 €",
    icon: "🔥",
  },
  {
    id: "cheminee",
    name: "Cheminée ouverte traditionnelle",
    desc: "Ramonage complet avec protection soignée des sols",
    duration: "45 min",
    basePrice: "75 — 85 €",
    icon: "🏡",
  },
  {
    id: "debistrage",
    name: "Débistrage / Dégoudronnage",
    desc: "Élimination du bistre durci avant retubage",
    duration: "2 à 3 h",
    basePrice: "Sur diagnostic",
    icon: "⚙️",
  },
];

const SECTORS = [
  {
    name: "Secteur Centre / Proche agglomération",
    days: "Interventions Mardi & Jeudi",
    slots: ["Mardi 09:00", "Mardi 14:30", "Jeudi 11:00", "Jeudi 16:00"],
  },
  {
    name: "Secteur Nord & communes limitrophes",
    days: "Interventions Mercredi matin & Vendredi",
    slots: ["Mercredi 08:30", "Mercredi 10:30", "Vendredi 13:30", "Vendredi 15:30"],
  },
  {
    name: "Secteur Sud & campagne",
    days: "Interventions Lundi & Mercredi après-midi",
    slots: ["Lundi 09:30", "Lundi 14:00", "Mercredi 14:00", "Mercredi 16:30"],
  },
];

export function RamonageSimulator() {
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>(APPLIANCES[0]);
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(SECTORS[0].slots[0]);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="overflow-hidden rounded-sm border border-hairline bg-paper shadow-lift">
      {/* Header bar */}
      <div className="border-b border-hairline bg-cream-deep px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2.5 rounded-full bg-sage-deep" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Aperçu interactif : ce que voit votre client
          </span>
        </div>
        <span className="text-xs text-ink-faint hidden sm:inline">
          Module de réservation en ligne pour ramoneurs
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* Step indicator */}
        <div className="flex items-center gap-3 border-b border-hairline pb-5">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              step === 1 ? "text-rose" : "text-ink-faint hover:text-ink"
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs ${
                step === 1 ? "bg-rose text-cream" : "bg-cream-deep text-ink"
              }`}
            >
              1
            </span>
            Appareil
          </button>
          <span className="text-ink-faint">→</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              step === 2 ? "text-rose" : "text-ink-faint hover:text-ink"
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs ${
                step === 2 ? "bg-rose text-cream" : "bg-cream-deep text-ink"
              }`}
            >
              2
            </span>
            Tournée & Créneau
          </button>
          <span className="text-ink-faint">→</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              step === 3 ? "text-rose" : "text-ink-faint hover:text-ink"
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs ${
                step === 3 ? "bg-rose text-cream" : "bg-cream-deep text-ink"
              }`}
            >
              3
            </span>
            Confirmation & Certificat
          </button>
        </div>

        {/* Step 1: Choix de l'appareil */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose">
                Étape 1 sur 3
              </p>
              <h3 className="text-display-sm text-ink mt-1">
                Quel appareil devez-vous faire ramoner ?
              </h3>
              <p className="text-sm text-ink-soft mt-1">
                Le client choisit son équipement. Le temps d&apos;intervention et le
                forfait sont calibrés automatiquement sans surprise.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              {APPLIANCES.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    setSelectedAppliance(app);
                  }}
                  className={`text-left p-4 rounded-sm border transition-all cursor-pointer ${
                    selectedAppliance.id === app.id
                      ? "border-rose bg-rose-veil/60 shadow-xs"
                      : "border-hairline bg-paper-soft hover:border-ink/30"
                  }`}
                >
                  <span className="text-2xl" role="img" aria-label={app.name}>
                    {app.icon}
                  </span>
                  <p className="font-semibold text-sm text-ink mt-2">{app.name}</p>
                  <p className="text-xs text-ink-soft mt-1 leading-relaxed">{app.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-2 text-xs">
                    <span className="text-ink-faint">Durée : {app.duration}</span>
                    <span className="font-semibold text-rose-deep">{app.basePrice}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-11 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose cursor-pointer"
              >
                Continuer vers le choix de créneau →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choix de la tournée */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose">
                Étape 2 sur 3
              </p>
              <h3 className="text-display-sm text-ink mt-1">
                Sélectionnez votre commune pour grouper la tournée
              </h3>
              <p className="text-sm text-ink-soft mt-1">
                Le système propose des créneaux selon votre secteur géographique pour
                éviter 50 km de route inutile entre deux rendez-vous.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {SECTORS.map((sec, idx) => (
                <div
                  key={sec.name}
                  className={`p-4 rounded-sm border transition-all ${
                    selectedSector === idx
                      ? "border-rose bg-rose-veil/40"
                      : "border-hairline bg-paper-soft"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-ink">{sec.name}</p>
                      <p className="text-xs text-ink-faint">{sec.days}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSector(idx);
                        setSelectedSlot(sec.slots[0]);
                      }}
                      className={`text-xs px-3 py-1 rounded-full font-medium cursor-pointer ${
                        selectedSector === idx
                          ? "bg-rose text-cream"
                          : "bg-paper border border-hairline text-ink hover:border-ink/40"
                      }`}
                    >
                      {selectedSector === idx ? "Secteur sélectionné" : "Choisir ce secteur"}
                    </button>
                  </div>

                  {selectedSector === idx && (
                    <div className="mt-3 pt-3 border-t border-ink/10">
                      <p className="text-xs font-medium text-ink-soft mb-2">
                        Créneaux de passage disponibles :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sec.slots.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSlot(s)}
                            className={`text-xs px-3 py-1.5 rounded-sm font-medium transition-colors cursor-pointer ${
                              selectedSlot === s
                                ? "bg-rose-deep text-cream"
                                : "bg-paper border border-hairline text-ink hover:bg-cream-deep"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-ink-soft hover:text-ink cursor-pointer"
              >
                ← Retour au choix d&apos;appareil
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="min-h-11 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose cursor-pointer"
              >
                Voir le récapitulatif & attestation →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Résumé & Certificat */}
        {step === 3 && (
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sage-deep">
                Étape 3 sur 3 — Rendez-vous réservé en 45 secondes
              </p>
              <h3 className="text-display-sm text-ink mt-1">
                Dossier prêt pour l&apos;artisan et le client
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Carte intervention */}
              <div className="rounded-sm border border-hairline bg-paper-soft p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                  Détails de l&apos;intervention
                </p>
                <div className="mt-3 space-y-2 text-sm text-ink">
                  <div className="flex justify-between border-b border-hairline pb-1.5">
                    <span className="text-ink-soft">Installation :</span>
                    <span className="font-semibold">{selectedAppliance.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline pb-1.5">
                    <span className="text-ink-soft">Créneau :</span>
                    <span className="font-semibold">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline pb-1.5">
                    <span className="text-ink-soft">Estimation forfait :</span>
                    <span className="font-semibold text-rose-deep">
                      {selectedAppliance.basePrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Rappels automatisés :</span>
                    <span className="text-xs text-sage-deep font-semibold">
                      SMS J-1 & Email
                    </span>
                  </div>
                </div>
              </div>

              {/* Carte Certificat */}
              <div className="rounded-sm border border-sage-deep/30 bg-sage-veil p-4">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="Certificat">
                    📋
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-sage-deep">
                    Attestation de ramonage conforme
                  </p>
                </div>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  Générée en fin d&apos;intervention depuis votre smartphone en 1 clic.
                  Prête pour l&apos;assurance habitation de votre client (décret 2023).
                </p>
                <div className="mt-3 rounded-sm bg-paper p-2.5 text-xs text-ink-soft border border-sage-deep/20 font-mono">
                  <div className="flex justify-between">
                    <span>Certificat N°</span>
                    <span className="text-ink font-semibold">RAM-2026-0842</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>État du conduit</span>
                    <span className="text-sage-deep font-bold">Conforme / Bon état</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-hairline bg-cream-deep p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-sm text-ink">
                  Vous voulez ce système sur votre propre site ?
                </p>
                <p className="text-xs text-ink-soft mt-0.5">
                  Adapté à vos prix, vos communes et votre façon de travailler.
                </p>
              </div>
              <button
                type="button"
                onClick={openRamonageModal}
                className="w-full sm:w-auto min-h-11 shrink-0 rounded-full bg-rose px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose-deep cursor-pointer"
              >
                Créer mon site ramoneur
              </button>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-ink-faint hover:text-ink cursor-pointer"
              >
                ↺ Recommencer la démonstration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
