"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { isBotSubmission, isRateLimited } from "@/lib/anti-spam";
import { notifyTeam, storeLead } from "@/lib/leads";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  email: z.email("Adresse e-mail invalide."),
  message: z
    .string()
    .trim()
    .min(10, "Dites-nous en un peu plus (au moins quelques mots).")
    .max(4000),
  consent: z.literal("on", {
    error: "Merci d'accepter le traitement de votre demande.",
  }),
});

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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

  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
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
    message: d.message,
    source: { page: "/contact" },
  };
  await storeLead(lead);
  await notifyTeam(lead);

  return { status: "success" };
}
