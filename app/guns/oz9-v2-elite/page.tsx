import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import ShowcaseNav from "@/components/showcase/ShowcaseNav";
import { SpecStrip, ShowcaseCTA } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "OZ9 V2 Elite",
  description: "The modular flagship. Three slide lengths, two grips, one billet receiver.",
};

// OZ9 V2 Elite — modularity-led. Product floats on a bright stage within a
// dark page; the centerpiece is a three-up "one receiver, many builds" row.
export default function EliteShowcase() {
  return (
    <div className="show">
      <ShowcaseNav name="OZ9 V2 Elite" buyHref="/buy/oz9-v2-elite" anchors={[{ label: "Modularity", href: "#modular" }]} />
      {/* Hero — product on a bright stage against black */}
      <section className="show-hero">
        <Reveal>
          <p className="eyebrow">OZ9 V2 Elite</p>
          <h1>Performance, modular.</h1>
          <p className="tagline">Three slides. Two grips. One receiver.</p>
          <p className="price-line">From $1,763</p>
          <div className="cta-row">
            <Link className="btn btn-primary btn-lg" href="/buy/oz9-v2-elite">Buy</Link>
            <Link className="link-arrow" href="#modular">How it works <span>›</span></Link>
          </div>
        </Reveal>
        <Reveal className="show-hero-stage">
          <div className="show-stage soft" style={{ maxWidth: 920, margin: "0 auto" }}>
            <Image src="/products/oz9-elite-hero.jpg" alt="OZ9 V2 Elite, three-quarter view" width={920} height={920} priority />
          </div>
        </Reveal>
      </section>

      {/* Modularity statement */}
      <section className="show-feature center" id="modular" style={{ textAlign: "center", display: "block" }}>
        <Reveal>
          <h2 style={{ maxWidth: "16ch", margin: "0 auto" }}>One receiver. Every build.</h2>
          <p style={{ margin: "16px auto 0", maxWidth: "52ch" }}>
            The fire-control group lives in a billet steel receiver — independent of the grip. Swap
            slides, barrels, and grips around it and your trigger never changes.
          </p>
        </Reveal>
      </section>

      {/* Three-up build row — light band */}
      <section className="band-light">
        <div className="wrap-wide" style={{ paddingBottom: "clamp(60px,9vw,110px)" }}>
          <div className="gallery" style={{ padding: 0 }}>
            {[
              { img: "oz9-elite-right.jpg", t: "Compact", d: "Carry, concealed." },
              { img: "oz9-elite-hero.jpg", t: "Full", d: "Duty, all day." },
              { img: "oz9-elite-left.jpg", t: "Long", d: "Competition, flat." },
            ].map((b) => (
              <Reveal key={b.t} className="gallery-cell" style={{ flexDirection: "column", padding: 18 }}>
                <Image src={`/products/${b.img}`} alt={`OZ9 Elite ${b.t} slide`} width={420} height={360} />
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{b.t}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{b.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Window-cut feature — dark split */}
      <section className="show-feature split">
        <Reveal className="show-stage charcoal">
          <Image src="/products/oz9-elite-left.jpg" alt="OZ9 V2 Elite window-cut slide" width={1000} height={1000} />
        </Reveal>
        <Reveal>
          <p className="kicker">The slide</p>
          <h2>Cut for the optic.</h2>
          <p>
            Signature window cuts shed reciprocating mass and frame the barrel. Optic-ready out of the
            box, with raised irons that co-witness your dot.
          </p>
        </Reveal>
      </section>

      {/* Finish band */}
      <section className="band-soft">
        <div className="show-feature center" style={{ display: "block", textAlign: "center" }}>
          <Reveal>
            <p className="kicker">Finish</p>
            <h2>Black. Or bronze.</h2>
            <p style={{ margin: "16px auto 0" }}>
              A PRO Match barrel in DLC black or signature bronze TiCN — harder, slicker, unmistakably
              ZEV.
            </p>
          </Reveal>
        </div>
      </section>

      <SpecStrip
        items={[
          { value: "3", label: "Slide lengths — Compact, Full, Long" },
          { value: "2", label: "Grip sizes — Compact, X" },
          { value: "9", unit: "mm", label: "Match-grade barrel" },
          { value: "100", unit: "%", label: "Billet steel receiver" },
        ]}
      />

      <ShowcaseCTA title="Build your Elite." buyHref="/buy/oz9-v2-elite" secondaryHref="/guns/oz9-v2-hypercomp" secondaryLabel="See Hypercomp" />
    </div>
  );
}
