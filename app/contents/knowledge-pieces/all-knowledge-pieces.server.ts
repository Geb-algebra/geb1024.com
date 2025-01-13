import piece1 from "./how-js-framework-works/content";
import piece2 from "./spa-ssr/content";

export type KnowledgePiece = {
  title: string;
  slug: string;
  date: Date;
  content: string[];
  figure: string;
  related: string[];
};

export const allKnowledgePieces: KnowledgePiece[] = [piece1, piece2];
