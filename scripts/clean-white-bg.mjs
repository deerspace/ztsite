// Flood-fill the near-white studio background of a product photo to pure white,
// starting from the image borders. This removes baked-in grey frame rings / off-
// white sweeps so `mix-blend-mode: multiply` leaves no visible box on light tiles.
// The centered product is never touched: only near-white pixels connected to an
// edge are filled. Usage: node scripts/clean-white-bg.mjs <file...>
import sharp from "sharp";

const TH = 218; // a pixel counts as background if R,G,B are all >= TH (near-white)

for (const file of process.argv.slice(2)) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const isBg = (i) => data[i] >= TH && data[i + 1] >= TH && data[i + 2] >= TH;

  const visited = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (visited[p]) return;
    visited[p] = 1;
    if (isBg(p * C)) stack.push(p);
  };
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }

  let filled = 0;
  while (stack.length) {
    const p = stack.pop();
    const i = p * C;
    data[i] = data[i + 1] = data[i + 2] = 255;
    filled++;
    const x = p % W, y = (p / W) | 0;
    push(x - 1, y); push(x + 1, y); push(x, y - 1); push(x, y + 1);
  }

  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(file + ".tmp");
  const { renameSync } = await import("node:fs");
  renameSync(file + ".tmp", file);
  console.log(`${file}: ${W}x${H}, whitened ${filled} bg px (${((filled / (W * H)) * 100).toFixed(1)}%)`);
}
