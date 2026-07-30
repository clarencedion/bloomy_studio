import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";
import { getShowcaseSite } from "@/lib/portfolio";

/**
 * Étude de cas — section 5 de la direction artistique.
 *
 * Une transformation racontée, pas un visuel de plus. La colonne visuelle est
 * `sticky` en desktop pendant que le texte défile : le lecteur garde le site
 * sous les yeux en lisant les décisions qui l'ont produit. Désactivé sous
 * 1024 px, où le texte et la capture alternent simplement.
 *
 * Tout ce qui est affirmé ici est visible sur la capture ou relève d'un
 * principe du studio explicitement présenté comme tel. Aucune métrique : rien
 * n'est mesuré ni autorisé à la publication à ce jour.
 */

const blocks: [string, string][] = [
  [
    "Ce que le site devait porter",
    "La boutique du quotidien, la location de décor, les mariages et le deuil. Quatre activités qui ne s'adressent ni au même client, ni au même moment.",
  ],
  [
    "Les décisions de conception",
    "Un chemin par activité plutôt qu'un catalogue unique : on commande un bouquet en quelques clics, on demande un devis d'événement par un parcours séparé. La palette caramel et crème vient de la boutique, et la photographie du fleuriste occupe le premier écran.",
  ],
  [
    "Ce qui reste entre les mains du fleuriste",
    "Le catalogue, les créneaux de retrait et les pages de saison se modifient sans nous. C'est un principe de conception du studio, appliqué à chaque projet — pas une option facturée en plus.",
  ],
];

export function CaseSpotlight() {
  const site = getShowcaseSite("monloup");
  if (!site) return null;

  return (
    <section className="border-y border-hairline bg-cream-deep py-16 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Eyebrow>Étude de cas</Eyebrow>
            <h2 className="text-display-lg mt-6">
              Monloup — quatre métiers, un seul site
            </h2>
            <p className="lede mt-5">
              Artisan fleuriste à Roanne. Le site devait vendre au comptoir comme
              à distance, sans que l&apos;un écrase l&apos;autre.
            </p>

            <dl className="mt-10 space-y-8">
              {blocks.map(([title, body]) => (
                <div key={title} className="border-t border-hairline pt-5">
                  <dt className="text-display-sm">{title}</dt>
                  <dd className="mt-2.5 leading-relaxed text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/realisations"
              className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3 font-semibold text-cream transition-colors hover:bg-rose"
            >
              Voir toutes les réalisations
            </Link>
          </div>

          <div className="lg:sticky lg:top-28">
            <BrowserFrame label={`${site.name} — ${site.city}`}>
              <Image
                src={site.image}
                alt={site.alt}
                width={site.width}
                height={site.height}
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="h-auto w-full"
              />
            </BrowserFrame>

            {site.mobile ? (
              <div className="mt-6 flex items-center gap-6">
                <div className="w-32 shrink-0">
                  <PhoneFrame>
                    <Image
                      src={site.mobile.image}
                      alt={site.mobile.alt}
                      width={site.mobile.width}
                      height={site.mobile.height}
                      sizes="8rem"
                      className="h-auto w-full"
                    />
                  </PhoneFrame>
                </div>
                <p className="caption max-w-xs">
                  La commande se termine au téléphone, dans la rue, à la sortie du
                  travail — c&apos;est là que le site est le plus utilisé.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
