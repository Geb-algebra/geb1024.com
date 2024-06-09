import LinkToSheet from "../LinkToSheet";
import SheetHeader from "../SheetHeader";
import WrittenAt from "../WrittenAt";
import PieceIcon from "../icons/PieceIcon";

export default function LinkToPiece(props: {
  title: string;
  slug: string;
  date: Date;
  children: React.ReactNode;
}) {
  return (
    <LinkToSheet to={`/knowledge-pieces/${props.slug}`}>
      <SheetHeader Icon={PieceIcon} title={props.title} forceSmallHeader>
        <WrittenAt date={props.date} />
      </SheetHeader>
      <div className="p-4 w-full aspect-video">{props.children}</div>
    </LinkToSheet>
  );
}
