// Thin fetch wrappers for the WooCommerce Store API.
// Catalog calls run server-side (ISR-cacheable); cart calls run in the
// browser and carry the Cart-Token header for headless session continuity.

export function storeUrl(): string {
  const url = process.env.NEXT_PUBLIC_WC_STORE_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_WC_STORE_URL is not set — woocommerce provider unavailable",
    );
  }
  return url.replace(/\/$/, "");
}

export function checkoutUrl(): string {
  return (
    process.env.NEXT_PUBLIC_WC_CHECKOUT_URL ?? `${storeUrl()}/checkout/`
  );
}

export function revalidateSeconds(): number {
  const n = Number(process.env.WC_REVALIDATE_SECONDS);
  return Number.isFinite(n) && n > 0 ? n : 300;
}

// Server-side catalog fetch with ISR.
export async function storeApiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${storeUrl()}/wp-json/wc/store/v1${path}`, {
    next: { revalidate: revalidateSeconds() },
  });
  if (!res.ok) {
    throw new Error(`Store API ${path} responded ${res.status}`);
  }
  return res.json() as Promise<T>;
}

const CART_TOKEN_KEY = "zt_cart_token";

// Browser-side cart fetch carrying the Cart-Token session header.
export async function cartApiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const token = window.localStorage.getItem(CART_TOKEN_KEY);
  if (token) headers.set("Cart-Token", token);

  const res = await fetch(`${storeUrl()}/wp-json/wc/store/v1${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const newToken = res.headers.get("Cart-Token");
  if (newToken) window.localStorage.setItem(CART_TOKEN_KEY, newToken);

  if (!res.ok) {
    throw new Error(`Store API ${path} responded ${res.status}`);
  }
  return res.json() as Promise<T>;
}
