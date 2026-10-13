import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  /*
   * Optimisation d'images explicitement activée. L'adaptateur Next.js de
   * Firebase App Hosting impose `images.unoptimized: true` tant que la
   * configuration ne dit rien : la production servait alors les captures en
   * taille réelle (780 × 1688 pour une vignette de 11 rem). Avec `false`
   * explicite, il laisse `/_next/image` redimensionner selon `sizes`.
   */
  images: {
    unoptimized: false,
  },

  /*
   * Ne jamais tracer `public/` dans le bundle autonome (`.next/standalone`).
   *
   * L'adaptateur App Hosting copie `public/` dans le bundle **seulement si le
   * dossier n'y existe pas déjà**. Or le traçage de fichiers de Next y dépose
   * tout fichier de `public/` lu sur le disque par du code serveur (l'image
   * Open Graph lit le logo de `public/brand/`) : le dossier existait alors
   * avec six SVG, l'adaptateur sautait la copie, et toutes les captures WebP
   * répondaient 404 en production (incident du 2026-10-03). Exclure `public/`
   * du traçage garantit que l'adaptateur copie toujours le dossier entier.
   */
  outputFileTracingExcludes: {
    "**": ["public/**/*"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
