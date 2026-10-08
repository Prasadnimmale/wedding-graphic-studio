// Downloads the source photos listed in images.manifest.json and crops them
// into optimised WebP files under public/images/.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.dirname(ROOT);
const CACHE = path.join(ROOT, ".cache");
const OUT_ROOT = path.join(PROJECT, "public", "images");

const { jobs } = JSON.parse(await fs.readFile(path.join(ROOT, "images.manifest.json"), "utf8"));

await fs.mkdir(CACHE, { recursive: true });

const cacheMap = new Map();

async function ensureSource(src) {
  if (cacheMap.has(src)) return cacheMap.get(src);
  const file = path.join(CACHE, `${src}.jpg`);
  try {
    const stat = await fs.stat(file);
    if (stat.size > 5000) {
      cacheMap.set(src, file);
      return file;
    }
  } catch {}
  const url = `https://images.unsplash.com/photo-${src}?w=2400&q=85&fm=jpg&fit=max`;
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        await fs.writeFile(file, buf);
        cacheMap.set(src, file);
        return file;
      }
    } catch (e) {
      console.log(`  retry ${i + 1} for ${src}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`failed to download ${src}`);
}

let ok = 0;
const failed = [];
for (const job of jobs) {
  const outPath = path.join(OUT_ROOT, `${job.out}.webp`);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  try {
    const srcFile = await ensureSource(job.src);
    await sharp(srcFile)
      .resize(job.w, job.h, { fit: "cover", position: "attention" })
      .webp({ quality: 82, effort: 5 })
      .toFile(outPath);
    ok++;
  } catch (e) {
    failed.push(`${job.out}: ${e.message}`);
  }
}

console.log(`generated ${ok}/${jobs.length} images`);
if (failed.length) console.log("FAILED:\n" + failed.join("\n"));

// Build a credit list so every downloaded photo can be traced back to its source.
const lines = [
  "# Image credits",
  "",
  "All photographs are sourced from Unsplash (Unsplash License: free for commercial and",
  "non-commercial use, no permission or attribution required).",
  "",
  "https://unsplash.com/license",
  "",
  "| File | Source |",
  "| --- | --- |",
  ...jobs.map((j) => `| public/images/${j.out}.webp | https://unsplash.com/photos/${j.src} |`),
  "",
];
await fs.writeFile(path.join(PROJECT, "IMAGES.md"), lines.join("\n"), "utf8");
console.log("wrote IMAGES.md");
