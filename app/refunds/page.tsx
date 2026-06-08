import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund and return policy for Max Mend Method LLC.",
  alternates: { canonical: "https://www.maxmendmethod.com/refunds" },
  openGraph: {
    title: "Refund Policy",
    description: "Refund and return policy for Max Mend Method LLC.",
    url: "https://www.maxmendmethod.com/refunds",
  },
};

export default function RefundsPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 pb-24">
        <h1 className="text-4xl mb-2 font-gliker">Return Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: May 22, 2026</p>
        <div className="space-y-10 text-sm leading-relaxed text-foreground">

          <section>
            <h2 className="text-base font-bold uppercase mb-3">First-Time Orders</h2>
            <div className="space-y-3">
              <p>We offer a 90-day peak state money back guarantee. This means we'll issue a 100% refund on the product cost within 90 days of receipt if you don't feel a positive difference from using it.</p>
              <p>Please note that we only refund one opened bag per order and customer. If your first order included more than one bag, these bags must be returned unopened and unused to qualify for a refund. Any bags not returned unopened and in original condition will be deducted from the refund amount.</p>
              <p>If your first order included a Kit (bottle, frother, canister, spoon, or other accessories), these accessories must be returned unused, in their original packaging, and in the original shipping box in order to qualify for a refund. Any accessories not returned in original condition will be deducted from the refund amount.</p>
              <p>Shipping charges are non-refundable, as these costs are paid directly to the carrier once an order is shipped.</p>
              <p>If your order included free shipping, please note that the actual shipping cost we covered will be deducted from your refund. This helps us continue offering affordable delivery and maintaining a sustainable return policy.</p>
              <p>Please note that you are responsible for shipping costs to return the product to us.</p>
              <p>To initiate a return, please reach out to our Customer Success Team at <a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">maxmendmethod@gmail.com</a> and we'll assist you. Items sent back to us without first requesting a return will not be accepted.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Returns</h2>
            <div className="space-y-3">
              <p>After the first order, we only accept returns of unopened products.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Returning Customers</h2>
            <div className="space-y-3">
              <p>To be eligible for a return, the product must be unused, unopened, and in its original packaging. We may refuse returns that don't meet these requirements.</p>
              <p>Please note that you are responsible for shipping costs to return the product to us.</p>
              <p>Once we receive the unopened product, we'll issue a refund for the purchase price.</p>
              <p>Please reach out to our Customer Success Team at <a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">maxmendmethod@gmail.com</a> and we'll assist you.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Damaged or Incorrect Items</h2>
            <div className="space-y-3">
              <p>If your order arrived damaged or incorrect, please reach out within 15 days of delivery with photos, and we'll make it right. You'll also need the receipt or proof of purchase.</p>
              <p>Customers bear the responsibility for return shipping costs unless the return is a result of an error on our part or if the product is found to be defective or the wrong item.</p>
              <p>You can always contact us for any return questions at <a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">maxmendmethod@gmail.com</a>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Exchanges</h2>
            <div className="space-y-3">
              <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold uppercase mb-3">Refunds</h2>
            <div className="space-y-3">
              <p>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
              <p>If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:maxmendmethod@gmail.com" className="underline hover:text-brand">maxmendmethod@gmail.com</a>.</p>
            </div>
          </section>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
