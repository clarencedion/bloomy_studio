import { Kicker } from "@/components/ui/Kicker";

type Props = {
  children: string;
  as?: "p" | "span" | "div";
  className?: string;
};

/**
 * Ancien nom du libellé de section, conservé pour les pages pas encore
 * migrées. Rend désormais un `Kicker` à filets. Préférer `Kicker` dans le
 * code neuf.
 */
export function Eyebrow({ children, as = "p", className = "" }: Props) {
  return (
    <Kicker as={as} ruled className={className}>
      {children}
    </Kicker>
  );
}
