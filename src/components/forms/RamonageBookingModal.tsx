"use client";

import Link from "next/link";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react";

import {
  submitRamonageBooking,
  type RamonageFormState,
} from "@/app/ramonage/actions";
import { buttonClass, type ButtonVariant } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const initialState: RamonageFormState = { status: "idle" };

/**
 * Champs du système : `rounded-2xl`, fond blanc, filet appuyé, anneau rose
 * au focus. Le texte d'exemple reste en `forest-faint` (5,0:1 sur blanc).
 */
const inputClass =
  "mt-2 block w-full rounded-2xl border border-line-strong bg-white px-4 py-3 text-[0.98rem] text-forest placeholder:text-forest-faint transition-[border-color,box-shadow] duration-150 hover:border-forest/40 focus:border-bloom-ink focus:outline-none focus:ring-2 focus:ring-bloom-ink/25";

const labelClass = "text-[0.9rem] font-semibold text-forest";

/** Astérisque des champs obligatoires, en rose lisible (bloom-ink). */
function Required() {
  return (
    <span className="text-bloom-ink" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] font-medium text-error">
      <WarningCircle aria-hidden="true" weight="bold" className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export const OPEN_RAMONAGE_MODAL_EVENT = "open-ramonage-modal";

/** Fonction utilitaire pour ouvrir la modale depuis n'importe quel bouton */
export function openRamonageModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_RAMONAGE_MODAL_EVENT));
  }
}

/**
 * Bouton déclencheur de la modale. Il emprunte les classes de `<Button>` :
 * un bouton de cette page doit être indiscernable d'un bouton de n'importe
 * quelle autre. C'est cette identité-là qui se lit comme un site cohérent.
 */
export function RamonageBookingTrigger({
  children,
  className = "",
  variant = "primary",
  ...props
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      onClick={openRamonageModal}
      className={`${buttonClass(variant, className)} cursor-pointer`}
      {...props}
    >
      {children ?? "Prendre rendez-vous"}
    </button>
  );
}

/**
 * Modale de prise de rendez-vous de la page ramoneur.
 *
 * Mise en forme du système « Tige & fleur » : voile vert profond, feuille
 * blanche aux coins « feuille », champs `rounded-2xl`, boutons en pilule.
 * Mobile (< 640 px) : une colonne de champs, boutons pleine largeur, la
 * feuille défile à l'intérieur de la fenêtre (92 dvh au plus).
 *
 * La logique (action serveur, champ piège, délai anti-robot de 3 s,
 * événements analytics) est inchangée.
 */
