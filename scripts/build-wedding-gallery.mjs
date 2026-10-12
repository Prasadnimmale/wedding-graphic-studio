/**
 * Generates 8 unique wedding invitation card demo designs as JPEGs in
 * public/images/wedding/.
 *
 * These are locally generated demo assets (not photographs) — each design
 * follows the requested colour palette and style so the gallery can showcase
 * the print shop's wedding card work without external image dependencies.
 *
 * Run:  node scripts/build-wedding-gallery.mjs
 */
import fs from "node:fs/promises";import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(path.dirname(ROOT), "public", "images", "wedding");

/* ------------------------------------------------------------------ utils */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const W = 1200;
const H = 1600;

function txt(x, y, str, { size, fill, f = "Georgia, 'Times New Roman', serif", w = 400, ls = 0, style = "" } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${f}" font-size="${size}" font-weight="${w}" fill="${fill}"${ls ? ` letter-spacing="${ls}"` : ""}${style ? ` style="${style}"` : ""}>${esc(str)}</text>`;
}

function defs(inner) {
  return `<defs>${inner}</defs>`;
}

/** radial vignette + subtle paper grain so the flat vector design reads as printed card */
function finish(inner) {
  return `
  ${inner}
  <radialGradient id="vig" cx="50%" cy="50%" r="74%">
    <stop offset="58%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.16"/>
  </radialGradient>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 -0.03"/>
  </filter>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.9"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
`;
}

function frame(x, y, w, h, color, sw, d) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="${sw}"${d ? ` stroke-dasharray="${d}"` : ""}/>`;
}

function line(x1, y1, x2, y2, color, sw = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}"/>`;
}

function ring(cx, cy, r, color, sw = 2) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"/>`;
}

function dot(cx, cy, r, color, o = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${o}"/>`;
}

function diamond(cx, cy, s, color, o = 1) {
  return `<rect x="${cx - s}" y="${cy - s}" width="${s * 2}" height="${s * 2}" transform="rotate(45 ${cx} ${cy})" fill="${color}" opacity="${o}"/>`;
}

/** ornate corner curl used on traditional / royal frames */
function cornerCurl(cx, cy, s, color, ang) {
  return `<g transform="translate(${cx} ${cy}) rotate(${ang})">
    <path d="M0 0 C ${s * 0.45} ${s * -0.06} ${s * 0.6} ${s * -0.5} ${s * 0.25} ${s * -0.55} C ${s * 0.04} ${s * -0.6} ${s * 0.0} ${s * -0.36} ${s * 0.18} ${s * -0.3} C ${s * 0.4} ${s * -0.22} ${s * 0.3} ${s * -0.1} ${s * 0.14} ${s * -0.22} C ${s * 0.12} ${s * -0.3} ${s * 0.3} ${s * -0.32} ${s * 0.4} ${s * -0.18}" fill="none" stroke="${color}" stroke-width="3"/>
    ${dot(s * -0.05, s * 0.02, s * 0.05, color)}
    ${dot(-1, 0, s * 0.05, color)}
    ${dot(0, -1, s * 0.05, color)}
  </g>`;
}

/** rotational mandala motif */
function mandala(cx, cy, r, color, petals = 16, o = 1, innerR = 0.22) {
  let out = "";
  for (let i = 0; i < petals; i++) {
    const a = (i * 360) / petals;
    out += `<g transform="translate(${cx} ${cy}) rotate(${a})"><ellipse cx="${r * 0.58}" cy="0" rx="${r * 0.34}" ry="${r * 0.13}" fill="${color}" opacity="${o}"/></g>`;
  }
  for (let i = 0; i < petals; i++) {
    const a = (i * 360) / petals + 360 / petals / 2;
    out += `<g transform="translate(${cx} ${cy}) rotate(${a})"><ellipse cx="${r * 0.36}" cy="0" rx="${r * 0.2}" ry="${r * 0.08}" fill="${color}" opacity="${o * 0.75}"/></g>`;
  }
  out += ring(cx, cy, r * 0.72, color, 1.5);
  out += `<circle cx="${cx}" cy="${cy}" r="${r * innerR}" fill="${color}" opacity="${o}"/>`;
  return out;
}

