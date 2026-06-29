#!/usr/bin/env node
/**
 * Generates stamp PNGs for public/stamps/
 * Run: node scripts/generate-stamps.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/stamps");

const COLORS = {
  wakaru: "#F067A6",
  naita: "#4a90d9",
  oseru: "#f0a030",
  ouen: "#3cb371",
};

const stamps = {
  wakaru: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path fill="${color}" d="M12 20.35l-1.1-1C7.4 15.36 5 12.78 5 10.2 5 7.66 6.9 6 9 6c1.24 0 2.43.58 3 1.5.57-.92 1.76-1.5 3-1.5 2.1 0 4 1.66 4 4.2 0 2.58-2.4 5.16-5.9 9.15l-1.1 1z"/>
  </svg>`,
  naita: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
    <g transform="translate(0 2)">
      <path fill="${color}" d="M12 3c-1.2 3.6-4.5 6.3-4.5 10.2A4.5 4.5 0 0012 18a4.5 4.5 0 004.5-4.8C16.5 9.3 13.2 6.6 12 3z"/>
    </g>
  </svg>`,
  oseru: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path fill="${color}" d="M2 20V9h4v11H2zm18-9.5c0-1.1-.9-2-2-2h-5.7l.86-4.14.03-.29c0-.37-.15-.71-.4-.96L12.2 2 6.9 7.3C6.6 7.6 6.4 8 6.4 8.5V18c0 1.1.9 2 2 2h8.1c.75 0 1.4-.45 1.67-1.1l2.73-6.37c.08-.21.12-.43.12-.65v-1.93z"/>
  </svg>`,
  ouen: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
    <g transform="translate(1.5 0)">
      <path fill="${color}" d="M4 10v8h3v-8H4zm5 0l9-4v12l-9-4v-4z"/>
    </g>
  </svg>`,
};

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Install sharp: npm install --save-dev sharp");
    process.exit(1);
  }

  for (const [name, buildSvg] of Object.entries(stamps)) {
    const outPath = path.join(outDir, `${name}.png`);
    const svg = buildSvg(COLORS[name]);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log("Created", outPath);
  }
}

main();
