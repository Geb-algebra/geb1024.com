import LinkToPiece from "~/components/knowledge-pieces/LinkToPiece";
import LinkToPieceList from "~/components/knowledge-pieces/LinkToPieceList";
import CategoryTop from "~/components/layouts/CategoryTop";
import * as JsFrame from "./how-js-framework-works/Content";
import * as spaSsr from "./spa-ssr/Content";

type Piece = {
  title: string;
  slug: string;
  date: Date;
  Figure: React.ComponentType;
};

const list: Piece[] = [
  {
    title: JsFrame.title,
    slug: "how-js-framework-works",
    date: JsFrame.date,
    Figure: JsFrame.default,
  },
  { title: spaSsr.title, slug: "spa-ssr", date: spaSsr.date, Figure: spaSsr.default },
];

export default function Index() {
  return (
    <CategoryTop title="Knowledge Pieces">
      <LinkToPieceList>
        {list.map(({ title, slug, date, Figure }) => (
          <LinkToPiece key={slug} slug={slug} title={title} date={date}>
            <Figure />
          </LinkToPiece>
        ))}
      </LinkToPieceList>
    </CategoryTop>
  );
}
