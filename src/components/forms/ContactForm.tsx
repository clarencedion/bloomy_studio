"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { track } from "@/lib/analytics";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "mt-1.5 w-full rounded-sm border border-ink/25 bg-paper px-4 py-3 text-[0.98rem] placeholder:text-ink-faint focus:border-rose";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    if (state.status === "success") track("contact_submit");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-sage-deep/30 bg-sage-veil p-8"
      >
        <p className="text-display-md">Message bien reçu 🌿</p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Nous vous répondons personnellement sous 48 h ouvrées. Si votre
          demande concerne votre site ou votre visibilité, le plus efficace
          reste{" "}
          <Link href="/audit" className="text-rose underline underline-offset-4">
            le diagnostic gratuit
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-sm border border-hairline bg-paper-soft p-6 sm:p-9">
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mb-5 rounded-sm border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error"
        >
          {state.message}
        </div>
      )}

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

      <div className="space-y-5">
        <div>
          <label htmlFor="c-name" className="font-medium">
            Votre nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={inputClass}
            aria-describedby="c-err-name"
          />
          {state.fieldErrors?.name && (
            <p id="c-err-name" className="mt-1.5 text-sm font-medium text-error">
              {state.fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-email" className="font-medium">
            Votre e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            aria-describedby="c-err-email"
          />
          {state.fieldErrors?.email && (
            <p id="c-err-email" className="mt-1.5 text-sm font-medium text-error">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-message" className="font-medium">
            Votre message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={4000}
            className={inputClass}
            aria-describedby="c-err-message"
          />
          {state.fieldErrors?.message && (
            <p id="c-err-message" className="mt-1.5 text-sm font-medium text-error">
              {state.fieldErrors.message}
            </p>
          )}
        </div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 size-4 accent-rose"
          />
          <span>
            J&apos;accepte que Bloomy Studio utilise ces informations pour
            répondre à mon message —{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-rose underline underline-offset-4"
            >
              politique de confidentialité
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <p className="text-sm font-medium text-error">{state.fieldErrors.consent}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-full bg-rose px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Envoyer mon message"}
        </button>
      </div>
    </form>
  );
}
