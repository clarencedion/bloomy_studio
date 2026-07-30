"use client";

import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

export function EmailLink({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={`mailto:${site.email}`}
      className={className}
      onClick={() => track("email_click")}
    >
      {children ?? site.email}
    </a>
  );
}
