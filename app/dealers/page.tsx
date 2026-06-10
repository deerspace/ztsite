import type { Metadata } from "next";
import Link from "next/link";
import DealerLocator from "@/components/forms/DealerLocator";

export const metadata: Metadata = {
  title: "Dealer Locator",
  description: "Find a ZEV dealer near you — or order online and ship to any licensed FFL.",
};

export default function DealersPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Find a ZEV Dealer</h1>
        <p className="lede">
          Get hands on the lineup at an authorized dealer — or order online and ship to any{" "}
          <Link href="/firearms-faq">licensed FFL</Link>.
        </p>
      </div>

      <div className="info-wrap-wide">
        <DealerLocator />
      </div>
    </>
  );
}
