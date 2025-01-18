import fs from "node:fs";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";
import type { Article } from "~/domain/models";

export async function bundlePost(slug: string) {
  const path = `${process.cwd()}/app/contents/articles/${slug}`;
  return await bundleMDX({
    file: `${path}/page.mdx`,
    cwd: path,

    esbuildOptions: (options) => {
      // Configuration to allow image loading
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".svg": "dataurl",
        ".gif": "dataurl",
      };
      return options;
    },
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, { theme: "nord" }],
      ];
      return options;
    },
  });
}

// get array of directory name in app/articles/{category}
export async function listAllArticles() {
  const dirs = fs.readdirSync(`${process.cwd()}/app/articles`);
  const articles: Article[] = await Promise.all(
    dirs.map(async (slug) => {
      const { frontmatter } = await bundlePost(slug);
      return { slug, ...frontmatter } as Article;
    }),
  );
  articles.sort((a, b) => {
    return a.writtenAt < b.writtenAt ? 1 : -1;
  });
  return articles;
}
