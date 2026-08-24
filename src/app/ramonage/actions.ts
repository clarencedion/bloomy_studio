"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { isBotSubmission, isRateLimited } from "@/lib/anti-spam";
import { notifyTeam, storeLead } from "@/lib/leads";

export type RamonageFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const ramonageSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z
    .string()
    .trim()
    .min(8, "Indiquez un numéro de téléphone pour vous joindre.")
    .max(25),
  businessName: z.string().trim().min(2, "Indiquez le nom de votre entreprise ou statut.").max(120),
  city: z.string().trim().min(2, "Précisez votre commune ou département d'intervention.").max(100),
  projectType: z
    .string()
    .trim()
    .min(1, "Sélectionnez votre besoin principal.")
    .max(100),
  timeframe: z.string().trim().max(100).optional(),
  message: z.string().trim().max(3000).optional(),
  consent: z.literal("on", {
    error: "Merci d'accepter le traitement de vos informations pour que nous puissions vous recontacter.",
  }),
});

export async function submitRamonageBooking(
  _prev: RamonageFormState,
  formData: FormData,
): Promise<RamonageFormState> {
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
    return { status: "success" };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = ramonageSchema.safeParse(raw);

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
  const lead = {
    kind: "contact" as const,
    name: d.name,
    email: d.email,
    businessName: d.businessName,
    sector: "ramonage",
    city: d.city,
    objective: d.projectType,
    timeframe: d.timeframe || "Non précisé",
    message: `[Demande RDV Ramoneur] Téléphone : ${d.phone} | Besoin : ${d.projectType}${d.message ? `\n\nMessage : ${d.message}` : ""}`,
    source: { page: "/ramonage" },
  };

  await storeLead(lead);
  await notifyTeam(lead);

  return { status: "success" };
}
