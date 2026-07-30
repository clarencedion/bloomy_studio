import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Bloomy Studio — des sites qui vendent vos fleurs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image Open Graph, générée depuis le système visuel courant.
 *
 * Elle reprenait l'ancienne palette (crème jaune, lilas, vert vif) et du
 * Georgia — trois choses qui n'existent plus nulle part sur le site. Une image
 * de partage hors charte est le premier contact d'un prospect avec la marque :
 * elle doit être la marque.
 *
 * Pas de logo inventé : le mot-symbole est la seule identité vérifiée.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          padding: 72,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 38 }}>
          <span style={{ color: "#17161A", fontWeight: 700 }}>Bloomy</span>
          <span style={{ color: "#8A2145", marginLeft: 12, fontWeight: 700 }}>
            Studio
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 78,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#17161A",
            maxWidth: 1000,
            fontWeight: 700,
          }}
        >
          Des sites qui vendent
          <span style={{ color: "#8A2145", marginLeft: 20 }}>vos fleurs</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#55535C",
            borderTop: "1px solid #E4E1DB",
            paddingTop: 28,
          }}
        >
          <span>Sites · E-commerce · SEO local</span>
          <span>{site.city} → toute la France</span>
        </div>
      </div>
    ),
    size,
  );
}
