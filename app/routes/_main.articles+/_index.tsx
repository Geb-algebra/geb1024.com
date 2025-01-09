import type { HeadersFunction, MetaFunction } from "react-router";
import LinkToSheet from "~/components/LinkToSheet";
import SheetHeader from "~/components/SheetHeader";
import WrittenAt from "~/components/WrittenAt";
import BookIcon from "~/components/icons/BookIcon.tsx";
import BriefCaseIcon from "~/components/icons/BriefCaseIcon.tsx";
import CommandLineIcon from "~/components/icons/CommandLineIcon.tsx";
import type { IconComponent } from "~/components/icons/types.ts";
import CategoryTop from "~/components/layouts/CategoryTop";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = () => {
  return [{ title: "Blog Posts" }];
};

export type ArticleInfo = {
  slug: string;
  title: string;
  category: string;
  writtenAt: Date;
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
  const articles = [
    {
      slug: "make-values-easy-to-guess",
      title: "「変数の値を推測しやすくする」と読みやすいプログラムになる",
      category: "tech",
      writtenAt: new Date(2024, 5, 20),
    },
  ];
  return (
    <CategoryTop title="Blog Posts">
      <ul>
        {articles.map((article, index) => (
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
