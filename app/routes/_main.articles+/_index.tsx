import type { HeadersFunction, MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import ArticleMark from "~/components/ArticleMark";
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
  writtenAt: string; // yyyy/mm/dd
};

function Article(props: { article: ArticleInfo }) {
  const icons: { [key: string]: IconComponent } = {
    books: BookIcon,
    tech: CommandLineIcon,
    jobsCareers: BriefCaseIcon,
  };
  const Icon = icons[props.article.category];
  return (
    <Link
      to={`/articles/${props.article.slug}`}
      className="flex w-full h-20 md:h-24 rounded-iconic-xl md:rounded-iconic-3xl border-sub-color border-t-2 hover:scale-105 hover:bg-paper-color hover:shadow-float transition-all duration-500"
    >
      <ArticleMark Icon={Icon} />
      <div className="flex-1 h-full px-4 py-2 md:px-6 md:py-4 flex flex-col justify-between">
        <h1 className="text-geb-blue text-sm md:text-lg font-bold">{props.article.title}</h1>
        <div className="text-geb-gray text-xs md:text-sm">{props.article.writtenAt}</div>
      </div>
    </Link>
  );
}

function Spacer() {
  return <div className="w-32 h-32 hidden md:block" />;
}

export default function Page() {
  const articles = [
    {
      slug: "hoge",
      title: "昨日の試合の全打席を振り返りホゲホゲhogeへおげ",
      category: "books",
      writtenAt: "2022/10/10",
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
