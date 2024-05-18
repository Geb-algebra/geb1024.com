import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import BookIcon from "~/components/icons/BookIcon.tsx";
import BriefCaseIcon from "~/components/icons/BriefCaseIcon.tsx";
import CommandLineIcon from "~/components/icons/CommandLineIcon.tsx";
import type { IconComponent } from "~/components/icons/types.ts";
import { type ArticleInfo, listAllArticles } from "~/services/mdx.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const articles = await listAllArticles();
  return json({ articles });
}

export async function action({ request }: ActionFunctionArgs) {}

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
    <Link to={`/articles/${props.article.slug}`} className="flex w-full h-32">
      <div className="aspect-square h-full rounded-iconic-3xl bg-sub-color border-8 border-double border-base-color">
        <Icon className="w-18 h-18 text-base-color m-6" type="solid" />
      </div>
      <div className="flex-1 h-full p-8 rounded-iconic-3xl border-t-8 border-r-0 border-double border-sub-color">
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
  const { articles } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-3xl">
      <div className="text-geb-blue text-4xl font-bold">Blog Posts</div>
      <ul>
        {articles.map((article, index) => (
          <li key={article.slug} className="flex my-12">
            {index % 2 === 1 && <Spacer />}
            <Article article={article} />
            {index % 2 === 0 && <Spacer />}
          </li>
        ))}
      </ul>
    </div>
  );
}
