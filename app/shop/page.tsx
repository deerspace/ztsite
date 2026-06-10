import type { Metadata } from "next";
import CategoryTiles, { type CategoryTile } from "@/components/product/CategoryTiles";
import ProductGrid from "@/components/product/ProductGrid";
import { catalog } from "@/lib/commerce";
import { categoryContent } from "@/lib/content/categories";

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

  const tiles: CategoryTile[] = categories
    .map((c) => {
      const inCat = products.filter((p) => p.categories[0]?.slug === c.slug);
      return {
        slug: c.slug,
        name: c.name,
        count: inCat.length,
        image: categoryContent(c.slug).heroImage ?? inCat.find((p) => p.images[0])?.images[0]?.src,
        repSlug: inCat[0]?.slug,
      };
    })
    .filter((t) => t.count > 0);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Store</p>
        <h1>The best way to buy ZEV.</h1>
        <p className="lede">Configure a firearm or upgrade your carry — every part backed for life.</p>
      </div>
      <CategoryTiles items={tiles} />
      <div className="wrap-wide">
        <h2 className="shop-all-title">All products</h2>
      </div>
      <ProductGrid products={products} />
    </>
  );
}
