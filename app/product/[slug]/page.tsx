import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductMedia from "@/components/product/ProductMedia";
import Price from "@/components/product/Price";
import AddToCartButton from "@/components/product/AddToCartButton";
import { catalog } from "@/lib/commerce";
import { isGun } from "@/lib/content/guns";

export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await catalog.getProducts();
  // Guns have their own /buy configurator; only parts get a /product page.
  return products.filter((p) => !isGun(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await catalog.getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  if (isGun(slug)) redirect(`/buy/${slug}`);

  const product = await catalog.getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="buy">
      <div className="buy-media">
        <div className="buy-stage">
          <ProductMedia product={product} detailed />
        </div>
      </div>
      <div className="buy-info">
        <p className="eyebrow">{product.categories[0]?.name ?? "ZEV"}</p>
        <h1>{product.name}</h1>
        <div className="buy-short" dangerouslySetInnerHTML={{ __html: product.short_description }} />
        <p className="buy-price"><Price product={product} /></p>
        <p style={{ marginTop: 8, fontSize: 13, color: product.is_in_stock ? "#1c8c3b" : "var(--accent)" }}>
          {product.is_in_stock ? "In stock — ships in 1–2 business days" : "Out of stock"}
        </p>
        <AddToCartButton productId={product.id} purchasable={product.is_purchasable && product.is_in_stock} />
        <div
          className="buy-short"
          style={{ marginTop: 30, paddingTop: 24, borderTop: "1px solid var(--line)", fontSize: 15, lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </section>
  );
}
