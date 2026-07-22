import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#ff7a18",
          600: "#ea6000",
          700: "#b23a00",
          800: "#8a2c00",
        },
        gold: {
          400: "#f0c040",
          500: "#d4a017",
          600: "#a87a00",
        },
        cream: {
          50:  "#fffdf9",
          100: "#fff8f0",
          200: "#f5ebe0",
        },
        ink: "#2a1c12",
        muted: "#7a6a5d",
      },
      fontFamily: {
        devanagari: [
          "Noto Sans Devanagari",
          "Mangal",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn .3s ease",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "none" } },
      },
    },
  },
  plugins: [],
};

export default config;
