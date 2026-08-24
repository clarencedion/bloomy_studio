"use client";

import { useState } from "react";

import { openRamonageModal } from "@/components/forms/RamonageBookingModal";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import { ramonageDemo, ramonagePage, type RamonageAppliance } from "@/lib/ramonage";

const copy = ramonagePage.booking;
const { appliances, days, slots, minSlots, maxSlots } = ramonageDemo;

const STEPS = ["Appareil", "Créneaux", "Récapitulatif"] as const;
type Step = 0 | 1 | 2;

/** Identifiant lisible d'un créneau : « Mardi 3 · 8 h – 10 h ». */
function slotId(dayLabel: string, slot: string) {
  return `${dayLabel} · ${slot}`;
}

/**
 * Parcours de réservation jouable, calqué sur le tunnel réel de
 * ramoplus.pages.dev (appareil → disponibilités → récapitulatif).
 *
 * Les durées et les tarifs viennent de la grille publiée par ce site : rien
 * n'est inventé ici, et la note sous le panneau le dit. Pas d'émoji, pas de
 * seconde couleur d'action : le bourgogne marque la sélection et l'appel,
 * tout le reste tient au filet et à la typographie.
 */
export function RamonageSimulator() {
  const [step, setStep] = useState<Step>(0);
  const [appliance, setAppliance] = useState<RamonageAppliance>(appliances[0]);
  const [dayIndex, setDayIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);

  const day = days[dayIndex];
  const enough = picked.length >= minSlots;

  function toggleSlot(id: string) {
    setPicked((current) => {
      if (current.includes(id)) return current.filter((s) => s !== id);
      if (current.length >= maxSlots) return current;
      return [...current, id];
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PanelFrame label={copy.panelLabel}>
        {/* Rail d'étapes — une vraie séquence, donc de vrais numéros. */}
        <nav
          aria-label="Étapes de la réservation"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-hairline bg-cream px-4 py-3 sm:px-6"
        >
          {STEPS.map((label, index) => {
            const active = step === index;
            // Le récapitulatif n'existe pas tant qu'aucun créneau n'est
            // proposé : le rail ne doit pas y mener sur un dossier vide.
            const locked = index === 2 && !enough;
            return (
              <span key={label} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setStep(index as Step)}
                  disabled={locked}
                  aria-current={active ? "step" : undefined}
                  className={`plate-label transition-colors ${
                    locked
                      ? "cursor-not-allowed opacity-45"
                      : `cursor-pointer ${active ? "text-rose" : "hover:text-ink"}`
                  }`}
                >
                  <span className={active ? "text-rose" : "text-ink/40"}>
                    0{index + 1}
                  </span>{" "}
                  {label}
                </button>
              </span>
            );
          })}
        </nav>

        <div className="bg-paper p-5 sm:p-8">
          {/* Étape 1 — l'appareil */}
          {step === 0 ? (
            <div>
              <h3 className="text-display-sm">Quel appareil devons-nous ramoner ?</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                Le client choisit son équipement. La durée d’intervention et le
                tarif s’affichent avant même la prise de rendez-vous.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {appliances.map((item) => {
                  const selected = appliance.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAppliance(item)}
                      aria-pressed={selected}
                      className={`cursor-pointer rounded-sm border p-4 text-left transition-colors ${
                        selected
                          ? "border-rose bg-rose-veil"
                          : "border-hairline bg-paper-soft hover:border-ink/25"
                      }`}
                    >
                      <span className="plate-label">{item.fuel}</span>
                      <span className="mt-2 block text-[0.95rem] font-semibold text-ink">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                        {item.desc}
                      </span>
                      <span className="mt-3 flex items-center justify-between border-t border-hairline pt-2 text-xs text-ink-soft">
                        {item.duration}
                        <span className="font-semibold text-ink">{item.price}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="press min-h-11 cursor-pointer rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose"
                >
                  Choisir mes créneaux →
                </button>
              </div>
            </div>
          ) : null}

          {/* Étape 2 — les disponibilités, groupées par secteur */}
          {step === 1 ? (
            <div>
              <h3 className="text-display-sm">Quand pouvons-nous passer ?</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                Seuls les jours de tournée du secteur sont proposés. Le client
                retient {minSlots} à {maxSlots} créneaux, vous confirmez celui qui
                complète le mieux la journée.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {days.map((d, index) => {
                  const selected = dayIndex === index;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDayIndex(index)}
                      aria-pressed={selected}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "border-rose bg-rose text-cream"
                          : "border-hairline bg-paper text-ink hover:border-ink/30"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>

              <p className="plate-label mt-5">{day.sector}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {slots.map((slot) => {
                  const id = slotId(day.label, slot);
                  const selected = picked.includes(id);
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleSlot(id)}
                      aria-pressed={selected}
                      className={`cursor-pointer rounded-sm border px-3 py-2.5 text-sm font-medium transition-colors ${
                        selected
                          ? "border-rose bg-rose-veil text-rose-deep"
                          : "border-hairline bg-paper-soft text-ink hover:border-ink/25"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-hairline pt-4">
                <p className="plate-label">
                  {picked.length} / {maxSlots} créneaux proposés
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {picked.length === 0 ? (
                    <li className="text-sm text-ink-faint">
                      Sélectionnez au moins {minSlots} créneaux.
                    </li>
                  ) : (
                    picked.map((id) => (
                      <li
                        key={id}
                        className="rounded-full border border-hairline bg-cream px-3 py-1 text-xs text-ink"
                      >
                        {id}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="cursor-pointer text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                >
                  ← Retour à l’appareil
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!enough}
                  className="press min-h-11 cursor-pointer rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Voir le récapitulatif →
                </button>
              </div>
            </div>
          ) : null}

          {/* Étape 3 — le dossier tel qu'il arrive chez l'artisan */}
          {step === 2 ? (
            <div>
              <h3 className="text-display-sm">La demande arrive complète.</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                Voilà ce que vous recevez, sans avoir décroché une seule fois.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-hairline bg-paper-soft p-4">
                  <p className="plate-label">Intervention</p>
                  <dl className="mt-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-hairline py-2">
                      <dt className="text-ink-soft">Appareil</dt>
                      <dd className="text-right font-semibold">{appliance.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-hairline py-2">
                      <dt className="text-ink-soft">Durée prévue</dt>
                      <dd className="text-right font-semibold">{appliance.duration}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-hairline py-2">
                      <dt className="text-ink-soft">Secteur</dt>
                      <dd className="text-right font-semibold">{day.sector}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-2">
                      <dt className="text-ink-soft">Tarif annoncé</dt>
                      <dd className="text-right font-semibold text-rose-deep">
                        {appliance.price}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-sm border border-hairline bg-paper-soft p-4">
                  <p className="plate-label">Créneaux proposés</p>
                  <ul className="mt-3 space-y-2 text-sm text-ink">
                    {picked.map((id) => (
                      <li key={id} className="flex gap-2.5 border-b border-hairline pb-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-rose"
                        />
                        {id}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                    Aucun paiement en ligne, annulation libre jusqu’à 24 h avant le
                    passage, certificat conforme au décret n° 2023-641 remis le jour
                    même.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-hairline bg-cream-deep p-4 sm:p-5">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Ce parcours, avec vos tarifs et vos communes.
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Nous le réglons sur votre façon de travailler.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openRamonageModal}
                  className="press min-h-11 w-full shrink-0 cursor-pointer rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-rose sm:w-auto"
                >
                  Créer mon site ramoneur
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setPicked([]);
                  }}
                  className="cursor-pointer text-xs text-ink-faint transition-colors hover:text-ink"
                >
                  Recommencer le parcours
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </PanelFrame>

      <p className="caption mt-4">{copy.note}</p>
    </div>
  );
}
