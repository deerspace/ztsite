// Formats Store API minor-unit amount strings, e.g. ("179900", 2) → "$1,799".
// Whole-dollar amounts drop the cents (matching the marketing-site style);
// fractional amounts keep two decimals.
export function formatPrice(
  amount: string,
  minorUnit: number = 2,
  symbol: string = "$",
): string {
  const value = Number(amount) / 10 ** minorUnit;
  if (!Number.isFinite(value)) return `${symbol}0`;
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return (
    symbol +
    value.toLocaleString("en-US", {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: hasCents ? 2 : 0,
    })
  );
}
