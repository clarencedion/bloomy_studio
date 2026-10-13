"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ArrowLeft, ArrowRight, CaretDown, Check } from "@phosphor-icons/react";

import { submitAudit, type AuditFormState } from "@/app/audit/actions";
import {
  FieldError,
  FieldHint,
  FieldLabel,
  FormAlert,
  choiceClass,
  fieldClass,
  radioClass,
} from "@/components/studio/form-ui";
import { buttonClass } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const initialState: AuditFormState = { status: "idle" };

const steps = ["Vos coordonnées", "Votre activité", "Votre objectif"] as const;

const sectors: [string, string][] = [
  ["fleuriste", "Fleuriste"],
  ["salon-de-coiffure", "Salon de coiffure"],
  ["autre-commerce", "Autre commerce local"],
  ["mvp", "Projet d'application ou MVP"],
];

const objectives: [string, string][] = [
  ["etre-visible", "Être plus visible sur Google et Google Maps"],
  ["vendre-en-ligne", "Vendre en ligne (livraison, click-and-collect)"],
  ["refondre", "Refondre un site qui ne me ressemble plus"],
  ["lancer-produit", "Lancer une application ou un produit digital"],
  ["autre", "Autre chose (je précise en dessous)"],
];

/** Liste déroulante aux couleurs des champs, avec un chevron Phosphor. */
const selectClass = `${fieldClass} appearance-none pr-11`;

function Chevron() {
  return (
    <CaretDown
      aria-hidden="true"
      weight="bold"
      className="pointer-events-none absolute bottom-[1.15rem] right-4 size-4 text-forest-soft"
    />
  );
}

/** `aria-describedby` sans référence vers un élément absent du DOM. */
function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}

/**
 * Diagnostic gratuit en trois étapes. Chaque étape reste montée (`hidden`)
 * pour conserver les valeurs saisies ; la progression est annoncée par le
 * titre d'étape, qui reçoit le focus à chaque changement.
 */