function divider(cx, y, w, color) {
  const half = w / 2;
  return `
    ${line(cx - half, y, cx - 30, y, color, 2)}
    ${line(cx + 30, y, cx + half, y, color, 2)}
    ${diamond(cx, y, 11, color)}
    ${dot(cx - half + 6, y, 4, color)}
    ${dot(cx + half - 6, y, 4, color)}`;
}

/** kalash (sacred pot) with leaves + coconut */
function kalash(cx, cy, s, gold, green) {
  return `<g transform="translate(${cx} ${cy})">
    <path d="M0 -${s * 0.34} C ${s * -0.55} ${s * -0.7} ${s * -0.95} ${s * -1.15} ${s * -0.32} ${s * -1.2} C ${s * -0.16} ${s * -1.22} ${s * -0.08} ${s * -0.85} 0 ${s * -0.7}" fill="${green}" opacity="0.95"/>
    <path d="M0 -${s * 0.34} C ${s * 0.55} ${s * -0.7} ${s * 0.95} ${s * -1.15} ${s * 0.32} ${s * -1.2} C ${s * 0.16} ${s * -1.22} ${s * 0.08} ${s * -0.85} 0 ${s * -0.7}" fill="${green}" opacity="0.95"/>
    <path d="M0 -${s * 0.4} C ${s * 0.06} ${s * -0.9} ${s * 0.05} ${s * -1.35} 0 ${s * -1.5} C ${s * -0.05} ${s * -1.35} ${s * -0.06} ${s * -0.9} 0 ${s * -0.4}" fill="${green}" opacity="0.95"/>
    ${dot(0, s * -0.55, s * 0.22, gold, 0.3)}
    <path d="M ${s * -0.34} ${s * -0.12} L ${s * 0.34} ${s * -0.12} L ${s * 0.2} ${s * -0.5} M ${s * 0.2} ${s * -0.5} L ${s * 0.42} ${s * -0.5} L ${s * 0.12} ${s * -0.78} C ${s * 0.06} ${s * -0.88} ${s * -0.06} ${s * -0.88} ${s * -0.12} ${s * -0.78} L ${s * -0.42} ${s * -0.5} L ${s * -0.2} ${s * -0.5} Z" fill="${gold}"/>
    <path d="M ${s * -0.34} ${s * -0.12} L ${s * 0.34} ${s * -0.12} L ${s * 0.3} ${s * -0.02} L ${s * -0.3} ${s * -0.02} Z" fill="${gold}"/>
  </g>`;
}

function bell(cx, cy, s, color) {
  return `<g transform="translate(${cx} ${cy})">
    ${line(0, s * -0.95, 0, s * -0.25, color, 2)}
    ${ring(0, s * -1.0, s * 0.09, color, 3)}
    <path d="M ${s * -0.32} ${s * -0.25} C ${s * -0.32} ${s * 0.3} ${s * -0.42} ${s * 0.55} 0 ${s * 0.72} C ${s * 0.42} ${s * 0.55} ${s * 0.32} ${s * 0.3} ${s * 0.32} ${s * -0.25} Z" fill="${color}"/>
    <path d="M ${s * -0.32} ${s * -0.25} L ${s * 0.32} ${s * -0.25} L ${s * 0.22} ${s * -0.4} L ${s * -0.22} ${s * -0.4} Z" fill="${color}"/>
    ${dot(0, s * 0.62, s * 0.08, "#2a1a06")}
  </g>`;
}

function diya(cx, cy, s, color) {
  return `<g transform="translate(${cx} ${cy})">
    <path d="M ${s * -1} 0 C ${s * -1.15} ${s * 0.35} ${s * -0.55} ${s * 0.52} 0 ${s * 0.52} C ${s * 0.55} ${s * 0.52} ${s * 1.15} ${s * 0.35} ${s * 1} 0 Z" fill="${color}"/>
    <path d="M0 ${s * -0.1} C ${s * -0.32} ${s * -0.5} ${s * -0.38} ${s * -1.0} 0 ${s * -1.45} C ${s * 0.38} ${s * -1.0} ${s * 0.32} ${s * -0.5} 0 ${s * -0.1} Z" fill="${color}" opacity="0.9"/>
    ${dot(0, s * -0.55, s * 0.16, "#fff7df", 0.9)}
  </g>`;
}

