# ztsite — ZEV Technologies concept redesign

A concept redesign of [zevtechnologies.com](https://www.zevtechnologies.com/) inspired by the design language of [apple.com](https://www.apple.com/): translucent blurred navigation, oversized typography, full-bleed alternating product tiles, scroll-reveal animations, and a scroll-snap product carousel.

Static site — no build step, no dependencies.

```
index.html      page structure (all product art is inline SVG)
css/style.css   Apple-inspired design system
js/main.js      scroll reveals, stat counters, carousel
```

## Run locally

Any static server works:

```sh
npx serve -l 4173 .
```

Then open http://localhost:4173.

## Notes

- Product names are real ZEV catalog items (OZ9 V2 Elite / Combat / Hypercomp, Citadel slide, Fulcrum trigger, PRO Match barrels); prices are placeholders to be verified.
- This is a fan/concept redesign — not affiliated with or endorsed by ZEV Technologies.
