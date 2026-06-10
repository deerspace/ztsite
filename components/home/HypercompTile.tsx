import Link from "next/link";
import Reveal from "@/components/ux/Reveal";
import HypercompSlide from "@/components/art/HypercompSlide";

export default function HypercompTile() {
  return (
    <section className="tile tile-dark">
      <Reveal className="tile-copy">
        <h2>OZ9&nbsp;V2 Hypercomp</h2>
        <p className="sub">Flat-out fast.</p>
        <p className="desc">
          Four tapered vertical ports machined directly into the barrel vent gases upward — taming
          muzzle rise without adding an inch.
        </p>
        <div className="cta-row center">
          <Link className="link-arrow" href="/product/oz9-v2-hypercomp">
            Learn more <span>›</span>
          </Link>
          <Link className="link-arrow" href="/product/oz9-v2-hypercomp">
            Buy <span>›</span>
          </Link>
        </div>
      </Reveal>
      <Reveal className="tile-art">
        <HypercompSlide />
      </Reveal>
    </section>
  );
}
