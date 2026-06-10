// Marketing + configurator content for the firearms (the "GUNS" showcase set).
// Kept separate from the Store API product shape: price/cart come from the
// catalog by slug, this drives the showcase pages and the buy configurator.

export interface OptionValue {
  id: string;
  label: string;
  sublabel?: string;
  priceDelta?: number; // cents added to the base price
  swatch?: string; // CSS color for color options
}

export interface OptionGroup {
  key: string;
  label: string;
  values: OptionValue[];
}

export interface GunContent {
  slug: string;
  name: string;
  family: "OZ9" | "FDP" | "Core Elite";
  eyebrow: string;
  tagline: string; // short showcase headline subtitle
  heroImage: string; // /products/...
  configurator: OptionGroup[];
}

const COLOR = {
  key: "color",
  label: "Finish",
  values: [
    { id: "black", label: "Black", swatch: "#1a1a1c" },
    { id: "bronze", label: "Bronze", sublabel: "+$60", priceDelta: 6000, swatch: "#b07d3e" },
  ],
};

export const GUNS: Record<string, GunContent> = {
  "oz9-v2-elite": {
    slug: "oz9-v2-elite",
    name: "OZ9 V2 Elite",
    family: "OZ9",
    eyebrow: "OZ9 V2 Elite",
    tagline: "Performance, made modular.",
    heroImage: "/products/oz9-elite-hero.jpg",
    configurator: [
      {
        key: "slide",
        label: "Slide length",
        values: [
          { id: "compact", label: "Compact", sublabel: "Carry" },
          { id: "full", label: "Full", sublabel: "Duty" },
          { id: "long", label: "Long", sublabel: "Competition", priceDelta: 5200 },
        ],
      },
      {
        key: "grip",
        label: "Grip",
        values: [
          { id: "compact", label: "Compact grip" },
          { id: "x", label: "X grip", sublabel: "Extended" },
        ],
      },
      {
        key: "barrel",
        label: "Barrel",
        values: [
          { id: "standard", label: "Standard" },
          { id: "threaded", label: "Threaded", sublabel: "+$40", priceDelta: 4000 },
        ],
      },
      COLOR,
    ],
  },
  "oz9-v2-combat": {
    slug: "oz9-v2-combat",
    name: "OZ9 V2 Combat",
    family: "OZ9",
    eyebrow: "OZ9 V2 Combat",
    tagline: "Sealed. Duty-ready. Flat Dark Earth.",
    heroImage: "/products/oz9-combat-hero.jpg",
    configurator: [
      {
        key: "config",
        label: "Configuration",
        values: [
          { id: "compact", label: "Compact" },
          { id: "compact-x", label: "Compact X" },
          { id: "full", label: "Full-Size", priceDelta: 5000 },
        ],
      },
      {
        key: "barrel",
        label: "Barrel",
        values: [
          { id: "standard", label: "Standard" },
          { id: "threaded", label: "Threaded", sublabel: "+$40", priceDelta: 4000 },
        ],
      },
    ],
  },
  "oz9-v2-hypercomp": {
    slug: "oz9-v2-hypercomp",
    name: "OZ9 V2 Hypercomp",
    family: "OZ9",
    eyebrow: "OZ9 V2 Hypercomp",
    tagline: "Flat-shooting, by design.",
    heroImage: "/products/oz9-hypercomp-hero.jpg",
    configurator: [
      {
        key: "grip",
        label: "Grip",
        values: [
          { id: "compact", label: "Compact grip" },
          { id: "x", label: "X grip", sublabel: "Extended" },
        ],
      },
      COLOR,
    ],
  },
  fdp: {
    slug: "fdp",
    name: "FDP",
    family: "FDP",
    eyebrow: "Folding Defensive Platform",
    tagline: "It folds. Everything changes.",
    heroImage: "/products/fdp-carbine-rs.jpg",
    configurator: [
      {
        key: "model",
        label: "Model",
        values: [
          { id: "carbine", label: "FDP-Carbine", sublabel: "16″ — rifle" },
          { id: "pistol", label: "FDP-Pistol", sublabel: "SBR footprint" },
        ],
      },
    ],
  },
  "core-elite-rifle": {
    slug: "core-elite-rifle",
    name: "Core Elite Rifle",
    family: "Core Elite",
    eyebrow: "Core Elite Rifle",
    tagline: "An AR, machined like a ZEV.",
    heroImage: "/products/rifle-core-elite.jpg",
    configurator: [
      {
        key: "caliber",
        label: "Caliber",
        values: [{ id: "223", label: ".223 Wylde", sublabel: "16″ barrel" }],
      },
    ],
  },
  "core-elite-pistol": {
    slug: "core-elite-pistol",
    name: "Core Elite Pistol",
    family: "Core Elite",
    eyebrow: "Core Elite Pistol",
    tagline: "Billet, braced, big-bore.",
    heroImage: "/products/pistol-core-elite-556.jpg",
    configurator: [
      {
        key: "caliber",
        label: "Caliber",
        values: [
          { id: "223", label: ".223 Wylde", sublabel: "10.5″ barrel" },
          { id: "300", label: "300 BLK", sublabel: "8.5″ barrel" },
        ],
      },
    ],
  },
};

export const GUN_SLUGS = Object.keys(GUNS);

export function getGun(slug: string): GunContent | null {
  return GUNS[slug] ?? null;
}

export function isGun(slug: string): boolean {
  return slug in GUNS;
}

// Showcase page path (the bespoke /guns/* dark page). Core Elite shares one
// showcase across its rifle and pistol SKUs.
export function showcaseHref(slug: string): string {
  if (slug.startsWith("core-elite")) return "/guns/core-elite";
  return `/guns/${slug}`;
}
