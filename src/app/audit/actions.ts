"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { isBotSubmission, isRateLimited } from "@/lib/anti-spam";
import { notifyTeam, storeLead } from "@/lib/leads";

export type AuditFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const auditSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  email: z.email("Adresse e-mail invalide."),
  businessName: z.string().trim().min(1, "Indiquez le nom de votre boutique.").max(160),
  sector: z.enum(["fleuriste", "salon-de-coiffure", "autre-commerce", "mvp"], {
    error: "Choisissez votre activité.",
  }),
  websiteUrl: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  city: z.string().trim().min(1, "Indiquez votre ville.").max(120),
  objective: z.enum(
    ["etre-visible", "vendre-en-ligne", "refondre", "lancer-produit", "autre"],
    { error: "Choisissez votre objectif principal." },
  ),
  timeframe: z.enum(["des-que-possible", "trimestre", "cette-annee", "je-me-renseigne"], {
    error: "Indiquez votre échéance.",
  }),
  budget: z
    .string()
    .trim()
    .max(60)
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  message: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  consent: z.literal("on", {
    error: "Merci d'accepter le traitement de votre demande.",
  }),
});

export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Trop de demandes depuis votre connexion. Réessayez dans quelques minutes ou écrivez-nous directement par e-mail.",
    };
  }

  if (isBotSubmission(formData)) {
    // Réponse neutre : ne pas renseigner les robots.
    return { status: "success" };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = auditSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Certains champs demandent votre attention.",
      fieldErrors,
    };
  }

  const d = parsed.data;
  await storeLead({
    kind: "audit",
    name: d.name,
    email: d.email,
    businessName: d.businessName,
    sector: d.sector,
    websiteUrl: d.websiteUrl,
    city: d.city,
    objective: d.objective,
    timeframe: d.timeframe,
    budget: d.budget,
    message: d.message,
    source: {
      referrer: str(formData.get("src_referrer")),
      utmSource: str(formData.get("src_utm_source")),
      utmMedium: str(formData.get("src_utm_medium")),
      utmCampaign: str(formData.get("src_utm_campaign")),
      page: "/audit",
    },
  });
  await notifyTeam({
    kind: "audit",
    name: d.name,
    email: d.email,
    businessName: d.businessName,
    sector: d.sector,
    websiteUrl: d.websiteUrl,
    city: d.city,
    objective: d.objective,
    timeframe: d.timeframe,
    budget: d.budget,
    message: d.message,
    source: { page: "/audit" },
  });

  return { status: "success" };
}

function str(value: FormDataEntryValue | null): string | undefined {
  return typeof value === "string" && value !== "" ? value.slice(0, 300) : undefined;
}