export function AuditForm() {
  const [state, formAction, pending] = useActionState(submitAudit, initialState);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Renseigne referrer + UTM en écrivant directement dans le DOM des champs
  // cachés (synchronisation avec un système externe, pas de setState ici).
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
    if (state.status === "success") {
      track("audit_submit");
      successRef.current?.focus();
    }
  }, [state.status]);

  // Après une erreur serveur, le focus va au premier champ à corriger (dans
  // l'étape où le formulaire vient d'être ramené).
  useEffect(() => {
    if (state.status !== "error") return;
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    (invalid ?? headingRef.current)?.focus();
  }, [state]);

  /*
   * Avec `action={fn}` seul, React vide les champs non contrôlés après
   * chaque envoi, y compris quand le serveur renvoie une erreur : le visiteur
   * perdait les trois étapes. On envoie donc nous-mêmes dans une transition,
   * ce qui garde les valeurs saisies. `action` reste en place pour l'envoi
   * sans JavaScript.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };

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
      <div role="status" className="py-4 sm:py-8">
        <span className="grid size-14 place-items-center rounded-full bg-bloom-strong text-white">
          <Check aria-hidden="true" weight="bold" className="size-7" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-display-lg mt-7 outline-none">
          Votre demande est bien arrivée
        </h2>
        <div className="mt-5 max-w-[48ch] space-y-3.5 text-[1.02rem] leading-relaxed text-forest-soft">
          <p>
            <strong className="font-semibold text-forest">Ce qui se passe maintenant&nbsp;:</strong>{" "}
            l&apos;un de nous deux (pas un robot) examine votre site, votre fiche
            Google et votre visibilité locale.
          </p>
          <p>
            Vous recevez sous <strong className="font-semibold text-forest">48&nbsp;h ouvrées</strong>{" "}
            une synthèse écrite avec des priorités concrètes, utilisable même si
            vous décidez de ne pas travailler avec nous.
          </p>
          <p className="prose-links text-[0.95rem]">
            En attendant, vous pouvez consulter{" "}
            <Link href="/methode">notre méthode</Link>{" "}
            ou{" "}
            <Link href="/realisations">nos réalisations</Link>.
          </p>
        </div>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onInput={onFirstInteraction}
      noValidate={false}
    >
      {/* Progression : trois segments, l'étape en cours en rose. */}
      <div>
        <p className="plate-label">
          Étape {step + 1} sur {steps.length}
        </p>
        <ol aria-label="Étapes du formulaire" className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} aria-current={current ? "step" : undefined}>
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-colors duration-300 ${
                    done ? "bg-forest" : current ? "bg-bloom-strong" : "bg-line"
                  }`}
                />
                <span
                  className={`mt-2.5 items-center gap-1.5 text-[0.84rem] font-medium max-sm:sr-only sm:flex ${
                    current ? "text-forest" : "text-forest-faint"
                  }`}
                >
                  {done ? (
                    <Check aria-hidden="true" weight="bold" className="size-3.5 text-forest" />
                  ) : null}
                  {label}
                  {done ? <span className="sr-only"> (terminée)</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-display-md mt-8 outline-none"
      >
        {steps[step]}
      </h2>

      {state.status === "error" && state.message ? (
        <div className="mt-5">
          <FormAlert message={state.message} />
        </div>
      ) : null}

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

      {/* Étape 1 : chaque étape reste montée (hidden) pour conserver les valeurs */}
      <div hidden={step !== 0} className="mt-7 space-y-6">
        <div>
          <FieldLabel htmlFor="name" required>
            Votre nom
          </FieldLabel>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={fieldClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy(errors.name && "err-name")}
          />
          <FieldError id="err-name" message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="email" required>
            Votre e-mail
          </FieldLabel>
          <FieldHint id="desc-email">
            Uniquement pour vous envoyer le diagnostic. Jamais de newsletter non
            demandée.
          </FieldHint>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("desc-email", errors.email && "err-email")}
          />
          <FieldError id="err-email" message={errors.email} />
        </div>
      </div>

      {/* Étape 2 */}
      <div hidden={step !== 1} className="mt-7 space-y-6">
        <div>
          <FieldLabel htmlFor="businessName" required>
            Le nom de votre boutique ou projet
          </FieldLabel>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required={step === 1}
            autoComplete="organization"
            className={fieldClass}
            aria-invalid={errors.businessName ? true : undefined}
            aria-describedby={describedBy(errors.businessName && "err-businessName")}
          />
          <FieldError id="err-businessName" message={errors.businessName} />
        </div>
        <fieldset>
          <legend className="text-[0.95rem] font-medium text-forest">
            Votre activité{" "}
            <span aria-hidden="true" className="text-bloom-ink">
              *
            </span>
          </legend>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
            {sectors.map(([value, label], i) => (
              <label key={value} className={choiceClass}>
                <input
                  type="radio"
                  name="sector"
                  value={value}
                  defaultChecked={i === 0}
                  className={radioClass}
                />
                {label}
              </label>
            ))}
          </div>
          <FieldError id="err-sector" message={errors.sector} />
        </fieldset>
        <div>
          <FieldLabel htmlFor="city" required>
            Votre ville
          </FieldLabel>
          <input
            id="city"
            name="city"
            type="text"
            required={step === 1}
            autoComplete="address-level2"
            className={fieldClass}
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={describedBy(errors.city && "err-city")}
          />
          <FieldError id="err-city" message={errors.city} />
        </div>
        <div>
          <FieldLabel htmlFor="websiteUrl" optional>
            Votre site actuel
          </FieldLabel>
          <FieldHint id="desc-websiteUrl">Laissez vide s&apos;il n&apos;existe pas encore.</FieldHint>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="www.votre-site.fr"
            className={fieldClass}
            aria-describedby="desc-websiteUrl"
          />
        </div>
      </div>

      {/* Étape 3 */}
      <div hidden={step !== 2} className="mt-7 space-y-6">
        <fieldset>
          <legend className="text-[0.95rem] font-medium text-forest">
            Votre objectif principal{" "}
            <span aria-hidden="true" className="text-bloom-ink">
              *
            </span>
          </legend>
          <div className="mt-2 grid gap-2.5">
            {objectives.map(([value, label], i) => (
              <label key={value} className={choiceClass}>
                <input
                  type="radio"
                  name="objective"
                  value={value}
                  defaultChecked={i === 0}
                  className={radioClass}
                />
                {label}
              </label>
            ))}
          </div>
          <FieldError id="err-objective" message={errors.objective} />
        </fieldset>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
          <div>
            <FieldLabel htmlFor="timeframe" required>
              Échéance souhaitée
            </FieldLabel>
            <div className="relative">
              <select
                id="timeframe"
                name="timeframe"
                className={selectClass}
                defaultValue="des-que-possible"
                aria-invalid={errors.timeframe ? true : undefined}
                aria-describedby={describedBy(errors.timeframe && "err-timeframe")}
              >
                <option value="des-que-possible">Dès que possible</option>
                <option value="trimestre">Dans les 3 mois</option>
                <option value="cette-annee">Cette année</option>
                <option value="je-me-renseigne">Je me renseigne pour l&apos;instant</option>
              </select>
              <Chevron />
            </div>
            <FieldError id="err-timeframe" message={errors.timeframe} />
          </div>
          <div>
            <FieldLabel htmlFor="budget" optional>
              Budget envisagé
            </FieldLabel>
            <div className="relative">
              <select id="budget" name="budget" className={selectClass} defaultValue="">
                <option value="">Je préfère en discuter</option>
                <option value="moins-3k">Moins de 3&nbsp;000&nbsp;€</option>
                <option value="3k-6k">De 3&nbsp;000 à 6&nbsp;000&nbsp;€</option>
                <option value="6k-12k">De 6&nbsp;000 à 12&nbsp;000&nbsp;€</option>
                <option value="plus-12k">Plus de 12&nbsp;000&nbsp;€</option>
              </select>
              <Chevron />
            </div>
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="message" optional>
            Un mot sur votre situation
          </FieldLabel>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Ce qui vous amène, ce qui vous freine, ce que vous aimeriez obtenir…"
            className={`${fieldClass} min-h-32 resize-y`}
          />
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3.5 text-[0.92rem] leading-relaxed text-forest-soft">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-bloom-strong"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy(errors.consent && "err-consent")}
            />
            <span>
              J&apos;accepte que Bloomy Studio utilise ces informations pour
              traiter ma demande de diagnostic. Elles ne servent à rien
              d&apos;autre (voir la{" "}
              <Link
                href="/politique-de-confidentialite"
                className="font-medium text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink"
              >
                politique de confidentialité
              </Link>
              ). <span aria-hidden="true" className="text-bloom-ink">*</span>
            </span>
          </label>
          <FieldError id="err-consent" message={errors.consent} />
        </div>
      </div>

      {/* Navigation entre étapes */}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className={buttonClass("secondary", "rounded-full! px-4! sm:px-5!")}
          >
            <ArrowLeft aria-hidden="true" weight="bold" className="size-4" />
            Retour
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
            className={buttonClass("primary", "rounded-full! px-5! sm:px-7!")}
          >
            Continuer <span className="arrow-nudge">→</span>
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={pending}
            className={buttonClass(
              "primary",
              "min-h-14 rounded-full! px-7 disabled:cursor-wait disabled:opacity-70 max-sm:w-full max-sm:whitespace-normal max-sm:text-center max-sm:leading-snug",
            )}
          >
            {pending ? "Envoi en cours…" : "Recevoir mon diagnostic gratuit"}
            {pending ? null : (
              <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
            )}
          </button>
        )}
      </div>
      <p className="mt-5 text-[0.82rem] leading-relaxed text-forest-faint">
        Les informations recueillies servent uniquement à établir votre
        diagnostic et à vous répondre. Elles ne sont ni revendues ni utilisées
        pour de la prospection automatisée. Vous disposez d&apos;un droit
        d&apos;accès, de rectification et de suppression (
        <Link
          href="/politique-de-confidentialite"
          className="underline underline-offset-4 hover:text-bloom-ink"
        >
          en savoir plus
        </Link>
        ).
      </p>
    </form>
  );
}
