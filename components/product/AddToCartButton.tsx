"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

// Quantity stepper + add-to-bag. Opens the mini-cart on success (CartProvider
// does that), with a brief confirmation state on the button itself.
export default function AddToCartButton({
  productId,
  purchasable,
}: {
  productId: number;
  purchasable: boolean;
}) {
  const { addItem, busy } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const add = async () => {
    await addItem(productId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="add-row">
      <div className="qty">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span>{quantity}</span>
        <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
          +
        </button>
      </div>
      <button className="btn btn-primary" disabled={busy || !purchasable} onClick={add}>
        {added ? "Added ✓" : "Add to Bag"}
      </button>
    </div>
  );
}
