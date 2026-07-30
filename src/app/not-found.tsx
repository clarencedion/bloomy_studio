import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-32">
      <Container width="narrow" className="text-center">
        <Image
          src="/photos/tige-coupee-square.webp"
          alt=""
          width={1200}
          height={1200}
          sizes="9rem"
          className="mx-auto mb-10 size-36 rounded-sm object-cover"
        />
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="text-display-xl mt-6">
          Cette page s&apos;est fanée — ou n&apos;a jamais existé.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          L&apos;adresse a peut-être changé. Voici les chemins les plus utiles
          pour reprendre votre visite.
        </p>
        <nav aria-label="Pages principales" className="mt-10">
          <ul className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {[
              ["Accueil", "/"],
              ["Pour les fleuristes", "/fleuristes"],
              ["Nos services", "/services"],
              ["Audit gratuit", "/audit"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-12 items-center rounded-full border border-ink/15 bg-paper px-6 py-3 font-semibold transition-colors hover:border-ink/40"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
