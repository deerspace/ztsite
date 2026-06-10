"use client";

import Link from "next/link";
import { useEffect } from "react";
import CartLineItem from "./CartLineItem";
import CheckoutButton from "./CheckoutButton";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/money";

// Right-side slide-over cart drawer.
export default function MiniCart() {
  const { cart, miniCartOpen, closeMiniCart } = useCart();
  const items = cart?.items ?? [];

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = miniCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [miniCartOpen]);

  return (
    <div className={`minicart-root${miniCartOpen ? " open" : ""}`} aria-hidden={!miniCartOpen}>
      <div className="minicart-overlay" onClick={closeMiniCart} />
      <aside className="minicart" role="dialog" aria-label="Shopping cart">
        <div className="minicart-head">
          <h3>Your bag</h3>
          <button className="minicart-close" aria-label="Close cart" onClick={closeMiniCart}>
            ×
          </button>
        </div>
        <div className="minicart-items">
          {items.length === 0 && <p className="minicart-empty">Your bag is empty.</p>}
          {items.map((item) => (
            <CartLineItem key={item.key} item={item} />
          ))}
        </div>
        {items.length > 0 && cart && (
          <div className="minicart-foot">
            <div className="minicart-total">
              <span>Subtotal</span>
              <span>
                {formatPrice(
                  cart.totals.total_price,
                  cart.totals.currency_minor_unit,
                  cart.totals.currency_symbol,
                )}
              </span>
            </div>
            <CheckoutButton />
            <Link href="/cart" className="link-arrow" onClick={closeMiniCart}>
              Review bag <span>›</span>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
