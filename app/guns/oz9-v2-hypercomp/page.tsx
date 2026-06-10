import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import { SpecStrip, ShowcaseCTA } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "OZ9 V2 Hypercomp",
  description: "Integrated compensation. Four ports machined into the barrel, zero added length.",
};

// OZ9 V2 Hypercomp — tech-led, built around the integrated compensator.
export default function HypercompShowcase() {
  return (
    <div className="show">
      <section className="show-hero">
        <Reveal>
          <p className="eyebrow">OZ9 V2 Hypercomp</p>
          <h1>Flat-out fast.</h1>
          <p className="tagline">Integrated compensation. Zero added length.</p>
          <p className="price-line">From $1,899</p>
          <div className="cta-row">
            <Link className="btn btn-primary btn-lg" href="/buy/oz9-v2-hypercomp">Buy</Link>
            <Link className="link-arrow" href="#ports">The ports <span>›</span></Link>
          </div>
        </Reveal>
        <Reveal className="show-hero-stage">
          <div className="show-stage soft" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Image src="/products/oz9-hypercomp-hero.jpg" alt="OZ9 V2 Hypercomp beauty shot" width={900} height={900} priority />
          </div>
        </Reveal>
      </section>

      {/* Big number tech statement */}
      <section className="show-feature center" id="ports" style={{ display: "block", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontSize: "clamp(80px,16vw,200px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--accent)" }}>
            4
          </div>
          <h2 style={{ marginTop: 10 }}>Ports, not inches.</h2>
          <p style={{ margin: "16px auto 0", maxWidth: "50ch" }}>
            Four tapered vertical ports are machined directly into the top of the barrel. Gas vents
            up, the muzzle stays down — and the slide never grows past a compact footprint.
          </p>
        </Reveal>
      </section>

      {/* Comp detail — light band */}
      <section className="band-light">
        <div className="show-feature split">
          <Reveal className="show-stage soft">
            <Image src="/products/oz9-hypercomp-detail.jpg" alt="OZ9 V2 Hypercomp compensator porting detail" width={1000} height={1000} />
          </Reveal>
          <Reveal>
            <p className="kicker">Integrated comp</p>
            <h2>No can. No bolt-on.</h2>
            <p>
              There&apos;s nothing to thread, time, or torque. The compensation is the barrel — so your
              holster, your draw, and your maintenance stay exactly the same.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lifestyle full-bleed */}
      <div className="show-bleed">
        <div className="show-stage charcoal" style={{ borderRadius: 0 }}>
          <Image src="/products/oz9-hypercomp-life.jpg" alt="OZ9 V2 Hypercomp" width={1600} height={1600} style={{ maxWidth: 900, margin: "0 auto" }} />
        </div>
        <div className="show-bleed-copy mid">
          <Reveal>
            <h2 className="title">Compact you can run flat.</h2>
          </Reveal>
        </div>
      </div>

      <SpecStrip
        items={[
          { value: "4", label: "Tapered vertical ports" },
          { value: "0", unit: "in", label: "Added slide length" },
          { value: "9", unit: "mm", label: "Compact platform" },
          { value: "2", label: "Grip sizes" },
        ]}
      />

      <ShowcaseCTA title="Run it flat." buyHref="/buy/oz9-v2-hypercomp" secondaryHref="/guns/oz9-v2-combat" secondaryLabel="See the Combat" />
    </div>
  );
}
