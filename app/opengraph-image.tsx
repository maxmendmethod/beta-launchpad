import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Max Mend Method — precision-timed daily supplements";

export default function Image() {
  return renderOgImage({
    eyebrow: "Max Mend Method",
    title: "Precision-timed supplements. Feel like yourself in 30 days.",
  });
}
