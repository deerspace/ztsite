import type { CartClient } from "../provider";
import type { StoreCart, StoreCartItem } from "../types";
import { mockProducts } from "./catalog";

const STORAGE_KEY = "zt_cart_v1";

interface StoredLine {
  id: number;
  quantity: number;
}

function readLines(): StoredLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is StoredLine =>
        typeof l === "object" && l !== null &&
        typeof (l as StoredLine).id === "number" &&
        typeof (l as StoredLine).quantity === "number",
    );
  } catch {
    return [];
  }
}

function writeLines(lines: StoredLine[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

function toCart(lines: StoredLine[]): StoreCart {
  const items: StoreCartItem[] = [];
  for (const line of lines) {
    const product = mockProducts.find((p) => p.id === line.id);
    if (!product) continue;
    // Variable products price from the range minimum in mock mode.
    const unit = Number(
      product.prices.price_range?.min_amount ?? product.prices.price,
    );
    const lineTotal = String(unit * line.quantity);
    items.push({
      key: `mock-${product.id}`,
      id: product.id,
      quantity: line.quantity,
      name: product.name,
      short_description: product.short_description,
      sku: product.sku,
      images: product.images,
      prices: product.prices,
      totals: {
        line_subtotal: lineTotal,
        line_total: lineTotal,
        currency_code: "USD",
        currency_symbol: "$",
        currency_minor_unit: 2,
      },
    });
  }
  const total = items.reduce((sum, i) => sum + Number(i.totals.line_total), 0);
  return {
    items,
    items_count: items.reduce((sum, i) => sum + i.quantity, 0),
    totals: {
      total_items: String(total),
      total_price: String(total),
      currency_code: "USD",
      currency_symbol: "$",
      currency_minor_unit: 2,
    },
  };
}

export class MockCartClient implements CartClient {
  async getCart(): Promise<StoreCart> {
    return toCart(readLines());
  }

  async addItem(productId: number, quantity: number): Promise<StoreCart> {
    const lines = readLines();
    const existing = lines.find((l) => l.id === productId);
    if (existing) existing.quantity += quantity;
    else lines.push({ id: productId, quantity });
    writeLines(lines);
    return toCart(lines);
  }

  async updateItem(key: string, quantity: number): Promise<StoreCart> {
    const id = Number(key.replace("mock-", ""));
    let lines = readLines();
    if (quantity <= 0) {
      lines = lines.filter((l) => l.id !== id);
    } else {
      const line = lines.find((l) => l.id === id);
      if (line) line.quantity = quantity;
    }
    writeLines(lines);
    return toCart(lines);
  }

  async removeItem(key: string): Promise<StoreCart> {
    const id = Number(key.replace("mock-", ""));
    const lines = readLines().filter((l) => l.id !== id);
    writeLines(lines);
    return toCart(lines);
  }
}
