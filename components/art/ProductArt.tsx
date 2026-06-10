import CitadelSlide from "./CitadelSlide";
import CombatSights from "./CombatSights";
import FulcrumTrigger from "./FulcrumTrigger";
import HypercompSlide from "./HypercompSlide";
import PistolBlueprint from "./PistolBlueprint";
import ProMatchBarrel from "./ProMatchBarrel";

// Cart items carry sku but not slug; map mock skus back to art-compatible
// slugs. Real-mode cart items have images, so this fallback rarely renders.
export function slugFromSku(sku: string): string {
  if (sku.startsWith("OZ9-V2-HYPERCOMP")) return "oz9-v2-hypercomp";
  if (sku.startsWith("OZ9-V2-ELITE")) return "oz9-v2-elite";
  if (sku.startsWith("OZ9-V2-COMBAT")) return "oz9-v2-combat";
  if (sku.startsWith("OZ9-V2-COMPACT")) return "oz9-v2-compact";
  if (sku.startsWith("SLD-CITADEL")) return "citadel-slide";
  if (sku.startsWith("SLD-")) return "octane-slide";
  if (sku === "TRG-FULCRUM") return "fulcrum-trigger";
  if (sku.startsWith("TRG-")) return "pro-curved-face-trigger";
  if (sku === "BRL-PRO-BLK") return "pro-match-barrel-black";
  if (sku === "BRL-PRO-THR") return "pro-threaded-barrel";
  if (sku.startsWith("BRL-")) return "pro-match-barrel-bronze";
  if (sku.startsWith("SGT-")) return "combat-sights";
  return "";
}

// Maps a product slug to its stand-in SVG art. Used by ProductMedia whenever
// a product has no real images (i.e. the whole catalog in mock mode).
export default function ProductArt({
  slug,
  detailed = false,
}: {
  slug: string;
  detailed?: boolean;
}) {
  if (slug === "oz9-v2-hypercomp") return <HypercompSlide />;
  if (slug.startsWith("oz9-")) return <PistolBlueprint detailed={detailed} />;
  if (slug === "citadel-slide") return <CitadelSlide />;
  if (slug === "octane-slide") return <CitadelSlide label="OCTANE" />;
  if (slug.includes("trigger")) return <FulcrumTrigger />;
  if (slug.includes("barrel")) return <ProMatchBarrel />;
  if (slug.includes("sight")) return <CombatSights />;
  return <CitadelSlide label="ZEV" />;
}
