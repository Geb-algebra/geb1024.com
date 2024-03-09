import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { remixDevTools } from 'remix-development-tools/vite';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remixDevTools(),
    remix({
      presets: [vercelPreset()],
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
  build: {
    target: 'ES2022',
  },
});
