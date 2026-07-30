import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Cal Sans n'est pas sur Google Fonts : le paquet Fontsource fournit les
// @font-face auto-hébergés, découpés par plage Unicode et en `display: swap`.
import "@fontsource/cal-sans";

import { CookieConsent } from "@/components/consent/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { metadataBase } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Corps de texte. L'axe `opsz` d'Inter v4 ajuste automatiquement le dessin
 * selon la taille — c'est ce qui garde les petits libellés lisibles.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Bloomy Studio — Sites & SEO local pour fleuristes",
    template: "%s | Bloomy Studio",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` : le script en tête pose `data-js` sur <html>
    // avant l'hydratation, ce que React signalerait sinon comme une divergence
    // serveur/client. La portée se limite à cet élément.
    <html lang="fr" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/*
          Marque le document comme « JavaScript disponible », avant la première
          peinture. C'est ce drapeau qui autorise l'état initial masqué des
          révélations au défilement : sans JS, le contenu est simplement là,
          visible et immobile — jamais un texte bloqué à opacity 0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.setAttribute("data-js","");',
          }}
        />
      </head>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <SkipLink />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
