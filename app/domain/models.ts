export type Article = {
  slug: string;
  title: string;
  category: string;
  abstract: string;
  writtenAt: Date;
};

export type KnowledgePiece = {
  title: string;
  slug: string;
  date: Date;
  content: string[];
  figure: string;
  related: string[];
};
