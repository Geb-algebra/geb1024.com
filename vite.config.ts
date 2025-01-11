import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import rehypePrettyCode from "rehype-pretty-code";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypePrettyCode, { theme: "nord" }]],
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
