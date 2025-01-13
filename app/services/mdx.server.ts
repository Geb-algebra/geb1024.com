import fs from "node:fs";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";

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
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrettyCode];
      return options;
    },
  });
}

export type ArticleInfo = {
  slug: string;
  title: string;
  category: string;
  writtenAt: string; // yyyy/mm/dd
};

// get array of directory name in app/articles/{category}
export async function listAllArticles() {
  const dirs = fs.readdirSync(`${process.cwd()}/app/articles`);
  const articles: ArticleInfo[] = await Promise.all(
    dirs.map(async (slug) => {
      const { frontmatter } = await bundlePost(`${slug}`);
      return { slug, ...frontmatter } as ArticleInfo;
    }),
  );
  articles.sort((a, b) => {
    return a.writtenAt < b.writtenAt ? 1 : -1;
  });
  return articles;
}
