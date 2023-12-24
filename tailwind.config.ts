import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        'geb-blue': '#002538',
        'base-white': '#ebebd7',
        'accent-wine': '#a1251a',
      },
      fontFamily: {
        sans: ['"Ubuntu"', '"Noto Sans JP"', 'sans-serif'],
        mono: ['"Ubuntu Mono"', '"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
