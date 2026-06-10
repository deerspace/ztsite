import Link from "next/link";
import Image from "next/image";

// Dark cinematic hero — the one big dark moment at the top of an
// otherwise white homepage.
export default function HomeHero() {
  return (
    <section className="home-hero on-dark">
      <div className="home-hero-bg">
        <Image src="/products/home-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="home-hero-copy">
        <p className="eyebrow">New · OZ9 V2</p>
        <h1>The OZ9, perfected.</h1>
        <p className="sub">Three slides. Two grips. One receiver.</p>
        <div className="cta-row">
          <Link className="btn btn-primary btn-lg" href="/buy/oz9-v2-elite">Buy</Link>
          <Link className="link-arrow" href="/guns/oz9-v2-elite">Learn more <span>›</span></Link>
        </div>
      </div>
    </section>
  );
}
