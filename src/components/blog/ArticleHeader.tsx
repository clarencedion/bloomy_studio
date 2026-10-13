import type { ReactNode } from "react";
import {
  ArrowsClockwise,
  CalendarBlank,
  Clock,
  PenNib,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { formatDate, frenchSpacing } from "@/components/blog/outline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import type { BlogPost } from "@/lib/blog";

function Meta({ icon: IconCmp, label, children }: { icon: Icon; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <dt className="sr-only">{label}</dt>
      <IconCmp aria-hidden="true" weight="regular" className="size-[1.1rem] shrink-0 text-forest-faint" />
      <dd>{children}</dd>
    </div>
  );
}

/**
 * En-tête d'article : sujet, titre, chapô (la description de l'article), puis
 * une bande de métadonnées réelles tirées de `lib/blog.tsx`. Le panneau
 * menthe pose le titre sans image : un article de blog n'a pas besoin d'une
 * photo d'ambiance pour être lu.
 */
export function ArticleHeader({ post }: { post: BlogPost }) {
  const updated = post.dateModified !== post.datePublished;

  return (
    <header className="bg-mint">
      <Container className="pb-12 pt-8 sm:pb-16 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: frenchSpacing(post.title), path: `/blog/${post.slug}` },
          ]}
        />
        <div className="mt-12 max-w-4xl sm:mt-16">
          <Kicker ruled>{post.topic}</Kicker>
          <h1 className="text-display-xl mt-7">{frenchSpacing(post.title)}</h1>
          <p className="lede mt-7 max-w-2xl">{frenchSpacing(post.description)}</p>
        </div>

        {/*
          Métadonnées séparées du titre par un filet. Elles passent à la
          ligne sur mobile, une entrée entière à la fois.
        */}
        <dl className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-forest/15 pt-6 text-[0.92rem] text-forest-soft sm:gap-x-9">
          <Meta icon={PenNib} label="Auteur">
            {post.authorName}
          </Meta>
          <Meta icon={CalendarBlank} label="Publié le">
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          </Meta>
          {updated ? (
            <Meta icon={ArrowsClockwise} label="Mis à jour le">
              Mis à jour le{" "}
              <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
            </Meta>
          ) : null}
          <Meta icon={Clock} label="Temps de lecture">
            {post.readingMinutes}&nbsp;min de lecture
          </Meta>
        </dl>
      </Container>
    </header>
  );
}
