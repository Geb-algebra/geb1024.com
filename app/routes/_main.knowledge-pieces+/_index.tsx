import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import CategoryTop from "~/components/layouts/CategoryTop";
import { getAllKnowledgePieces } from "~/domain/knowledge-pieces/get-all-knowledge-pieces.server";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  return getAllKnowledgePieces().map((piece) => ({
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
