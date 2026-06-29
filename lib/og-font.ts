import { readFile } from "fs/promises";
import { join } from "path";

function isValidFont(data: ArrayBuffer): boolean {
  const bytes = new Uint8Array(data.slice(0, 4));
  return (
    (bytes[0] === 0x00 &&
      bytes[1] === 0x01 &&
      bytes[2] === 0x00 &&
      bytes[3] === 0x00) ||
    (bytes[0] === 0x4f &&
      bytes[1] === 0x54 &&
      bytes[2] === 0x54 &&
      bytes[3] === 0x4f) ||
    (bytes[0] === 0x74 &&
      bytes[1] === 0x72 &&
      bytes[2] === 0x75 &&
      bytes[3] === 0x65)
  );
}

async function loadBundledFont(): Promise<ArrayBuffer> {
  const fontPath = join(process.cwd(), "assets/fonts/NotoSansJP-Regular.ttf");
  const buffer = await readFile(fontPath);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

export async function loadOgFont(): Promise<ArrayBuffer> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        },
      }
    ).then((res) => res.text());

    const fontMatch =
      css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/) ??
      css.match(/src: url\(([^)]+)\)/);

    const fontUrl = fontMatch?.[1];
    if (fontUrl) {
      const data = await fetch(fontUrl).then((res) => res.arrayBuffer());
      if (isValidFont(data)) {
        return data;
      }
    }
  } catch {
    // Google Fonts fetch can fail offline; fall back to bundled font.
  }

  return loadBundledFont();
}
