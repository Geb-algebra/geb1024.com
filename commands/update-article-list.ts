import fs from "node:fs";
import path from "node:path";

const articlesDir = path.join(process.cwd(), "app/routes/_main.articles+");
const allArticlesFile = path.join(
  process.cwd(),
  "app/routes/_main.articles+/_index/all-articles.ts",
);

const getArticleInfo = (articlePath: string) => {
  const content = fs.readFileSync(articlePath, "utf-8");
  const slug = path.basename(path.dirname(articlePath));
  const titleMatch = content.match(/export const title = "(.*)";/);
  const categoryMatch = content.match(/export const category = "(.*)";/);
  const abstractMatch = content.match(/export const abstract = "(.*)";/);
  const writtenAtMatch = content.match(/export const writtenAt = new Date\("(.*)"\);/);

  return {
    slug,
    title: titleMatch ? titleMatch[1] : "",
    category: categoryMatch ? categoryMatch[1] : "",
    abstract: abstractMatch ? abstractMatch[1] : "",
    writtenAt: writtenAtMatch ? new Date(writtenAtMatch[1]) : new Date(),
  };
};

export const updateAllArticles = () => {
  const articleDirs = fs.readdirSync(articlesDir).filter((dir) => {
    const fullPath = path.join(articlesDir, dir);
    return fs.statSync(fullPath).isDirectory() && dir !== "_index";
  });

  console.log(`Found article directories: ${articleDirs.join(", ")}`);

  const imports = articleDirs
    .map((dir, index) => `import * as Article${index + 1} from "../${dir}/content.mdx";`)
    .join("\n");

  const articles = articleDirs
    .map((dir, index) => {
      const info = getArticleInfo(path.join(articlesDir, dir, "content.mdx"));
      return `{
      slug: "${info.slug}",
      title: Article${index + 1}.title,
      category: Article${index + 1}.category,
      abstract: Article${index + 1}.abstract,
      writtenAt: Article${index + 1}.writtenAt,
    }`;
    })
    .join(",\n  ");

  const content = `
${imports}

export type ArticleInfo = {
  slug: string;
  title: string;
  category: string;
  abstract: string;
  writtenAt: Date;
};

export const allArticles: ArticleInfo[] = [
  ${articles}
];
`;

  console.log("Writing to all-articles.ts...");
  fs.writeFileSync(allArticlesFile, content, "utf-8");
};
