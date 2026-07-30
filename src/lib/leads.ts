import "server-only";

import { getDb } from "@/lib/firebase-admin";
import { site } from "@/lib/site";

export type LeadKind = "audit" | "contact";

export type Lead = {
  kind: LeadKind;
  name: string;
  email: string;
  businessName?: string;
  sector?: string;
  websiteUrl?: string;
  city?: string;
  objective?: string;
  timeframe?: string;
  budget?: string;
  message?: string;
  /** Contexte d'acquisition. */
  source: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    page?: string;
  };
};

/**
 * Enregistre un lead : Firestore quand configuré, sinon journal serveur.
 * Retourne true si le lead a été durablement enregistré.
 */
export async function storeLead(lead: Lead): Promise<boolean> {
  const db = getDb();
  const record = {
    ...lead,
    createdAt: new Date().toISOString(),
    status: "new" as const,
  };

  if (db) {
    try {
      await db.collection("leads").add(record);
      return true;
    } catch (error) {
      console.error("[leads] Écriture Firestore échouée :", error);
    }
  }

  // Repli explicite : visible dans les logs serveur, jamais silencieux.
  console.warn(
    "[leads] Firestore non configuré — lead journalisé uniquement :",
    JSON.stringify({ kind: record.kind, email: record.email, createdAt: record.createdAt }),
  );
  return false;
}

/**
 * Notification e-mail via Resend, si RESEND_API_KEY est configurée.
 * Clé lue uniquement côté serveur — jamais exposée au client.
 */
export async function notifyTeam(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !from) return;

  const lines = Object.entries({
    Type: lead.kind,
    Nom: lead.name,
    Email: lead.email,
    Boutique: lead.businessName,
    Secteur: lead.sector,
    "Site actuel": lead.websiteUrl,
    Ville: lead.city,
    Objectif: lead.objective,
    Échéance: lead.timeframe,
    Budget: lead.budget,
    Message: lead.message,
  })
    .filter(([, v]) => v)
    .map(([k, v]) => `${k} : ${v}`)
    .join("\n");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        subject: `[Bloomy Studio] Nouvelle demande ${lead.kind} — ${lead.name}`,
        text: lines,
      }),
    });
  } catch (error) {
    console.error("[leads] Notification e-mail échouée :", error);
  }
}
