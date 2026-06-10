import { formatPrice } from "@/lib/money";
import type { StoreProduct } from "@/lib/commerce";

// "From $1,799" for variable products (price_range minimum), "$389" otherwise.
export default function Price({ product }: { product: StoreProduct }) {
  const { prices, has_options } = product;
  const amount =
    has_options && prices.price_range ? prices.price_range.min_amount : prices.price;
  const formatted = formatPrice(amount, prices.currency_minor_unit, prices.currency_symbol);
  return <>{has_options ? `From ${formatted}` : formatted}</>;
}
