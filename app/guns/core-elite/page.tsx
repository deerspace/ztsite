import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import ShowcaseNav from "@/components/showcase/ShowcaseNav";
import { SpecStrip, ShowcaseCTA } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "Core Elite — Pistols & Rifles",
  description: "Billet AR-platform pistols and rifles, machined to a ZEV tolerance.",
};

// Core Elite — one platform, two forms. A dual rifle/pistol layout.
export default function CoreEliteShowcase() {
  return (
    <div className="show">
      <ShowcaseNav name="Core Elite" buyHref="/buy/core-elite-rifle" anchors={[{ label: "Calibers", href: "#caliber" }]} />
      <section className="show-hero" style={{ minHeight: 0, paddingBottom: "clamp(56px,8vh,104px)" }}>
        <Reveal>
          <p className="eyebrow">Core Elite</p>
          <h1>Billet, to the bone.</h1>
          <p className="tagline">The AR, machined like a ZEV.</p>
          <p className="price-line">Pistols from $1,864 · Rifles from $2,284</p>
        </Reveal>
        <Reveal className="show-hero-stage" style={{ marginTop: "clamp(40px,6vh,72px)" }}>
          {/* The rifle is a long, low subject floating in a square frame with
              ~40% empty space top and bottom. Crop to a wide band so it fills
              the stage and the dead space below it disappears. */}
          <div className="show-stage soft" style={{ maxWidth: 1000, margin: "0 auto", aspectRatio: "5 / 2", overflow: "hidden" }}>
            <Image src="/products/rifle-core-elite.jpg" alt="ZEV Core Elite Rifle, .223 Wylde, 16 inch" width={1000} height={1000} priority style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Reveal>
      </section>

      {/* Two platforms */}
      <section className="band-light">
        <div className="wrap-wide" style={{ padding: "clamp(64px,9vw,120px) 24px" }}>
          <Reveal className="center" style={{ marginBottom: 48 }}>
            <h2 className="headline">One platform. Two forms.</h2>
          </Reveal>
          <div className="tiles" style={{ padding: 0, gridTemplateColumns: "repeat(2, 1fr)" }}>
            <Reveal className="tile light">
              <p className="tile-eyebrow">Rifle</p>
              <h3>Core Elite Rifle</h3>
              <p className="tile-sub">.223 Wylde · 16″ · $2,284</p>
              <div className="tile-links">
                <Link className="link-arrow" href="/buy/core-elite-rifle">Buy <span>›</span></Link>
              </div>
              <div className="tile-img">
                <Image src="/products/rifle-core-elite.jpg" alt="Core Elite Rifle" width={560} height={560} />
              </div>
            </Reveal>
            <Reveal className="tile light">
              <p className="tile-eyebrow">Pistol</p>
              <h3>Core Elite Pistol</h3>
              <p className="tile-sub">.223 Wylde / 300 BLK · $1,864</p>
              <div className="tile-links">
                <Link className="link-arrow" href="/buy/core-elite-pistol">Buy <span>›</span></Link>
              </div>
              <div className="tile-img">
                <Image src="/products/pistol-core-elite-556.jpg" alt="Core Elite Pistol" width={560} height={560} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Caliber feature — dark split */}
      <section className="show-feature split" id="caliber">
        <Reveal className="show-stage charcoal">
          <Image src="/products/pistol-core-elite-300.jpg" alt="Core Elite Pistol in 300 Blackout" width={1000} height={1000} />
        </Reveal>
        <Reveal>
          <p className="kicker">Caliber</p>
          <h2>.223 Wylde, or 300 BLK.</h2>
          <p>
            Run the pistol in flat-shooting .223 Wylde at 10.5″, or big-bore 300 Blackout at 8.5″ —
            suppressor-friendly and subsonic-ready. Matched billet upper and lower, free-float rail, a
            ZEV trigger.
          </p>
        </Reveal>
      </section>

      <SpecStrip
        items={[
          { value: "2", label: "Forms — pistol & rifle" },
          { value: "2", label: "Calibers — .223 Wylde, 300 BLK" },
          { value: "16", unit: "in", label: "Rifle barrel, .223 Wylde" },
          { value: "100", unit: "%", label: "Billet upper & lower" },
        ]}
      />

      <ShowcaseCTA title="Choose your Core Elite." buyHref="/buy/core-elite-rifle" buyLabel="Buy the rifle" secondaryHref="/buy/core-elite-pistol" secondaryLabel="Buy the pistol" />
    </div>
  );
}
