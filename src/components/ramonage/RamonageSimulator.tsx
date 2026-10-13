"use client";

import { useState } from "react";
import {
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";

import { openRamonageModal } from "@/components/forms/RamonageBookingModal";
import { buttonClass } from "@/components/ui/Button";
import { PanelFrame } from "@/components/visuals/DeviceFrame";
import { ramonageDemo, ramonagePage, type RamonageAppliance } from "@/lib/ramonage";

const copy = ramonagePage.booking;
const { appliances, days, slots, minSlots, maxSlots } = ramonageDemo;

const STEPS = ["Appareil", "Créneaux", "Récapitulatif"] as const;
type Step = 0 | 1 | 2;

/** Identifiant lisible d'un créneau : « Mardi 3 · 8 h à 10 h ». */
function slotId(dayLabel: string, slot: string) {
  return `${dayLabel} · ${slot}`;
}

/** Bouton d'action du parcours : le bouton primaire du système. */
const primary = `${buttonClass("primary")} cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bloom-strong`;

/** Lien d'action secondaire (retour, recommencer) : texte, cible de 44 px. */
const quiet =
  "press inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-1 text-sm font-semibold text-forest-soft transition-colors hover:text-forest";

/**
 * Parcours de réservation jouable, calqué sur le tunnel réel de
 * ramoplus.pages.dev (appareil, puis disponibilités, puis récapitulatif).
 *
 * Les durées et les tarifs viennent de la grille publiée par ce site : rien
 * n'est inventé ici, et la note à côté du panneau le dit. Pas d'émoji. Le
 * rose marque la sélection et l'action ; le vert, l'étape en cours ; tout le
 * reste tient au filet et à la typographie.
 *
 * Formes (verrou du système) : pilules pour ce qui se clique (étapes, jours,
 * créneaux, boutons), `rounded-2xl` pour les tuiles de choix (des champs de
 * formulaire), coins « feuille » pour les encarts du récapitulatif.
 *
 * Mobile (< 768 px) : tuiles d'appareil en une colonne, créneaux en 2 × 2,
 * encarts du récapitulatif empilés, boutons pleine largeur.
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
    <PanelFrame label={copy.panelLabel}>
      {/* Rail d'étapes : une vraie séquence, donc de vrais numéros. */}
      <nav aria-label="Étapes de la réservation" className="border-b border-line bg-white px-3 py-3 sm:px-6">
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {STEPS.map((label, index) => {
            const active = step === index;
            const done = step > index;
            // Le récapitulatif n'existe pas tant que le minimum de créneaux
            // n'est pas proposé : le rail ne doit pas y mener sur un dossier vide.
            const locked = index === 2 && !enough;
            return (
              <li key={label} className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setStep(index as Step)}
                  disabled={locked}
                  aria-current={active ? "step" : undefined}
                  className={`press inline-flex min-h-11 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[0.86rem] font-semibold transition-colors sm:pr-4 ${
                    active
                      ? "bg-forest text-paper"
                      : locked
                        ? "cursor-not-allowed text-forest-faint opacity-60"
                        : "cursor-pointer text-forest hover:bg-mint"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-7 place-items-center rounded-full text-[0.78rem] tabular-nums ${
                      active
                        ? "bg-paper text-forest"
                        : done
                          ? "bg-mint text-forest"
                          : "border border-line-strong text-forest-soft"
                    }`}
                  >
                    {done ? <Check weight="bold" className="size-3.5" /> : index + 1}
                  </span>
                  {label}
                </button>
                {index < STEPS.length - 1 ? (
                  <span aria-hidden="true" className="hidden h-px w-6 bg-line-strong sm:block" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="bg-paper p-5 sm:p-8">
        {/* Étape 1 : l'appareil */}
        {step === 0 ? (
          <div>
            <h3 className="text-display-sm">Quel appareil devons‑nous ramoner ?</h3>
            <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-forest-soft">
              Le client choisit son équipement. La durée d’intervention et le
              tarif s’affichent avant même la prise de rendez-vous.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {appliances.map((item) => {
                const selected = appliance.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAppliance(item)}
                    aria-pressed={selected}
                    className={`press relative flex cursor-pointer flex-col rounded-2xl border bg-white p-4 text-left transition-[border-color,box-shadow] ${
                      selected
                        ? "border-bloom-strong shadow-[inset_0_0_0_1px_var(--color-bloom-strong)]"
                        : "border-line hover:border-forest/30"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="plate-label">{item.fuel}</span>
                      <CheckCircle
                        aria-hidden="true"
                        weight="fill"
                        className={`size-5 shrink-0 transition-opacity ${
                          selected ? "text-bloom-strong opacity-100" : "opacity-0"
                        }`}
                      />
                    </span>
                    <span className="mt-1.5 block font-display text-[1.05rem] font-semibold leading-snug text-forest">
                      {item.name}
                    </span>
                    <span className="mt-1 block flex-1 text-[0.83rem] leading-relaxed text-forest-soft">
                      {item.desc}
                    </span>
                    <span className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[0.83rem] text-forest-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="size-4" />
                        {item.duration}
                      </span>
                      <span className="font-semibold text-forest">{item.price}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex justify-end">
              <button type="button" onClick={() => setStep(1)} className={`${primary} w-full sm:w-auto`}>
                Choisir mes créneaux
                <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Étape 2 : les disponibilités, groupées par secteur */}
        {step === 1 ? (
          <div>
            <h3 className="text-display-sm">Quand pouvons‑nous passer ?</h3>
            <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-forest-soft">
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
                    className={`press min-h-11 cursor-pointer rounded-full border px-4 py-2 text-[0.92rem] font-semibold transition-colors ${
                      selected
                        ? "border-forest bg-forest text-paper"
                        : "border-line-strong bg-white text-forest hover:border-forest"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-[0.86rem] font-semibold text-forest">
              {day.sector}
              <span className="font-normal text-forest-faint">, créneaux de la tournée</span>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const id = slotId(day.label, slot);
                const selected = picked.includes(id);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleSlot(id)}
                    aria-pressed={selected}
                    className={`press inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[0.9rem] font-semibold tabular-nums transition-colors ${
                      selected
                        ? "border-bloom-strong bg-bloom-strong text-white"
                        : "border-line-strong bg-white text-forest hover:border-forest"
                    }`}
                  >
                    {selected ? <Check aria-hidden="true" weight="bold" className="size-3.5" /> : null}
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 border-t border-line pt-5">
              <p className="plate-label" aria-live="polite">
                {picked.length} / {maxSlots} créneaux proposés
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {picked.length === 0 ? (
                  <li className="text-[0.92rem] text-forest-faint">
                    Sélectionnez au moins {minSlots} créneaux.
                  </li>
                ) : (
                  picked.map((id) => (
                    <li
                      key={id}
                      className="rounded-full border border-line bg-white px-3 py-1 text-[0.82rem] text-forest"
                    >
                      {id}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setStep(0)} className={quiet}>
                <ArrowLeft aria-hidden="true" weight="bold" className="size-4" />
                Retour à l’appareil
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!enough}
                className={`${primary} w-full sm:w-auto`}
              >
                Voir le récapitulatif
                <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Étape 3 : le dossier tel qu'il arrive chez l'artisan */}
        {step === 2 ? (
          <div>
            <h3 className="text-display-sm">La demande arrive complète.</h3>
            <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-forest-soft">
              Voilà ce que vous recevez, sans avoir décroché une seule fois.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="leaf-sm border border-line bg-white p-5">
                <p className="plate-label">Intervention</p>
                <dl className="mt-3 text-[0.92rem]">
                  <div className="flex justify-between gap-4 border-b border-line py-2.5">
                    <dt className="text-forest-soft">Appareil</dt>
                    <dd className="text-right font-semibold">{appliance.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line py-2.5">
                    <dt className="text-forest-soft">Durée prévue</dt>
                    <dd className="text-right font-semibold">{appliance.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line py-2.5">
                    <dt className="text-forest-soft">Secteur</dt>
                    <dd className="text-right font-semibold">{day.sector}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-forest-soft">Tarif annoncé</dt>
                    <dd className="text-right font-semibold text-bloom-ink">{appliance.price}</dd>
                  </div>
                </dl>
              </div>

              <div className="leaf-sm border border-line bg-white p-5">
                <p className="plate-label">Créneaux proposés</p>
                <ul className="mt-3 text-[0.92rem] text-forest">
                  {picked.map((id) => (
                    <li key={id} className="flex items-center gap-2.5 border-b border-line py-2.5">
                      <Check aria-hidden="true" weight="bold" className="size-4 shrink-0 text-bloom-ink" />
                      {id}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.8rem] leading-relaxed text-forest-soft">
                  Aucun paiement en ligne, annulation libre jusqu’à 24 h avant le
                  passage, certificat conforme au décret n° 2023-641 remis le jour
                  même.
                </p>
              </div>
            </div>

            <div className="leaf-sm mt-3 flex flex-col gap-4 bg-mint p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-display text-[1.05rem] font-semibold text-forest">
                  Ce parcours, avec vos tarifs et vos communes.
                </p>
                <p className="mt-1 text-[0.88rem] text-forest-soft">
                  Nous le réglons sur votre façon de travailler.
                </p>
              </div>
              <button type="button" onClick={openRamonageModal} className={`${primary} w-full shrink-0 sm:w-auto`}>
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
                className={quiet}
              >
                <ArrowCounterClockwise aria-hidden="true" weight="bold" className="size-4" />
                Recommencer le parcours
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </PanelFrame>
  );
}
