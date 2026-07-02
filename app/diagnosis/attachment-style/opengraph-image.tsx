import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const imgPath = path.join(process.cwd(), "public", "attachment-style-og.png");
  const imgBuffer = fs.readFileSync(imgPath);
  return new Response(imgBuffer, { headers: { "Content-Type": "image/png" } });
}
