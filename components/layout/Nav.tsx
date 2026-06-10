"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ZevLogo from "@/components/art/ZevLogo";
import SearchOverlay from "@/components/search/SearchOverlay";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCount = useRef(0);
  const pathname = usePathname();
  const { cart, ready, openMiniCart } = useCart();
  const count = cart?.items_count ?? 0;

  // Bump the cart badge whenever the item count grows.
  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 420);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  // Hover intent — a small grace period stops the panel flickering closed
  // when the pointer crosses the gap between trigger and panel.
  const openMenu = (which: "guns" | "shop") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(which);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menus on navigation.
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);

  const inGuns = pathname.startsWith("/guns");
  const inShop = pathname.startsWith("/shop") || pathname.startsWith("/category") || pathname.startsWith("/buy") || pathname.startsWith("/product");

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <nav className="nav-inner" aria-label="Global">
        <Link className="nav-logo" href="/" aria-label="ZEV Technologies home">
          <ZevLogo />
        </Link>

        <ul className="nav-links" onMouseLeave={scheduleClose}>
          <li
            className={`nav-item${open === "guns" ? " open" : ""}${inGuns ? " active" : ""}`}
            onMouseEnter={() => openMenu("guns")}
          >
            <button onClick={() => setOpen(open === "guns" ? null : "guns")} aria-expanded={open === "guns"} aria-haspopup="true">Guns</button>
          </li>
          <li
            className={`nav-item${open === "shop" ? " open" : ""}${inShop ? " active" : ""}`}
            onMouseEnter={() => openMenu("shop")}
          >
            <button onClick={() => setOpen(open === "shop" ? null : "shop")} aria-expanded={open === "shop"} aria-haspopup="true">Shop</button>
          </li>
          <li className="nav-item" onMouseEnter={scheduleClose}><Link href="/guns/fdp">Experience</Link></li>
          <li className="nav-item" onMouseEnter={scheduleClose}><Link href="/#support">Support</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-icon" aria-label="Search the store" onClick={() => setSearchOpen(true)}>
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button className="nav-icon" aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`} onClick={openMiniCart}>
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M3 5h10l-1 9H4z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.5 5a2.5 2.5 0 0 1 5 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {ready && count > 0 && <span className={`nav-badge${bump ? " bump" : ""}`}>{count}</span>}
          </button>
          <button className="nav-burger" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
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
        onMouseEnter={() => openMenu("guns")}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-inner">
          <p className="mega-col-title">Explore the lineup</p>
          <div className="mega-grid">
            {GUNS.map((g) => (
              <Link key={g.name} href={g.href} className="mega-card">
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
        onMouseEnter={() => openMenu("shop")}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-inner">
          <div className="mega-grid">
            {SHOP_COLS.map((col) => (
              <div key={col.title}>
                <p className="mega-col-title">{col.title}</p>
                <div className="mega-links">
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href}>{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mega-col-title">Featured</p>
              <Link href="/buy/oz9-v2-hypercomp" className="mega-card">
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu */}
      <div className={`mnav${mobileOpen ? " open" : ""}`}>
        <div className="mnav-sec">
          <h4>Guns</h4>
          {GUNS.map((g) => (
            <Link key={g.name} href={g.href}>{g.name}</Link>
          ))}
        </div>
        <div className="mnav-sec">
          <h4>Shop</h4>
          <Link href="/shop">Shop all parts</Link>
          {SHOP_COLS[0].links.map((l) => (
            <Link key={l.label} href={l.href}>{l.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
