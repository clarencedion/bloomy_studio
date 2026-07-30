"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

import { submitAudit, type AuditFormState } from "@/app/audit/actions";
import { track } from "@/lib/analytics";

const initialState: AuditFormState = { status: "idle" };

const steps = ["Vous", "Votre activité", "Votre objectif"] as const;

const inputClass =
  "mt-1.5 w-full rounded-sm border border-ink/25 bg-paper px-4 py-3 text-[0.98rem] placeholder:text-ink-faint focus:border-rose";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-error">
      {message}
    </p>
  );
}

export function AuditForm() {
  const [state, formAction, pending] = useActionState(submitAudit, initialState);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Renseigne referrer + UTM en écrivant directement dans le DOM des champs
  // cachés (synchronisation avec un système externe — pas de setState ici).
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const values: Record<string, string> = {
      src_referrer: document.referrer,
      src_utm_source: params.get("utm_source") ?? "",
      src_utm_medium: params.get("utm_medium") ?? "",
      src_utm_campaign: params.get("utm_campaign") ?? "",
    };
    for (const [name, value] of Object.entries(values)) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement) field.value = value;
    }
  }, []);

  useEffect(() => {
    if (state.status === "success") track("audit_submit");
  }, [state.status]);

  // Les erreurs serveur peuvent concerner n'importe quelle étape : on repère
  // la première étape fautive et on y retourne (ajustement pendant le rendu).
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.status === "error" && state.fieldErrors) {
      const stepFields: string[][] = [
        ["name", "email"],
        ["businessName", "sector", "city", "websiteUrl"],
        ["objective", "timeframe", "budget", "message", "consent"],
      ];
      const errorKeys = Object.keys(state.fieldErrors);
      const target = stepFields.findIndex((fields) =>
        fields.some((f) => errorKeys.includes(f)),
      );
      if (target >= 0) setStep(target);
    }
  }

  // Déclenché à la première saisie (onInput) plutôt qu'au focus : un
  // re-rendu pendant un clic rendait la case à cocher instable.
  const onFirstInteraction = () => {
    if (!started) {
      setStarted(true);
      track("audit_start");
    }
  };

  const goTo = (next: number) => {
    setStep(next);
    track("audit_step", { step: next + 1 });
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const validateStep = (): boolean => {
    const form = formRef.current;
    if (!form) return true;
    const fieldsByStep: string[][] = [
      ["name", "email"],
      ["businessName", "city"],
      [],
    ];
    for (const name of fieldsByStep[step] ?? []) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement && !field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  };

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-sage-deep/30 bg-sage-veil p-8 sm:p-10"
      >
        <p className="text-display-md">Votre demande est bien arrivée 🌿</p>
        <div className="mt-5 space-y-3 leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Ce qui se passe maintenant :</strong>{" "}
            un membre de l&apos;équipe — pas un robot — examine votre site, votre
            fiche Google et votre visibilité locale.
          </p>
          <p>
            Vous recevez sous <strong className="text-ink">48 h ouvrées</strong>{" "}
            une synthèse écrite avec des priorités concrètes, utilisable même si
            vous décidez de ne pas travailler avec nous.
          </p>
          <p className="text-sm">
            En attendant, vous pouvez consulter{" "}
            <Link href="/methode" className="text-rose underline underline-offset-4">
              notre méthode
            </Link>{" "}
            ou{" "}
            <Link href="/realisations" className="text-rose underline underline-offset-4">
              nos réalisations
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onInput={onFirstInteraction}
      noValidate={false}
      className="rounded-sm border border-hairline bg-paper-soft p-6 sm:p-9"
    >
      {/* Progression */}
      <ol className="flex gap-2" aria-label="Étapes du formulaire">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <span
              className={`block h-1 rounded-full ${
                i <= step ? "bg-rose" : "bg-hairline"
              }`}
              aria-hidden="true"
            />
            <span
              className={`mt-2 block text-xs font-semibold uppercase tracking-wider ${
                i === step ? "text-rose" : "text-ink-faint"
              }`}
            >
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-display-md mt-7 outline-none"
      >
        {steps[step]}
      </h2>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mt-4 rounded-sm border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error"
        >
          {state.message}
        </div>
      )}

      {/* Anti-spam : honeypot + horodatage + source */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url_confirm">
          Ne remplissez pas ce champ si vous êtes humain
        </label>
        <input
          type="text"
          id="website_url_confirm"
          name="website_url_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="form_started_at" value={startedAt} />
      <input type="hidden" name="src_referrer" defaultValue="" />
      <input type="hidden" name="src_utm_source" defaultValue="" />
      <input type="hidden" name="src_utm_medium" defaultValue="" />
      <input type="hidden" name="src_utm_campaign" defaultValue="" />

      {/* Étape 1 — chaque étape reste montée (hidden) pour conserver les valeurs */}
      <div hidden={step !== 0} className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="font-medium">
            Votre nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Marie Dupont"
            className={inputClass}
            aria-describedby="err-name"
          />
          <FieldError id="err-name" message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            Votre e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="marie@exemple.fr"
            className={inputClass}
            aria-describedby="err-email desc-email"
          />
          <p id="desc-email" className="mt-1.5 text-sm text-ink-faint">
            Uniquement pour vous envoyer le diagnostic. Jamais de newsletter non
            demandée.
          </p>
          <FieldError id="err-email" message={state.fieldErrors?.email} />
        </div>
      </div>

      {/* Étape 2 */}
      <div hidden={step !== 1} className="mt-6 space-y-5">
        <div>
          <label htmlFor="businessName" className="font-medium">
            Le nom de votre boutique ou projet <span aria-hidden="true">*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required={step === 1}
            autoComplete="organization"
            placeholder="Aux Fleurs de Marie"
            className={inputClass}
            aria-describedby="err-businessName"
          />
          <FieldError id="err-businessName" message={state.fieldErrors?.businessName} />
        </div>
        <fieldset>
          <legend className="font-medium">
            Votre activité <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {[
              ["fleuriste", "Fleuriste"],
              ["salon-de-coiffure", "Salon de coiffure"],
              ["autre-commerce", "Autre commerce local"],
              ["mvp", "Projet d'application / MVP"],
            ].map(([value, label], i) => (
              <label
                key={value}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-ink/20 px-4 py-2.5 has-checked:border-rose has-checked:bg-rose-veil/50"
              >
                <input
                  type="radio"
                  name="sector"
                  value={value}
                  defaultChecked={i === 0}
                  className="size-4 accent-rose"
                />
                {label}
              </label>
            ))}
          </div>
          <FieldError id="err-sector" message={state.fieldErrors?.sector} />
        </fieldset>
        <div>
          <label htmlFor="city" className="font-medium">
            Votre ville <span aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required={step === 1}
            autoComplete="address-level2"
            placeholder="Nantes"
            className={inputClass}
            aria-describedby="err-city"
          />
          <FieldError id="err-city" message={state.fieldErrors?.city} />
        </div>
        <div>
          <label htmlFor="websiteUrl" className="font-medium">
            Votre site actuel <span className="text-ink-faint">(facultatif)</span>
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="www.exemple.fr — ou laissez vide s'il n'existe pas"
            className={inputClass}
          />
        </div>
      </div>

      {/* Étape 3 */}
      <div hidden={step !== 2} className="mt-6 space-y-5">
        <fieldset>
          <legend className="font-medium">
            Votre objectif principal <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-2 grid gap-2">
            {[
              ["etre-visible", "Être plus visible sur Google et Google Maps"],
              ["vendre-en-ligne", "Vendre en ligne (livraison, click-and-collect)"],
              ["refondre", "Refondre un site qui ne me ressemble plus"],
              ["lancer-produit", "Lancer une application ou un produit digital"],
              ["autre", "Autre chose — je précise en dessous"],
            ].map(([value, label], i) => (
              <label
                key={value}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-ink/20 px-4 py-2.5 has-checked:border-rose has-checked:bg-rose-veil/50"
              >
                <input
                  type="radio"
                  name="objective"
                  value={value}
                  defaultChecked={i === 0}
                  className="size-4 accent-rose"
                />
                {label}
              </label>
            ))}
          </div>
          <FieldError id="err-objective" message={state.fieldErrors?.objective} />
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="timeframe" className="font-medium">
              Échéance souhaitée <span aria-hidden="true">*</span>
            </label>
            <select
              id="timeframe"
              name="timeframe"
              className={inputClass}
              defaultValue="des-que-possible"
              aria-describedby="err-timeframe"
            >
              <option value="des-que-possible">Dès que possible</option>
              <option value="trimestre">Dans les 3 mois</option>
              <option value="cette-annee">Cette année</option>
              <option value="je-me-renseigne">Je me renseigne pour l&apos;instant</option>
            </select>
            <FieldError id="err-timeframe" message={state.fieldErrors?.timeframe} />
          </div>
          <div>
            <label htmlFor="budget" className="font-medium">
              Budget envisagé <span className="text-ink-faint">(facultatif)</span>
            </label>
            <select id="budget" name="budget" className={inputClass} defaultValue="">
              <option value="">Je préfère en discuter</option>
              <option value="moins-3k">Moins de 3 000 €</option>
              <option value="3k-6k">3 000 — 6 000 €</option>
              <option value="6k-12k">6 000 — 12 000 €</option>
              <option value="plus-12k">Plus de 12 000 €</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="font-medium">
            Un mot sur votre situation <span className="text-ink-faint">(facultatif)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Ce qui vous amène, ce qui vous freine, ce dont vous rêvez pour votre boutique…"
            className={inputClass}
          />
        </div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 size-4 accent-rose"
            aria-describedby="err-consent"
          />
          <span>
            J&apos;accepte que Bloomy Studio utilise ces informations pour
            traiter ma demande de diagnostic. Elles ne servent à rien
            d&apos;autre — voir la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-rose underline underline-offset-4"
            >
              politique de confidentialité
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id="err-consent" message={state.fieldErrors?.consent} />
      </div>

      {/* Navigation entre étapes */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="min-h-12 rounded-sm border border-ink/25 px-5 py-3 font-semibold hover:border-rose hover:text-rose"
          >
            ← Retour
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        {step < steps.length - 1 ? (
          // key distincte : sans elle, React transforme ce bouton en
          // type="submit" pendant le clic de la dernière étape intermédiaire,
          // et le navigateur soumet le formulaire prématurément.
          <button
            key="next"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (validateStep()) goTo(step + 1);
            }}
            className="min-h-12 rounded-full bg-ink px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose"
          >
            Continuer →
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={pending}
            className="min-h-12 rounded-full bg-rose px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Envoi en cours…" : "Recevoir mon diagnostic gratuit"}
          </button>
        )}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        Les informations recueillies servent uniquement à établir votre
        diagnostic et à vous répondre. Elles ne sont ni revendues ni utilisées
        pour de la prospection automatisée. Vous disposez d&apos;un droit
        d&apos;accès, de rectification et de suppression —{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-4">
          en savoir plus
        </Link>
        .
      </p>
    </form>
  );
}
