"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = {
  href: string;
  event: AnalyticsEvent;
  placement: string;
  children: ReactNode;
  className?: string;
};

/** Lien avec suivi d'événement (respecte le consentement — voir lib/analytics). */
export function CtaLink({ href, event, placement, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, { placement })}
    >
      {children}
    </Link>
  );
}
