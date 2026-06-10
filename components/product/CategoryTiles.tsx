import Link from "next/link";
import Image from "next/image";
import ProductArt from "@/components/art/ProductArt";

export interface CategoryTile {
  slug: string;
  name: string;
  count: number;
  image?: string;
  repSlug?: string;
}

// "Shop by category" visual quick-links for the shop landing.
export default function CategoryTiles({ items }: { items: CategoryTile[] }) {
  return (
    <section className="cat-tiles-wrap">
      <div className="wrap-wide">
        <h2 className="cat-tiles-title">Shop by category</h2>
        <div className="cat-tiles">
          {items.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="cat-tile">
              <div className="cat-tile-art">
                {c.image ? (
                  <Image src={c.image} alt={c.name} width={200} height={200} sizes="200px" />
                ) : c.repSlug ? (
                  <ProductArt slug={c.repSlug} />
                ) : null}
              </div>
              <span className="cat-tile-name">{c.name}</span>
              <span className="cat-tile-count">{c.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
