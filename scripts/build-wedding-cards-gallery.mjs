/**
 * Splits the user-uploaded reference collage
 * ("Sunil & Vinnela Wedding Invitations.png") into the 8 individual wedding
 * invitation designs shown on the dedicated Wedding Cards gallery page.
 *
 * The collage is a clean 2x4 grid of portrait invitation cards separated by
 * narrow white gutters (detected at x ~ 380/768/1152 and y ~ 510). Each cell is
 * cropped to its own JPEG in public/images/wedding-cards/ (wedding-card-1..8.jpg).
 *
 * Read order (top-left -> bottom-right) matches the requested design list:
 *   1 Traditional Gold   5 Temple Peach
 *   2 Maroon Royal       6 Blue Floral
 *   3 Pink Floral        7 Marigold Traditional
 *   4 Emerald Gold       8 Ocean Blue
 *
 * Run:  node scripts/build-wedding-cards-gallery.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(path.dirname(ROOT), "public", "images", "wedding-cards");
const SRC = "C:/Users/intel/Downloads/Sunil & Vinnela Wedding Invitations.png";

/** 2x4 grid cells on the 1536x1024 collage (2px inset from gutters). */
const COLS = [
  { x: 1, w: 381 },
  { x: 385, w: 382 },
  { x: 769, w: 382 },
  { x: 1153, w: 382 },
];
const ROWS = [
  { y: 1, h: 507 }, // top row (above gutter at y ~ 510)
  { y: 513, h: 509 }, // bottom row (below gutter)
];

await fs.mkdir(OUT_DIR, { recursive: true });

let order = 0;
for (let r = 0; r < ROWS.length; r++) {
  for (let c = 0; c < COLS.length; c++) {
    order += 1;
    const { x, w } = COLS[c];
    const { y, h } = ROWS[r];
    const out = path.join(OUT_DIR, `wedding-card-${order}.jpg`);
    await sharp(SRC)
      .extract({ left: x, top: y, width: w, height: h })
      .resize({ width: 1200, height: 1600, fit: "cover", kernel: sharp.kernel.lanczos3 })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(out);
    const meta = await sharp(out).metadata();
    console.log(`wedding-card-${order}.jpg  ${meta.width}x${meta.height}`);
  }
}
console.log("\n8 wedding card images written to public/images/wedding-cards/");