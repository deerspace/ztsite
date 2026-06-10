import { NextResponse } from "next/server";
import { isRealStore } from "@/lib/commerce";
import { checkoutUrl, storeUrl } from "@/lib/commerce/woocommerce/client";

interface HandoffLine {
  id: number;
  quantity: number;
}

// Hands the headless cart to the WooCommerce-hosted checkout.
//
// Real mode: rebuilds the cart server-side via CoCart (guest session), then
// returns the WP checkout URL with ?cocart-load-cart=<key> — CoCart's
// "Load Cart from Session" merges it into the shopper's WP session, so they
// land on the normal checkout with the cart intact. No payment code here.
//
// Mock mode: returns the local /checkout stub.
export async function POST(request: Request) {
  let lines: HandoffLine[];
  try {
    const body = (await request.json()) as { items?: HandoffLine[] };
    lines = (body.items ?? []).filter(
      (l) => typeof l?.id === "number" && typeof l?.quantity === "number" && l.quantity > 0,
    );
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (lines.length === 0) {
    return NextResponse.json({ error: "empty cart" }, { status: 400 });
  }

  if (!isRealStore()) {
    return NextResponse.json({ url: "/checkout" });
  }

  // CoCart wants id/quantity as strings; the cart key from the first response
  // is threaded through subsequent adds so all lines land in one guest cart.
  let cartKey: string | null = null;
  for (const line of lines) {
    const url = new URL(`${storeUrl()}/wp-json/cocart/v2/cart/add-item`);
    if (cartKey) url.searchParams.set("cart_key", cartKey);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: String(line.id), quantity: String(line.quantity) }),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `store responded ${res.status}` },
        { status: 502 },
      );
    }
    cartKey ??= res.headers.get("CoCart-API-Cart-Key");
  }
  if (!cartKey) {
    return NextResponse.json(
      { error: "store did not return a cart key — is CoCart installed?" },
      { status: 502 },
    );
  }

  const destination = new URL(checkoutUrl());
  destination.searchParams.set("cocart-load-cart", cartKey);
  return NextResponse.json({ url: destination.toString() });
}
