import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import type { Route } from "./+types/$slug";

import Sheet from "~/components/Sheet";
import SheetHeader from "~/components/SheetHeader";
import WrittenAt from "~/components/WrittenAt";
import { getAllKnowledgePieces } from "~/domain/knowledge-pieces/get-all-knowledge-pieces.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const knowledgePiece = getAllKnowledgePieces().find((piece) => piece.slug === params.slug);
  if (!knowledgePiece) {
    return null;
  }
  return {
    knowledgePiece,
    relatedPieces: getAllKnowledgePieces().filter((piece) =>
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
      <Sheet className="relative">
        <SheetHeader category="knowledgePiece" title={knowledgePiece.title}>
          <WrittenAt date={knowledgePiece.date} />
        </SheetHeader>
        <div className="px-6 pt-6 pb-12">
          <div className="w-full aspect-video sticky top-0 py-4 backdrop-blur-md">
            <img src={knowledgePiece.figure} alt={knowledgePiece.title} />
          </div>
          {knowledgePiece.content.map((text) => (
            <p key={text} className="my-6 font-md leading-7">
              {text}
            </p>
          ))}
        </div>
      </Sheet>
      <h2 className="text-2xl font-bold mt-12 mb-4">Related Pieces</h2>
      <LinkToPieceList>
        {relatedPieces.map((piece) => (
          <LinkToPiece key={piece.slug} piece={piece} />
        ))}
      </LinkToPieceList>
    </>
  );
}
