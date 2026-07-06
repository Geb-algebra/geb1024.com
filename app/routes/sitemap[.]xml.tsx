import { articleFromFrontmatter } from "~/domain/articles/frontmatter.server";
import { getAllArticles } from "~/domain/articles/get-all-articles.server";
import { bundlePost } from "~/domain/articles/services.server";
import { getAllKnowledgePieces } from "~/domain/knowledge-pieces/get-all-knowledge-pieces.server";
import { absoluteSiteUrl } from "~/utils/social";

export async function loader() {
  const articles = await Promise.all(
    getAllArticles().map(async (slug) => {
      const { frontmatter } = await bundlePost(slug);
      return articleFromFrontmatter(slug, frontmatter);
    }),
  );

  const urls = [
    { path: "/", lastModified: undefined as string | undefined },
    ...articles
      .filter((article) => article.writtenAt.getTime() < Date.now())
      .map((article) => ({
        path: `/articles/${article.slug}`,
        lastModified: article.writtenAt.toISOString(),
      })),
    ...getAllKnowledgePieces().map((piece) => ({
      path: `/knowledge-pieces/${piece.slug}`,
      lastModified: piece.date.toISOString(),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastModified }) => `<url>
  <loc>${absoluteSiteUrl(path)}</loc>${
    lastModified
      ? `
  <lastmod>${lastModified}</lastmod>`
      : ""
  }
</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
