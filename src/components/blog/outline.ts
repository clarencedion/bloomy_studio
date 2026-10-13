import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type OutlineEntry = { id: string; label: string };

type WithChildren = { children?: ReactNode };

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Typographie française : espace insécable devant « : ; ? ! % » et à
 * l'intérieur des guillemets, et entre un nombre et son unité (« 48 h »,
 * « 8 min », « 25 € »). Évite qu'un deux-points ou une unité se retrouve
 * seul en début de ligne.
 */
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;?!»%])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (€|h|min|km|ans|jours|semaines|mois)(?![\p{L}])/gu, "$1\u00a0$2");
}

/**
 * Applique `frenchSpacing` à tout le texte d'un arbre JSX (corps d'article,
 * documents légaux), sans toucher aux éléments eux-mêmes. Rendu serveur.
 */
export function typeset(node: ReactNode): ReactNode {
  if (typeof node === "string") return frenchSpacing(node);
  if (Array.isArray(node)) {
    // `</strong>{" "}: suite` donne trois enfants : l'espace isolé devant un
    // signe double devient insécable.
    const items = Children.toArray(node);
    return items.map((item, i) => {
      const next = items[i + 1];
      if (item === " " && typeof next === "string" && /^[:;?!»%]/.test(next)) return "\u00a0";
      return typeset(item);
    });
  }
  if (isValidElement<WithChildren>(node) && node.props.children !== undefined) {
    return cloneElement(node, undefined, typeset(node.props.children));
  }
  return node;
}

/** Date ISO (AAAA-MM-JJ) en toutes lettres : « 24 juillet 2026 ». */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T12:00:00`));
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<WithChildren>(node)) return textOf(node.props.children);
  return "";
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Donne une ancre à chaque H2 du corps d'article et en tire le sommaire.
 *
 * Le corps vit dans `lib/blog.tsx` sous forme de fragment JSX : on parcourt
 * ses enfants directs côté serveur, sans toucher au contenu. Le sommaire
 * est donc présent dans le HTML, lisible sans JavaScript.
 */
export function outlineArticle(body: ReactNode): {
  content: ReactNode;
  outline: OutlineEntry[];
} {
  const outline: OutlineEntry[] = [];
  const seen = new Set<string>();
  const root =
    isValidElement<WithChildren>(body) && body.type === Fragment
      ? body.props.children
      : body;

  const content = Children.map(root, (raw) => {
    const child = typeset(raw);
    if (!isValidElement<WithChildren>(child) || child.type !== "h2") return child;
    const label = frenchSpacing(textOf(child.props.children).trim());
    let id = slugify(label) || "section";
    while (seen.has(id)) id = `${id}-suite`;
    seen.add(id);
    outline.push({ id, label });
    return cloneElement(child as ReactElement<{ id?: string }>, { id });
  });

  return { content, outline };
}
