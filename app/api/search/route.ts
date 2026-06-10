import { NextResponse } from "next/server";
import { catalog } from "@/lib/commerce";
import { formatPrice } from "@/lib/money";
import { isGun, showcaseHref } from "@/lib/content/guns";

export const revalidate = 300;

// Lightweight catalog search. In mock mode the catalog is in-memory so this
// is instant; against a real store, swap the filter for the Store API
// `?search=` parameter inside the woocommerce provider.
export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 1) return NextResponse.json({ results: [] });

  const products = await catalog.getProducts();
  const scored = products
    .map((p) => {
      const name = p.name.toLowerCase();
      const cat = (p.categories[0]?.name ?? "").toLowerCase();
      const sku = p.sku.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score = 100;
      else if (name.includes(q)) score = 70;
      else if (cat.includes(q)) score = 40;
      else if (sku.includes(q)) score = 30;
      else if (p.short_description.toLowerCase().includes(q)) score = 10;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const results = scored.map(({ p }) => {
    const gun = isGun(p.slug);
    const amount = p.has_options && p.prices.price_range ? p.prices.price_range.min_amount : p.prices.price;
    return {
      id: p.id,
      name: p.name,
      category: p.categories[0]?.name ?? "ZEV",
      price: (p.has_options ? "From " : "") + formatPrice(amount, p.prices.currency_minor_unit, p.prices.currency_symbol),
      image: p.images[0]?.src ?? null,
      href: gun ? showcaseHref(p.slug) : `/product/${p.slug}`,
    };
  });

  return NextResponse.json({ results });
}
