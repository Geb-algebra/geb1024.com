import { PuzzleIcon } from "lucide-react";
import type { KnowledgePiece } from "~/domain/models";
import LinkToSheet from "../LinkToSheet";
import SheetHeader from "../SheetHeader";
import WrittenAt from "../WrittenAt";

export default function LinkToPiece(props: { piece: Omit<KnowledgePiece, "content" | "related"> }) {
  return (
    <LinkToSheet to={`/knowledge-pieces/${props.piece.slug}`}>
      <SheetHeader category="knowledgePiece" title={props.piece.title} forceSmallHeader>
        <WrittenAt date={props.piece.date} />
      </SheetHeader>
      <div className="p-4 w-full aspect-video">
        <img src={props.piece.figure} alt={props.piece.title} />
      </div>
    </LinkToSheet>
  );
}
