import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#ffffff",
        "sub-bg": "#FDF5FA",
        accent: "#F067A6",
        "pink-light": "#FFD6EC",
        "pink-pale": "#FFF0F8",
        "text-main": "#2a1a22",
        "text-sub": "#7a5568",
        "tag-text": "#F067A6",
        "log-hint": "#C086A8",
        "log-hover": "#FDF5FA",
        "log-border": "rgba(240,103,166,0.14)",
        "pink-strong": "#F9B8D8",
        dog: "#4a90d9",
        "dog-light": "#eef5fd",
        cat: "#9b6fd4",
        "cat-light": "#f3eefe",
        "result-page": "#ffffff",
        "result-blue": "#00B7CE",
        "result-pink": "#F067A6",
        "result-title": "#F2AECE",
        "result-text": "#5C4033",
      },
      fontFamily: {
        heading: ["var(--font-noto-sans)", "sans-serif"],
        body: ["var(--font-noto-sans)", "sans-serif"],
        cormorant: ["var(--font-noto-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
