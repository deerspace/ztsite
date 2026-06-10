import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import Parallax from "@/components/ux/Parallax";
import ShowcaseNav from "@/components/showcase/ShowcaseNav";
import { SpecStrip, ShowcaseCTA } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "FDP — Folding Defensive Platform",
  description: "ZEV × Magpul. A 9mm platform that folds flat and deploys in a heartbeat.",
};

// FDP — lifestyle-led, narrative around the folding mechanism.
export default function FdpShowcase() {
  return (
    <div className="show">
      <ShowcaseNav name="FDP" buyHref="/buy/fdp" anchors={[{ label: "How it folds", href: "#fold" }]} />
      {/* Hero — full-bleed editorial photo, copy anchored low */}
      <section className="show-hero photo" style={{ minHeight: "86vh" }}>
        <div className="show-hero-bg">
          <Image src="/products/fdp-hero.jpg" alt="The folded FDP resting on a side table" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        <Reveal className="show-hero-copy">
          <p className="eyebrow">ZEV × Magpul</p>
          <h1>FDP</h1>
          <p className="tagline">It folds. Everything changes.</p>
          <p className="price-line">Folding Defensive Platform · From $1,699</p>
          <div className="cta-row">
            <Link className="btn btn-primary btn-lg" href="/buy/fdp">Buy</Link>
            <Link className="link-arrow" href="#fold">See how it folds <span>›</span></Link>
          </div>
        </Reveal>
      </section>

      {/* Full-bleed lifestyle */}
      <div className="show-bleed parallax-frame">
        <Parallax amount={44}>
          <Image src="/products/fdp-bg.jpg" alt="Drawing the folded FDP from a sling bag" width={2400} height={1200} sizes="100vw" priority />
        </Parallax>
        <div className="show-bleed-copy">
          <Reveal>
            <h2 className="title">Carry it folded.</h2>
            <p className="lede" style={{ color: "#f5f5f7", maxWidth: "30ch" }}>
              A full 9mm platform that disappears into a bag — and stands up the instant you need it.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Folded — light band */}
      <section className="band-light" id="fold">
        <div className="show-feature split">
          <Reveal className="show-stage soft">
            <Image src="/products/fdp-folded.jpg" alt="FDP folded flat" width={1000} height={1000} />
          </Reveal>
          <Reveal>
            <p className="kicker">Folded</p>
            <h2>Folds to nothing.</h2>
            <p>
              Developed with Magpul, the FDP collapses on itself to a fraction of its deployed length —
              small enough to stow, fast enough to trust. No tools, no fumbling.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Deployed — charcoal stage on dark */}
      <section className="show-feature split">
        <Reveal>
          <p className="kicker">Deployed</p>
          <h2>Up in a heartbeat.</h2>
          <p>
            One motion brings the FDP to full length and locks it rigid. Run it as a 16″ carbine or a
            pistol-length platform — the manual of arms never changes.
          </p>
          <Link className="link-arrow" href="/buy/fdp" style={{ marginTop: 18, display: "inline-flex" }}>
            Configure yours <span>›</span>
          </Link>
        </Reveal>
        <Reveal className="show-stage charcoal">
          <Image src="/products/fdp-carbine-ls34.jpg" alt="FDP carbine deployed, three-quarter view" width={1000} height={1000} />
        </Reveal>
      </section>

      {/* Detail — soft band */}
      <section className="band-soft">
        <div className="show-feature split">
          <Reveal className="show-stage light">
            <Image src="/products/fdp-detail.jpg" alt="FDP folding mechanism detail" width={1000} height={1000} />
          </Reveal>
          <Reveal>
            <p className="kicker">Mechanism</p>
            <h2>Locks like a vault.</h2>
            <p>
              The hinge is the hard part — so ZEV and Magpul over-built it. Positive lockup, zero
              play, and a finish that shrugs off the field.
            </p>
          </Reveal>
        </div>
      </section>

      <SpecStrip
        items={[
          { value: "9", unit: "mm", label: "Chambering" },
          { value: "2", label: "Configurations — carbine or pistol" },
          { value: "1", label: "Motion to deploy" },
          { value: "ZEV", unit: "×Magpul", label: "Co-developed" },
        ]}
      />

      <ShowcaseCTA title="Carry the FDP." buyHref="/buy/fdp" secondaryHref="/shop" secondaryLabel="Shop accessories" />
    </div>
  );
}
