import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "The M3 Protocol — a different packet every day";

export default function Image() {
  return renderOgImage({
    eyebrow: "The Protocol",
    title: "A different packet every day. Zero thinking required.",
  });
}
