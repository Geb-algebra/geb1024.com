import type { Config } from "@react-router/dev/config";
import { getAllArticles } from "./app/domain/articles/get-all-articles.server";
import { getAllKnowledgePieces } from "./app/domain/knowledge-pieces/get-all-knowledge-pieces.server";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: async ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...getAllArticles().map((slug) => `/articles/${slug}`),
    ...getAllKnowledgePieces().map((piece) => `/knowledge-pieces/${piece.slug}`),
  ],
} satisfies Config;
