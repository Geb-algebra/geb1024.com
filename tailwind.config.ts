import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "geb-blue": "var(--geb-blue)",
        "base-color": "var(--base-color)",
        "paper-color": "var(--paper-color)",
        "sub-color": "var(--sub-color)",
        "text-main": "var(--text-main)",
        "text-sub": "var(--text-sub)",
        "border-color": "var(--border-color)",
      },
      fontFamily: {
        sans: ['"Ubuntu"', '"Noto Sans JP"', "sans-serif"],
        mono: ['"Ubuntu Mono"', '"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
