import type { MetaFunction } from "react-router";
import Figure from "~/components/knowledge-pieces/Figure";
import KnowledgePiece from "~/components/knowledge-pieces/KnowledgePiece";
import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import Paragraph from "~/components/knowledge-pieces/Paragraph";
import type { Route } from "./+types/$slug";

import { allKnowledgePieces } from "~/contents/knowledge-pieces/all-knowledge-pieces.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const knowledgePiece = allKnowledgePieces.find((piece) => piece.slug === params.slug);
  if (!knowledgePiece) {
    return null;
  }
  return {
    knowledgePiece,
    relatedPieces: allKnowledgePieces.filter((piece) =>
      knowledgePiece.related.includes(piece.slug),
    ),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Not Found" }, { description: "The page you requested could not be found." }];
  }
  return [
    { title: data.knowledgePiece.title },
    {
      name: "description",
      content: data.knowledgePiece.content.join(" "),
    },
  ];
};

export default function Page({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return null;
  }
  const { knowledgePiece, relatedPieces } = loaderData;
  return (
    <>
      <KnowledgePiece title={knowledgePiece.title} date={knowledgePiece.date}>
        <Figure>
          <img src={knowledgePiece.figure} alt={knowledgePiece.title} />
        </Figure>
        {knowledgePiece.content.map((text) => (
          <Paragraph key={text}>{text}</Paragraph>
        ))}
      </KnowledgePiece>
      <h2 className="text-2xl font-bold mt-12 mb-4">Related Pieces</h2>
      <LinkToPieceList>
        {relatedPieces.map((piece) => (
          <LinkToPiece key={piece.slug} piece={piece} />
        ))}
      </LinkToPieceList>
    </>
  );
}
