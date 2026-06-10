import type { Metadata } from "next";
import CategoryPills from "@/components/product/CategoryPills";
import ProductGrid from "@/components/product/ProductGrid";
import { catalog } from "@/lib/commerce";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop",
  description: "Pistols, slides, triggers, barrels, and sights — machined in the USA.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    catalog.getProducts(),
    catalog.getCategories(),
  ]);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Store</p>
        <h1>The best way to buy ZEV.</h1>
      </div>
      <CategoryPills categories={categories} />
      <ProductGrid products={products} />
    </>
  );
}
