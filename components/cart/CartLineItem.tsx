"use client";

import Link from "next/link";
import ProductArt, { slugFromSku } from "@/components/art/ProductArt";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/money";
import type { StoreCartItem } from "@/lib/commerce";

// One cart line, shared by the mini-cart drawer and the /cart page.
export default function CartLineItem({ item }: { item: StoreCartItem }) {
  const { updateItem, removeItem, busy } = useCart();
  const image = item.images[0];
  const slug = slugFromSku(item.sku);

  return (
    <div className="line">
      <Link href={`/product/${slug}`} className="line-art" aria-hidden="true" tabIndex={-1}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.thumbnail || image.src} alt="" />
        ) : (
          <ProductArt slug={slug} />
        )}
      </Link>
      <div className="line-info">
        <Link href={`/product/${slug}`} className="line-name">
          {item.name}
        </Link>
        <div className="line-meta">
          <div className="qty">
            <button
              aria-label="Decrease quantity"
              disabled={busy}
              onClick={() => updateItem(item.key, item.quantity - 1)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              disabled={busy}
              onClick={() => updateItem(item.key, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button className="line-remove" disabled={busy} onClick={() => removeItem(item.key)}>
            Remove
          </button>
        </div>
      </div>
      <span className="line-price">
        {formatPrice(item.totals.line_total, item.totals.currency_minor_unit, item.totals.currency_symbol)}
      </span>
    </div>
  );
}
