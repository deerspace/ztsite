import Link from "next/link";
import Reveal from "@/components/ux/Reveal";
import PistolBlueprint from "@/components/art/PistolBlueprint";

export default function Hero() {
  return (
    <section className="hero">
      <Reveal className="hero-copy">
        <p className="eyebrow">New</p>
        <h1>OZ9&nbsp;V2 Elite</h1>
        <p className="sub">Performance. Without compromise.</p>
        <p className="price">From $1,799</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/product/oz9-v2-elite">
            Buy
          </Link>
          <Link className="link-arrow" href="/product/oz9-v2-elite">
            Learn more <span>›</span>
          </Link>
        </div>
      </Reveal>
      <Reveal className="hero-art">
        <PistolBlueprint />
      </Reveal>
    </section>
  );
}
