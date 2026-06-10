"use client";

import Link from "next/link";
import CartLineItem from "./CartLineItem";
import CheckoutButton from "./CheckoutButton";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/money";

// Full-page cart. Client component: cart state lives in the browser.
export default function CartView() {
  const { cart, ready } = useCart();

  if (!ready) return <div className="cart-page" aria-busy="true" />;

  const items = cart?.items ?? [];
  if (items.length === 0 || !cart) {
    return (
      <div className="cart-page">
        <h1>Your bag is empty.</h1>
        <div className="cart-empty">
          <p>Performance is one click away.</p>
          <Link className="btn btn-primary" href="/shop">
            Shop the lineup
          </Link>
        </div>
      </div>
    );
  }

  const total = formatPrice(
    cart.totals.total_price,
    cart.totals.currency_minor_unit,
    cart.totals.currency_symbol,
  );

  return (
    <div className="cart-page">
      <h1>Review your bag.</h1>
      <div className="cart-list">
        {items.map((item) => (
          <CartLineItem key={item.key} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="row">
          <span>Subtotal</span>
          <span>{total}</span>
        </div>
        <div className="row">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>{total}</span>
        </div>
        <p className="note">Tax and FFL transfer details are handled at checkout.</p>
        <div className="cart-actions">
          <Link className="link-arrow" href="/shop">
            Continue shopping <span>›</span>
          </Link>
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
