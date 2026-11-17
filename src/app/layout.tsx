import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";

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
 * Titres. Fonte variable : les axes `opsz` et `wdth` permettent de serrer les
 * très grands titres (largeur 84) et d'ouvrir les petits (largeur 98) sans
 * charger plusieurs fichiers.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

/** Corps de texte et libellés. */
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Bloomy Digital Studio | Agence de développement web à Nantes",
    template: "%s | Bloomy Digital Studio",
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

export const viewport: Viewport = {
  themeColor: "#fcfbf9",
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
    <html
      lang="fr"
      className={`${bricolage.variable} ${geist.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Marque le document comme « JavaScript disponible », avant la première
          peinture. C'est ce drapeau qui autorise l'état initial masqué des
          révélations au défilement : sans JS, le contenu est simplement là,
          visible et immobile, jamais un texte bloqué à opacity 0.
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
