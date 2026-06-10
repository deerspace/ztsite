import type { StoreCart, StoreCartVariation, StoreCategory, StoreProduct } from "./types";

// Extra context for a configured add-to-cart (firearm builds). Mock mode
// stores these on the line; real WooCommerce maps them to a variation_id.
export interface AddItemOptions {
  variation?: StoreCartVariation[];
  unitPrice?: number; // cents — overrides base price for configured builds
}

export interface GetProductsParams {
  categorySlug?: string;
  perPage?: number;
  page?: number;
}

// Server-side catalog reads. Implementations must be safe to call from
// server components and cacheable via ISR.
export interface CatalogProvider {
  getProducts(params?: GetProductsParams): Promise<StoreProduct[]>;
  getProductBySlug(slug: string): Promise<StoreProduct | null>;
  getCategories(): Promise<StoreCategory[]>;
  getCategoryBySlug(slug: string): Promise<StoreCategory | null>;
}

// Browser-side cart operations. Only called from CartProvider (client).
export interface CartClient {
  getCart(): Promise<StoreCart>;
  addItem(productId: number, quantity: number, opts?: AddItemOptions): Promise<StoreCart>;
  updateItem(key: string, quantity: number): Promise<StoreCart>;
  removeItem(key: string): Promise<StoreCart>;
}
