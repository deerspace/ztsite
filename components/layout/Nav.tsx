"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ZevLogo from "@/components/art/ZevLogo";
import { useCart } from "@/components/cart/CartProvider";

const LINKS = [
  { label: "Pistols", href: "/category/pistols" },
  { label: "Slides", href: "/category/slides" },
  { label: "Triggers", href: "/category/triggers" },
  { label: "Barrels", href: "/category/barrels" },
  { label: "Sights", href: "/category/sights" },
  { label: "Shop all", href: "/shop" },
  { label: "Support", href: "/#footer" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { cart, ready, openMiniCart } = useCart();
  const count = cart?.items_count ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <nav className="nav-inner" aria-label="Global">
        <Link className="nav-logo" href="/" aria-label="ZEV Technologies home">
          <ZevLogo />
        </Link>
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <Link className="nav-icon" href="/shop" aria-label="Search the store">
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <button className="nav-icon nav-cart" aria-label="Open cart" onClick={openMiniCart}>
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M3 5h10l-1 9H4z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.5 5a2.5 2.5 0 0 1 5 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {ready && count > 0 && <span className="nav-badge">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
