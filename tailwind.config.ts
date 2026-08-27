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
        background: "#0a0a0a",
        foreground: "#ededed",
        dark: {
          50: "#1e1e1e",
          100: "#161616",
          200: "#121212",
          300: "#0e0e0e",
          DEFAULT: "#0a0a0a",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#8E8E93",
        },
        brand: {
          50: "#fff3ee",
          100: "#ffe5d9",
          200: "#ffcdb8",
          300: "#ffa88a",
          400: "#ff7754",
          500: "#FF5722",
          600: "#FF4D2E",
          700: "#e63e1c",
          800: "#bd3214",
          900: "#992c14",
          DEFAULT: "#FF5722",
          accent: "#FF4D2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "Bricolage Grotesque", "sans-serif"],
        serifItalic: ["var(--font-serif-italic)", "Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        "grid-lines": "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
        "grid-lg": "48px 48px",
      },
      boxShadow: {
        "accent-glow": "0 0 25px -5px rgba(255, 87, 34, 0.4)",
        "accent-glow-lg": "0 0 50px -10px rgba(255, 87, 34, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
