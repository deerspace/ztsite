import Carousel from "@/components/ux/Carousel";
import ProductCard from "@/components/product/ProductCard";
import { catalog } from "@/lib/commerce";

// Featured slugs in display order; anything missing from the store is skipped.
const FEATURED = [
  "oz9-v2-elite",
  "oz9-v2-combat",
  "oz9-v2-hypercomp",
  "citadel-slide",
  "fulcrum-trigger",
  "pro-match-barrel-bronze",
];

export default async function LineupCarousel() {
  const products = await catalog.getProducts();
  const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p) => p !== undefined,
  );

  return (
    <section className="lineup" id="lineup">
      <Carousel title="The lineup.">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </section>
  );
}
