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
        "text-main": "#5C4033",
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
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "bell-swing": {
          "0%, 100%": { transform: "translateX(0px)" },
          "10%": { transform: "translateX(-5px)" },
          "20%": { transform: "translateX(5px)" },
          "30%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "50%": { transform: "translateX(-2px)" },
          "60%": { transform: "translateX(2px)" },
          "70%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        blink: "blink 0.7s step-end infinite",
        "bell-swing": "bell-swing 1.8s linear infinite",
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
