import Carousel from "@/components/ux/Carousel";
import ProductCard from "@/components/product/ProductCard";
import { catalog } from "@/lib/commerce";

// Featured component parts (the shoppable side of the homepage).
const FEATURED = [
  "citadel-slide",
  "octane-slide",
  "fulcrum-trigger",
  "pro-curved-face-trigger",
  "pro-match-barrel-bronze",
  "combat-sights",
];

export default async function LineupCarousel() {
  const products = await catalog.getProducts();
  const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p) => p !== undefined,
  );

  return (
    <section className="lineup">
      <Carousel title="Upgrade your carry.">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} showArt />
        ))}
      </Carousel>
    </section>
  );
}