export function RamonageBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    submitRamonageBooking,
    initialState,
  );
  const [startedAt] = useState(() => Date.now());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    track("ramonage_modal_open");
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener(OPEN_RAMONAGE_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_RAMONAGE_MODAL_EVENT, handleOpen);
  }, [openModal]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (state.status === "success") {
      track("ramonage_submit");
    }
  }, [state.status]);

  // Fermeture par la touche Echap ou clic sur le voile
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[var(--z-modal)] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-forest-deep/65 p-3 backdrop-blur-sm sm:p-6"
      aria-labelledby="ramonage-modal-title"
      aria-modal="true"
    >
      <div
        className="leaf relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto bg-paper p-6 text-forest shadow-float sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
          className="press absolute right-4 top-4 grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-white text-forest transition-colors hover:border-forest hover:bg-forest hover:text-paper sm:right-6 sm:top-6"
        >
          <X aria-hidden="true" weight="bold" className="size-4" />
        </button>

        {state.status === "success" ? (
          <div role="status" className="py-6 pr-6 sm:py-10">
            <CheckCircle aria-hidden="true" weight="fill" className="size-12 text-bloom-strong" />
            <p className="text-display-md mt-6 text-forest">Demande bien reçue.</p>
            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-forest-soft">
              Merci pour votre message. Clarence ou Tom vous recontacte sous{" "}
              <strong className="font-semibold text-forest">24 h ouvrées</strong>{" "}
              pour faire le point sur votre activité et organiser un échange de 15 min.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={closeModal}
                className={`${buttonClass("secondary")} w-full cursor-pointer sm:w-auto`}
              >
                Fermer cette fenêtre
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="pr-14">
              <h2 id="ramonage-modal-title" className="text-display-md text-forest">
                Parlons de votre futur site
              </h2>
              <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-forest-soft">
                Remplissez ce formulaire pour planifier un rendez-vous
                téléphonique ou une démonstration. C&apos;est gratuit, concret et
                sans engagement.
              </p>
            </div>

            <form ref={formRef} action={formAction} className="mt-8 space-y-5">
              {state.status === "error" && state.message && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-[0.92rem] font-medium text-error"
                >
                  <WarningCircle aria-hidden="true" weight="bold" className="mt-0.5 size-5 shrink-0" />
                  {state.message}
                </div>
              )}

              {/* Champ piège anti-spam */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="ramonage-site-confirm">Ne pas remplir ce champ</label>
                <input
                  type="text"
                  id="ramonage-site-confirm"
                  name="website_url_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input type="hidden" name="form_started_at" value={startedAt} />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-name" className={labelClass}>
                    Votre nom <Required />
                  </label>
                  <input
                    id="ramonage-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    placeholder="Marc Martin"
                    aria-invalid={state.fieldErrors?.name ? true : undefined}
                    className={inputClass}
                  />
                  <FieldError message={state.fieldErrors?.name} />
                </div>

                <div>
                  <label htmlFor="ramonage-business" className={labelClass}>
                    Nom de votre entreprise <Required />
                  </label>
                  <input
                    id="ramonage-business"
                    name="businessName"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="organization"
                    placeholder="Martin Ramonage & Fumisterie"
                    aria-invalid={state.fieldErrors?.businessName ? true : undefined}
                    className={inputClass}
                  />
                  <FieldError message={state.fieldErrors?.businessName} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-phone" className={labelClass}>
                    Téléphone <Required />
                  </label>
                  <input
                    id="ramonage-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="06 12 34 56 78"
                    aria-invalid={state.fieldErrors?.phone ? true : undefined}
                    className={inputClass}
                  />
                  <FieldError message={state.fieldErrors?.phone} />
                </div>

                <div>
                  <label htmlFor="ramonage-email" className={labelClass}>
                    Adresse e-mail <Required />
                  </label>
                  <input
                    id="ramonage-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="contact@martin-ramonage.fr"
                    aria-invalid={state.fieldErrors?.email ? true : undefined}
                    className={inputClass}
                  />
                  <FieldError message={state.fieldErrors?.email} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-city" className={labelClass}>
                    Zone / Commune d&apos;intervention <Required />
                  </label>
                  <input
                    id="ramonage-city"
                    name="city"
                    type="text"
                    required
                    placeholder="Ex. Nantes et 30 km autour"
                    aria-invalid={state.fieldErrors?.city ? true : undefined}
                    className={inputClass}
                  />
                  <FieldError message={state.fieldErrors?.city} />
                </div>

                <div>
                  <label htmlFor="ramonage-timeframe" className={labelClass}>
                    Échéance souhaitée
                  </label>
                  <select
                    id="ramonage-timeframe"
                    name="timeframe"
                    className={`${inputClass} cursor-pointer`}
                    defaultValue="avant-saison"
                  >
                    <option value="avant-saison">Avant la saison de chauffe (automne)</option>
                    <option value="des-que-possible">Dès que possible</option>
                    <option value="dans-les-3-mois">Dans les 3 prochains mois</option>
                    <option value="simple-information">Je me renseigne</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ramonage-projectType" className={labelClass}>
                  Votre besoin prioritaire <Required />
                </label>
                <select
                  id="ramonage-projectType"
                  name="projectType"
                  className={`${inputClass} cursor-pointer`}
                  defaultValue="creation-site-rdv"
                >
                  <option value="creation-site-rdv">
                    Création d&apos;un nouveau site avec réservation en ligne
                  </option>
                  <option value="refonte-site">Refonte et modernisation d&apos;un site existant</option>
                  <option value="seo-google-maps">
                    Être mieux trouvé sur Google Maps et en recherche locale
                  </option>
                  <option value="automatisation-relances-certificats">
                    Automatiser les relances annuelles et les attestations
                  </option>
                  <option value="autre">Autre demande</option>
                </select>
                <FieldError message={state.fieldErrors?.projectType} />
              </div>

              <div>
                <label htmlFor="ramonage-message" className={labelClass}>
                  Précisions sur votre activité{" "}
                  <span className="font-normal text-forest-faint">(facultatif)</span>
                </label>
                <textarea
                  id="ramonage-message"
                  name="message"
                  rows={3}
                  maxLength={2000}
                  placeholder="Nombre de techniciens, logiciel actuel, types d'appareils (bois, granulés, débistrage)…"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-forest-soft">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-bloom-strong"
                  />
                  <span>
                    J&apos;accepte que Bloomy Studio me recontacte pour répondre à ma
                    demande (voir la{" "}
                    <Link
                      href="/politique-de-confidentialite"
                      target="_blank"
                      className="font-medium text-bloom-ink underline underline-offset-2"
                    >
                      politique de confidentialité
                    </Link>
                    ). <Required />
                  </span>
                </label>
                <FieldError message={state.fieldErrors?.consent} />
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={pending}
                  className={`${buttonClass("primary")} w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
                >
                  {pending ? "Envoi en cours…" : "Demander mon rendez-vous d'échange"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`${buttonClass("secondary")} w-full cursor-pointer sm:w-auto`}
                >
                  Annuler
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