function crown(cx, cy, w, color) {
  const h = w * 0.52;
  const x0 = cx - w / 2;
  const base = cy + h;
  return `<path d="M ${x0} ${base} L ${x0} ${cy + h * 0.74} L ${x0 + w * 0.2} ${cy + h * 0.88} L ${x0 + w * 0.34} ${cy + h * 0.26} L ${x0 + w * 0.5} ${cy + h * 0.86} L ${x0 + w * 0.66} ${cy + h * 0.26} L ${x0 + w * 0.8} ${cy + h * 0.88} L ${x0 + w} ${cy + h * 0.74} L ${x0 + w} ${base} Z" fill="${color}"/>
    ${dot(x0 + w * 0.34, cy + h * 0.34, w * 0.035, "#7c2d12")}
    ${dot(x0 + w * 0.66, cy + h * 0.34, w * 0.035, "#7c2d12")}
    ${line(x0 + w * 0.12, base, x0 + w * 0.88, base, color, 3)}`;
}

/** stepped South-Indian temple tower (gopuram) */
function gopuram(cx, bottomY, w, color, doorColor) {
  const x0 = cx - w / 2;
  const n = 6;
  let d = `M ${x0 - w * 0.1} ${bottomY}`;
  let prev = w * 0.5 + w * 0.06;
  const stepH = w * 0.052;
  for (let i = 1; i <= n; i++) {
    const hw = w * 0.5 * (1 - (i / n) * 0.84);
    const y = bottomY - i * stepH;
    d += ` L ${cx - hw} ${y} L ${cx + hw} ${y}`;
    if (i < n) d += ` L ${cx + hw + (hw - prev) * 0.4} ${y + stepH * 0.3}`;
    prev = hw;
  }
  d += ` L ${x0 + w * 1.1} ${bottomY} Z`;
  const out = [];
  out.push(`<path d="${d}" fill="${color}"/>`);
  // door / niche
  const doorW = w * 0.24;
  out.push(`<path d="M ${cx - doorW / 2} ${bottomY} L ${cx - doorW / 2} ${bottomY - w * 0.3} Q ${cx} ${bottomY - w * 0.52} ${cx + doorW / 2} ${bottomY - w * 0.3} L ${cx + doorW / 2} ${bottomY} Z" fill="${doorColor}"/>`);
  // finial
  out.push(`${dot(cx, bottomY - n * stepH - w * 0.05, w * 0.035, color)}
            ${dot(cx, bottomY - n * stepH - w * 0.12, w * 0.017, color)}`);
  // tier dots (windows)
  for (let i = 1; i <= n; i++) {
    const hw = w * 0.5 * (1 - (i / n) * 0.84);
    const y = bottomY - i * stepH + stepH * 0.18;
    out.push(`<rect x="${cx - hw + w * 0.1}" y="${y}" width="${w * 0.12}" height="${stepH * 0.42}" fill="${color}"/>`);
    out.push(`<rect x="${cx - w * 0.06}" y="${y}" width="${w * 0.12}" height="${stepH * 0.42}" fill="${color}"/>`);
    out.push(`<rect x="${cx + hw - w * 0.22}" y="${y}" width="${w * 0.12}" height="${stepH * 0.42}" fill="${color}"/>`);
  }
  return out.join("");
}

/** layered peony / rose */
function peony(cx, cy, r, outer, inner) {
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${outer}"/>`;
  const n = 10;
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n;
    out += `<g transform="translate(${cx} ${cy}) rotate(${a})"><ellipse cx="${r * 0.62}" cy="0" rx="${r * 0.5}" ry="${r * 0.27}" fill="${outer}" opacity="0.9"/></g>`;
  }
  out += `<circle cx="${cx}" cy="${cy}" r="${r * 0.36}" fill="${inner}"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="${r * 0.14}" fill="#5c2630" opacity="0.55"/>`;
  return out;
}

