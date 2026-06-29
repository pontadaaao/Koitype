import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Koitype | 恋愛診断サイト",
    short_name: "Koitype",
    description: "あなたの恋愛タイプや相性を診断。Koitypeで、もっと自分の恋愛を知ろう。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e8849a",
    icons: [
      {
        src: "/icon.png",
        sizes: "1080x1080",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
