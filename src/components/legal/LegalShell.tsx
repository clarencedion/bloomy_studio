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
        {hasLegalPlaceholders() && (
          <div
            role="note"
            className="mt-8 rounded-sm border border-error/40 bg-error/5 px-5 py-4 text-sm leading-relaxed"
          >
            <strong>Document de travail.</strong> Cette page contient des
            champs <strong>[À COMPLÉTER]</strong> et doit être finalisée puis
            validée par un professionnel du droit avant la mise en production
            publique. Voir <code>src/lib/legal.ts</code> et{" "}
            <code>docs/content-checklist.md</code>.
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
