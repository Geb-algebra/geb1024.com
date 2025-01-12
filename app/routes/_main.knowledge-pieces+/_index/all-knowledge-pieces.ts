
import * as Piece1 from "../how-js-framework-works/Content";
import * as Piece2 from "../spa-ssr/Content";

export type KnowledgePiece = {
  title: string;
  slug: string;
  date: Date;
  Figure: React.ComponentType;
};

export const allKnowledgePieces: KnowledgePiece[] = [
  {
      title: Piece1.title,
      slug: "how-js-framework-works",
      date: Piece1.date,
      Figure: Piece1.default,
    },
  {
      title: Piece2.title,
      slug: "spa-ssr",
      date: Piece2.date,
      Figure: Piece2.default,
    }
];
