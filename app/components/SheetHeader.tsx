import type { ArticleCategory } from "~/domain/models";
import { cn } from "~/utils/css";
import ArticleMark from "./ArticleMark";

export default function SheetHeader(props: {
  category: ArticleCategory | "knowledgePiece";
  title: string;
  forceSmallHeader?: boolean;
  children?: React.ReactNode;
}) {
  const forceSmall = props.forceSmallHeader || false;
  return (
    <div
      className={cn(
        "flex w-full h-fit rounded-iconic-3xl border-sub-color border-t-2",
        forceSmall ? "md:pr-6" : "",
      )}
    >
      <ArticleMark category={props.category} forceSmall={forceSmall} />
      <div className={cn("mx-4 mt-2 w-full", !forceSmall ? "md:mt-4" : "")}>
        <h1
          className={cn(
            "text-text-main font-bold text-md min-h-10",
            !forceSmall ? "md:text-lg" : "",
          )}
        >
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  );
}
