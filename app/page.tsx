import Hero from "@/components/home/Hero";
import HypercompTile from "@/components/home/HypercompTile";
import GridTiles from "@/components/home/GridTiles";
import StatsBand from "@/components/home/StatsBand";
import LineupCarousel from "@/components/home/LineupCarousel";
import CraftValues from "@/components/home/CraftValues";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Hero />
      <HypercompTile />
      <GridTiles />
      <StatsBand />
      <LineupCarousel />
      <CraftValues />
    </>
  );
}
