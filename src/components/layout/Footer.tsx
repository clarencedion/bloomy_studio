import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
import { EmailLink } from "@/components/ui/EmailLink";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-ink border-t border-hairline bg-ink text-cream">
      <Container width="wide" className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p
              className="text-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Bloomy <span className="text-rose">Studio</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Le studio digital de{" "}
              <a
                href={site.parent.url}
                className="underline underline-offset-4 hover:text-rose-veil"
              >
                Bloomy
              </a>
              . Sites, e-commerce et SEO local pour fleuristes — depuis{" "}
              {site.city}, partout en France.
            </p>
            <p className="mt-4 text-sm">
              <EmailLink className="underline underline-offset-4 hover:text-rose-veil" />
            </p>
          </div>

          <nav aria-label="Services fleuristes">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
              Fleuristes
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/fleuristes" className="hover:text-rose-veil hover:underline underline-offset-4">
                  Pourquoi un spécialiste
                </Link>
              </li>
              {footerNav.fleuristes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-rose-veil hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Le studio">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
              Le studio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-rose-veil hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
              Légal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-rose-veil hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <ManageCookiesButton className="hover:text-rose-veil hover:underline underline-offset-4" />
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-veil hover:underline underline-offset-4">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <hr className="mt-12 border-hairline-dark" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p>
            Un projet de l&apos;équipe{" "}
            <a
              href={site.parent.url}
              className="underline underline-offset-4 hover:text-rose-veil"
            >
              bloomy.one
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
