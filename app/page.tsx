import HomeHero from "@/components/home/HomeHero";
import GunTiles from "@/components/home/GunTiles";
import StatsBand from "@/components/home/StatsBand";
import LineupCarousel from "@/components/home/LineupCarousel";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <HomeHero />
      <GunTiles />
      <StatsBand />
      <LineupCarousel />
    </>
  );
}
