import type { AddItemOptions, CartClient } from "../provider";
import type { StoreCart, StoreCartItem, StoreCartVariation } from "../types";
import { mockProducts } from "./catalog";

const STORAGE_KEY = "zt_cart_v1";

interface StoredLine {
  id: number;
  quantity: number;
  variation?: StoreCartVariation[];
  unitPrice?: number; // cents
}

// Stable, collision-free key per (product, configuration). Two adds of the
// same product with the same options merge; different options stay separate.
function lineKey(line: StoredLine): string {
  if (!line.variation || line.variation.length === 0) return `mock-${line.id}`;
  const sig = line.variation.map((v) => v.value).join("_").replace(/[^a-z0-9]+/gi, "-");
  return `mock-${line.id}-${sig.toLowerCase()}`;
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
    const unit = line.unitPrice ?? Number(product.prices.price_range?.min_amount ?? product.prices.price);
    const lineTotal = String(unit * line.quantity);
    items.push({
      key: lineKey(line),
      id: product.id,
      quantity: line.quantity,
      name: product.name,
      short_description: product.short_description,
      sku: product.sku,
      images: product.images,
      prices: product.prices,
      variation: line.variation,
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

  async addItem(productId: number, quantity: number, opts?: AddItemOptions): Promise<StoreCart> {
    const lines = readLines();
    const candidate: StoredLine = { id: productId, quantity, variation: opts?.variation, unitPrice: opts?.unitPrice };
    const key = lineKey(candidate);
    const existing = lines.find((l) => lineKey(l) === key);
    if (existing) existing.quantity += quantity;
    else lines.push(candidate);
    writeLines(lines);
    return toCart(lines);
  }

  async updateItem(key: string, quantity: number): Promise<StoreCart> {
    let lines = readLines();
    if (quantity <= 0) {
      lines = lines.filter((l) => lineKey(l) !== key);
    } else {
      const line = lines.find((l) => lineKey(l) === key);
      if (line) line.quantity = quantity;
    }
    writeLines(lines);
    return toCart(lines);
  }

  async removeItem(key: string): Promise<StoreCart> {
    const lines = readLines().filter((l) => lineKey(l) !== key);
    writeLines(lines);
    return toCart(lines);
  }
}
