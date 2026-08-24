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

import {
  submitRamonageBooking,
  type RamonageFormState,
} from "@/app/ramonage/actions";
import { buttonClass, type ButtonVariant } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const initialState: RamonageFormState = { status: "idle" };

const inputClass =
  "mt-1.5 w-full rounded-sm border border-ink/25 bg-paper px-4 py-2.5 text-[0.96rem] placeholder:text-ink-faint focus:border-rose focus:ring-1 focus:ring-rose";

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
 * quelle autre — c'est cette identité-là qui se lit comme un site cohérent.
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
      {children ?? "Prendre rendez-vous / Échanger"}
    </button>
  );
}

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

  // Fermeture par la touche Echap ou clic sur le backdrop
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
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-none max-w-none items-center justify-center bg-plum/70 p-4 backdrop-blur-xs"
      aria-labelledby="ramonage-modal-title"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-sm border border-hairline bg-paper p-6 sm:p-8 shadow-float text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-cream-deep text-ink-soft hover:bg-rose-veil hover:text-rose transition-colors cursor-pointer"
        >
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {state.status === "success" ? (
          <div
            role="status"
            className="rounded-sm border border-sage-deep/30 bg-sage-veil p-6 sm:p-8 text-center"
          >
            <p className="text-display-md text-ink">Demande bien reçue 🔥</p>
            <p className="mt-3 leading-relaxed text-ink-soft text-sm sm:text-base">
              Merci pour votre message. Clarence ou Tom vous recontacte sous{" "}
              <strong className="text-ink font-semibold">24 h ouvrées</strong>{" "}
              pour faire le point sur votre activité et organiser un échange de 15 min.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={closeModal}
                className="min-h-11 rounded-full bg-rose px-6 py-2.5 font-semibold text-cream transition-colors hover:bg-rose-deep cursor-pointer"
              >
                Fermer cette fenêtre
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="pr-8">
              <span className="pill text-xs">Échange direct & devis</span>
              <h2
                id="ramonage-modal-title"
                className="text-display-md mt-2 text-ink"
              >
                Parlons de votre futur site
              </h2>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Remplissez ce formulaire pour planifier un rendez-vous téléphonique
                ou une démo personnalisée. C&apos;est gratuit, concret et sans engagement.
              </p>
            </div>

            <form
              ref={formRef}
              action={formAction}
              className="mt-6 space-y-4"
            >
              {state.status === "error" && state.message && (
                <div
                  role="alert"
                  className="rounded-sm border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error"
                >
                  {state.message}
                </div>
              )}

              {/* Honeypot anti-spam */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="ramonage-site-confirm">
                  Ne pas remplir ce champ
                </label>
                <input
                  type="text"
                  id="ramonage-site-confirm"
                  name="website_url_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input type="hidden" name="form_started_at" value={startedAt} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-name" className="text-sm font-medium text-ink">
                    Votre nom <span className="text-rose" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ramonage-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    placeholder="Marc Martin"
                    className={inputClass}
                  />
                  {state.fieldErrors?.name && (
                    <p className="mt-1 text-xs text-error font-medium">
                      {state.fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ramonage-business" className="text-sm font-medium text-ink">
                    Nom de votre entreprise <span className="text-rose" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ramonage-business"
                    name="businessName"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="organization"
                    placeholder="Martin Ramonage & Fumisterie"
                    className={inputClass}
                  />
                  {state.fieldErrors?.businessName && (
                    <p className="mt-1 text-xs text-error font-medium">
                      {state.fieldErrors.businessName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-phone" className="text-sm font-medium text-ink">
                    Téléphone <span className="text-rose" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ramonage-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="06 12 34 56 78"
                    className={inputClass}
                  />
                  {state.fieldErrors?.phone && (
                    <p className="mt-1 text-xs text-error font-medium">
                      {state.fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ramonage-email" className="text-sm font-medium text-ink">
                    Adresse e-mail <span className="text-rose" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ramonage-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="contact@martin-ramonage.fr"
                    className={inputClass}
                  />
                  {state.fieldErrors?.email && (
                    <p className="mt-1 text-xs text-error font-medium">
                      {state.fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ramonage-city" className="text-sm font-medium text-ink">
                    Zone / Commune d&apos;intervention <span className="text-rose" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ramonage-city"
                    name="city"
                    type="text"
                    required
                    placeholder="Ex. Nantes & 30 km autour"
                    className={inputClass}
                  />
                  {state.fieldErrors?.city && (
                    <p className="mt-1 text-xs text-error font-medium">
                      {state.fieldErrors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ramonage-timeframe" className="text-sm font-medium text-ink">
                    Échéance souhaitée
                  </label>
                  <select
                    id="ramonage-timeframe"
                    name="timeframe"
                    className={inputClass}
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
                <label htmlFor="ramonage-projectType" className="text-sm font-medium text-ink">
                  Votre besoin prioritaire <span className="text-rose" aria-hidden="true">*</span>
                </label>
                <select
                  id="ramonage-projectType"
                  name="projectType"
                  className={inputClass}
                  defaultValue="creation-site-rdv"
                >
                  <option value="creation-site-rdv">
                    Création d&apos;un nouveau site avec réservation en ligne
                  </option>
                  <option value="refonte-site">
                    Refonte d&apos;un site existant & modernisation
                  </option>
                  <option value="seo-google-maps">
                    Être 1er sur Google Maps & recherches locales
                  </option>
                  <option value="automatisation-relances-certificats">
                    Automatiser les relances annuelles et attestations
                  </option>
                  <option value="autre">Autre demande spécifique</option>
                </select>
                {state.fieldErrors?.projectType && (
                  <p className="mt-1 text-xs text-error font-medium">
                    {state.fieldErrors.projectType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ramonage-message" className="text-sm font-medium text-ink">
                  Précisions sur votre activité <span className="text-ink-faint text-xs">(facultatif)</span>
                </label>
                <textarea
                  id="ramonage-message"
                  name="message"
                  rows={3}
                  maxLength={2000}
                  placeholder="Nombre de techniciens, logiciel actuel, types d'appareils (bois, granulés, débistrage)..."
                  className={inputClass}
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 rounded accent-rose cursor-pointer"
                />
                <span>
                  J&apos;accepte que Bloomy Studio me recontacte pour répondre à ma
                  demande —{" "}
                  <Link
                    href="/politique-de-confidentialite"
                    target="_blank"
                    className="text-rose underline underline-offset-2"
                  >
                    politique de confidentialité
                  </Link>
                  . <span className="text-rose" aria-hidden="true">*</span>
                </span>
              </label>
              {state.fieldErrors?.consent && (
                <p className="text-xs text-error font-medium">
                  {state.fieldErrors.consent}
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full sm:w-auto min-h-12 flex-1 rounded-full bg-rose px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {pending ? "Envoi en cours…" : "Demander mon rendez-vous d'échange"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto min-h-12 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink-soft hover:bg-cream-deep transition-colors cursor-pointer"
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
