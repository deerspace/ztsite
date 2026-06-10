import Link from "next/link";
import Price from "./Price";
import ProductArt from "@/components/art/ProductArt";
import type { StoreProduct } from "@/lib/commerce";

// Marketing slugs flagged "New" — matches the static concept's lineup tags.
const NEW_SLUGS = new Set(["oz9-v2-elite", "oz9-v2-hypercomp"]);

export default function ProductCard({
  product,
  showArt = false,
}: {
  product: StoreProduct;
  showArt?: boolean;
}) {
  const isNew = NEW_SLUGS.has(product.slug);
  const href = `/product/${product.slug}`;

  return (
    <article className="card">
      <p className={`card-tag${isNew ? " new" : ""}`}>
        {isNew ? "New" : (product.categories[0]?.name ?? "ZEV")}
      </p>
      {showArt && (
        <Link href={href} className="card-art" aria-hidden="true" tabIndex={-1}>
          <ProductArt slug={product.slug} />
        </Link>
      )}
      <h3>
        <Link href={href} className="card-name">
          {product.name}
        </Link>
      </h3>
      <div
        className="card-desc"
        dangerouslySetInnerHTML={{ __html: product.short_description }}
      />
      <p className="card-price">
        <Price product={product} />
      </p>
      <Link className="btn btn-small" href={href}>
        Buy
      </Link>
    </article>
  );
}
