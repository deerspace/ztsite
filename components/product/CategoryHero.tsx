import Image from "next/image";
import ProductArt from "@/components/art/ProductArt";

// Split category hero: name + tagline + count on the left, a representative
// product image (photo or SVG art) floated on a soft stage to the right.
export default function CategoryHero({
  name,
  tagline,
  count,
  heroImage,
  repSlug,
}: {
  name: string;
  tagline: string;
  count: number;
  heroImage?: string;
  repSlug?: string;
}) {
  return (
    <section className="cat-hero">
      <div className="cat-hero-text">
        <p className="eyebrow">Store</p>
        <h1>{name}</h1>
        {tagline && <p className="lede">{tagline}</p>}
        <p className="cat-hero-count">{count} {count === 1 ? "product" : "products"}</p>
      </div>
      <div className="cat-hero-art">
        {heroImage ? (
          <Image src={heroImage} alt={name} width={560} height={560} sizes="(max-width: 834px) 90vw, 480px" priority />
        ) : repSlug ? (
          <ProductArt slug={repSlug} />
        ) : null}
      </div>
    </section>
  );
}
