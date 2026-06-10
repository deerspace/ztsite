import Image from "next/image";
import ProductArt from "@/components/art/ProductArt";
import type { StoreProduct } from "@/lib/commerce";

// Real product image when the store provides one; SVG art otherwise.
// When a real store is connected its media host must be added to
// images.remotePatterns in next.config.ts.
export default function ProductMedia({
  product,
  detailed = false,
}: {
  product: StoreProduct;
  detailed?: boolean;
}) {
  const image = product.images[0];
  if (image) {
    return (
      <div className="media-frame">
        <Image src={image.src} alt={image.alt || product.name} fill sizes="(max-width: 834px) 90vw, 600px" />
      </div>
    );
  }
  return <ProductArt slug={product.slug} detailed={detailed} />;
}
