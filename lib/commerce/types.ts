// Type definitions mirroring WooCommerce Store API (/wc/store/v1) response
// schemas. These are the contract between the mock provider and the real
// store — keep them aligned with
// https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/

export interface StoreImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

// All amounts are minor-unit strings, e.g. "179900" with currency_minor_unit 2
// means $1,799.00 — exactly as the Store API returns them.
export interface StorePrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: { min_amount: string; max_amount: string } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface StoreProductCategory {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface StoreProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  description: string;
  short_description: string;
  prices: StorePrices;
  images: StoreImage[];
  categories: StoreProductCategory[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  has_options: boolean;
  on_sale: boolean;
}

export interface StoreCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: StoreImage | null;
}

export interface StoreCartItemTotals {
  line_subtotal: string;
  line_total: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
}

export interface StoreCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description: string;
  sku: string;
  images: StoreImage[];
  prices: StorePrices;
  totals: StoreCartItemTotals;
}

export interface StoreCartTotals {
  total_items: string;
  total_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
}

export interface StoreCart {
  items: StoreCartItem[];
  items_count: number;
  totals: StoreCartTotals;
}
