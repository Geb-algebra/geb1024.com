import type { HeadersFunction, MetaFunction } from "react-router";
import ArticleIndex from "~/components/articles/ArticleIndex";
import { articleFromFrontmatter } from "~/domain/articles/frontmatter.server";
import { getAllArticles } from "~/domain/articles/get-all-articles.server";
import { bundlePost } from "~/domain/articles/services.server";
import type { Route } from "./+types/_index";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export async function loader() {
  return await Promise.all(
    getAllArticles().map(async (slug) => {
      const { frontmatter } = await bundlePost(slug);
      return articleFromFrontmatter(slug, frontmatter);
    }),
  ).then((articles) => articles.filter((article) => article.writtenAt.getTime() < Date.now()));
}

export const meta: MetaFunction = () => {
  return [{ title: "Blog Posts" }];
};

export default function Page({ loaderData }: Route.ComponentProps) {
  loaderData.sort((a, b) => b.writtenAt.getTime() - a.writtenAt.getTime());
  return <ArticleIndex articles={loaderData} title="Blog Posts" />;
}
