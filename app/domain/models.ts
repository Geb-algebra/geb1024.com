export type ArticleCategory = "books" | "tech" | "jobsCareers";
export type ArticleKind = "article" | "note";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  abstract: string;
  writtenAt: Date;
  kind: ArticleKind;
};

export type KnowledgePiece = {
  title: string;
  slug: string;
  date: Date;
  content: string[];
  figure: string;
  related: string[];
};
