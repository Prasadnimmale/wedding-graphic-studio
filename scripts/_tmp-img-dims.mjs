import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(".");
const files = [
  "data/services.ts",
  "data/gallery.ts",
  "components/WeddingCardGallery.tsx",
  "components/PhotoFrameGallery.tsx",
  "components/Gallery.tsx",
];

const refs = new Map();
for (const f of files) {
  let text;
  try {
    text = await readFile(path.join(ROOT, f), "utf8");
  } catch {
    continue;
  }
  for (const m of text.matchAll(/["'`](\/images\/[^"'`\s]+)["'`]/g)) {
    const src = m[1];
    if (!refs.has(src)) refs.set(src, new Set());
    refs.get(src).add(f);
  }
}

const rows = [];
for (const [src, sources] of refs) {
  try {
    const meta = await sharp(path.join(ROOT, "public", src)).metadata();
    rows.push({ src, w: meta.width, h: meta.height, ratio: (meta.width / meta.height).toFixed(3), sources: [...sources].join(",") });
  } catch {
    rows.push({ src, w: 0, h: 0, ratio: "MISSING", sources: [...sources].join(",") });
  }
}

rows.sort((a, b) => a.src.localeCompare(b.src));
const counts = {};
for (const r of rows) counts[r.ratio] = (counts[r.ratio] || 0) + 1;

console.log("total refs:", rows.length);
console.log("aspect ratios (0.75=3:4, 1.333=4:3, 1=1:1):", counts);

console.log("\n--- MISSING files ---");
for (const r of rows.filter((r) => r.ratio === "MISSING")) console.log(" ", r.src, `[${r.sources}]`);

console.log("\n--- NOT 3:4 ---");
for (const r of rows.filter((r) => r.ratio !== "0.750")) console.log(`  ${r.ratio}  ${r.w}x${r.h}  ${r.src}  [${r.sources}]`);
