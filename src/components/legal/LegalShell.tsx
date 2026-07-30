import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { hasLegalPlaceholders } from "@/lib/legal";

type Props = {
  title: string;
  path: string;
  updatedAt: string;
  children: ReactNode;
};

/** Gabarit des pages légales : bandeau « document de travail » tant que des placeholders subsistent. */
export function LegalShell({ title, path, updatedAt, children }: Props) {
  return (
    <section className="py-10 sm:py-16">
      <Container width="narrow">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: title, path },
          ]}
        />
        {/*
          Bandeau destiné au visiteur, pas à l'équipe : aucun chemin de fichier
          ni référence de dépôt ne doit fuiter sur une page publique — c'est le
          signal le plus sûr d'un site inachevé. La consigne interne vit dans
          `docs/content-checklist.md`, et la page passe en `noindex` tant que
          des champs manquent (voir `legalMetadata`).
        */}
        {hasLegalPlaceholders() && (
          <div
            role="note"
            className="mt-8 rounded-sm border border-error/40 bg-error/5 px-5 py-4 text-sm leading-relaxed"
          >
            <strong>Document en cours de finalisation.</strong> Certaines
            informations légales de la société sont en cours de publication.
            Pour toute question d&apos;ordre juridique ou contractuel dans
            l&apos;intervalle, écrivez-nous : la réponse vous sera faite par
            écrit.
          </div>
        )}
        <h1 className="text-display-lg mt-8">{title}</h1>
        <p className="mt-2 text-sm text-ink-faint">
          Dernière mise à jour : {updatedAt}
        </p>
        <div className="article mt-8">{children}</div>
      </Container>
    </section>
  );
}
