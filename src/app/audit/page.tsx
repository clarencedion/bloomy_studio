import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { Browser, MagnifyingGlass, MapPinArea, UsersThree } from "@phosphor-icons/react/dist/ssr";

import { AuditForm } from "@/components/forms/AuditForm";
import { FormStage } from "@/components/studio/FormStage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Audit gratuit : votre site et votre visibilité locale",
  description:
    "Demandez votre diagnostic gratuit : analyse humaine de votre site, votre fiche Google et votre visibilité locale, priorités concrètes sous 48 h.",
  path: "/audit",
});

/** Le périmètre du diagnostic, tel que décrit sur /methode (avant les jalons). */
const scope: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Browser,
    title: "Votre site",
    body: "Sur mobile comme sur ordinateur, du premier écran jusqu'à la prise de contact.",
  },
  {
    icon: MapPinArea,
    title: "Votre fiche Google",
    body: "Ce que voient ceux qui vous cherchent sur Google Maps.",
  },
  {
    icon: MagnifyingGlass,
    title: "Votre visibilité locale",
    body: "Où vous apparaissez quand on cherche votre métier près de chez vous.",
  },
  {
    icon: UsersThree,
    title: "Vos concurrents directs",
    body: "Ce qu'ils font mieux, et ce que vous faites déjà mieux qu'eux.",
  },
];

const promises = [
  {
    title: "Une analyse humaine",
    body: "Pas un score généré automatiquement\u00a0: l'un de nous deux regarde réellement votre site, votre fiche Google et vos concurrents locaux.",
  },
  {
    title: "Aucune obligation",
    body: "Le diagnostic vous appartient. Pas de démarchage téléphonique, pas de relances automatiques\u00a0: si vous voulez la suite, c'est vous qui revenez.",
  },
];

/**
 * Diagnostic gratuit : l'offre d'entrée des pages métier.
 *
 * Même grammaire que /contact (texte à gauche, formulaire posé sur un
 * panneau teinté à droite), mais en vert : c'est un examen, pas encore un
 * projet. Mobile : titre, formulaire, puis le périmètre et ce que l'on reçoit.
 */
export default function AuditPage() {
  return (
    <>
      <section>
        <Container width="wide" className="pb-20 pt-8 sm:pb-28 sm:pt-10">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Diagnostic gratuit", path: "/audit" },
            ]}
          />

          <div className="mt-10 grid gap-y-12 sm:mt-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-4">
              <Kicker ruled className="mb-7">
                Diagnostic gratuit
              </Kicker>
              <h1 className="text-display-xl">
                Où en <span className="whitespace-nowrap">êtes-vous</span>{" "}
                <span className="whitespace-nowrap">en ligne&nbsp;?</span>
              </h1>
              <p className="lede mt-6 max-w-[34rem]">
                Cinq minutes de formulaire. Sous 48&nbsp;h ouvrées, une analyse
                humaine de votre site et de votre visibilité locale.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <FormStage tone="mint">
                <AuditForm />
              </FormStage>
            </div>

            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <h2 className="text-display-md">Ce que nous regardons</h2>
              <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {scope.map(({ icon: ScopeIcon, title, body }) => (
                  <li key={title}>
                    <span className="grid size-11 place-items-center rounded-full border border-line-strong bg-white text-forest">
                      <ScopeIcon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="text-display-sm mt-4">{title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-forest-soft">
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container width="wide">
          <h2 className="text-display-lg max-w-2xl">Ce que vous recevez</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <article className="leaf-lg flex h-full flex-col justify-between gap-12 bg-blush p-8 sm:p-12">
                <div>
                  <p className="font-display text-[clamp(4.5rem,3rem+6vw,8.5rem)] font-bold leading-[0.85] tracking-[-0.03em] text-bloom-ink [font-variation-settings:'wdth'_84]">
                    3 à 5
                  </p>
                  <h3 className="text-display-md mt-6 max-w-md">
                    Des priorités, pas un catalogue
                  </h3>
                </div>
                <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-forest-soft">
                  Trois à cinq actions classées par impact, dans une synthèse
                  écrite. Certaines se font vous-même, gratuitement&nbsp;: nous vous
                  le disons.
                </p>
              </article>
            </Reveal>

            <div className="flex flex-col lg:col-span-5">
              {promises.map((p, i) => (
                <Reveal key={p.title} delay={(i + 1) * 80}>
                  <article className="border-t border-line-strong py-8 first:pt-8">
                    <h3 className="text-display-sm">{p.title}</h3>
                    <p className="mt-3 text-[1.02rem] leading-relaxed text-forest-soft">{p.body}</p>
                  </article>
                </Reveal>
              ))}
              <p className="prose-links mt-auto border-t border-line-strong pt-8 text-[1.02rem] leading-relaxed text-forest-soft">
                Le diagnostic précède les quatre jalons de{" "}
                <Link href="/methode">notre méthode</Link>. Vous décidez de la
                suite en connaissance de cause.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        placement="audit_footer"
        title={"Vous savez déjà ce qu'il vous faut\u00a0?"}
        lede={
          "Passez directement au projet\u00a0: décrivez-nous où vous en êtes, nous répondons sous 48 h ouvrées."
        }
      />
    </>
  );
}
