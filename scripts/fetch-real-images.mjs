/**
 * fetch-real-images.mjs
 * ---------------------------------------------------------------------------
 * Downloads real, free-license stock photos (Pexels CDN) for the service
 * galleries and writes them as cropped JPEGs into public/images/<gallery>/.
 *
 * Candidate photo IDs come from scripts/real-image-candidates.json (see the
 * discovery step in the conversation: Pexels search pages are fetched from the
 * browser runtime and every images.pexels.com ID is extracted per slot).
 *
 * For each slot the script downloads candidates in order, skipping IDs already
 * used by an earlier slot, until sharp can decode one. The winner is cropped
 * (cover) to the gallery's tile aspect and saved as a quality JPEG.
 *
 * Usage:
 *   node scripts/fetch-real-images.mjs
 *   node scripts/fetch-real-images.mjs <candidates-file> [gallery ...]
 *
 * The optional candidates file name is relative to scripts/ (default:
 * real-image-candidates.json); any gallery names after it restrict the run to
 * those galleries. Existing manifest rows are merged, so single-gallery runs
 * keep the provenance of earlier downloads.
 */
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0";

const SIZES = {
  "3:4": { w: 1200, h: 1600 },
  "4:3": { w: 1600, h: 1200 },
};

/** Landscape galleries use 4:3 tiles; everything else is portrait 3:4. */
const ASPECT = { "id-cards": "4:3", "visiting-cards": "4:3" };

const MANIFEST = path.join(ROOT, "scripts", "real-images.manifest.json");

const args = process.argv.slice(2);
const candidatesFile = args[0] ?? "real-image-candidates.json";
const onlyGalleries = args.slice(1);

const candidates = JSON.parse(
  await readFile(path.join(ROOT, "scripts", candidatesFile), "utf8"),
);

let manifest = [];
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {
  manifest = [];
}

// When running for a subset of galleries, drop their earlier rows so the run
// fully replaces them instead of leaving stale entries behind.
if (onlyGalleries.length > 0) {
  manifest = manifest.filter((row) => !onlyGalleries.includes(row.gallery));
}
const byKey = new Map(manifest.map((row) => [`${row.gallery}/${row.file}`, row]));

// Never reuse a Pexels photo that is already used by another gallery, so every
// tile in the site shows a distinct image.
const usedIds = new Set(manifest.map((row) => row.pexelsId).filter(Boolean));

function cdnUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
}

async function download(url) {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.length > 5000 ? buf : null;
  } catch {
    return null;
  }
}

async function toJpeg(buf, aspect, dest) {
  const { w, h } = SIZES[aspect];
  try {
    await sharp(buf)
      .rotate()
      .resize(w, h, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest);
    return true;
  } catch {
    try {
      await sharp(buf)
        .rotate()
        .resize(w, h, { fit: "cover", position: "centre" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(dest);
      return true;
    } catch {
      return false;
    }
  }
}

const results = [];

for (const [gallery, slots] of Object.entries(candidates)) {
  if (onlyGalleries.length > 0 && !onlyGalleries.includes(gallery)) continue;
  const aspect = ASPECT[gallery] ?? "3:4";
  const dir = path.join(ROOT, "public", "images", gallery);
  await mkdir(dir, { recursive: true });
  console.log(`\n== ${gallery} (${aspect}) ==`);

  for (const [file, ids] of Object.entries(slots)) {
    const dest = path.join(dir, file);
    let done = false;

    for (const id of ids) {
      if (usedIds.has(id)) continue;
      const buf = await download(cdnUrl(id));
      if (!buf) continue;
      if (!(await toJpeg(buf, aspect, dest))) continue;
      usedIds.add(id);
      const meta = await sharp(dest).metadata();
      const { size } = await stat(dest);
      const row = { gallery, file, pexelsId: Number(id), out: `${meta.width}x${meta.height}`, bytes: size };
      byKey.set(`${gallery}/${file}`, row);
      results.push(row);
      console.log(`  ok  ${gallery}/${file}  <- pexels/${id}  ${meta.width}x${meta.height}`);
      done = true;
      break;
    }

    if (!done) {
      results.push({ gallery, file, error: "no candidate usable" });
      console.log(`  FAIL ${gallery}/${file}  -- no usable candidate`);
    }
  }
}

await writeFile(MANIFEST, JSON.stringify([...byKey.values()], null, 2));
const ok = results.filter((r) => !r.error).length;
console.log(`\nDone: ${ok}/${results.length} images written.`);