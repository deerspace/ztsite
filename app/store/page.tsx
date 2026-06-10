import type { Metadata } from "next";
import Link from "next/link";
import CategoryTiles, { type CategoryTile } from "@/components/product/CategoryTiles";
import ProductCard from "@/components/product/ProductCard";
import TrustRow from "@/components/product/TrustRow";
import Reveal from "@/components/ux/Reveal";
import { catalog } from "@/lib/commerce";
import { categoryContent } from "@/lib/content/categories";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Store",
  description: "The best way to buy ZEV — online or at a licensed dealer.",
};

const GUN_ORDER = [
  "fdp",
  "oz9-v2-elite",
  "oz9-v2-combat",
  "oz9-v2-hypercomp",
  "core-elite-rifle",
  "core-elite-pistol",
];

// Apple-store-style help links (mirrors apple.com/store "Help is here").
const HELP = [
  { label: "Dealer Locator", sub: "Find a ZEV dealer near you", href: "/dealers", icon: "pin" },
  { label: "Warranty & Returns", sub: "Lifetime warranty, simple returns", href: "/warranty", icon: "shield" },
  { label: "Product Registration", sub: "Register your firearm or part", href: "/register", icon: "doc" },
  { label: "Purchasing Firearms FAQ", sub: "FFL transfers, age, shipping", href: "/firearms-faq", icon: "help" },
  { label: "Instructional Videos", sub: "Disassembly, install, maintenance", href: "/videos", icon: "play" },
  { label: "Become a Dealer", sub: "Carry ZEV in your shop", href: "/become-a-dealer", icon: "store" },
];

function HelpIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "pin": return <svg viewBox="0 0 28 28" {...common}><path d="M14 25c5-6 8-9.5 8-14a8 8 0 1 0-16 0c0 4.5 3 8 8 14z" /><circle cx="14" cy="11" r="3" /></svg>;
    case "shield": return <svg viewBox="0 0 28 28" {...common}><path d="M14 3l9 3v6c0 5.5-3.8 9.8-9 11-5.2-1.2-9-5.5-9-11V6z" /><path d="M10 14l3 3 5-6" /></svg>;
    case "doc": return <svg viewBox="0 0 28 28" {...common}><path d="M7 3h9l5 5v17H7z" /><path d="M16 3v5h5M11 14h7M11 18h7" /></svg>;
    case "help": return <svg viewBox="0 0 28 28" {...common}><circle cx="14" cy="14" r="11" /><path d="M11 11a3 3 0 1 1 4 2.8c-.8.4-1 .9-1 1.7" /><circle cx="14" cy="19.5" r="0.6" fill="currentColor" /></svg>;
    case "play": return <svg viewBox="0 0 28 28" {...common}><rect x="3" y="6" width="22" height="16" rx="3" /><path d="M12 11l5 3-5 3z" fill="currentColor" stroke="none" /></svg>;
    default: return <svg viewBox="0 0 28 28" {...common}><path d="M4 11l2-6h16l2 6M5 11h18v12H5z" /><path d="M9 15h6" /></svg>;
  }
}

export default async function StorePage() {
  const [products, categories] = await Promise.all([
    catalog.getProducts(),
    catalog.getCategories(),
  ]);

  const guns = GUN_ORDER.map((s) => products.find((p) => p.slug === s)).filter(
    (p) => p !== undefined,
  );

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
      <header className="store-hero">
        <h1><span className="store-hero-strong">Store.</span> The best way to buy the gear you love.</h1>
        <p className="lede">Shop online and ship to your FFL, or find a dealer near you.</p>
      </header>

      <section className="store-section">
        <div className="wrap-wide">
          <h2 className="store-section-title">The latest.</h2>
          <div className="product-grid" style={{ padding: 0 }}>
            {guns.map((p) => (
              <ProductCard key={p.id} product={p} showArt />
            ))}
          </div>
        </div>
      </section>

      <CategoryTiles items={tiles} />

      <section className="store-section">
        <div className="wrap-wide">
          <h2 className="store-section-title">Help is here.</h2>
          <div className="help-grid">
            {HELP.map((h) => (
              <Reveal key={h.label}>
                <Link href={h.href} className="help-card">
                  <span className="help-icon"><HelpIcon name={h.icon} /></span>
                  <span className="help-text">
                    <span className="help-label">{h.label}</span>
                    <span className="help-sub">{h.sub}</span>
                  </span>
                  <span className="help-arrow" aria-hidden="true">›</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="store-section store-assurance">
        <div className="wrap-wide">
          <TrustRow />
        </div>
      </section>
    </>
  );
}
