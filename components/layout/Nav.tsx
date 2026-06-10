"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ZevLogo from "@/components/art/ZevLogo";
import { useCart } from "@/components/cart/CartProvider";

interface GunCard {
  name: string;
  meta: string;
  href: string;
  img: string;
}

const GUNS: GunCard[] = [
  { name: "FDP", meta: "Folding Defensive Platform", href: "/guns/fdp", img: "/products/fdp-folded.jpg" },
  { name: "OZ9 V2 Elite", meta: "Modular flagship", href: "/guns/oz9-v2-elite", img: "/products/oz9-elite-hero.jpg" },
  { name: "OZ9 V2 Combat", meta: "Duty-ready, FDE", href: "/guns/oz9-v2-combat", img: "/products/oz9-combat-hero.jpg" },
  { name: "OZ9 V2 Hypercomp", meta: "Integrated comp", href: "/guns/oz9-v2-hypercomp", img: "/products/oz9-hypercomp-hero.jpg" },
  { name: "Core Elite", meta: "Pistols & rifles", href: "/guns/core-elite", img: "/products/rifle-core-elite.jpg" },
];

const SHOP_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Glock Parts",
    links: [
      { label: "Slides", href: "/category/slides" },
      { label: "Barrels", href: "/category/barrels" },
      { label: "Triggers", href: "/category/triggers" },
      { label: "Sights", href: "/category/sights" },
    ],
  },
  {
    title: "Buy a firearm",
    links: [
      { label: "OZ9 V2 Elite", href: "/buy/oz9-v2-elite" },
      { label: "OZ9 V2 Combat", href: "/buy/oz9-v2-combat" },
      { label: "FDP", href: "/buy/fdp" },
      { label: "Core Elite", href: "/buy/core-elite-rifle" },
    ],
  },
  {
    title: "Quick links",
    links: [
      { label: "Shop all parts", href: "/shop" },
      { label: "New arrivals", href: "/shop" },
      { label: "Gear & apparel", href: "/shop" },
      { label: "Gift cards", href: "/shop" },
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState<"guns" | "shop" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, ready, openMiniCart } = useCart();
  const count = cart?.items_count ?? 0;

  // Close menus on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="nav">
      <nav className="nav-inner" aria-label="Global">
        <Link className="nav-logo" href="/" aria-label="ZEV Technologies home" onClick={() => setOpen(null)}>
          <ZevLogo />
        </Link>

        <ul className="nav-links" onMouseLeave={() => setOpen(null)}>
          <li className={`nav-item${open === "guns" ? " open" : ""}`} onMouseEnter={() => setOpen("guns")}>
            <button onClick={() => setOpen(open === "guns" ? null : "guns")}>Guns</button>
          </li>
          <li className={`nav-item${open === "shop" ? " open" : ""}`} onMouseEnter={() => setOpen("shop")}>
            <button onClick={() => setOpen(open === "shop" ? null : "shop")}>Shop</button>
          </li>
          <li className="nav-item" onMouseEnter={() => setOpen(null)}><Link href="/guns/fdp">Experience</Link></li>
          <li className="nav-item" onMouseEnter={() => setOpen(null)}><Link href="/#support">Support</Link></li>
        </ul>

        <div className="nav-actions">
          <Link className="nav-icon" href="/shop" aria-label="Search the store">
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <button className="nav-icon" aria-label="Open cart" onClick={openMiniCart}>
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M3 5h10l-1 9H4z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.5 5a2.5 2.5 0 0 1 5 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {ready && count > 0 && <span className="nav-badge">{count}</span>}
          </button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
            <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
              <line x1="2" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mega dropdowns */}
      <div className={`mega-overlay${open ? " open" : ""}`} onClick={() => setOpen(null)} />

      <div
        className={`mega${open === "guns" ? " open" : ""}`}
        onMouseEnter={() => setOpen("guns")}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mega-inner">
          <p className="mega-col-title">Explore the lineup</p>
          <div className="mega-grid">
            {GUNS.map((g) => (
              <Link key={g.name} href={g.href} className="mega-card" onClick={() => setOpen(null)}>
                <div className="mega-thumb">
                  <Image src={g.img} alt={g.name} width={220} height={165} />
                </div>
                <div className="mega-name">{g.name}</div>
                <div className="mega-meta">{g.meta}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mega${open === "shop" ? " open" : ""}`}
        onMouseEnter={() => setOpen("shop")}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mega-inner">
          <div className="mega-grid">
            {SHOP_COLS.map((col) => (
              <div key={col.title}>
                <p className="mega-col-title">{col.title}</p>
                <div className="mega-links">
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} onClick={() => setOpen(null)}>{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mega-col-title">Featured</p>
              <Link href="/buy/oz9-v2-hypercomp" className="mega-card" onClick={() => setOpen(null)}>
                <div className="mega-thumb">
                  <Image src="/products/oz9-hypercomp-hero.jpg" alt="OZ9 V2 Hypercomp" width={220} height={165} />
                </div>
                <div className="mega-name">Hypercomp</div>
                <div className="mega-meta">Now shipping</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mnav${mobileOpen ? " open" : ""}`}>
        <div className="mnav-sec">
          <h4>Guns</h4>
          {GUNS.map((g) => (
            <Link key={g.name} href={g.href} onClick={() => setMobileOpen(false)}>{g.name}</Link>
          ))}
        </div>
        <div className="mnav-sec">
          <h4>Shop</h4>
          <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop all parts</Link>
          {SHOP_COLS[0].links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
