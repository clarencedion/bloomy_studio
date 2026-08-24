import { BrowserFrame } from "@/components/visuals/DeviceFrame";
import { RamonageBookingTrigger } from "@/components/forms/RamonageBookingModal";

export function RamonageShowcasePreview() {
  return (
    <figure className="mx-auto max-w-4xl">
      <BrowserFrame label="exemple-ramonage.bloomy.one — Artisan Ramoneur & Fumisterie">
        <div className="bg-cream p-6 sm:p-10 text-ink">
          {/* Header simulé */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-sm bg-plum text-cream font-bold text-sm">
                RF
              </span>
              <div>
                <p className="font-bold text-sm sm:text-base text-ink leading-tight">
                  Ramonage du Bocage & Fumisterie
                </p>
                <p className="text-xs text-ink-faint">
                  Artisan certifié Qualibat & Costic · Intervention sous 48h
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sage-veil px-3 py-1 text-xs font-semibold text-sage-deep">
                <span className="size-2 rounded-full bg-sage-deep" />
                Tournées en cours
              </span>
              <span className="rounded-full bg-rose px-4 py-1.5 text-xs font-semibold text-cream">
                02 40 00 00 00
              </span>
            </div>
          </div>

          {/* Hero simulé du site ramoneur */}
          <div className="mt-8 grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rose">
                Ramonage certifié · Poêles, inserts, cheminées & chaudières
              </span>
              <h4 className="text-display-md text-ink">
                Votre ramonage annuel en toute sérénité.
              </h4>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Protection totale de votre intérieur, travail soigné sans suie,
                et délivrance immédiate de votre attestation pour votre assurance habitation.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {["Ramonage bois & granulés", "Débistrage rotatif", "Inspection caméra", "Test d'étanchéité"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-hairline bg-paper px-2.5 py-1 text-[0.75rem] font-medium text-ink-soft"
                    >
                      ✓ {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Carte de simulation rapide */}
            <div className="md:col-span-5 rounded-sm border border-hairline bg-paper p-4 shadow-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">
                Prendre rendez-vous en ligne
              </p>
              <div className="space-y-2 text-xs">
                <div className="rounded-sm border border-hairline bg-cream-deep/60 p-2.5">
                  <span className="text-ink-faint block">1. Choisissez votre commune</span>
                  <span className="font-semibold text-ink">Ex. Clisson, Vallet, Vertou...</span>
                </div>
                <div className="rounded-sm border border-hairline bg-cream-deep/60 p-2.5">
                  <span className="text-ink-faint block">2. Type d&apos;appareil</span>
                  <span className="font-semibold text-ink">Poêle à bois bûches / Insert</span>
                </div>
                <div className="rounded-sm bg-rose-veil p-2.5 text-rose-deep font-medium">
                  Créneau proposé : Mardi 14h30 (Tournée groupée)
                </div>
              </div>
              <div className="pt-1">
                <span className="block w-full text-center rounded-full bg-rose py-2 text-xs font-semibold text-cream">
                  Confirmer le créneau
                </span>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      <figcaption className="mx-auto mt-4 max-w-xl text-center">
        <span className="caption block">
          Aperçu de structure d&apos;un site ramoneur spécialisé conçu par Bloomy Studio.
        </span>
        <div className="mt-3 flex justify-center">
          <RamonageBookingTrigger
            variant="outline"
            className="text-xs min-h-9 px-5 py-1.5"
          >
            Personnaliser ce modèle pour mon entreprise
          </RamonageBookingTrigger>
        </div>
      </figcaption>
    </figure>
  );
}
