import type { StoreCategory, StoreImage, StorePrices, StoreProduct } from "../types";

// Amounts are cents (Store API minor-unit convention).
function usd(price: number, range?: [number, number]): StorePrices {
  return {
    price: String(price),
    regular_price: String(price),
    sale_price: String(price),
    price_range: range
      ? { min_amount: String(range[0]), max_amount: String(range[1]) }
      : null,
    currency_code: "USD",
    currency_symbol: "$",
    currency_minor_unit: 2,
    currency_decimal_separator: ".",
    currency_thousand_separator: ",",
    currency_prefix: "$",
    currency_suffix: "",
  };
}

// Real photo (in /public/products) shaped like a Store API image so the
// swap to a live store is transparent. SVG art remains the fallback for
// parts that have no photo yet.
function img(file: string, alt: string): StoreImage {
  const src = `/products/${file}`;
  return { id: 0, src, thumbnail: src, srcset: "", sizes: "", name: file, alt };
}

const categoryDefs = [
  { id: 1, slug: "pistols", name: "Pistols", description: "The OZ9 modular pistol platform and Core Elite AR pistols." },
  { id: 2, slug: "rifles", name: "Rifles", description: "Billet AR-platform rifles, built to a tolerance." },
  { id: 6, slug: "fdp", name: "FDP", description: "The Folding Defensive Platform — ZEV × Magpul." },
  { id: 2001, slug: "slides", name: "Slides", description: "Optic-ready performance slides." },
  { id: 2002, slug: "triggers", name: "Triggers", description: "Match-grade trigger systems." },
  { id: 2003, slug: "barrels", name: "Barrels", description: "Match-grade barrels in black and bronze." },
  { id: 2004, slug: "sights", name: "Sights", description: "Combat sights, fast to find." },
];

export const mockCategories: StoreCategory[] = categoryDefs.map((c) => ({
  ...c,
  parent: 0,
  count: 0, // recomputed below
  image: null,
}));

function cat(slug: string) {
  const c = categoryDefs.find((c) => c.slug === slug)!;
  return { id: c.id, name: c.name, slug: c.slug, link: `/category/${c.slug}` };
}

interface MockProductDef {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: string;
  prices: StorePrices;
  has_options?: boolean;
  images?: StoreImage[];
  short_description: string;
  description: string;
}

