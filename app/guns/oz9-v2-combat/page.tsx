import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import ShowcaseNav from "@/components/showcase/ShowcaseNav";
import { SpecStrip, ShowcaseCTA } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "OZ9 V2 Combat",
  description: "Windowless, sealed, duty-ready. The OZ9 V2 Combat in Flat Dark Earth.",
};

// OZ9 V2 Combat — duty-first, with a warm Flat Dark Earth color story.
export default function CombatShowcase() {
  return (
    <div className="show">
      <ShowcaseNav name="OZ9 V2 Combat" buyHref="/buy/oz9-v2-combat" anchors={[{ label: "Sealed slide", href: "#duty" }]} />
      <section className="show-hero">
        <Reveal>
          <p className="eyebrow">OZ9 V2 Combat</p>
          <h1>Built for duty.</h1>
          <p className="tagline">Windowless. Sealed. Flat Dark Earth.</p>
          <p className="price-line">From $1,499</p>
          <div className="cta-row">
            <Link className="btn btn-primary btn-lg" href="/buy/oz9-v2-combat">Buy</Link>
            <Link className="link-arrow" href="#duty">Why windowless <span>›</span></Link>
          </div>
        </Reveal>
        <Reveal className="show-hero-stage">
          <div className="show-stage soft" style={{ maxWidth: 940, margin: "0 auto" }}>
            <Image src="/products/oz9-combat-hero.jpg" alt="OZ9 V2 Combat in FDE, right side" width={940} height={940} priority />
          </div>
        </Reveal>
      </section>

      <section className="show-feature split" id="duty">
        <Reveal>
          <p className="kicker">Sealed slide</p>
          <h2>No windows. No compromise.</h2>
          <p>
            The Combat trades the Elite&apos;s window cuts for a sealed slide that keeps debris out and
            keeps running — wet, dusty, or worse. PRO match barrel, PRO Curved Face Trigger, ready for
            the holster.
          </p>
        </Reveal>
        <Reveal className="show-stage charcoal">
          <Image src="/products/oz9-combat-left.jpg" alt="OZ9 V2 Combat, left profile" width={1000} height={1000} />
        </Reveal>
      </section>

      {/* Flat Dark Earth color story — warm band */}
      <section style={{ background: "#b89a72", color: "#1d1d1f" }}>
        <div className="show-feature center" style={{ display: "block", textAlign: "center" }}>
          <Reveal>
            <p className="kicker" style={{ color: "#5e4a2c" }}>Finish</p>
            <h2>Flat Dark Earth.</h2>
            <p style={{ color: "#3d3120", margin: "16px auto 26px" }}>
              A duty-grade Cerakote that hides wear and reads all business. Compact, Compact X, and
              Full-Size — same finish, your footprint.
            </p>
          </Reveal>
          <Reveal className="show-stage" style={{ maxWidth: 760, margin: "0 auto", background: "transparent" }}>
            <Image src="/products/oz9-combat-angle.jpg" alt="OZ9 V2 Combat, pointing right" width={760} height={760} style={{ mixBlendMode: "multiply" }} />
          </Reveal>
        </div>
      </section>

      <SpecStrip
        items={[
          { value: "3", label: "Configs — Compact, Compact X, Full" },
          { value: "9", unit: "mm", label: "PRO match barrel" },
          { value: "0", label: "Window cuts — fully sealed" },
          { value: "FDE", label: "Duty Cerakote finish" },
        ]}
      />

      <ShowcaseCTA title="Carry the Combat." buyHref="/buy/oz9-v2-combat" secondaryHref="/guns/oz9-v2-elite" secondaryLabel="Compare the Elite" />
    </div>
  );
}
