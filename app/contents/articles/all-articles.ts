import * as Article1 from "./make-values-easy-to-guess/page.mdx";

export type ArticleInfo = {
  slug: string;
  title: string;
  category: string;
  abstract: string;
  writtenAt: Date;
};

export const allArticles: ArticleInfo[] = [
  {
    slug: "make-values-easy-to-guess",
    title: Article1.meta.title,
    category: Article1.meta.category,
    abstract: Article1.meta.abstract,
    writtenAt: new Date(Article1.meta.writtenAt),
  },
];
