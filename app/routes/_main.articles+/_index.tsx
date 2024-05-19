import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { HeadersFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
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

export async function loader({ request }: LoaderFunctionArgs) {
  return json(
    [
      {
        slug: "hoge",
        title: "昨日の試合の全打席を振り返り",
        category: "books",
        writtenAt: "2022/10/10",
      },
    ],
    {
      headers: {
        "cache-control": "public, max-age=3600",
      },
    },
  );
}

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
      className="flex w-full h-24 rounded-iconic-3xl border-t-2 border-sub-color hover:shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:scale-105 hover:bg-paper-color transition-all duration-500"
    >
      <div className="aspect-square mt-[2px] h-[90px] rounded-iconic-2xl bg-sub-color ring-2 ring-offset-2 ring-sub-color ">
        <Icon className="w-18 h-18 text-base-color m-6" type="solid" />
      </div>
      <div className="flex-1 h-full p-6">
        <div className="text-geb-blue text-xl font-bold">{props.article.title}</div>
        <div className="text-geb-gray text-sm">{props.article.writtenAt}</div>
      </div>
    </Link>
  );
}

function Spacer() {
  return <div className="w-32 h-32" />;
}

export default function Page() {
  const articles = useLoaderData<typeof loader>();
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
