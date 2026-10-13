import type { ReactNode } from "react";
import { WarningCircle } from "@phosphor-icons/react";

/**
 * Primitives des formulaires du studio (contact, diagnostic).
 *
 * Règles taste-skill appliquées : libellé au-dessus du champ, aide sous le
 * libellé, erreur sous le champ, jamais de placeholder qui sert de libellé.
 * Champs en `rounded-2xl` (verrou de forme du système), fond blanc, filet
 * appuyé, focus rose d'action.
 *
 * Le `!` sur le rayon : la règle globale `:focus-visible` (hors couche) pose
 * un rayon de 4 px sur l'élément focalisé, qui écraserait le `rounded-2xl`
 * d'un champ dès qu'on clique dedans.
 */

export const fieldClass =
  "mt-2 block w-full rounded-2xl! border border-line-strong bg-white px-4 py-3.5 text-base text-forest transition-[border-color,box-shadow] duration-150 placeholder:text-forest-faint hover:border-forest/40 focus:border-bloom-ink focus:shadow-[0_0_0_4px_rgb(240_66_132/0.12)] aria-[invalid=true]:border-error";

/** Carte de choix (bouton radio) : la carte entière est la cible tactile. */
export const choiceClass =
  "flex min-h-13 cursor-pointer items-center gap-3 rounded-2xl border border-line-strong bg-white px-4 py-3 text-[0.98rem] text-forest transition-[border-color,box-shadow] duration-150 hover:border-forest/40 has-checked:border-bloom-ink has-checked:shadow-[inset_0_0_0_1px_var(--color-bloom-ink)] has-[:focus-visible]:border-bloom-ink";

export const radioClass = "size-[1.15rem] shrink-0 accent-bloom-strong";

export function FieldLabel({
  htmlFor,
  children,
  required = false,
  optional = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-[0.95rem] font-medium text-forest">
      {children}
      {required ? (
        <>
          {" "}
          <span aria-hidden="true" className="text-bloom-ink">
            *
          </span>
        </>
      ) : null}
      {optional ? <span className="font-normal text-forest-faint"> (facultatif)</span> : null}
    </label>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.88rem] leading-relaxed text-forest-faint">
      {children}
    </p>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.9rem] font-medium text-error">
      <WarningCircle aria-hidden="true" weight="bold" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

/** Bandeau d'erreur général, en tête de formulaire. */
export function FormAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-error/25 bg-error/5 px-4 py-3.5 text-[0.95rem] font-medium text-error"
    >
      <WarningCircle aria-hidden="true" weight="bold" className="mt-0.5 size-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