const productDefs: MockProductDef[] = [
  // ===== GUNS (real photography, configurable) =====
  {
    id: 101,
    name: "OZ9 V2 Elite",
    slug: "oz9-v2-elite",
    sku: "OZ9-V2-ELITE",
    category: "pistols",
    prices: usd(176300, [176300, 181500]),
    has_options: true,
    images: [
      img("oz9-elite-hero.jpg", "ZEV OZ9 V2 Elite pistol, three-quarter view"),
      img("oz9-elite-right.jpg", "OZ9 V2 Elite, right profile"),
      img("oz9-elite-left.jpg", "OZ9 V2 Elite, left profile"),
      img("oz9-elite-angle.jpg", "OZ9 V2 Elite, dynamic angle"),
    ],
    short_description: "<p>Three slide lengths. Two grips. One receiver. The flagship, fully modular.</p>",
    description:
      "<p>The OZ9 V2 Elite is the flagship of the ZEV modular pistol platform. A billet steel receiver carries the fire-control group independent of the polymer grip, so you can move between Compact, Full, and Long slides, threaded or standard PRO Match barrels, and two grip sizes — without ever re-learning your trigger.</p><p>Every Elite ships with a ZEV PRO Curved Face Trigger, an optic-ready slide with signature window cuts, and a match barrel in black or bronze.</p>",
  },
  {
    id: 102,
    name: "OZ9 V2 Combat",
    slug: "oz9-v2-combat",
    sku: "OZ9-V2-COMBAT",
    category: "pistols",
    prices: usd(149900, [149900, 149900]),
    has_options: true,
    images: [
      img("oz9-combat-hero.jpg", "ZEV OZ9 V2 Combat pistol in FDE, right side"),
      img("oz9-combat-angle.jpg", "OZ9 V2 Combat, pointing right"),
      img("oz9-combat-left.jpg", "OZ9 V2 Combat, left profile"),
    ],
    short_description: "<p>Windowless slide, PRO match barrel, duty-ready. Now in Flat Dark Earth.</p>",
    description:
      "<p>Built around ZEV's windowless OZ9 V2 Combat slide, a PRO match barrel, and the PRO Curved Face Trigger. The Combat trades the Elite's window cuts for a sealed, duty-first slide — and wears it in Flat Dark Earth. Available in Compact, Compact X, and Full-Size.</p>",
  },
  {
    id: 103,
    name: "OZ9 V2 Hypercomp",
    slug: "oz9-v2-hypercomp",
    sku: "OZ9-V2-HYPERCOMP",
    category: "pistols",
    prices: usd(189900, [189900, 189900]),
    has_options: true,
    images: [
      img("oz9-hypercomp-hero.jpg", "ZEV OZ9 V2 Hypercomp pistol, beauty shot"),
      img("oz9-hypercomp-angle.jpg", "OZ9 V2 Hypercomp, pointing right"),
      img("oz9-hypercomp-detail.jpg", "OZ9 V2 Hypercomp compensator detail"),
      img("oz9-hypercomp-life.jpg", "OZ9 V2 Hypercomp, lifestyle"),
    ],
    short_description: "<p>Integrated compensation. Four ports machined into the barrel. Zero added length.</p>",
    description:
      "<p>The Hypercomp brings compensator performance to the compact platform. Four tapered vertical ports are machined directly into the top of the barrel, venting gas upward to flatten muzzle rise — with no can, no comp, and not one extra inch of slide.</p>",
  },
  {
    id: 110,
    name: "FDP — Folding Defensive Platform",
    slug: "fdp",
    sku: "FDP",
    category: "fdp",
    prices: usd(169900, [169900, 169900]),
    has_options: true,
    images: [
      img("fdp-carbine-rs.jpg", "ZEV FDP carbine, right side, deployed"),
      img("fdp-carbine-ls34.jpg", "ZEV FDP carbine, left three-quarter"),
      img("fdp-folded.jpg", "ZEV FDP folded flat"),
      img("fdp-detail.jpg", "ZEV FDP folding mechanism detail"),
    ],
    short_description: "<p>ZEV × Magpul. A 9mm platform that folds flat — and deploys in a heartbeat.</p>",
    description:
      "<p>Developed with Magpul, the Folding Defensive Platform folds to a fraction of its deployed length and stands back up in a single motion. Configured as a carbine or a pistol, the FDP is the most concealable, deployable 9mm ZEV has ever built. Limited to one per order.</p>",
  },
  {
    id: 120,
    name: "Core Elite Rifle",
    slug: "core-elite-rifle",
    sku: "AR15-CE-RIFLE",
    category: "rifles",
    prices: usd(228400, [228400, 228400]),
    has_options: true,
    images: [img("rifle-core-elite.jpg", "ZEV AR15 Billet Core Elite Rifle, .223 Wylde, 16 inch")],
    short_description: "<p>Billet upper and lower, .223 Wylde, 16″. An AR machined like a ZEV.</p>",
    description:
      "<p>The Core Elite Rifle is a complete billet AR-15 in .223 Wylde with a 16″ barrel — the same obsession with tolerance and finish that defines the OZ9, scaled to the rifle. Matched billet upper and lower, free-float handguard, and a ZEV trigger.</p>",
  },
  {
    id: 121,
    name: "Core Elite Pistol",
    slug: "core-elite-pistol",
    sku: "AR15-CE-PISTOL",
    category: "pistols",
    prices: usd(186400, [186400, 186400]),
    has_options: true,
    images: [
      img("pistol-core-elite-556.jpg", "ZEV AR15 Core Elite Pistol, .223 Wylde, 10.5 inch"),
      img("pistol-core-elite-300.jpg", "ZEV AR15 Core Elite Pistol, 300 BLK, 8.5 inch"),
    ],
    short_description: "<p>Billet AR pistol in .223 Wylde or 300 BLK. Big-bore performance, braced footprint.</p>",
    description:
      "<p>The Core Elite Pistol packs the billet Core platform into a braced AR pistol — your choice of .223 Wylde with a 10.5″ barrel or 300 Blackout at 8.5″. Free-float rail, ZEV trigger, and the finish to match.</p>",
  },

  // ===== COMPONENTS (SVG art fallback, simple add-to-cart) =====
  {
    id: 201,
    name: "Citadel Slide",
    slug: "citadel-slide",
    sku: "SLD-CITADEL",
    category: "slides",
    prices: usd(38900),
    short_description: "<p>Armor for your optic. Optic-ready protection for Z17 and Z19 platforms.</p>",
    description:
      "<p>The Citadel slide surrounds your red dot with machined steel walls, protecting the optic from impact while co-witnessing with raised combat sights. Direct RMR-footprint mounting — no adapter plate. Available for Z17 and Z19 platforms.</p>",
  },
  {
    id: 202,
    name: "Octane Slide",
    slug: "octane-slide",
    sku: "SLD-OCTANE",
    category: "slides",
    prices: usd(35000),
    short_description: "<p>Aggressive lightening cuts for faster cycling and a sharper sight picture.</p>",
    description:
      "<p>Deep lightening cuts reduce reciprocating mass for a flatter-shooting, faster-cycling slide. DLC finish over stainless billet, front and rear serrations, optic-ready.</p>",
  },
  {
    id: 301,
    name: "Fulcrum Trigger",
    slug: "fulcrum-trigger",
    sku: "TRG-FULCRUM",
    category: "triggers",
    prices: usd(15800),
    short_description: "<p>Adjustable pre- and over-travel. The trigger that built ZEV.</p>",
    description:
      "<p>The Fulcrum is the adjustable trigger that put ZEV on the map. Tune pre-travel and over-travel to your preference for a crisp, repeatable break that transforms a factory pistol.</p>",
  },
  {
    id: 302,
    name: "PRO Curved Face Trigger",
    slug: "pro-curved-face-trigger",
    sku: "TRG-PRO-CURVED",
    category: "triggers",
    prices: usd(16900),
    short_description: "<p>The duty-grade break that ships on every OZ9. Drop-in upgrade.</p>",
    description:
      "<p>The same trigger fitted to the OZ9 line, as a drop-in upgrade. Lighter, smoother take-up and a clean break with a short, positive reset — without compromising drop safety.</p>",
  },
  {
    id: 401,
    name: "PRO Match Barrel — Black",
    slug: "pro-match-barrel-black",
    sku: "BRL-PRO-BLK",
    category: "barrels",
    prices: usd(23000),
    short_description: "<p>Match-grade chamber, tighter rifling, DLC black.</p>",
    description:
      "<p>Machined from 416R stainless with a match-grade chamber and tighter rifling for measurably better accuracy than factory. DLC black finish.</p>",
  },
  {
    id: 402,
    name: "PRO Match Barrel — Bronze TiCN",
    slug: "pro-match-barrel-bronze",
    sku: "BRL-PRO-BRZ",
    category: "barrels",
    prices: usd(24500),
    short_description: "<p>The signature bronze. Match-grade accuracy, TiCN hardness.</p>",
    description:
      "<p>ZEV's signature look: titanium carbo-nitride in bronze over a 416R match barrel. Harder and slicker than factory finishes, with the same match-grade chamber and rifling as the black PRO line.</p>",
  },
  {
    id: 403,
    name: "PRO Threaded Barrel",
    slug: "pro-threaded-barrel",
    sku: "BRL-PRO-THR",
    category: "barrels",
    prices: usd(26000),
    short_description: "<p>1/2x28 threads, suppressor- and comp-ready.</p>",
    description:
      "<p>The PRO Match barrel with 1/2x28 threading and a knurled thread protector — ready for your suppressor or compensator. Black DLC or bronze TiCN.</p>",
  },
  {
    id: 501,
    name: "Combat Sights",
    slug: "combat-sights",
    sku: "SGT-COMBAT",
    category: "sights",
    prices: usd(7900),
    short_description: "<p>Fast to find. Faster to fight. Co-witness height options.</p>",
    description:
      "<p>A deep rear notch and a bright fiber-front dot get your eye to the front sight fast. Available in standard and co-witness heights for optic-equipped slides.</p>",
  },
];

export const mockProducts: StoreProduct[] = productDefs.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  permalink: `/product/${p.slug}`,
  sku: p.sku,
  description: p.description,
  short_description: p.short_description,
  prices: p.prices,
  images: p.images ?? [],
  categories: [cat(p.category)],
  is_in_stock: true,
  is_purchasable: true,
  has_options: p.has_options ?? false,
  on_sale: false,
}));

for (const c of mockCategories) {
  c.count = mockProducts.filter((p) => p.categories[0].slug === c.slug).length;
}
