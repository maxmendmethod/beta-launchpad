import type { MetadataRoute } from "next";

const SITE_URL = "https://www.maxmendmethod.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/science`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/signup`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
