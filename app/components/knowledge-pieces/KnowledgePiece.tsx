import type React from "react";
import Sheet from "../Sheet";
import SheetHeader from "../SheetHeader";
import WrittenAt from "../WrittenAt";
import PieceIcon from "../icons/PieceIcon";

export default function Lightning(props: { title: string; date: Date; children: React.ReactNode }) {
  return (
    <Sheet className="relative">
      <SheetHeader Icon={PieceIcon} title={props.title}>
        <WrittenAt date={props.date} />
      </SheetHeader>
      <div className="px-6 pt-6 pb-12">{props.children}</div>
    </Sheet>
  );
}
