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
import { ArrowRight, Check } from "@phosphor-icons/react";

import { submitContact, type ContactFormState } from "@/app/contact/actions";
import {
  FieldError,
  FieldHint,
  FieldLabel,
  FormAlert,
  fieldClass,
} from "@/components/studio/form-ui";
import { buttonClass } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

const firstNames = site.founders.map((f) => f.name.split(" ")[0]);

const initialState: ContactFormState = { status: "idle" };

/** `aria-describedby` sans référence vers un élément absent du DOM. */
function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}

/**
 * Formulaire de contact : la conversion principale du site (« Démarrer un
 * projet » y mène). Trois champs, pas un de plus : le cadrage viendra au
 * premier échange, pas dans un questionnaire.
 *
 * Validation native du navigateur (requis, longueurs, format d'e-mail), puis
 * validation serveur dont les erreurs s'affichent sous chaque champ.
 * Anti-spam : champ piège + horodatage (voir `lib/anti-spam.ts`).
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [startedAt] = useState(() => Date.now());
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      track("contact_submit");
      successRef.current?.focus();
    }
  }, [state.status]);

  // Après une erreur serveur, le focus va au premier champ à corriger.
  useEffect(() => {
    if (state.status !== "error") return;
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    invalid?.focus();
  }, [state]);

  /*
   * Avec `action={fn}` seul, React vide les champs non contrôlés après
   * chaque envoi, y compris quand le serveur renvoie une erreur : le visiteur
   * perdait son message. On envoie donc nous-mêmes dans une transition, ce
   * qui garde les valeurs saisies. `action` reste en place pour l'envoi sans
   * JavaScript.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="py-4 sm:py-8">
        <span className="grid size-14 place-items-center rounded-full bg-bloom-strong text-white">
          <Check aria-hidden="true" weight="bold" className="size-7" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-display-lg mt-7 outline-none">
          Message bien reçu
        </h2>
        <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-forest-soft">
          {firstNames[0]} ou {firstNames[1]}{" "}vous répond personnellement sous
          48&nbsp;h ouvrées, à l&apos;adresse que vous venez d&apos;indiquer.
        </p>
        <p className="prose-links mt-4 max-w-[46ch] leading-relaxed text-forest-soft">
          Votre demande concerne un site qui existe déjà ? Le{" "}
          <Link href="/audit">diagnostic gratuit</Link>{" "}
          nous donne une base concrète pour en parler.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit}>
      <h2 className="text-display-md">Votre projet en quelques lignes</h2>
      <p className="mt-2 text-[0.9rem] text-forest-faint">
        Les champs marqués d&apos;un <span className="text-bloom-ink">*</span>{" "}
        sont obligatoires.
      </p>

      {state.status === "error" && state.message ? (
        <div className="mt-6">
          <FormAlert message={state.message} />
        </div>
      ) : null}

      {/* Anti-spam : champ piège invisible + horodatage. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="c-website_url_confirm">
          Ne remplissez pas ce champ si vous êtes humain
        </label>
        <input
          type="text"
          id="c-website_url_confirm"
          name="website_url_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="form_started_at" value={startedAt} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-5">
        <div>
          <FieldLabel htmlFor="c-name" required>
            Votre nom
          </FieldLabel>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={fieldClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy(errors.name && "c-err-name")}
          />
          <FieldError id="c-err-name" message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="c-email" required>
            Votre e-mail
          </FieldLabel>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy(errors.email && "c-err-email")}
          />
          <FieldError id="c-err-email" message={errors.email} />
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel htmlFor="c-message" required>
          Votre message
        </FieldLabel>
        <FieldHint id="c-hint-message">
          Ce que vous faites, où vous en êtes, ce que vous aimeriez obtenir. Pas
          besoin de cahier des charges.
        </FieldHint>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={4000}
          className={`${fieldClass} min-h-40 resize-y`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("c-hint-message", errors.message && "c-err-message")}
        />
        <FieldError id="c-err-message" message={errors.message} />
      </div>

      <div className="mt-7">
        <label className="flex cursor-pointer items-start gap-3.5 text-[0.92rem] leading-relaxed text-forest-soft">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-bloom-strong"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy(errors.consent && "c-err-consent")}
          />
          <span>
            J&apos;accepte que Bloomy Studio utilise ces informations pour
            répondre à mon message (voir la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="font-medium text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink"
            >
              politique de confidentialité
            </Link>
            ). <span aria-hidden="true" className="text-bloom-ink">*</span>
          </span>
        </label>
        <FieldError id="c-err-consent" message={errors.consent} />
      </div>

      <div className="mt-9 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={buttonClass(
            "primary",
            "min-h-14 rounded-full! px-8 text-base disabled:cursor-wait disabled:opacity-70 max-sm:w-full",
          )}
        >
          {pending ? "Envoi en cours…" : "Envoyer mon message"}
          {pending ? null : (
            <ArrowRight aria-hidden="true" weight="bold" className="arrow-nudge size-4" />
          )}
        </button>
        <p className="text-[0.9rem] text-forest-faint max-sm:text-center">
          Vos informations servent uniquement à vous répondre.
        </p>
      </div>
    </form>
  );
}
