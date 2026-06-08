import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Max Mend Method LLC — how we collect, use, and protect your information.",
  alternates: { canonical: "https://www.maxmendmethod.com/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy Policy for Max Mend Method LLC — how we collect, use, and protect your information.",
    url: "https://www.maxmendmethod.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 pb-24">
        <h1 className="text-4xl mb-2 font-bodoni">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 4, 2026</p>
        <div className="space-y-10 text-sm leading-relaxed text-foreground">

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Overview</h2>
            <div className="space-y-3">
              <p>This Privacy Policy describes how Max Mend Method LLC ("we", "us", or "our") collects, uses, and shares information about you when you visit or make a purchase from maxmendmethod.com (the "Site").</p>
              <p>By using the Site, you agree to the collection and use of information in accordance with this policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 1 Information We Collect</h2>
            <div className="space-y-3">
              <p>When you visit the Site, we automatically collect certain information about your device, including your web browser, IP address, time zone, and cookies installed on your device. We also collect information about the pages you view, search terms that referred you to the Site, and how you interact with the Site. We refer to this as "Device Information."</p>
              <p>We collect Device Information using cookies, log files, and web beacons or pixels. Cookies are data files placed on your device that often include an anonymous unique identifier. Log files track actions on the Site and collect data including your IP address, browser type, and date and time stamps. Web beacons and pixels are electronic files used to record how you browse the Site.</p>
              <p>We use Google Analytics 4 to collect and analyze Device Information. Google Analytics uses cookies and similar technologies to track user interactions and may transmit data to Google servers. You can learn more about how Google uses data at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">policies.google.com/privacy</a>. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">Google Analytics Opt-out Browser Add-on</a>.</p>
              <p>We also use Vercel Analytics to collect anonymized page view and performance data. Vercel Analytics does not use cookies and does not collect personally identifiable information.</p>
              <p>When you make or attempt to make a purchase through the Site, we collect your name, billing address, shipping address, payment information, email address, and phone number. We refer to this as "Order Information."</p>
              <p>When you sign up through the Site, we collect your name and email address.</p>
              <p>"Personal Information" in this policy refers to both Device Information and Order Information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 2 How We Use Your Information</h2>
            <div className="space-y-3">
              <p>We use the Order Information we collect to fulfill orders placed through the Site, communicate with you about your order, screen orders for potential risk or fraud, and provide you with information about our products and services in accordance with your preferences.</p>
              <p>We use Device Information to help screen for potential risk and fraud and to improve and optimize the Site.</p>
              <p>We use sign-up information to send you product updates, announcements, and promotional content. You may unsubscribe at any time by clicking the unsubscribe link in any email we send.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 3 Sharing Your Information</h2>
            <div className="space-y-3">
              <p>We share your Personal Information with third parties to help us operate the Site and fulfill orders.</p>
              <p>Our store is hosted on Shopify Inc. Shopify uses your Personal Information to provide us with the e-commerce platform that allows us to sell our products to you. You can read more about how Shopify uses your Personal Information at <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">shopify.com/legal/privacy</a>.</p>
              <p>We use Google Analytics 4, a web analytics service provided by Google LLC. Google Analytics collects Device Information as described in Section 1 and processes it on Google's servers. Google's privacy policy is available at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">policies.google.com/privacy</a>.</p>
              <p>We use Vercel Inc. to host and serve the Site. Vercel may collect anonymized performance and infrastructure data. Vercel's privacy policy is available at <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">vercel.com/legal/privacy-policy</a>.</p>
              <p>We use MailerLite to manage our mailing list. When you sign up, your name and email address are transmitted to MailerLite's servers. MailerLite's privacy policy is available at <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">mailerlite.com/legal/privacy-policy</a>.</p>
              <p>We use third-party payment processors to handle transactions. Your payment information is transmitted directly to these processors and is not stored on our servers.</p>
              <p>We may share your information to comply with applicable laws and regulations, to respond to a lawful request for information, or to protect our rights.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 4 Behavioral Advertising</h2>
            <div className="space-y-3">
              <p>We may use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. You can opt out of targeted advertising by visiting the settings of the advertising platforms we use, or by visiting the Digital Advertising Alliance opt-out portal at https://optout.aboutads.info/.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 5 Do Not Track</h2>
            <div className="space-y-3">
              <p>We do not alter our data collection and use practices when we see a Do Not Track signal from your browser.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 6 Your Rights</h2>
            <div className="space-y-3">
              <p>If you are a resident of California, you have the right to access the Personal Information we hold about you and to ask that your Personal Information be corrected, updated, or deleted. To exercise this right, please contact us using the information in Section 9.</p>
              <p>If you are a resident of the European Economic Area, you have the right to access the Personal Information we hold about you and to ask that your Personal Information be corrected, updated, or deleted. To exercise this right, please contact us using the information in Section 9.</p>
              <p>You also have the right to complain to a data protection authority about our collection and use of your Personal Information. For more information, please contact your local data protection authority.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 7 Data Retention</h2>
            <div className="space-y-3">
              <p>When you place an order through the Site, we will keep your Order Information for our records unless you ask us to delete it.</p>
              <p>If you signed up for our mailing list, we will retain your information until you unsubscribe or request deletion.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 8 Children</h2>
            <div className="space-y-3">
              <p>This Site is not intended for individuals under the age of 18. We do not knowingly collect Personal Information from children. If you believe a child has provided us with Personal Information, please contact us and we will delete it.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 9 Changes to This Policy</h2>
            <div className="space-y-3">
              <p>We may update this Privacy Policy from time to time to reflect changes to our practices or for legal or regulatory reasons. We will post any changes on this page with an updated date.</p>
              <p>Your continued use of the Site after any changes constitutes your acceptance of the updated policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Section 10 Contact Us</h2>
            <div className="space-y-3">
              <p>For questions about this Privacy Policy or to exercise your data rights, please contact us:</p>
              <address className="not-italic space-y-1">
                <p>Max Mend Method LLC</p>
                <p><a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">maxmendmethod@gmail.com</a></p>
                <p>257 Northampton Street, Boston MA 02118</p>
                <p><a href="https://www.maxmendmethod.com" className="underline hover:text-brand">maxmendmethod.com</a></p>
              </address>
            </div>
          </section>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
