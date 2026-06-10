import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warranty & Return Policy",
  description: "Every ZEV component is backed by a lifetime warranty. Returns, exchanges, and how to start a claim.",
};

export default function WarrantyPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Warranty &amp; Returns</h1>
        <p className="lede">Built to a tolerance, backed for life. Here&apos;s how our coverage and returns work.</p>
      </div>

      <div className="info-wrap prose">
        <h2>Lifetime warranty</h2>
        <p>
          Every component ZEV designs and machines is guaranteed against defects in materials and
          workmanship for the lifetime of the product. No receipts, no registration required, no
          fine print. If a ZEV part fails because of how we made it, we&apos;ll repair or replace it.
        </p>

        <h2>What&apos;s covered</h2>
        <ul>
          <li>Defects in materials and machining on slides, triggers, barrels, and frames.</li>
          <li>Finish defects (DLC, TiCN) that occur under normal use.</li>
          <li>Function issues traceable to manufacturing on complete OZ9, FDP, and Core Elite firearms.</li>
        </ul>

        <h2>What&apos;s not covered</h2>
        <ul>
          <li>Normal wear, cosmetic marks from carry and use, and consumable parts.</li>
          <li>Damage from misuse, unauthorized modification, reloaded or non-spec ammunition, or improper installation.</li>
          <li>Third-party parts not manufactured by ZEV.</li>
        </ul>

        <h2>Returns &amp; exchanges</h2>
        <p>
          Unfired, uninstalled components in new condition may be returned within <strong>30 days</strong>{" "}
          of delivery for a refund or exchange. Items must be in original packaging. Complete
          firearms that have been transferred through an FFL cannot be returned to ZEV — those are
          handled under warranty service. Return shipping on non-defective returns is the
          customer&apos;s responsibility; we cover shipping both ways on warranty claims.
        </p>

        <h2>How to start a claim</h2>
        <p>
          Email <a href="mailto:support@zevtechnologies.com">support@zevtechnologies.com</a> with your
          order number, the product, and a short description (photos help). We&apos;ll send a prepaid
          label for warranty claims and walk you through the rest. Most claims are resolved within a
          few business days of us receiving the item.
        </p>

        <h2>Questions?</h2>
        <p>
          Check the <Link href="/firearms-faq">Purchasing Firearms FAQ</Link> for transfer and
          shipping questions, or <Link href="/dealers">find a dealer</Link> for hands-on help.
        </p>
      </div>
    </>
  );
}
