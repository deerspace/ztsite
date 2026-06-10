# ztsite — ZEV Technologies headless storefront (concept)

A concept redesign of [zevtechnologies.com](https://www.zevtechnologies.com/) in the design language of [apple.com](https://www.apple.com/), built as a **Next.js headless-WooCommerce storefront**: Next.js owns browsing, product pages, and the cart; the final checkout step hands off to the existing WordPress/WooCommerce checkout, so payments, tax, shipping, and FFL/compliance plugins keep working untouched. No payment code lives in this repo.

> The original static concept is preserved at the `static-concept` git tag.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript — no other runtime dependencies
- Hand-rolled CSS design system in [app/globals.css](app/globals.css) (no Tailwind)
- Product art is inline SVG ([components/art/](components/art/)); real product photos drop in automatically once the store provides images

## Run it

```sh
npm install
npm run dev          # http://localhost:3000 — mock mode, no env vars needed
npm run build        # prerenders every product/category page
```

**Mock mode (default):** a typed in-repo catalog (`lib/commerce/mock/`) shaped exactly like WooCommerce Store API responses, with a localStorage cart. The checkout button lands on a local stub page. Prices are placeholders.

## Architecture

```
lib/commerce/
  types.ts        Store API (/wc/store/v1) response shapes — the contract
  provider.ts     CatalogProvider (server) + CartClient (browser) interfaces
  index.ts        env-based switch: mock ↔ woocommerce
  mock/           in-repo catalog + localStorage cart
  woocommerce/    Store API catalog (ISR) + cart with Cart-Token sessions
app/api/checkout/handoff/   POST → returns checkout destination URL
```

- Catalog pages use ISR (`revalidate = 300`, override with `WC_REVALIDATE_SECONDS`).
- Cart sessions in real mode use the Store API `Cart-Token` header (persisted in localStorage).
- Checkout handoff in real mode rebuilds the cart server-side via the **CoCart** plugin and redirects to `{checkout}?cocart-load-cart=<key>` — CoCart merges it into the shopper's WP session.

## Connect the real store (runbook)

1. **WordPress plugins**: WooCommerce ≥ 8.x (Store API is core) and [CoCart](https://wordpress.org/plugins/cart-rest-api-for-woocommerce/) (free core plugin) for the checkout handoff.
2. **CORS**: the browser calls the Store API cross-origin. Allow the storefront origin with `Access-Control-Allow-Headers: Content-Type, Cart-Token` and `Access-Control-Expose-Headers: Cart-Token, CoCart-API-Cart-Key` (CoCart has built-in CORS support).
3. **Bot protection**: allowlist `/wp-json/wc/store/*` and `/wp-json/cocart/*` for the storefront origin and the host's egress IPs.
4. **Smoke-test with curl**: products list, `?slug=` lookup, categories, and a cart `add-item` round-trip confirming the `Cart-Token` response header.
5. **Env vars** (see [.env.example](.env.example)): set `NEXT_PUBLIC_WC_STORE_URL`; optionally `NEXT_PUBLIC_WC_CHECKOUT_URL`, `NEXT_PUBLIC_COMMERCE_PROVIDER`, `WC_REVALIDATE_SECONDS`.
6. **Images**: add the WP media host to `images.remotePatterns` in [next.config.ts](next.config.ts).
7. Redeploy. No code changes — real products, prices, and images replace the mocks via `generateStaticParams`.

**Known limitation:** variable products (`has_options: true`) add their base configuration to the cart; a variation picker on the product page is a follow-up before connecting a store with required options.

**CoCart fallback** (only if CoCart can't be installed): a ~40-line WP mu-plugin exposing a handoff endpoint that stores line items in a transient and populates `WC()->cart` on a `template_redirect` hook when checkout is hit with the token.

## Notes

- Product names are real ZEV catalog items; prices are educated placeholders to verify.
- This is a fan/concept project — not affiliated with or endorsed by ZEV Technologies.
