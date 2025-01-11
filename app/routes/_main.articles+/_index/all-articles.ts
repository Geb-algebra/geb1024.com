
import * as Article1 from "../make-values-easy-to-guess/content.mdx";

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
      title: Article1.title,
      category: Article1.category,
      abstract: Article1.abstract,
      writtenAt: Article1.writtenAt,
    }
];
