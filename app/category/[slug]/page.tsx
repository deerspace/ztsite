import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPills from "@/components/product/CategoryPills";
import ProductGrid from "@/components/product/ProductGrid";
import { catalog } from "@/lib/commerce";

export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await catalog.getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await catalog.getCategoryBySlug(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await catalog.getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, categories] = await Promise.all([
    catalog.getProducts({ categorySlug: slug }),
    catalog.getCategories(),
  ]);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Store</p>
        <h1>{category.name}</h1>
        {category.description && <p className="desc">{category.description}</p>}
      </div>
      <CategoryPills categories={categories} active={slug} />
      <ProductGrid products={products} />
    </>
  );
}
