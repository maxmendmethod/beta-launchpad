import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource/arimo/400.css";
import "@fontsource/arimo/700.css";
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
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon-512x512.png`,
    width: 512,
    height: 512,
  },
  description: DEFAULT_DESCRIPTION,
  sameAs: ["https://www.instagram.com/maxmendmethod/"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const siteNavLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Site Navigation",
  itemListElement: [
    {
      "@type": "SiteLinksSearchBox",
    },
    {
      "@type": "ListItem",
      position: 1,
      name: "About",
      url: `${SITE_URL}/about`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Science",
      url: `${SITE_URL}/science`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Become a Founding Member",
      url: `${SITE_URL}/signup`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
