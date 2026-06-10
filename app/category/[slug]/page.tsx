import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPills from "@/components/product/CategoryPills";
import CategoryHero from "@/components/product/CategoryHero";
import ProductGrid from "@/components/product/ProductGrid";
import { catalog } from "@/lib/commerce";
import { categoryContent } from "@/lib/content/categories";

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

  const content = categoryContent(slug);
  const heroImage = content.heroImage ?? products.find((p) => p.images[0])?.images[0]?.src;

  return (
    <>
      <CategoryHero
        name={category.name}
        tagline={content.tagline || category.description}
        count={products.length}
        heroImage={heroImage}
        repSlug={products[0]?.slug}
      />
      <CategoryPills categories={categories} active={slug} />
      <ProductGrid products={products} />
    </>
  );
}
