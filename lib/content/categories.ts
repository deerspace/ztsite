// Per-category marketing content for the category heroes and shop tiles.
// heroImage is a real photo for firearm categories; parts categories fall
// back to representative SVG art (the first product's art).

export interface CategoryContent {
  tagline: string;
  heroImage?: string;
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  pistols: {
    tagline: "The OZ9 modular platform and Core Elite AR pistols.",
    heroImage: "/products/oz9-elite-hero.jpg",
  },
  rifles: {
    tagline: "Billet AR-platform rifles, machined to a ZEV tolerance.",
    heroImage: "/products/rifle-core-elite.jpg",
  },
  fdp: {
    tagline: "The Folding Defensive Platform. ZEV × Magpul.",
    heroImage: "/products/fdp-carbine-rs.jpg",
  },
  slides: { tagline: "Optic-ready performance slides." },
  triggers: { tagline: "Match-grade trigger systems." },
  barrels: { tagline: "Match-grade barrels in black and bronze." },
  sights: { tagline: "Combat sights — fast to find, faster to fight." },
};

export function categoryContent(slug: string): CategoryContent {
  return CATEGORY_CONTENT[slug] ?? { tagline: "" };
}