/** small leaves along a stem */
function sprig(cx, cy, len, color, dir = 1) {
  let out = `<path d="M0 0 Q ${len * 0.5} ${len * -0.3 * dir} ${len} ${len * -0.55 * dir}" fill="none" stroke="${color}" stroke-width="3"/>`;
  for (let i = 1; i <= 3; i++) {
    const t = i / 3;
    const x = len * t;
    const y = len * -0.55 * t * dir;
    out += `<path d="M ${x} ${y} C ${x + 16} ${y - 6 * dir} ${x + 24} ${y + 6 * dir} ${x + 7} ${y + 10 * dir} Z" fill="${color}"/>
            <path d="M ${x} ${y} C ${x - 16} ${y - 6 * dir} ${x - 24} ${y + 6 * dir} ${x - 7} ${y + 10 * dir} Z" fill="${color}"/>`;
  }
  return out;
}

/* ---------------------------------------------------------------- designs */

const cards = [
  {
    file: "wedding-card-1.jpg",
    title: "Traditional Indian Hindu",
    svg() {
      const redDark = "#77100f";
      const gold = "#e7b93c";
      const goldBr = "#f6d27a";
      const goldPa = "#fbecc6";
      const cr = "#f7e2b6";
      const green = "#3f6b3a";
      return finish(`
        ${defs(`
          <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stop-color="#a62424"/>
            <stop offset="1" stop-color="${redDark}"/>
          </linearGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        <rect width="${W}" height="${H}" fill="#5c0c0c" opacity="0.22"/>
        ${frame(30, 30, W - 60, H - 60, goldBr, 2)}
        ${frame(46, 46, W - 92, H - 92, gold, 5)}
        ${cornerCurl(46, 46, 110, gold, 0)}
        ${cornerCurl(W - 46, 46, 110, gold, 90)}
        ${cornerCurl(W - 46, H - 46, 110, gold, 180)}
        ${cornerCurl(46, H - 46, 110, gold, 270)}

        ${kalash(600, 178, 92, gold, green)}
        ${bell(392, 236, 56, gold)}
        ${bell(808, 236, 56, gold)}
        ${dot(600, 292, 6, goldBr)}
        ${line(240, 300, 370, 300, gold, 2)}
        ${line(830, 300, 960, 300, gold, 2)}

        ${txt(600, 505, "WEDDING INVITATION", { size: 46, fill: goldBr, w: 600, ls: 22 })}
        ${txt(600, 690, "Arjun & Meera", { size: 126, fill: goldPa, w: 700 })}
        ${divider(600, 758, 560, gold)}

        ${txt(600, 836, "request the honour of your presence", { size: 40, fill: gold })}
        ${txt(600, 890, "at the auspicious marriage of their beloved children", { size: 32, fill: cr })}
        ${txt(600, 992, "SATURDAY, THE 12TH OF DECEMBER, 2026", { size: 36, fill: goldBr, w: 600, ls: 4 })}
        ${txt(600, 1052, "The Grand Palace, Visakhapatnam", { size: 37, fill: cr, style: "font-style:italic" })}

        ${mandala(600, 1200, 62, gold, 18)}
        ${diya(330, 1290, 30, gold)}
        ${diya(870, 1290, 30, gold)}
        ${txt(600, 1330, "Together with love & blessings", { size: 34, fill: gold })}
        ${txt(600, 1390, "The Sharma Family", { size: 40, fill: goldBr, w: 600, style: "font-style:italic" })}
      `);
    },
  },
  {
    file: "wedding-card-2.jpg",
    title: "Royal",
    svg() {
      const maroonD = "#390d1c";
      const gold = "#e4b54f";
      const goldBr = "#f3d792";
      const cream = "#f2dcae";
      return finish(`
        ${defs(`
          <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stop-color="#5a1630"/>
            <stop offset="1" stop-color="${maroonD}"/>
          </linearGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(30, 30, W - 60, H - 60, gold, 6)}
        ${frame(58, 58, W - 116, H - 116, gold, 2)}
        ${cornerCurl(58, 58, 130, goldBr, 0)}
        ${cornerCurl(W - 58, 58, 130, goldBr, 90)}
        ${cornerCurl(W - 58, H - 58, 130, goldBr, 180)}
        ${cornerCurl(58, H - 58, 130, goldBr, 270)}

        ${crown(600, 150, 190, gold)}
        ${line(600, 330, 600, 360, gold, 2)}
        ${ring(600, 322, 84, gold, 5)}
        ${ring(600, 322, 70, gold, 1.5)}
        ${txt(600, 334, "AR", { size: 62, fill: goldBr, w: 700, ls: 4 })}
        ${dot(600, 322, 5, goldBr)}

        ${txt(600, 520, "THE ROYAL WEDDING", { size: 48, fill: goldBr, w: 600, ls: 24 })}
        ${txt(600, 690, "Aarav & Riya", { size: 122, fill: cream, w: 700 })}
        ${divider(600, 760, 560, gold)}

        ${txt(600, 836, "request the pleasure of your company", { size: 40, fill: gold })}
        ${txt(600, 890, "as they celebrate their union in royal splendour", { size: 33, fill: cream })}
        ${txt(600, 992, "SUNDAY, THE 27TH OF JANUARY, 2027", { size: 36, fill: goldBr, w: 600, ls: 4 })}
        ${txt(600, 1052, "The Royal Orchid Grand, Visakhapatnam", { size: 37, fill: cream, style: "font-style:italic" })}

        ${mandala(600, 1185, 56, gold, 16)}
        ${txt(600, 1318, "By royal invitation, with love", { size: 44, fill: goldBr, f: "Segoe Script", w: 500 })}
        ${line(470, 1340, 730, 1340, gold, 1)}
        ${txt(600, 1395, "The Rathore Family", { size: 40, fill: cream, w: 600, style: "font-style:italic" })}
      `);
    },
  },
  {
    file: "wedding-card-3.jpg",
    title: "Floral Pastel",
    svg() {
      const cream = "#fbf0e6";
      const rose = "#b96472";
      const pink = "#f2bdc6";
      const roseDeep = "#a55360";
      const gold = "#c9a24f";
      const brown = "#a06a5e";
      return finish(`
        ${defs(`
          <radialGradient id="bg" cx="50%" cy="42%" r="80%">
            <stop offset="0" stop-color="#fff9f1"/>
            <stop offset="1" stop-color="${cream}"/>
          </radialGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(32, 32, W - 64, H - 64, "#e0aeb6", 2)}
        ${frame(52, 52, W - 104, H - 104, gold, 1.4)}

        ${peony(150, 260, 82, pink, rose)}
        ${peony(W - 150, 260, 82, pink, rose)}
        ${peony(150, H - 280, 82, pink, rose)}
        ${peony(W - 150, H - 280, 82, pink, rose)}
        ${sprig(60, 360, 150, "#9bb879")}
        ${sprig(W - 60, 360, 150, "#9bb879", -1)}
        ${sprig(60, H - 660, 160, "#9bb879")}
        ${sprig(W - 60, H - 660, 160, "#9bb879", -1)}

        ${dot(600, 370, 6, gold)}
        ${dot(572, 370, 3.5, gold)}
        ${dot(628, 370, 3.5, gold)}

        ${txt(600, 500, "Wedding Invitation", { size: 64, fill: roseDeep, f: "Segoe Script", w: 500 })}
        ${txt(600, 650, "Aadhya & Kabir", { size: 112, fill: "#8a4452", w: 700 })}
        ${divider(600, 722, 420, "#d2a98a")}

        ${txt(600, 800, "Together with their families", { size: 38, fill: roseDeep })}
        ${txt(600, 856, "request the honour of your presence at their wedding", { size: 32, fill: brown })}
        ${txt(600, 958, "SATURDAY, THE 12TH OF DECEMBER, 2026", { size: 36, fill: roseDeep, w: 600, ls: 4 })}
        ${txt(600, 1016, "Charm Gardens, Visakhapatnam", { size: 34, fill: brown, style: "font-style:italic" })}

        ${peony(600, 1180, 84, pink, rose)}
        ${sprig(600 - 150, 1180, 150, "#9bb879", -1)}
        ${sprig(600 + 150, 1180, 150, "#9bb879", 1)}
        ${txt(600, 1340, "with love, the Kapoor Family", { size: 42, fill: roseDeep, f: "Segoe Script", w: 500 })}
      `);
    },
  },
  {
    file: "wedding-card-4.jpg",
    title: "Modern Minimalist",
    svg() {
      const gold = "#b08a2e";
      const goldSoft = "#cfa83b";
      const ink = "#2e2e2e";
      return finish(`
        <rect width="${W}" height="${H}" fill="#ffffff"/>
        <rect width="${W}" height="${H}" fill="#fdfcf7" opacity="0.55"/>
        ${frame(40, 40, W - 80, H - 80, goldSoft, 1.4)}
        ${frame(58, 58, W - 116, H - 116, gold, 1)}

        ${diamond(600, 290, 15, gold)}
        ${line(600, 332, 600, 372, gold, 1.4)}
        ${dot(600, 395, 4, goldSoft)}

        ${txt(600, 520, "WEDDING INVITATION", { size: 28, fill: gold, w: 600, ls: 16 })}
        ${txt(600, 700, "Nikhil & Tara", { size: 108, fill: ink, w: 500 })}
        ${line(430, 782, 770, 782, gold, 1.4)}
        ${diamond(600, 782, 7, gold)}
        ${txt(600, 862, "TOGETHER WITH THEIR FAMILIES", { size: 26, fill: "#8b8b8b", w: 500, ls: 8 })}

        ${txt(600, 980, "12 · 12 · 2026", { size: 34, fill: gold, w: 600, ls: 6 })}
        ${txt(600, 1036, "The Minimalist Studio, Visakhapatnam", { size: 26, fill: "#8b8b8b" })}

        ${txt(600, 1310, "Save the Date", { size: 44, fill: goldSoft, f: "Segoe Script", w: 500 })}
        ${dot(600, 1390, 3.5, gold)}
      `);
    },
  },
  {
    file: "wedding-card-5.jpg",
    title: "South Indian Temple",
    svg() {
      const redD = "#6d0f11";
      const gold = "#e7b93c";
      const goldBr = "#f6d27a";
      const cream = "#f7e6c4";
      const door = "#5c0a0c";
      return finish(`
        ${defs(`
          <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stop-color="#9e2020"/>
            <stop offset="1" stop-color="${redD}"/>
          </linearGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(30, 30, W - 60, H - 60, gold, 3)}
        ${frame(48, 48, W - 96, H - 96, gold, 1.6)}

        ${gopuram(600, 268, 360, gold, door)}
        ${bell(352, 200, 46, gold)}
        ${bell(848, 200, 46, gold)}

        ${txt(600, 428, "NAMASKARAM", { size: 40, fill: goldBr, w: 600, ls: 18 })}
        <path d="M 280 560 A 320 320 0 0 1 920 560" fill="none" stroke="${gold}" stroke-width="4"/>
        ${dot(600, 560, 5, goldBr)}

        ${txt(600, 730, "Vishnu & Pooja", { size: 118, fill: goldBr, w: 700 })}
        ${divider(600, 800, 520, gold)}
        ${txt(600, 880, "Wedding Invitation", { size: 44, fill: gold, style: "font-style:italic" })}
        ${txt(600, 934, "with divine blessings and family warmth", { size: 33, fill: cream })}
        ${txt(600, 1036, "MONDAY, THE 21ST OF DECEMBER, 2026", { size: 36, fill: goldBr, w: 600, ls: 4 })}
        ${txt(600, 1094, "Sri Kalyana Mandapam, Visakhapatnam", { size: 36, fill: cream, style: "font-style:italic" })}

        ${diya(260, 1300, 40, gold)}
        ${diya(940, 1300, 40, gold)}
        ${line(360, 1330, 510, 1330, gold, 2)}
        ${line(690, 1330, 840, 1330, gold, 2)}
        ${txt(600, 1360, "With love from the Reddy Family", { size: 38, fill: goldBr, style: "font-style:italic" })}
      `);
    },
  },
  {
    file: "wedding-card-6.jpg",
    title: "Luxury Green",
    svg() {
      const green = "#0e2b1c";
      const greenD = "#081f12";
      const gold = "#d6ab4a";
      const goldBr = "#ecca74";
      const pale = "#dce8d5";
      return finish(`
        ${defs(`
          <radialGradient id="bg" cx="50%" cy="40%" r="85%">
            <stop offset="0" stop-color="#13402a"/>
            <stop offset="1" stop-color="${greenD}"/>
          </radialGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(28, 28, W - 56, H - 56, gold, 5)}
        ${frame(56, 56, W - 112, H - 112, gold, 1.4)}
        ${diamond(56, 56, 12, gold)}
        ${diamond(W - 56, 56, 12, gold)}
        ${diamond(56, H - 56, 12, gold)}
        ${diamond(W - 56, H - 56, 12, gold)}
        ${diamond(56, 56, 20, gold)} 
        ${diamond(W - 56, 56, 20, gold)}
        ${diamond(56, H - 56, 20, gold)}
        ${diamond(W - 56, H - 56, 20, gold)}

        ${line(430, 250, 530, 250, gold, 2)}
        ${line(670, 250, 770, 250, gold, 2)}
        ${diamond(600, 250, 26, gold)}
        ${txt(600, 268, "RZ", { size: 44, fill: green, w: 700, ls: 4 })}
        ${txt(600, 412, "LUXURY WEDDING", { size: 44, fill: goldBr, w: 600, ls: 20 })}

        ${txt(600, 590, "Reyansh & Zara", { size: 112, fill: "#f4e5b3", w: 700 })}
        ${divider(600, 662, 460, gold)}
        ${txt(600, 742, "request the honour of your presence", { size: 38, fill: pale })}
        ${txt(600, 852, "SATURDAY, THE 19TH OF DECEMBER, 2026", { size: 36, fill: goldBr, w: 600, ls: 4 })}
        ${txt(600, 912, "Emerald Grande Resort, Visakhapatnam", { size: 35, fill: pale, style: "font-style:italic" })}

        <g transform="translate(420 1140) scale(1)">
          ${line(0, 0, 90, 0, gold, 2)}
          ${diamond(105, 0, 10, gold)}
          ${line(120, 0, 210, 0, gold, 2)}
        </g>
        <g transform="translate(780 1140) scale(-1 1)">
          ${line(0, 0, 90, 0, gold, 2)}
          ${diamond(105, 0, 10, gold)}
          ${line(120, 0, 210, 0, gold, 2)}
        </g>
        ${txt(600, 1248, "a celebration of two souls", { size: 44, fill: goldBr, f: "Segoe Script", w: 500 })}
        ${txt(600, 1340, "The Malhotra Family", { size: 38, fill: goldBr, w: 600, style: "font-style:italic" })}
      `);
    },
  },
  {
    file: "wedding-card-7.jpg",
    title: "Elegant Floral Lavender",
    svg() {
      const ivory = "#f6f2ed";
      const lavDeep = "#7d639b";
      const lavSoft = "#cbb8dd";
      const gold = "#bfa04a";
      const ink = "#5b4a72";
      return finish(`
        ${defs(`
          <radialGradient id="bg" cx="50%" cy="40%" r="80%">
            <stop offset="0" stop-color="#fdfbf7"/>
            <stop offset="1" stop-color="${ivory}"/>
          </radialGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(32, 32, W - 64, H - 64, lavSoft, 2)}
        ${frame(54, 54, W - 108, H - 108, gold, 1.2)}

        ${peony(120, 240, 52, "#cbb6df", lavDeep)}
        ${peony(W - 120, 240, 52, "#cbb6df", lavDeep)}
        ${peony(120, H - 240, 52, "#cbb6df", lavDeep)}
        ${peony(W - 120, H - 240, 52, "#cbb6df", lavDeep)}

        ${sprig(70, 330, 240, "#a98cc0")}
        ${sprig(70, 720, 260, "#b7a0d0")}
        ${sprig(70, 1130, 240, "#a98cc0")}
        ${sprig(W - 70, 330, 240, "#a98cc0", -1)}
        ${sprig(W - 70, 720, 260, "#b7a0d0", -1)}
        ${sprig(W - 70, 1130, 240, "#a98cc0", -1)}

        ${dot(600, 360, 4.5, lavDeep)}
        ${dot(572, 360, 3, lavDeep)}
        ${dot(628, 360, 3, lavDeep)}

        ${txt(600, 470, "Wedding Invitation", { size: 60, fill: lavDeep, f: "Segoe Script", w: 500 })}
        ${txt(600, 610, "Ishaan & Anika", { size: 108, fill: ink, w: 700 })}
        ${divider(600, 680, 400, "#b7a4cf")}

        ${txt(600, 752, "Together with their families", { size: 36, fill: lavDeep })}
        ${txt(600, 806, "request the honour of your presence at their wedding", { size: 30, fill: "#7d6b93" })}
        ${txt(600, 908, "SATURDAY, THE 26TH OF DECEMBER, 2026", { size: 34, fill: lavDeep, w: 600, ls: 4 })}
        ${txt(600, 968, "Lavender Meadows, Visakhapatnam", { size: 33, fill: "#7d6b93", style: "font-style:italic" })}

        ${peony(600, 1170, 66, "#cbb6df", lavDeep)}
        ${dot(600, 1140, 3, gold)}
        ${dot(530, 1200, 3, gold)}
        ${dot(670, 1200, 3, gold)}
        ${txt(600, 1330, "with love, the Mehta Family", { size: 42, fill: lavDeep, f: "Segoe Script", w: 500 })}
      `);
    },
  },
  {
    file: "wedding-card-8.jpg",
    title: "Premium Beige",
    svg() {
      const beigeD = "#dcccA6";
      const gold = "#a8842f";
      const goldBr = "#c2a34e";
      const ink = "#5d4a24";
      const soft = "#80704a";
      return finish(`
        ${defs(`
          <radialGradient id="bg" cx="50%" cy="38%" r="78%">
            <stop offset="0" stop-color="#f2e9d3"/>
            <stop offset="1" stop-color="${beigeD}"/>
          </radialGradient>
        `)}
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        ${frame(36, 36, W - 72, H - 72, gold, 1.6)}
        ${frame(58, 58, W - 116, H - 116, goldBr, 1)}
        ${diamond(58, 58, 8, gold)}
        ${diamond(W - 58, 58, 8, gold)}
        ${diamond(58, H - 58, 8, gold)}
        ${diamond(W - 58, H - 58, 8, gold)}

        ${txt(600, 226, "PREMIUM INVITATION", { size: 30, fill: gold, w: 600, ls: 20 })}
        ${line(430, 258, 770, 258, goldBr, 1)}

        ${txt(600, 520, "Vihaan & Naira", { size: 126, fill: ink, w: 700, ls: 2 })}
        ${divider(600, 598, 460, gold)}

        ${txt(600, 680, "request the pleasure of your company", { size: 36, fill: soft })}
        ${txt(600, 734, "as two families unite in joyous celebration", { size: 30, fill: soft })}
        ${txt(600, 850, "SATURDAY, THE 5TH OF DECEMBER, 2026", { size: 36, fill: gold, w: 600, ls: 4 })}
        ${txt(600, 910, "The Ivory Banquet Hall, Visakhapatnam", { size: 34, fill: soft, style: "font-style:italic" })}

        ${ring(600, 1175, 66, gold, 1.6)}
        ${ring(600, 1175, 78, goldBr, 1)}
        ${txt(600, 1189, "VN", { size: 44, fill: ink, w: 600, ls: 3 })}
        ${txt(600, 1355, "With warm regards, the Jain Family", { size: 40, fill: soft, style: "font-style:italic", w: 500 })}
      `);
    },
  },
];

/* ------------------------------------------------------------------- main */

await fs.mkdir(OUT_DIR, { recursive: true });

const results = [];
for (const card of cards) {
  const out = path.join(OUT_DIR, card.file);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${card.svg()}</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  const meta = await sharp(out).metadata();
  const stat = await fs.stat(out);
  results.push({ file: card.file, title: card.title, size: Math.round(stat.size / 1024), w: meta.width, h: meta.height });
}

console.table(results);

/* contact sheet for quick review */
const thumbs = [];
for (const card of cards) {
  thumbs.push(await sharp(path.join(OUT_DIR, card.file)).resize(600, 800).jpeg({ quality: 85 }).toBuffer());
}
const sheetFile = path.join(path.dirname(ROOT), ".next", "card-sheet-review.jpg");
await sharp({
  create: { width: 4 * 600, height: 2 * 800, channels: 3, background: "#14120e" },
})
  .composite([
    { input: thumbs[0], left: 0, top: 0 },
    { input: thumbs[1], left: 600, top: 0 },
    { input: thumbs[2], left: 1200, top: 0 },
    { input: thumbs[3], left: 1800, top: 0 },
    { input: thumbs[4], left: 0, top: 800 },
    { input: thumbs[5], left: 600, top: 800 },
    { input: thumbs[6], left: 1200, top: 800 },
    { input: thumbs[7], left: 1800, top: 800 },
  ])
  .jpeg({ quality: 86 })
  .toFile(sheetFile);
console.log("contact sheet:", sheetFile);