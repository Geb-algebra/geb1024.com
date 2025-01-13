import type { Config } from "@react-router/dev/config";
import { allArticles } from "./app/contents/articles/all-articles";
import { allKnowledgePieces } from "./app/contents/knowledge-pieces/all-knowledge-pieces.server";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: async ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...allArticles.map((slug) => `/articles/${slug}`),
    ...allKnowledgePieces.map((piece) => `/knowledge-pieces/${piece.slug}`),
  ],
} satisfies Config;
