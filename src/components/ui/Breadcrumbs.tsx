import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; path: string };

/** Fil d'Ariane visible + BreadcrumbList JSON-LD correspondant. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className={`text-[0.85rem] text-forest-faint ${className}`}>
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className={`flex items-center gap-1.5 ${last ? "min-w-0 max-w-full" : ""}`}>
              {last ? (
                <span aria-current="page" className="truncate font-medium text-forest">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="underline-offset-4 transition-colors hover:text-bloom-ink hover:underline"
                  >
                    {item.name}
                  </Link>
                  <CaretRight aria-hidden="true" className="size-3 text-line-strong" weight="bold" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
