import Link from "next/link";
import Image from "next/image";
import Price from "./Price";
import ProductArt from "@/components/art/ProductArt";
import { isGun, showcaseHref } from "@/lib/content/guns";
import type { StoreProduct } from "@/lib/commerce";

const NEW_SLUGS = new Set(["oz9-v2-elite", "oz9-v2-hypercomp", "fdp"]);

export default function ProductCard({
  product,
  showArt = false,
}: {
  product: StoreProduct;
  showArt?: boolean;
}) {
  const gun = isGun(product.slug);
  const isNew = NEW_SLUGS.has(product.slug);
  // Guns: card opens the showcase, "Buy" opens the configurator.
  // Parts: both go to the simple product page.
  const href = gun ? showcaseHref(product.slug) : `/product/${product.slug}`;
  const buyHref = gun ? `/buy/${product.slug}` : `/product/${product.slug}`;
  const image = product.images[0];

  return (
    <article className="card">
      <p className={`card-tag${isNew ? " new" : ""}`}>
        {isNew ? "New" : (product.categories[0]?.name ?? "ZEV")}
      </p>
      {showArt && (
        <Link href={href} className="card-art" aria-hidden="true" tabIndex={-1}>
          {image ? (
            <Image src={image.src} alt={product.name} width={280} height={280} />
          ) : (
            <ProductArt slug={product.slug} />
          )}
        </Link>
      )}
      <h3>
        <Link href={href} className="card-name">{product.name}</Link>
      </h3>
      <div className="card-desc" dangerouslySetInnerHTML={{ __html: product.short_description }} />
      <p className="card-price"><Price product={product} /></p>
      <Link className="btn btn-primary btn-sm" href={buyHref}>{gun ? "Buy" : "Buy"}</Link>
    </article>
  );
}
