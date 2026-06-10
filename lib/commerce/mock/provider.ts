import type { CatalogProvider, GetProductsParams } from "../provider";
import type { StoreCategory, StoreProduct } from "../types";
import { mockCategories, mockProducts } from "./catalog";

export const mockCatalog: CatalogProvider = {
  async getProducts(params: GetProductsParams = {}): Promise<StoreProduct[]> {
    const { categorySlug, perPage = 100, page = 1 } = params;
    let products = mockProducts;
    if (categorySlug) {
      products = products.filter((p) =>
        p.categories.some((c) => c.slug === categorySlug),
      );
    }
    const start = (page - 1) * perPage;
    return products.slice(start, start + perPage);
  },

  async getProductBySlug(slug: string): Promise<StoreProduct | null> {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  },

  async getCategories(): Promise<StoreCategory[]> {
    return mockCategories;
  },

  async getCategoryBySlug(slug: string): Promise<StoreCategory | null> {
    return mockCategories.find((c) => c.slug === slug) ?? null;
  },
};
