import devserver, { defaultOptions } from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import { vitePlugin as remix } from "@remix-run/dev";
import rehypePrettyCode from "rehype-pretty-code";
import { remixDevTools } from "remix-development-tools";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devserver({
      adapter,
      entry: "server.ts",
      exclude: [...defaultOptions.exclude, "/assets/**", "/app/**"],
      injectClientScript: false,
    }),
    remixDevTools(),
    mdx({
      rehypePlugins: [[rehypePrettyCode, { theme: "nord" }]],
    }),
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
      future: {
        v3_singleFetch: true,
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_optimizeDeps: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: "ES2022",
  },
});
