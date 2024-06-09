import ArticleMark from "./ArticleMark";
import type { IconComponent } from "./icons/types";

export default function SheetHeader(props: {
  Icon: IconComponent;
  title: string;
  forceSmallHeader?: boolean;
  children?: React.ReactNode;
}) {
  const forceSmall = props.forceSmallHeader || false;
  return (
    <div
      className={`flex w-full h-fit rounded-iconic-3xl border-sub-color border-t-2 ${
        forceSmall ? "md:pr-6" : ""
      }`}
    >
      <ArticleMark Icon={props.Icon} forceSmall={forceSmall} />
      <div className={`mx-4 mt-2 w-full ${!forceSmall ? "md:mt-4" : ""}`}>
        <h1
          className={`text-text-main font-bold text-md min-h-10 ${!forceSmall ? "md:text-lg" : ""}`}
        >
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  );
}
