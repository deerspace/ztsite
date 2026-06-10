"use client";

import Link from "next/link";
import { useEffect } from "react";
import CartLineItem from "./CartLineItem";
import CheckoutButton from "./CheckoutButton";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/money";

const FREE_SHIP_THRESHOLD = 9900; // cents — matches the promo ribbon

// Right-side slide-over cart drawer.
export default function MiniCart() {
  const { cart, miniCartOpen, closeMiniCart } = useCart();
  const items = cart?.items ?? [];

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = miniCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [miniCartOpen]);

  const minor = cart?.totals.currency_minor_unit ?? 2;
  const symbol = cart?.totals.currency_symbol ?? "$";
  const total = Number(cart?.totals.total_price ?? 0);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - total);
  const progress = Math.min(1, total / FREE_SHIP_THRESHOLD);

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

        {items.length > 0 && (
          <div className="ship-progress">
            <p>
              {remaining > 0 ? (
                <>You&apos;re <strong>{formatPrice(String(remaining), minor, symbol)}</strong> from free shipping.</>
              ) : (
                <>You&apos;ve unlocked <strong>free shipping</strong>. ✓</>
              )}
            </p>
            <div className="ship-bar"><span style={{ width: `${progress * 100}%` }} /></div>
          </div>
        )}

        <div className="minicart-items">
          {items.length === 0 && (
            <div className="minicart-empty">
              <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true" style={{ margin: "0 auto 14px" }}>
                <path d="M10 16h28l-2.5 22h-23z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M17 16a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <p>Your bag is empty.</p>
              <Link className="btn btn-dark btn-sm" href="/shop" onClick={closeMiniCart} style={{ marginTop: 16 }}>
                Shop the lineup
              </Link>
            </div>
          )}
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
