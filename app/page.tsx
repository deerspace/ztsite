import Link from "next/link";
import HomeHero from "@/components/home/HomeHero";
import GunTiles from "@/components/home/GunTiles";
import StatsBand from "@/components/home/StatsBand";
import LineupCarousel from "@/components/home/LineupCarousel";
import Reveal from "@/components/ux/Reveal";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <HomeHero />
      <GunTiles />
      <StatsBand />
      <LineupCarousel />

      <section className="section center" id="support">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Owner since day one</p>
            <h2 className="headline">Backed for life.</h2>
            <p className="lede" style={{ maxWidth: "560px", margin: "16px auto 26px" }}>
              Every component we machine carries a lifetime warranty. Born on the match circuit,
              carried on duty, built in Centralia, Washington.
            </p>
            <div className="cta-row" style={{ display: "flex", gap: 22, justifyContent: "center" }}>
              <Link className="btn btn-dark btn-lg" href="/shop">Shop all parts</Link>
              <Link className="link-arrow" href="/guns/fdp">Meet the FDP <span>›</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
