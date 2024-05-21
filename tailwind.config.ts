import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "geb-blue": "#002538",
        "base-color": "#f0f0e0",
        "paper-color": "#fffff0",
        "sub-color": "#a2a2ad",
        "text-main": "#002538",
        "text-sub": "#63676b",
        "border-color": "#ccc5b8",
      },
      fontFamily: {
        sans: ['"Ubuntu"', '"Noto Sans JP"', "sans-serif"],
        mono: ['"Ubuntu Mono"', '"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
