import type { MetaFunction } from "@remix-run/react";
import Figure from "~/components/knowledge-pieces/Figure";
import KnowledgePiece from "~/components/knowledge-pieces/KnowledgePiece";
import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import Paragraph from "~/components/knowledge-pieces/Paragraph";
import Slide, { title, date, content } from "./Content";

import SpaSsrFigure, { title as spaSsrTitle, date as spaSsrDate } from "../spa-ssr/Content";

export const meta: MetaFunction = () => {
  return [
    { title: title },
    {
      name: "description",
      content: content.join(" "),
    },
  ];
};

export default function Page() {
  return (
    <>
      <KnowledgePiece title={title} date={date}>
        <Figure>
          <Slide />
        </Figure>
        {content.map((text) => (
          <Paragraph key={text}>{text}</Paragraph>
        ))}
      </KnowledgePiece>
      <h2 className="text-2xl font-bold mt-12 mb-4">Related Pieces</h2>
      <LinkToPieceList>
        <LinkToPiece slug="how-js-framework-works" title={spaSsrTitle} date={spaSsrDate}>
          <SpaSsrFigure />
        </LinkToPiece>
      </LinkToPieceList>
    </>
  );
}
