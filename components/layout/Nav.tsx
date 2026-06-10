"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ZevLogo from "@/components/art/ZevLogo";
import SearchOverlay from "@/components/search/SearchOverlay";
import { useCart } from "@/components/cart/CartProvider";

interface NavLink {
  label: string;
  href: string;
}

// Store dropdown — modeled on apple.com's Store menu.
const STORE_SHOP: NavLink[] = [
  { label: "Shop the Latest", href: "/store" },
  { label: "FDP", href: "/buy/fdp" },
  { label: "OZ9 V2 Elite", href: "/buy/oz9-v2-elite" },
  { label: "OZ9 V2 Combat", href: "/buy/oz9-v2-combat" },
  { label: "OZ9 V2 Hypercomp", href: "/buy/oz9-v2-hypercomp" },
  { label: "Core Elite", href: "/buy/core-elite-rifle" },
];

const STORE_QUICK: NavLink[] = [
  { label: "Dealer Locator", href: "/dealers" },
  { label: "Warranty & Return Policy", href: "/warranty" },
  { label: "Product Registration", href: "/register" },
  { label: "Become a Dealer", href: "/become-a-dealer" },
  { label: "Purchasing Firearms FAQ", href: "/firearms-faq" },
  { label: "Instructional Videos", href: "/videos" },
];

// Per-product-line menus (apple.com Mac/iPhone style): an "Explore" column of
// large links and a "Shop" column of buy links.
interface ProductMenu {
  key: string;
  label: string;
  match: string;
  exploreTitle: string;
  explore: NavLink[];
  shopTitle: string;
  shop: NavLink[];
}

const PRODUCT_MENUS: ProductMenu[] = [
  {
    key: "fdp",
    label: "FDP",
    match: "fdp",
    exploreTitle: "Explore FDP",
    explore: [{ label: "FDP", href: "/guns/fdp" }],
    shopTitle: "Shop FDP",
    shop: [
      { label: "Buy FDP", href: "/buy/fdp" },
      { label: "FDP Accessories", href: "/shop" },
    ],
  },
  {
    key: "oz9",
    label: "OZ9",
    match: "oz9",
    exploreTitle: "Explore OZ9",
    explore: [
      { label: "OZ9 V2 Elite", href: "/guns/oz9-v2-elite" },
      { label: "OZ9 V2 Combat", href: "/guns/oz9-v2-combat" },
      { label: "OZ9 V2 Hypercomp", href: "/guns/oz9-v2-hypercomp" },
    ],
    shopTitle: "Shop OZ9",
    shop: [
      { label: "Buy OZ9 V2 Elite", href: "/buy/oz9-v2-elite" },
      { label: "Buy OZ9 V2 Combat", href: "/buy/oz9-v2-combat" },
      { label: "Buy OZ9 V2 Hypercomp", href: "/buy/oz9-v2-hypercomp" },
      { label: "OZ9 Accessories", href: "/shop" },
    ],
  },
  {
    key: "core-elite",
    label: "Core Elite",
    match: "core-elite",
    exploreTitle: "Explore Core Elite",
    explore: [
      { label: "Core Elite Rifle", href: "/guns/core-elite" },
      { label: "Core Elite Pistol", href: "/guns/core-elite" },
    ],
    shopTitle: "Shop Core Elite",
    shop: [
      { label: "Buy Core Elite Rifle", href: "/buy/core-elite-rifle" },
      { label: "Buy Core Elite Pistol", href: "/buy/core-elite-pistol" },
    ],
  },
];

const STORE_ROUTES = ["/store", "/shop", "/category", "/product", "/dealers", "/warranty", "/register", "/become-a-dealer", "/firearms-faq", "/videos", "/cart", "/checkout"];

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCount = useRef(0);
  const pathname = usePathname();
  const { cart, ready, openMiniCart } = useCart();
  const count = cart?.items_count ?? 0;

  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 420);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  // Hover intent — a small grace period stops the panel flickering closed.
  const openMenu = (which: string) => {
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);

  const activeProduct = PRODUCT_MENUS.find((m) => pathname.includes(m.match));
  const inStore = !activeProduct && STORE_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <nav className="nav-inner" aria-label="Global">
        <Link className="nav-logo" href="/" aria-label="ZEV Technologies home">
          <ZevLogo />
        </Link>

        <ul className="nav-links" onMouseLeave={scheduleClose}>
          <li
            className={`nav-item${open === "store" ? " open" : ""}${inStore ? " active" : ""}`}
            onMouseEnter={() => openMenu("store")}
          >
            <button onClick={() => setOpen(open === "store" ? null : "store")} aria-expanded={open === "store"} aria-haspopup="true">Store</button>
          </li>
          {PRODUCT_MENUS.map((m) => (
            <li
              key={m.key}
              className={`nav-item${open === m.key ? " open" : ""}${activeProduct?.key === m.key ? " active" : ""}`}
              onMouseEnter={() => openMenu(m.key)}
            >
              <button onClick={() => setOpen(open === m.key ? null : m.key)} aria-expanded={open === m.key} aria-haspopup="true">{m.label}</button>
            </li>
          ))}
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

      {/* Store — Apple-style text columns */}
      <div
        className={`mega${open === "store" ? " open" : ""}`}
        onMouseEnter={() => openMenu("store")}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-inner mega-store-inner">
          <div className="mega-store-col">
            <p className="mega-col-title">Shop</p>
            <div className="mega-shop-links">
              {STORE_SHOP.map((l) => (
                <Link key={l.label} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="mega-store-col">
            <p className="mega-col-title">Quick Links</p>
            <div className="mega-links">
              {STORE_QUICK.map((l) => (
                <Link key={l.label} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Per-product menus — Explore + Shop columns */}
      {PRODUCT_MENUS.map((m) => (
        <div
          key={m.key}
          className={`mega${open === m.key ? " open" : ""}`}
          onMouseEnter={() => openMenu(m.key)}
          onMouseLeave={scheduleClose}
        >
          <div className="mega-inner mega-store-inner">
            <div className="mega-store-col">
              <p className="mega-col-title">{m.exploreTitle}</p>
              <div className="mega-shop-links">
                {m.explore.map((l) => (
                  <Link key={l.label} href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
            <div className="mega-store-col">
              <p className="mega-col-title">{m.shopTitle}</p>
              <div className="mega-links">
                {m.shop.map((l) => (
                  <Link key={l.label} href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu */}
      <div className={`mnav${mobileOpen ? " open" : ""}`}>
        <div className="mnav-sec">
          <h4>Store</h4>
          {STORE_SHOP.map((l) => (
            <Link key={l.label} href={l.href}>{l.label}</Link>
          ))}
        </div>
        {PRODUCT_MENUS.map((m) => (
          <div className="mnav-sec" key={m.key}>
            <h4>{m.label}</h4>
            {m.explore.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
            {m.shop.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
          </div>
        ))}
        <div className="mnav-sec">
          <h4>Quick Links</h4>
          {STORE_QUICK.map((l) => (
            <Link key={l.label} href={l.href}>{l.label}</Link>
          ))}
        </div>
      </div>
    </header>

    {/* Blur curtain — blurs the page behind an open dropdown. Outside the
        header so its backdrop-filter isn't nested in the nav's own filter. */}
    <div className={`mega-overlay${open ? " open" : ""}`} onClick={() => setOpen(null)} />
    </>
  );
}
