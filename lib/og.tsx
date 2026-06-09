import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Load the logo once and embed it as a data URL. If the file can't be read
// (e.g. tracing edge cases), fall back to a text wordmark so generation never
// fails.
async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public/m3tablogo.png"));
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  const logoSrc = await loadLogo();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #e68163 0%, #fffaeb 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} width={112} height={120} alt="M3" />
          ) : (
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#5a3420",
                letterSpacing: 2,
              }}
            >
              M3
            </div>
          )}
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 6,
                color: "#7a3a22",
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#1d1e1c",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer URL */}
        <div style={{ fontSize: 28, fontWeight: 600, color: "#5a3420" }}>
          maxmendmethod.com
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
