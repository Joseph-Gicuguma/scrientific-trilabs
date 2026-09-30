/**
 * Renders the Open Graph image, logo.png and apple-touch-icon.png into public/.
 * Run after changing brand colours or the East Africa map: npm run brand:images
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const css = readFileSync(path.join(root, "app/styles/app.css"), "utf8");
const color = (name) =>
  new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i").exec(css)[1];
const C = Object.fromEntries(
  ["blush", "green", "orange", "sage", "cream", "ink", "paper"].map((n) => [
    n,
    color(n),
  ]),
);

// Same drawing and tones the site uses.
const mapSource = readFileSync(
  path.join(root, "app/components/well-plate/maps/east-africa.ts"),
  "utf8",
);
const art = /EAST_AFRICA_ART = `([\s\S]*?)`/
  .exec(mapSource)[1]
  .trim()
  .split("\n")
  .map((l) => l.trim());
const block = (name) =>
  new RegExp(`${name}[^=]*=\\s*\\{([^}]*)\\}`).exec(mapSource)[1];
const entries = (body) =>
  Object.fromEntries(
    [...body.matchAll(/([A-Z]{2}):\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
  );
const tones = entries(block("PLATE_MARKET_TONES"));
const labelWells = entries(block("MARKET_LABEL_WELLS"));
const letterToCode = { E: "ET", K: "KE", U: "UG", R: "RW", T: "TZ" };
const toneFor = Object.fromEntries(
  Object.entries(letterToCode).map(([letter, code]) => [
    letter,
    C[tones[code]],
  ]),
);
const labelAt = Object.fromEntries(
  Object.entries(labelWells).map(([code, well]) => [well, code]),
);

// Inlined as data URIs: pages built with setContent cannot read file:// URLs.
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(
    path.join(root, "node_modules/@fontsource-variable", pkg, "files", file),
  ).toString("base64")}`;

function plate(pitch) {
  const r = pitch * 0.39;
  let out = "";
  art.forEach((line, row) => {
    [...line].forEach((key, col) => {
      const cx = col * pitch + pitch / 2;
      const cy = row * pitch + pitch / 2;
      const code = labelAt[`${"ABCDEFGH"[row]}${col + 1}`];
      if (code) {
        out += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="Inter Tight" font-weight="700" font-size="${pitch * 0.4}" fill="${C.ink}">${code}</text>`;
        return;
      }
      const fill = key === "." ? "none" : toneFor[key];
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${C.ink}" stroke-width="${pitch * 0.05}"/>`;
    });
  });
  return `<svg width="${pitch * 12}" height="${pitch * 8}" viewBox="0 0 ${pitch * 12} ${pitch * 8}">${out}</svg>`;
}

function wells(size, third = C.ink) {
  const r = size * 0.14;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${C.blush}"/>
    <circle cx="${size * 0.2}" cy="${size / 2}" r="${r}" fill="${C.green}"/>
    <circle cx="${size * 0.5}" cy="${size / 2}" r="${r}" fill="${C.orange}"/>
    <circle cx="${size * 0.8}" cy="${size / 2}" r="${r}" fill="${third}"/>
  </svg>`;
}

const head = `<style>
  @font-face { font-family: "Inter Tight"; src: url("${font("inter-tight", "inter-tight-latin-wght-normal.woff2")}"); font-weight: 100 900; }
  @font-face { font-family: "Bitter"; src: url("${font("bitter", "bitter-latin-wght-normal.woff2")}"); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body { background: ${C.blush}; color: ${C.ink}; }
</style>`;

const og = `<!doctype html><html><head>${head}</head><body>
<div style="width:1200px;height:630px;display:grid;grid-template-columns:640px 560px;">
  <div style="padding:56px;display:flex;flex-direction:column;justify-content:space-between;">
    <h1 style="font-family:'Inter Tight';font-weight:750;font-size:64px;line-height:0.95;letter-spacing:-0.045em;">
      The world's best diagnostics, in East African labs sooner.
    </h1>
    <div style="display:flex;align-items:center;gap:16px;font-family:'Inter Tight';font-weight:700;font-size:28px;letter-spacing:-0.02em;">
      <svg width="84" height="28" viewBox="0 0 84 28">
        <circle cx="14" cy="14" r="11" fill="${C.green}"/><circle cx="42" cy="14" r="11" fill="${C.orange}"/><circle cx="70" cy="14" r="11" fill="${C.ink}"/>
      </svg>
      Tri-Lab Scientific
    </div>
  </div>
  <div style="background:${C.paper};display:flex;align-items:center;justify-content:center;">
    ${plate(40)}
  </div>
</div></body></html>`;

const browser = await chromium.launch();
async function shot(html, width, height, file) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "public", file) });
  await page.close();
  console.log(`wrote public/${file}`);
}
await shot(og, 1200, 630, "og/default.png");
await shot(
  `<!doctype html><html><head>${head}</head><body>${wells(512)}</body></html>`,
  512,
  512,
  "logo.png",
);
await shot(
  `<!doctype html><html><head>${head}</head><body>${wells(180)}</body></html>`,
  180,
  180,
  "apple-touch-icon.png",
);
await browser.close();
