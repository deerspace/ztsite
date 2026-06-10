import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Configurator from "@/components/product/Configurator";
import TrustRow from "@/components/product/TrustRow";
import { catalog } from "@/lib/commerce";
import { getGun, GUN_SLUGS } from "@/lib/content/guns";

export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUN_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gun = getGun(slug);
  return { title: gun ? `Buy ${gun.name}` : "Buy" };
}

export default async function BuyPage({ params }: Props) {
  const { slug } = await params;
  const gun = getGun(slug);
  const product = await catalog.getProductBySlug(slug);
  if (!gun || !product) notFound();

  const showcaseSlug = slug.startsWith("core-elite") ? "core-elite" : slug;

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Configure</p>
        <h1>Build your {gun.name}.</h1>
        <p className="lede">
          Choose your configuration. <Link className="link-arrow" href={`/guns/${showcaseSlug}`}>Explore {gun.name} <span>›</span></Link>
        </p>
      </div>
      <Configurator
        productId={product.id}
        name={product.name}
        eyebrow={gun.eyebrow}
        shortHtml={product.short_description}
        prices={product.prices}
        images={product.images}
        gun={gun}
      />
      <section className="wrap-wide" style={{ paddingBottom: "clamp(70px,10vw,110px)" }}>
        <TrustRow />
      </section>
    </>
  );
}
