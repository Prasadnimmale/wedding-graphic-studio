// Downloads candidate images from Unsplash CDN and builds labelled contact sheets
// so the best photo for each topic can be picked visually.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CAND_DIR = path.join(ROOT, "cand");
const SHEET_DIR = path.join(ROOT, "sheets");
const CELL_W = 380;
const CELL_H = 285;
const COLS = 3;
const ROWS = 2;
const GAP = 10;

const topics = JSON.parse(await fs.readFile(path.join(ROOT, "candidates.json"), "utf8"));

async function fetchBuf(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
      if (res.ok) return Buffer.from(await res.arrayBuffer());
    } catch {}
    await new Promise((r) => setTimeout(r, 800));
  }
  return null;
}

function cellSvg(n) {
  return Buffer.from(
    `<svg width="46" height="34" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="34" rx="6" fill="#111111" fill-opacity="0.85"/>
      <text x="23" y="24" font-family="Arial, sans-serif" font-size="20" font-weight="bold"
        fill="#ffffff" text-anchor="middle">${n}</text>
    </svg>`
  );
}

await fs.mkdir(CAND_DIR, { recursive: true });
await fs.mkdir(SHEET_DIR, { recursive: true });

const topicNames = Object.keys(topics);
for (let t = 0; t < topicNames.length; t++) {
  const topic = topicNames[t];
  const slug = topic.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const dir = path.join(CAND_DIR, slug);
  await fs.mkdir(dir, { recursive: true });

  const urls = topics[topic];
  const files = [];
  const downloads = await Promise.all(
    urls.map(async (u, i) => {
      const file = path.join(dir, `${i + 1}.jpg`);
      try {
        const stat = await fs.stat(file);
        if (stat.size > 1000) return file;
      } catch {}
      const buf = await fetchBuf(`${u}?w=${CELL_W * 2}&q=70&fm=jpg&fit=max`);
      if (!buf) return null;
      await fs.writeFile(file, buf);
      return file;
    })
  );

  for (let i = 0; i < downloads.length; i++) files[i] = downloads[i];

  // Build contact sheet: COLS x ROWS cells, in order 1..6 (left-to-right, top-to-bottom)
  const composites = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = GAP + col * (CELL_W + GAP);
    const y = GAP + row * (CELL_H + GAP);
    if (!files[i]) {
      composites.push({
        input: Buffer.from(
          `<svg width="${CELL_W}" height="${CELL_H}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#dddddd"/></svg>`
        ),
        left: x,
        top: y,
      });
      continue;
    }
    try {
      const tile = await sharp(files[i])
        .resize(CELL_W, CELL_H, { fit: "cover", position: "attention" })
        .toBuffer();
      composites.push({ input: tile, left: x, top: y });
      composites.push({ input: cellSvg(i + 1), left: x + 8, top: y + 8 });
    } catch (e) {
      console.log(`  ! ${topic} #${i + 1}: ${e.message}`);
    }
  }

  const W = GAP + COLS * (CELL_W + GAP);
  const H = GAP + ROWS * (CELL_H + GAP);
  const sheetName = `${String(t + 1).padStart(2, "0")}-${slug}.jpg`;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(path.join(SHEET_DIR, sheetName));
  console.log(`sheet ${sheetName}`);
}
console.log("done");
