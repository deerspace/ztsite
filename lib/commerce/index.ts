import type { CartClient, CatalogProvider } from "./provider";
import { mockCatalog } from "./mock/provider";
import { MockCartClient } from "./mock/cart";
import { wooCatalog } from "./woocommerce/provider";
import { WooCartClient } from "./woocommerce/provider";

export * from "./types";
export type { CatalogProvider, CartClient, GetProductsParams, AddItemOptions } from "./provider";

// Real mode iff explicitly requested, or a store URL is configured and mock
// isn't explicitly forced. With no env vars at all, mock mode runs everywhere.
// The NEXT_PUBLIC_ variant exists because the override must also reach
// browser bundles, where un-prefixed env vars are never inlined.
export function isRealStore(): boolean {
  const override =
    process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? process.env.COMMERCE_PROVIDER;
  if (override === "mock") return false;
  if (override === "woocommerce") return true;
  return Boolean(process.env.NEXT_PUBLIC_WC_STORE_URL);
}

export const catalog: CatalogProvider = isRealStore() ? wooCatalog : mockCatalog;

export function createCartClient(): CartClient {
  return isRealStore() ? new WooCartClient() : new MockCartClient();
}
