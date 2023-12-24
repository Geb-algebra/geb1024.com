import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        'geb-blue': '#002538',
        'base-white': '#fffff0',
        'accent-wine': '#a1251a',
        'twilight-gray': '#dcd5c8',
        'sharp-gray': '#a2a2ad',
      },
      fontFamily: {
        sans: ['"Ubuntu"', '"Noto Sans JP"', 'sans-serif'],
        mono: ['"Ubuntu Mono"', '"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
