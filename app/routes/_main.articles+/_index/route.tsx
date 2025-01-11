import type { HeadersFunction, MetaFunction } from "react-router";
import LinkToSheet from "~/components/LinkToSheet";
import SheetHeader from "~/components/SheetHeader";
import WrittenAt from "~/components/WrittenAt";
import BookIcon from "~/components/icons/BookIcon";
import BriefCaseIcon from "~/components/icons/BriefCaseIcon";
import CommandLineIcon from "~/components/icons/CommandLineIcon";
import type { IconComponent } from "~/components/icons/types.ts";
import CategoryTop from "~/components/layouts/CategoryTop";
import { type ArticleInfo, allArticles } from "./all-articles";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = () => {
  return [{ title: "Blog Posts" }];
};

function Article(props: { article: ArticleInfo }) {
  const icons: { [key: string]: IconComponent } = {
    books: BookIcon,
    tech: CommandLineIcon,
    jobsCareers: BriefCaseIcon,
  };
  const Icon = icons[props.article.category];
  return (
    <LinkToSheet to={`/articles/${props.article.slug}`}>
      <SheetHeader Icon={Icon} title={props.article.title}>
        <WrittenAt date={props.article.writtenAt} />
      </SheetHeader>
    </LinkToSheet>
  );
}

function Spacer() {
  return <div className="aspect-square h-fit hidden md:block" />;
}

export default function Page() {
  return (
    <CategoryTop title="Blog Posts">
      <ul>
        {allArticles.map((article, index) => (
          <li key={article.slug} className="flex my-12">
            {index % 2 === 1 && <Spacer />}
            <Article article={article} />
            {index % 2 === 0 && <Spacer />}
          </li>
        ))}
      </ul>
    </CategoryTop>
  );
}
