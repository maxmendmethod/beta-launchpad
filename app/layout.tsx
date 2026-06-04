import type { Metadata, Viewport } from "next";
import { Arimo } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./globals.css";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--arimo",
});

const gliker = localFont({
  src: "../public/fonts/gliker-regular-expanded.woff2",
  display: "swap",
  variable: "--gliker",
});

const SITE_URL = "https://www.maxmendmethod.com";
const SITE_NAME = "Max Mend Method";
const DEFAULT_DESCRIPTION =
  "Max Mend Method is a 30 day performance nutrition drink that follows a rotating science backed protocol.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Max Mend Method | Precision Timed Supplement",
    template: "%s | Max Mend Method",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: {
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SOCIAL_PROFILES = [
  "https://www.instagram.com/maxmendmethod/",
  "https://www.facebook.com/maxmendmethod",
  "https://x.com/maxmendmethod",
  "https://www.linkedin.com/company/maxmendmethod",
];

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
  sameAs: SOCIAL_PROFILES,
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  name: SITE_NAME,
  alternateName: "M3",
  url: SITE_URL,
  image: `${SITE_URL}/m3tablogo.png`,
  logo: `${SITE_URL}/favicon-512x512.png`,
  description: DEFAULT_DESCRIPTION,
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  currenciesAccepted: "USD",
  priceRange: "$$",
  sameAs: SOCIAL_PROFILES,
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
    <html lang="en" className={`${arimo.variable} ${gliker.variable}`}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
