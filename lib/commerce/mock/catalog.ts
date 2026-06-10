import type { StoreCategory, StorePrices, StoreProduct } from "../types";

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

const categoryDefs = [
  { id: 1, slug: "pistols", name: "Pistols", description: "The OZ9 modular pistol platform." },
  { id: 2, slug: "slides", name: "Slides", description: "Optic-ready performance slides." },
  { id: 3, slug: "triggers", name: "Triggers", description: "Match-grade trigger systems." },
  { id: 4, slug: "barrels", name: "Barrels", description: "Match-grade barrels in black and bronze." },
  { id: 5, slug: "sights", name: "Sights", description: "Combat sights, fast to find." },
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
  short_description: string;
  description: string;
}

const productDefs: MockProductDef[] = [
  {
    id: 101,
    name: "OZ9 V2 Elite",
    slug: "oz9-v2-elite",
    sku: "OZ9-V2-ELITE",
    category: "pistols",
    prices: usd(179900, [179900, 209900]),
    has_options: true,
    short_description: "<p>Three slide lengths. Threaded or non. The flagship, fully modular.</p>",
    description:
      "<p>The OZ9 V2 Elite is the flagship of the ZEV modular pistol platform. A billet steel receiver carries the fire control group independent of the grip, so you can move between three slide lengths, threaded or non-threaded PRO Match barrels, and two grip sizes without re-zeroing your trigger.</p><p>Every Elite ships with a ZEV PRO Curved Face Trigger, optic-ready slide with window cuts, and a bronze TiCN match barrel.</p>",
  },
  {
    id: 102,
    name: "OZ9 V2 Combat",
    slug: "oz9-v2-combat",
    sku: "OZ9-V2-COMBAT",
    category: "pistols",
    prices: usd(129900, [129900, 144900]),
    has_options: true,
    short_description: "<p>Windowless slide, PRO match barrel, duty-ready in three sizes.</p>",
    description:
      "<p>Built around ZEV's windowless OZ9 V2 Combat slide, a PRO match barrel, and the PRO Curved Face Trigger. Available in Compact, Compact X, and Full-Size configurations — duty-ready out of the box.</p>",
  },
  {
    id: 103,
    name: "OZ9 V2 Hypercomp",
    slug: "oz9-v2-hypercomp",
    sku: "OZ9-V2-HYPERCOMP",
    category: "pistols",
    prices: usd(199900, [199900, 214900]),
    has_options: true,
    short_description: "<p>Integrated compensation. Four ports, zero added length.</p>",
    description:
      "<p>Four tapered vertical ports machined directly into the top of the barrel vent gases upward — taming muzzle rise without adding an inch to the slide. Compensator benefits, concealment footprint.</p>",
  },
  {
    id: 104,
    name: "OZ9 V2 Compact",
    slug: "oz9-v2-compact",
    sku: "OZ9-V2-COMPACT",
    category: "pistols",
    prices: usd(149900, [149900, 159900]),
    has_options: true,
    short_description: "<p>The proven compact footprint that became the foundation of the platform.</p>",
    description:
      "<p>The compact OZ9 platform that ZEV standardized the V2 line around. Carries like a compact, shoots like a full-size — the receiver-mounted fire control group keeps the trigger identical across the family.</p>",
  },
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
  images: [], // empty → UI falls back to SVG art; real store images drop in here
  categories: [cat(p.category)],
  is_in_stock: true,
  is_purchasable: true,
  has_options: p.has_options ?? false,
  on_sale: false,
}));

for (const c of mockCategories) {
  c.count = mockProducts.filter((p) => p.categories[0].slug === c.slug).length;
}
