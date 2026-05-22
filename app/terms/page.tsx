import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Max Mend Method LLC — read our terms and conditions for using maxmendmethod.com.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service",
    description: "Terms of Service for Max Mend Method LLC — read our terms and conditions for using maxmendmethod.com.",
    url: "https://www.maxmendmethod.com/terms",
  },
};

const sections = [
  {
    heading: "Overview",
    body: (
      <>
        <p>
          This website is operated by Max Mend Method LLC. Throughout the site, the terms "we", "us" and "our" refer to
          Max Mend Method LLC. Max Mend Method LLC offers this website, including all information, tools, and Services
          available from this site to you, the user, conditioned upon your acceptance of all terms, conditions,
          policies, and notices stated here.
        </p>
        <p>
          By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound
          by the following Terms of Service ("Terms", "Terms of Service"), including additional terms, conditions, and
          policies referenced herein or available by hyperlink.
        </p>
        <p>
          These Terms of Service apply to all users of the site, including without limitation browsers, vendors,
          customers, merchants, and contributors of content.
        </p>
        <p>
          Please read these Terms of Service carefully before accessing or using our website. By accessing or using any
          part of the website, you agree to be bound by these Terms of Service. If you do not agree to all the terms
          and conditions of this agreement, then you may not access the website or use any Services.
        </p>
        <p>
          Any new features or tools added to the current store shall also be subject to these Terms of Service. We
          reserve the right to update, change, or replace any part of these Terms of Service by posting updates and
          changes to our website. Your continued use of the website following the posting of changes constitutes
          acceptance of those changes.
        </p>
      </>
    ),
  },
  {
    heading: "Section 1 — Online Store Terms",
    body: (
      <>
        <p>By agreeing to these Terms of Service, you represent that:</p>
        <ul>
          <li>You are at least the age of majority in your state or province of residence.</li>
          <li>You will not use our products for any illegal or unauthorized purpose.</li>
          <li>You will not violate any laws in your jurisdiction.</li>
          <li>You will not transmit worms, viruses, or destructive code.</li>
        </ul>
        <p>A breach or violation of any Terms may result in immediate termination of your access to the Service.</p>
      </>
    ),
  },
  {
    heading: "Section 2 — General Conditions",
    body: (
      <>
        <p>We reserve the right to refuse Service to anyone for any reason at any time.</p>
        <p>
          You understand that your content (excluding payment information) may be transferred unencrypted across
          networks and adapted to technical requirements of connecting devices or systems. Payment information is
          always encrypted during network transfer.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without
          express written permission from us.
        </p>
        <p>The headings used in this agreement are included for convenience only.</p>
      </>
    ),
  },
  {
    heading: "Section 3 — Accuracy, Completeness & Timeliness of Information",
    body: (
      <>
        <p>We are not responsible if information made available on this website is inaccurate, incomplete, or outdated.</p>
        <p>
          The material on this website is provided for general informational purposes only and should not be relied
          upon as the sole basis for making decisions.
        </p>
        <p>We reserve the right to modify website content at any time without obligation to update information.</p>
      </>
    ),
  },
  {
    heading: "Section 4 — Modifications to Services & Prices",
    body: (
      <>
        <p>Prices for products are subject to change without notice.</p>
        <p>
          We reserve the right to modify or discontinue the Service (or any part thereof) without notice at any time.
        </p>
        <p>
          We shall not be liable for any modification, suspension, price change, or discontinuance of the Service.
        </p>
      </>
    ),
  },
  {
    heading: "Section 5 — Products or Services",
    body: (
      <>
        <p>Certain products may be available exclusively online through the website.</p>
        <p>
          Products may have limited quantities and are subject to return or exchange only according to our Refund
          Policy.
        </p>
        <p>
          We have made every effort to display product colors, packaging, and images as accurately as possible, but we
          cannot guarantee your device's display will be accurate.
        </p>
        <p>We reserve the right to limit product sales, limit quantities, refuse orders, discontinue products, and change product descriptions or pricing at any time. Any offer made on this website is void where prohibited.</p>
        <p>We do not warrant that product quality or Services will meet your expectations.</p>
      </>
    ),
  },
  {
    heading: "Section 6 — Health Disclaimer",
    body: (
      <>
        <p>
          The statements made on this website have not been evaluated by the Food and Drug Administration.
        </p>
        <p>Our products are not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>
          The content on this website is provided for informational and educational purposes only and does not
          constitute medical advice.
        </p>
        <p>
          You should consult a qualified healthcare professional before using any dietary supplement product,
          especially if you are pregnant, nursing, taking medication, have a medical condition, or are under 18 years
          of age.
        </p>
        <p>Individual results may vary.</p>
      </>
    ),
  },
  {
    heading: "Section 7 — Accuracy of Billing & Account Information",
    body: (
      <>
        <p>We reserve the right to refuse any order you place with us.</p>
        <p>
          We may limit or cancel quantities purchased per person, household, or order, including orders associated
          with the same customer account, the same payment method, or the same billing or shipping address.
        </p>
        <p>
          If we change or cancel an order, we may attempt to notify you using the email address, billing address, or
          phone number provided at checkout.
        </p>
        <p>You agree to provide current, complete, and accurate account and purchase information.</p>
      </>
    ),
  },
  {
    heading: "Section 8 — Optional Tools",
    body: (
      <>
        <p>We may provide access to third-party tools over which we neither monitor nor control.</p>
        <p>
          You acknowledge and agree that such tools are provided "as is" and "as available" without warranties or
          endorsements. Your use of optional third-party tools is entirely at your own risk.
        </p>
      </>
    ),
  },
  {
    heading: "Section 9 — Third-Party Links",
    body: (
      <>
        <p>
          Certain content, products, and Services available through our Service may include materials from third
          parties. Third-party links may direct you to external websites that are not affiliated with us.
        </p>
        <p>
          We are not responsible for examining or evaluating the content or accuracy of third-party websites and
          assume no liability related to third-party materials, products, or Services.
        </p>
      </>
    ),
  },
  {
    heading: "Section 10 — User Comments, Feedback & Submissions",
    body: (
      <>
        <p>
          If you submit comments, ideas, suggestions, proposals, or other materials to us, you agree that we may
          edit, copy, publish, distribute, and otherwise use them without restriction.
        </p>
        <p>
          We are under no obligation to maintain comments in confidence, pay compensation for comments, or respond to
          comments. We may monitor, edit, or remove content we determine to be unlawful, offensive, threatening,
          defamatory, obscene, or otherwise objectionable.
        </p>
        <p>You are solely responsible for the accuracy and legality of your comments.</p>
      </>
    ),
  },
  {
    heading: "Section 11 — Personal Information",
    body: (
      <p>
        Your submission of personal information through the store is governed by our Privacy Policy.
      </p>
    ),
  },
  {
    heading: "Section 12 — Errors, Inaccuracies & Omissions",
    body: (
      <>
        <p>
          Occasionally there may be information on our website containing typographical errors, inaccuracies, or
          omissions related to product descriptions, pricing, promotions, shipping charges, transit times, or
          availability.
        </p>
        <p>
          We reserve the right to correct errors, update information, or cancel orders without prior notice.
        </p>
      </>
    ),
  },
  {
    heading: "Section 13 — Prohibited Uses",
    body: (
      <>
        <p>You are prohibited from using the website or its content:</p>
        <ul>
          <li>For unlawful purposes or to violate laws or regulations.</li>
          <li>To infringe intellectual property rights.</li>
          <li>To harass, abuse, defame, or discriminate.</li>
          <li>To upload malicious code or malware.</li>
          <li>To collect personal information of others.</li>
          <li>To spam, phish, crawl, scrape, or exploit the Service.</li>
          <li>To interfere with website security features.</li>
        </ul>
        <p>We reserve the right to terminate access for prohibited conduct.</p>
      </>
    ),
  },
  {
    heading: "Section 14 — Disclaimer of Warranties; Limitation of Liability",
    body: (
      <>
        <p>
          We do not guarantee that your use of our Service will be uninterrupted, timely, secure, or error-free. You
          expressly agree that your use of the Service is at your sole risk.
        </p>
        <p>
          All products and Services are provided "as is" and "as available" without warranties of any kind.
        </p>
        <p>
          To the maximum extent permitted by law, Max Mend Method LLC, its officers, employees, affiliates,
          suppliers, and Service providers shall not be liable for any direct, indirect, incidental, consequential
          damages, loss of profits, loss of revenue, loss of data, or replacement costs.
        </p>
        <p>
          Some jurisdictions do not allow limitations on liability, so certain limitations may not apply to you.
        </p>
      </>
    ),
  },
  {
    heading: "Section 15 — Indemnification",
    body: (
      <p>
        You agree to indemnify, defend, and hold harmless Max Mend Method LLC and its affiliates, employees,
        contractors, suppliers, licensors, and Service providers from any claim or demand arising out of your breach
        of these Terms, your violation of any law, or your violation of third-party rights.
      </p>
    ),
  },
  {
    heading: "Section 16 — Severability",
    body: (
      <p>
        If any provision of these Terms is determined to be unlawful, void, or unenforceable, the remaining
        provisions shall remain enforceable to the fullest extent permitted by law.
      </p>
    ),
  },
  {
    heading: "Section 17 — Termination",
    body: (
      <>
        <p>These Terms remain effective unless terminated by either you or us.</p>
        <p>
          We may terminate or suspend access to the Service at any time without notice if we believe you have
          violated these Terms.
        </p>
      </>
    ),
  },
  {
    heading: "Section 18 — Entire Agreement",
    body: (
      <p>
        These Terms of Service and any policies posted by us constitute the entire agreement between you and us and
        supersede prior agreements or communications.
      </p>
    ),
  },
  {
    heading: "Section 19 — Governing Law",
    body: (
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of the Commonwealth of
        Massachusetts, United States.
      </p>
    ),
  },
  {
    heading: "Section 20 — Changes to Terms of Service",
    body: (
      <>
        <p>
          We reserve the right to update, modify, or replace any part of these Terms of Service by posting changes to
          our website.
        </p>
        <p>Your continued use of the website following any changes constitutes acceptance of those changes.</p>
      </>
    ),
  },
  {
    heading: "Section 21 — Contact Information",
    body: (
      <address className="not-italic">
        <p>Questions about the Terms of Service should be sent to:</p>
        <p className="mt-2 font-semibold">Max Mend Method LLC</p>
        <p>
          <a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">
            maxmendmethod@gmail.com
          </a>
        </p>
        <p>257 Northampton Street, Boston MA 02118</p>
        <p>
          <a href="https://www.maxmendmethod.com" className="underline hover:text-brand">
            maxmendmethod.com
          </a>
        </p>
      </address>
    ),
  },
];

export default function TermsPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 pb-24">
        <h1 className="text-4xl font-bold uppercase mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: May 2025</p>
        <div className="space-y-10 text-sm leading-relaxed text-foreground">
          {sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-base font-bold uppercase mb-3">{heading}</h2>
              <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">{body}</div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
