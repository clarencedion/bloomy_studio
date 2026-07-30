import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Bloomy Studio — le studio digital qui fait fleurir les fleuristes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image Open Graph générée depuis le système visuel (crème, encre, lilas). */
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
          background: "#FFF9F2",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#F6EEF6" />
            <g fill="none" stroke="#7A4E7A" strokeWidth="5" strokeLinecap="round">
              <path d="M32 14v36" />
              <path d="M17 23l30 18" />
              <path d="M47 23L17 41" />
            </g>
            <circle cx="32" cy="32" r="7" fill="#97C485" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, color: "#23202A" }}>
            Bloomy{" "}
            <span style={{ color: "#8A2145", marginLeft: 12 }}>
              Studio
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.1,
            color: "#23202A",
            maxWidth: 980,
          }}
        >
          Le studio digital qui fait fleurir les fleuristes.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#5C5563",
            borderTop: "2px solid #E8DFD3",
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
