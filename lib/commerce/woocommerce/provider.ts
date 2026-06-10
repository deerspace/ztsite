import type { AddItemOptions, CatalogProvider, CartClient, GetProductsParams } from "../provider";
import type { StoreCart, StoreCategory, StoreProduct } from "../types";
import { cartApiFetch, storeApiFetch } from "./client";

async function resolveCategoryId(slug: string): Promise<number | null> {
  const categories = await storeApiFetch<StoreCategory[]>(
    "/products/categories?per_page=100",
  );
  return categories.find((c) => c.slug === slug)?.id ?? null;
}

export const wooCatalog: CatalogProvider = {
  async getProducts(params: GetProductsParams = {}): Promise<StoreProduct[]> {
    const { categorySlug, perPage = 100, page = 1 } = params;
    const query = new URLSearchParams({
      per_page: String(perPage),
      page: String(page),
    });
    if (categorySlug) {
      const id = await resolveCategoryId(categorySlug);
      if (id === null) return [];
      query.set("category", String(id));
    }
    return storeApiFetch<StoreProduct[]>(`/products?${query}`);
  },

  async getProductBySlug(slug: string): Promise<StoreProduct | null> {
    const products = await storeApiFetch<StoreProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}`,
    );
    return products[0] ?? null;
  },

  async getCategories(): Promise<StoreCategory[]> {
    return storeApiFetch<StoreCategory[]>("/products/categories?per_page=100");
  },

  async getCategoryBySlug(slug: string): Promise<StoreCategory | null> {
    const categories = await storeApiFetch<StoreCategory[]>(
      "/products/categories?per_page=100",
    );
    return categories.find((c) => c.slug === slug) ?? null;
  },
};

export class WooCartClient implements CartClient {
  getCart(): Promise<StoreCart> {
    return cartApiFetch<StoreCart>("/cart");
  }

  // opts.variation maps to the Store API `variation` body; a real store would
  // resolve the configured attributes to the matching variation_id.
  addItem(productId: number, quantity: number, opts?: AddItemOptions): Promise<StoreCart> {
    return cartApiFetch<StoreCart>("/cart/add-item", {
      method: "POST",
      body: JSON.stringify({ id: productId, quantity, variation: opts?.variation }),
    });
  }

  updateItem(key: string, quantity: number): Promise<StoreCart> {
    return cartApiFetch<StoreCart>("/cart/update-item", {
      method: "POST",
      body: JSON.stringify({ key, quantity }),
    });
  }

  removeItem(key: string): Promise<StoreCart> {
    return cartApiFetch<StoreCart>("/cart/remove-item", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }
}
