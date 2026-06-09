import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Why taking the same supplements every day isn't enough";

export default function Image() {
  return renderOgImage({
    eyebrow: "Article",
    title: "Why taking the same supplements every day isn't enough.",
  });
}
