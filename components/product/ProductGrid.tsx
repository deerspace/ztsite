import ProductCard from "./ProductCard";
import type { StoreProduct } from "@/lib/commerce";

export default function ProductGrid({ products }: { products: StoreProduct[] }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showArt />
      ))}
    </div>
  );
}
