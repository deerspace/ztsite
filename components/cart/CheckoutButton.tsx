"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

// Hands the cart off to checkout. The /api/checkout/handoff route returns the
// destination: the local stub in mock mode, or the WooCommerce checkout page
// (with the cart preloaded via CoCart) when a real store is connected.
export default function CheckoutButton() {
  const { cart } = useCart();
  const [pending, setPending] = useState(false);
  const items = cart?.items ?? [];

  const checkout = async () => {
    setPending(true);
    try {
      const res = await fetch("/api/checkout/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      if (!res.ok) throw new Error(`handoff responded ${res.status}`);
      const { url } = (await res.json()) as { url: string };
      window.location.assign(url);
    } catch (err) {
      console.error("checkout handoff failed", err);
      setPending(false);
    }
  };

  return (
    <button className="btn btn-primary" disabled={pending || items.length === 0} onClick={checkout}>
      {pending ? "Preparing checkout…" : "Check out"}
    </button>
  );
}
