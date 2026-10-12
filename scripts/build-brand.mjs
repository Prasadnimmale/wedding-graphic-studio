// Generates the brand assets: social share (Open Graph) cover + favicons.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.dirname(ROOT);
const CACHE = path.join(ROOT, ".cache");

const OG_W = 1200;
const OG_H = 630;

function overlaySvg(width, height, title, subtitle) {
  return Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0c0b08" stop-opacity="0.96"/>
        <stop offset="55%" stop-color="#1b1915" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#2b1e05" stop-opacity="0.78"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#shade)"/>
    <rect x="64" y="${height - 168}" width="96" height="6" rx="3" fill="#f7c948"/>
    <text x="64" y="${height - 108}" font-family="Arial, Helvetica, sans-serif" font-size="54"
      font-weight="bold" fill="#ffffff">${title}</text>
    <text x="64" y="${height - 52}" font-family="Arial, Helvetica, sans-serif" font-size="26"
      fill="#fde68a">${subtitle}</text>
  </svg>`);
}

function iconSvg(size, label) {
  const r = Math.round(size * 0.22);
  return Buffer.from(`
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1c1a15"/>
        <stop offset="100%" stop-color="#050505"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/>
    <rect x="${size * 0.18}" y="${size * 0.74}" width="${size * 0.64}" height="${size * 0.045}"
      rx="${size * 0.02}" fill="#eab308"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(size * 0.42)}"
      font-weight="bold" fill="#f7c948">${label}</text>
  </svg>`);
}

const source = path.join(CACHE, "1758183961426-88d64eb5f787.jpg");
const base = await sharp(source)
  .resize(OG_W, OG_H, { fit: "cover", position: "attention" })
  .toBuffer();

const withText = await sharp(base)
  .composite([{ input: overlaySvg(OG_W, OG_H, "BHAVANI GRAPHICS STUDIO", "Creative Designs. Quality Printing. Beautiful Results.") }])
  .jpeg({ quality: 88 })
  .toBuffer();

const withoutText = await sharp(base)
  .composite([{ input: overlaySvg(OG_W, OG_H, "", "") }])
  .jpeg({ quality: 88 })
  .toBuffer();

const textRendered = !withText.equals(withoutText);
console.log("text rendered in SVG:", textRendered);

await fs.writeFile(path.join(PROJECT, "public", "images", "og-cover.jpg"), withText);

const icon = await sharp(iconSvg(256, "BG")).png().toBuffer();
await fs.writeFile(path.join(PROJECT, "app", "icon.png"), icon);
const apple = await sharp(iconSvg(180, "BG")).png().toBuffer();
await fs.writeFile(path.join(PROJECT, "app", "apple-icon.png"), apple);
console.log("wrote og-cover.jpg, icon.png, apple-icon.png");
