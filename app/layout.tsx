import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Libre_Baskerville } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  // Variable font: one file covers 400–900, so font-bold/extrabold/black render
  // crisply instead of being faux-synthesized — no extra network cost.
  display: "swap",
  variable: "--source-sans",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--libre-baskerville",
});

const SITE_URL = "https://www.maxmendmethod.com";
const SITE_NAME = "Max Mend Method";
const DEFAULT_DESCRIPTION =
  "Max Mend Method is a 30 day performance nutrition drink that follows a rotating science backed protocol optimized for absorption and nutrient interactions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Max Mend Method | Daily Precision Timed Supplement",
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
    title: "Max Mend Method | Daily Precision Timed Supplement",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@maxmendmethod",
    title: "Max Mend Method | Daily Precision Timed Supplement",
    description: DEFAULT_DESCRIPTION,
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
    <html lang="en" className={`${sourceSans.variable} ${libreBaskerville.variable}`}>
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-8HZL3B3CQK" />
      </body>
    </html>
  );
}
