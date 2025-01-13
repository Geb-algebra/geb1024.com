import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import CategoryTop from "~/components/layouts/CategoryTop";
import { allKnowledgePieces } from "~/contents/knowledge-pieces/all-knowledge-pieces.server";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  return allKnowledgePieces.map((piece) => ({
    slug: piece.slug,
    title: piece.title,
    date: piece.date,
    figure: piece.figure,
  }));
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <CategoryTop title="Knowledge Pieces">
      <LinkToPieceList>
        {loaderData.map((kp) => (
          <LinkToPiece key={kp.slug} piece={kp} />
        ))}
      </LinkToPieceList>
    </CategoryTop>
  );
}
