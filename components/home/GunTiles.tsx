import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";

interface Tile {
  eyebrow: string;
  name: string;
  sub: string;
  showcase: string;
  buy: string;
  img: string;
  theme: "dark" | "light";
  wide?: boolean;
}

const TILES: Tile[] = [
  {
    eyebrow: "New",
    name: "FDP",
    sub: "It folds. Everything changes.",
    showcase: "/guns/fdp",
    buy: "/buy/fdp",
    img: "/products/fdp-carbine-rs.jpg",
    theme: "light",
    wide: true,
  },
  {
    eyebrow: "OZ9 V2",
    name: "Elite",
    sub: "Modular by design.",
    showcase: "/guns/oz9-v2-elite",
    buy: "/buy/oz9-v2-elite",
    img: "/products/oz9-elite-hero.jpg",
    theme: "light",
  },
  {
    eyebrow: "OZ9 V2",
    name: "Hypercomp",
    sub: "Flat-shooting, by design.",
    showcase: "/guns/oz9-v2-hypercomp",
    buy: "/buy/oz9-v2-hypercomp",
    img: "/products/oz9-hypercomp-hero.jpg",
    theme: "light",
  },
  {
    eyebrow: "OZ9 V2",
    name: "Combat",
    sub: "Duty-ready. Flat Dark Earth.",
    showcase: "/guns/oz9-v2-combat",
    buy: "/buy/oz9-v2-combat",
    img: "/products/oz9-combat-hero.jpg",
    theme: "light",
  },
  {
    eyebrow: "Core Elite",
    name: "Pistols & Rifles",
    sub: "An AR, machined like a ZEV.",
    showcase: "/guns/core-elite",
    buy: "/buy/core-elite-rifle",
    img: "/products/rifle-core-elite.jpg",
    theme: "light",
    wide: true,
  },
];

export default function GunTiles() {
  return (
    <section className="tiles">
      {TILES.map((t, i) => (
        <Reveal key={t.name} className={`tile ${t.theme}${t.wide ? " wide" : ""}`} delay={(i % 2) * 90}>
          <p className="tile-eyebrow">{t.eyebrow}</p>
          <h3>{t.name}</h3>
          <p className="tile-sub">{t.sub}</p>
          <div className="tile-links">
            <Link className="link-arrow" href={t.showcase}>Learn more <span>›</span></Link>
            <Link className="link-arrow" href={t.buy}>Buy <span>›</span></Link>
          </div>
          <div className="tile-img">
            <Image src={t.img} alt={t.name} width={760} height={760} sizes="(max-width: 834px) 100vw, 50vw" />
          </div>
        </Reveal>
      ))}
    </section>
  );
}
