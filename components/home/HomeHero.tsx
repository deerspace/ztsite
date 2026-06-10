"use client";

import Link from "next/link";
import Image from "next/image";
import Parallax from "@/components/ux/Parallax";
import { useNavTheme, useDetectHeroTheme } from "@/components/layout/NavThemeContext";

const HERO_SRC = "/products/home-hero-range.jpg";

// The one big photographic moment at the top of the homepage. The nav and the
// hero copy adapt to the photo: a light photo gets a white nav + dark copy, a
// dark photo gets the default dark chrome (see useDetectHeroTheme).
export default function HomeHero() {
  useDetectHeroTheme(HERO_SRC);
  const { theme } = useNavTheme();
  const light = theme === "light";

  return (
    <section className={`home-hero ${light ? "on-light" : "on-dark"}`}>
      <div className="home-hero-bg">
        <Parallax amount={50} className="home-hero-parallax">
          <Image src={HERO_SRC} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 55%" }} />
        </Parallax>
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
