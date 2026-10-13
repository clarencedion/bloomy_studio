import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
import { Container } from "@/components/ui/Container";
import { EmailLink } from "@/components/ui/EmailLink";
import { footerNav, mainNav, site } from "@/lib/site";

/**
 * Les libellés à trait d'union (« e-commerce », « click-and-collect ») ne se
 * coupent jamais sur le trait : chaque mot composé reste insécable.
 */
function Label({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          {w.includes("-") ? <span className="whitespace-nowrap">{w}</span> : w}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

const linkClass =
  "text-paper/80 underline-offset-4 transition-colors hover:text-bloom-light hover:underline";

/**
 * Pied de page : la suite du grand aplat vert de la bande finale. Le logo
 * complet y apparaît en grand, sur fond sombre, une seule fois par page.
 */
export function Footer() {
  const produits = mainNav.find((e) => e.kind === "menu" && e.id === "produits");
  const secteurs = mainNav.find((e) => e.kind === "menu" && e.id === "secteurs");

  return (
    <footer className="on-forest bg-forest-deep">
      <Container width="wide" className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Bloomy Studio, accueil" className="inline-block">
              <Logo variant="lockup-dark" height={64} alt="Bloomy Digital Studio" />
            </Link>
            <p className="mt-7 max-w-xs text-[0.95rem] leading-relaxed text-paper/75">
              Agence de développement web à {site.city}. Sites, boutiques en
              ligne, MVP et micro SaaS, partout en France.
            </p>
            <p className="mt-5">
              <EmailLink className="font-semibold text-paper underline decoration-bloom-light/60 underline-offset-4 hover:decoration-bloom-light" />
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {produits && produits.kind === "menu" ? (
              <nav aria-label="Produits">
                <h2 className="plate-label">Produits</h2>
                <ul className="mt-5 space-y-3 text-[0.94rem]">
                  {produits.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        <Label text={item.label} />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className={linkClass}>
                      Toutes les offres
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : null}

            {secteurs && secteurs.kind === "menu" ? (
              <nav aria-label="Secteurs">
                <h2 className="plate-label">Secteurs</h2>
                <ul className="mt-5 space-y-3 text-[0.94rem]">
                  {secteurs.items
                    .filter((item) => item.href !== "/realisations")
                    .map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={linkClass}>
                          <Label text={item.label} />
                        </Link>
                      </li>
                    ))}
                  {footerNav.fleuristes.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        <Label text={item.label} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <nav aria-label="Le studio">
              <h2 className="plate-label">Le studio</h2>
              <ul className="mt-5 space-y-3 text-[0.94rem]">
                {footerNav.studio.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      <Label text={item.label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Informations légales">
              <h2 className="plate-label">Légal</h2>
              <ul className="mt-5 space-y-3 text-[0.94rem]">
                {footerNav.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      <Label text={item.label} />
                    </Link>
                  </li>
                ))}
                <li>
                  <ManageCookiesButton className={`${linkClass} text-left`} />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-7 text-[0.82rem] text-leaf sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p>
            Un studio de l&apos;équipe{" "}
            <a href={site.parent.url} className="text-paper/85 underline underline-offset-4 hover:text-bloom-light">
              bloomy.one
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
