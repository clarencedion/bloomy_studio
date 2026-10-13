import type { ReactNode } from "react";
import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";

import { typeset } from "@/components/blog/outline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { EmailLink } from "@/components/ui/EmailLink";
import { hasLegalPlaceholders } from "@/lib/legal";
import { footerNav } from "@/lib/site";

type Props = {
  title: string;
  path: string;
  updatedAt: string;
  children: ReactNode;
};

/**
 * Gabarit des pages légales.
 *
 * Desktop : le document en colonne de lecture (~68 caractères), et à gauche
 * une colonne collante qui relie les quatre documents et donne l'adresse
 * de contact. Mobile : le document d'abord, la navigation entre documents
 * ensuite, en pilules qui passent à la ligne.
 *
 * Tant que des champs légaux manquent, un encart prévient le visiteur et la
 * page reste en `noindex` (voir les métadonnées de chaque page).
 */
export function LegalShell({ title, path, updatedAt, children }: Props) {
  return (
    <section className="pb-20 pt-8 sm:pb-28 sm:pt-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: title, path },
          ]}
        />

        <div className="mt-12 grid gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-8 lg:col-start-5 lg:row-start-1">
            <h1 className="text-display-xl">{title}</h1>
            <p className="mt-5 text-[0.92rem] text-forest-faint">
              Dernière mise à jour&nbsp;: {updatedAt}
            </p>

            {/*
              Encart destiné au visiteur, pas à l'équipe : aucun chemin de
              fichier ni référence de dépôt ne doit fuiter sur une page
              publique. La consigne interne vit dans `docs/content-checklist.md`.
            */}
            {hasLegalPlaceholders() ? (
              <div
                role="note"
                className="leaf-sm mt-10 flex max-w-[36rem] gap-4 bg-blush px-5 py-5 text-[0.95rem] leading-relaxed text-forest sm:px-7"
              >
                <Info aria-hidden="true" weight="regular" className="mt-0.5 size-5 shrink-0 text-bloom-ink" />
                <p>
                  <strong className="font-semibold">Document en cours de finalisation.</strong>{" "}
                  Certaines informations légales de la société sont en cours de
                  publication. Pour toute question d&apos;ordre juridique ou
                  contractuel dans l&apos;intervalle, écrivez-nous&nbsp;: la réponse
                  vous sera faite par écrit.
                </p>
              </div>
            ) : null}

            <div className="article prose-links mt-12 max-w-[36rem]">{typeset(children)}</div>
          </div>

          <aside className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
            <div className="border-t border-line pt-8 lg:sticky lg:top-28 lg:border-t-0 lg:pt-3">
              <nav aria-label="Documents légaux">
                <p className="plate-label">Documents légaux</p>
                <ul className="mt-5 flex flex-wrap gap-2.5 lg:flex-col lg:gap-1">
                  {footerNav.legal.map((item) => {
                    const current = item.href === path;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? "page" : undefined}
                          className={`inline-flex min-h-11 items-center rounded-full px-4 text-[0.92rem] transition-colors lg:-ml-4 ${
                            current
                              ? "bg-mint font-semibold text-forest"
                              : "border border-line bg-white text-forest-soft hover:border-forest/30 hover:text-forest lg:border-transparent lg:bg-transparent"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <p className="mt-10 text-[0.92rem] leading-relaxed text-forest-soft">
                Une question sur vos données ou sur ces documents&nbsp;?
                <br />
                <EmailLink className="font-semibold text-bloom-ink underline decoration-bloom-ink/35 underline-offset-4 hover:decoration-bloom-ink" />
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
