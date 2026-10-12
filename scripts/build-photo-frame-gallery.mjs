/**
 * Splits the user-uploaded reference collage
 * ("Eight Frames, Endless Memories.png") into the 8 individual photo frame
 * designs used by the Photo Frames service gallery.
 *
 * The collage is a clean 2x4 grid of portrait cells separated by narrow white
 * gutters (detected at x ~ 378/767/1154 and y ~ 510). Each cell is cropped to
 * its own JPEG in public/images/photo-frames/ (photo-frame-1..8.jpg).
 *
 * Run:  node scripts/build-photo-frame-gallery.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(path.dirname(ROOT), "public", "images", "photo-frames");
const SRC = path.join(path.dirname(ROOT), "..", "..", "Downloads", "Eight Frames, Endless Memories.png");
const SRC_ALT = "C:/Users/intel/Downloads/Eight Frames, Endless Memories.png";

/** detected grid on the 1536x1024 collage */
const COLS = [
  { x: 0, w: 374 },
  { x: 383, w: 381 },
  { x: 771, w: 380 },
  { x: 1159, w: 377 },
];
const ROWS = [
  { y: 0, h: 506 }, // top row (above gutter at y~510)
  { y: 517, h: 403 }, // bottom row (above decorative band at y~922)
];

const names = [
  "Classic Black & Gold Couple Frame",
  "Black Family Collage Frame",
  "White Floral Portrait Frame",
  "Rustic Wooden Landscape Frame",
  "Transparent Acrylic Baby Frame",
  "Multi-Photo Travel Memory Frame",
  "Heart-Shaped Wooden Couple Frame",
  "Classic Black Portrait Frame",
];

await fs.mkdir(OUT_DIR, { recursive: true });

let src = SRC;
try {
  await fs.access(src);
} catch {
  src = SRC_ALT;
}

let order = 0;
for (let r = 0; r < ROWS.length; r++) {
  for (let c = 0; c < COLS.length; c++) {
    order += 1;
    const { x, w } = COLS[c];
    const { y, h } = ROWS[r];
    const out = path.join(OUT_DIR, `photo-frame-${order}.jpg`);
    await sharp(src)
      .extract({ left: x, top: y, width: w, height: h })
      .resize({ width: 900, height: 1215, fit: "cover", kernel: sharp.kernel.lanczos3 })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(out);
    const meta = await sharp(out).metadata();
    console.log(`${order}. ${names[order - 1]}  ->  photo-frame-${order}.jpg  ${meta.width}x${meta.height}`);
  }
}
console.log("\n8 photo frame images written to public/images/photo-frames/");