/**
 * Découpe une phrase en mots pour `.scroll-ink` : chaque mot passe du pâle au
 * plein en traversant l'écran (CSS `animation-timeline: view()`, amélioration
 * progressive). Sans support, ou avec `prefers-reduced-motion`, le texte est
 * simplement plein. Les espaces restent dans le flux : la phrase se lit et se
 * copie normalement.
 */
export function InkWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
