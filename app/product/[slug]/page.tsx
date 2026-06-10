import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ProductMedia from "@/components/product/ProductMedia";
import ProductCard from "@/components/product/ProductCard";
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

  const category = product.categories[0];
  const related = category
    ? (await catalog.getProducts({ categorySlug: category.slug }))
        .filter((p) => p.id !== product.id)
        .slice(0, 3)
    : [];

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span className="crumbs-current">{product.name}</span>
      </nav>

      <section className="buy" style={{ paddingTop: "clamp(20px,3vw,32px)" }}>
      <div className="buy-media">
        <div className="buy-stage">
          <ProductMedia product={product} detailed />
        </div>
      </div>
      <div className="buy-info">
        <p className="eyebrow">{category?.name ?? "ZEV"}</p>
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

      {related.length > 0 && (
        <section className="related">
          <div className="wrap-wide">
            <h2 className="related-title">More {category?.name}</h2>
            <div className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} showArt />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
