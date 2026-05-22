import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "./globals.css";

const SITE_URL = "https://www.maxmendmethod.com";
const SITE_NAME = "Max Mend Method";
const DEFAULT_DESCRIPTION =
  "Max Mend Method is a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Max Mend Method | Precision Timed Supplement",
    template: "%s | Max Mend Method",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Max Mend Method | Precision Timed Supplement",
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/m3tablogo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@maxmendmethod",
    title: "Max Mend Method | Precision Timed Supplement",
    description: DEFAULT_DESCRIPTION,
    images: ["/m3tablogo.png"],
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "M3",
  url: SITE_URL,
  logo: `${SITE_URL}/m3tablogo.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: ["https://www.instagram.com/maxmendmethod/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
