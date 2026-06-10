import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Purchasing Firearms FAQ",
  description: "How buying a firearm from ZEV works — FFL transfers, age requirements, shipping, and compliance.",
};

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I buy a firearm from ZEV?",
    a: (
      <p>
        Order online like any other product. Complete firearms (OZ9, FDP, Core Elite) ship to a
        licensed FFL dealer of your choice — not to your door. At checkout you&apos;ll provide your
        dealer&apos;s information, and we coordinate the transfer paperwork directly with them.
      </p>
    ),
  },
  {
    q: "What is an FFL, and how does the transfer work?",
    a: (
      <>
        <p>
          An FFL (Federal Firearms License) is a dealer authorized to transfer firearms. We ship
          the firearm to your chosen FFL; you complete a Form 4473 and a background check in person
          at the dealer before taking possession.
        </p>
        <p>
          Don&apos;t have a dealer yet? Use the <Link href="/dealers">Dealer Locator</Link> to find one
          near you. Most dealers charge a small transfer fee.
        </p>
      </>
    ),
  },
  {
    q: "What are the age requirements?",
    a: (
      <p>
        You must be <strong>21 or older</strong> to purchase a firearm, and <strong>18 or older</strong>{" "}
        to purchase parts and accessories. Your FFL verifies age and eligibility at transfer.
      </p>
    ),
  },
  {
    q: "Can you ship to my state?",
    a: (
      <p>
        We ship to most states, but firearm and magazine laws vary. Some configurations,
        capacities, or features are restricted in certain states. Please confirm legality in your
        state before ordering — your FFL will also screen the transfer for compliance.
      </p>
    ),
  },
  {
    q: "Do parts like slides and triggers also ship to an FFL?",
    a: (
      <p>
        No. Components such as slides, triggers, barrels, and sights ship directly to you. Only a
        complete firearm (or a serialized frame/receiver) requires an FFL transfer.
      </p>
    ),
  },
  {
    q: "Is there a background check?",
    a: (
      <p>
        Yes — for any firearm transfer. The background check (NICS) is run by your FFL at the time of
        pickup, not by ZEV during checkout.
      </p>
    ),
  },
  {
    q: "How long until my order ships?",
    a: (
      <p>
        In-stock components typically ship in 1–2 business days. Complete firearms are shipped to
        your FFL once their license is verified; the in-person transfer happens on your dealer&apos;s
        schedule after the firearm arrives.
      </p>
    ),
  },
];

export default function FirearmsFaqPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Purchasing Firearms FAQ</h1>
        <p className="lede">Everything you need to know about buying a firearm from ZEV.</p>
      </div>

      <div className="faq">
        {FAQ.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>
              {item.q}
              <span className="faq-plus" aria-hidden="true" />
            </summary>
            <div className="faq-answer">{item.a}</div>
          </details>
        ))}
      </div>
    </>
  );
}
