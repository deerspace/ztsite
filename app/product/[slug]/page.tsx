import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/ux/Reveal";
import ProductMedia from "@/components/product/ProductMedia";
import Price from "@/components/product/Price";
import AddToCartButton from "@/components/product/AddToCartButton";
import { catalog } from "@/lib/commerce";

export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await catalog.getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await catalog.getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await catalog.getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="pdp">
      <Reveal className="pdp-media">
        <ProductMedia product={product} detailed />
      </Reveal>
      <div className="pdp-info">
        <p className="eyebrow">{product.categories[0]?.name ?? "ZEV"}</p>
        <h1>{product.name}</h1>
        <div
          className="pdp-short"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
        <p className="pdp-price">
          <Price product={product} />
        </p>
        <p className={`pdp-stock${product.is_in_stock ? "" : " out"}`}>
          {product.is_in_stock ? "In stock — ships in 1–2 business days" : "Out of stock"}
        </p>
        <AddToCartButton
          productId={product.id}
          purchasable={product.is_purchasable && product.is_in_stock}
        />
        <div className="pdp-desc" dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </section>
  );
}
