"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

/** Événement case_study_view (soumis au consentement, comme tout le suivi). */
export function CaseStudyViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("case_study_view", { slug });
  }, [slug]);
  return null;
}
