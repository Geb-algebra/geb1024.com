import { BookOpenIcon, BriefcaseBusinessIcon, PuzzleIcon, TerminalSquareIcon } from "lucide-react";
import type { ArticleCategory } from "~/domain/models";
import { cn } from "~/utils/css";

const iconClassNames = "w-12 h-12 m-auto text-base-color";

const icons: { [key in ArticleCategory | "knowledgePiece"]: React.ReactNode } = {
  books: <BookOpenIcon className={iconClassNames} />,
  tech: <TerminalSquareIcon className={iconClassNames} />,
  jobsCareers: <BriefcaseBusinessIcon className={iconClassNames} />,
  knowledgePiece: <PuzzleIcon className={iconClassNames} />,
};

export type IconName = keyof typeof icons;

export default function ArticleMark(props: {
  forceSmall?: boolean;
  category: ArticleCategory | "knowledgePiece";
}) {
  return (
    <div
      className={cn(
        "m-1 mt-[2px] h-[70px] rounded-iconic-xl",
        !props.forceSmall ? "md:h-[88px] md:rounded-iconic-2xl" : "",
        "aspect-square bg-sub-color ring-2 ring-offset-2 ring-sub-color z-10 flex items-center",
      )}
    >
      {icons[props.category]}
    </div>
  );
}
