import Link from "next/link";
import Reveal from "@/components/ux/Reveal";
import CitadelSlide from "@/components/art/CitadelSlide";
import FulcrumTrigger from "@/components/art/FulcrumTrigger";
import ProMatchBarrel from "@/components/art/ProMatchBarrel";
import CombatSights from "@/components/art/CombatSights";

const TILES = [
  {
    name: "Citadel Slide",
    sub: "Armor for your optic.",
    href: "/product/citadel-slide",
    theme: "tile-light",
    art: <CitadelSlide />,
  },
  {
    name: "Fulcrum Trigger",
    sub: "The break that started it all.",
    href: "/product/fulcrum-trigger",
    theme: "tile-light",
    art: <FulcrumTrigger />,
  },
  {
    name: "PRO Match Barrels",
    sub: "Accuracy, measured in tenths.",
    href: "/category/barrels",
    theme: "tile-dark2",
    art: <ProMatchBarrel />,
  },
  {
    name: "Combat Sights",
    sub: "Fast to find. Faster to fight.",
    href: "/product/combat-sights",
    theme: "tile-dark2",
    art: <CombatSights />,
  },
];

export default function GridTiles() {
  return (
    <section className="grid">
      {TILES.map((tile) => (
        <Reveal className={`grid-tile ${tile.theme}`} key={tile.name}>
          <div className="grid-copy">
            <h3>{tile.name}</h3>
            <p className="sub-s">{tile.sub}</p>
            <div className="cta-row center">
              <Link className="link-arrow" href={tile.href}>
                Learn more <span>›</span>
              </Link>
              <Link className="link-arrow" href={tile.href}>
                Buy <span>›</span>
              </Link>
            </div>
          </div>
          {tile.art}
        </Reveal>
      ))}
    </section>
  );
}
