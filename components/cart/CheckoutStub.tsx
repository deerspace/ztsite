"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import ProductArt, { slugFromSku } from "@/components/art/ProductArt";
import { formatPrice } from "@/lib/money";

// Mock-mode checkout destination: shows what the handoff will do in production.
export default function CheckoutStub() {
  const { cart, ready } = useCart();
  const items = cart?.items ?? [];

  return (
    <div className="checkout-stub">
      <p className="eyebrow">Checkout</p>
      <h1>This is where WooCommerce takes over.</h1>
      <div className="stub-card">
        {!ready && <p className="minicart-empty">Loading…</p>}
        {ready && items.length === 0 && <p className="minicart-empty">Your bag is empty.</p>}
        {items.map((item) => (
          <div className="line" key={item.key}>
            <span className="line-art" aria-hidden="true">
              <ProductArt slug={slugFromSku(item.sku)} />
            </span>
            <div className="line-info">
              <span className="line-name">{item.name}</span>
              <div className="line-meta">Qty {item.quantity}</div>
            </div>
            <span className="line-price">
              {formatPrice(
                item.totals.line_total,
                item.totals.currency_minor_unit,
                item.totals.currency_symbol,
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="stub-note">
        The storefront is running in mock mode. With a real store connected, the Check out button
        sends this cart to the existing WooCommerce checkout — payments, tax, shipping, FFL
        selection, and compliance plugins all run there, untouched. Set
        <code> NEXT_PUBLIC_WC_STORE_URL</code> to enable it (see the README runbook).
      </p>
      <div className="cta-row center" style={{ justifyContent: "center" }}>
        <Link className="link-arrow" href="/cart">
          Back to bag <span>›</span>
        </Link>
      </div>
    </div>
  );
}
