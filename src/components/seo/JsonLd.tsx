import { serializeJsonLd } from "@/lib/schema";

type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Balise JSON-LD rendue côté serveur (jamais injectée en client). */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
