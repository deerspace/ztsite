import type { Metadata } from "next";
import DealerApplicationForm from "@/components/forms/DealerApplicationForm";
import Reveal from "@/components/ux/Reveal";

export const metadata: Metadata = {
  title: "Become a Dealer",
  description: "Carry ZEV in your shop. Wholesale pricing, marketing support, and priority fulfillment for licensed dealers.",
};

const BENEFITS = [
  { title: "Wholesale pricing", body: "Competitive dealer margins across pistols, rifles, and the full component line." },
  { title: "Marketing support", body: "Product photography, point-of-sale assets, and co-op opportunities." },
  { title: "Priority fulfillment", body: "Dealer orders ship first, with stock visibility and rep support." },
];

export default function BecomeADealerPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Dealers</p>
        <h1>Become a ZEV Dealer</h1>
        <p className="lede">Bring performance-defined firearms and components to your counter.</p>
      </div>

      <section className="info-wrap-wide" style={{ paddingBottom: "clamp(48px,7vw,72px)" }}>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <Reveal className="benefit" key={b.title}>
              <h4>{b.title}</h4>
              <p>{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="info-wrap" style={{ paddingBottom: "clamp(90px,12vw,130px)" }}>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", textAlign: "center", marginBottom: 28 }}>Apply for a dealer account</h2>
        <DealerApplicationForm />
      </div>
    </>
  );
}
