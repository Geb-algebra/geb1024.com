import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import CategoryTop from "~/components/layouts/CategoryTop";
import { allKnowledgePieces } from "./all-knowledge-pieces";

export default function Index() {
  return (
    <CategoryTop title="Knowledge Pieces">
      <LinkToPieceList>
        {allKnowledgePieces.map(({ title, slug, date, Figure }) => (
          <LinkToPiece key={slug} slug={slug} title={title} date={date}>
            <Figure />
          </LinkToPiece>
        ))}
      </LinkToPieceList>
    </CategoryTop>
  );
}
