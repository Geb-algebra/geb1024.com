import { BookOpenIcon, BriefcaseBusinessIcon, TerminalSquareIcon } from "lucide-react";
import type { HeadersFunction, MetaFunction } from "react-router";
import LinkToSheet from "~/components/LinkToSheet";
import SheetHeader from "~/components/SheetHeader";
import WrittenAt from "~/components/WrittenAt";
import CategoryTop from "~/components/layouts/CategoryTop";
import { getAllArticles } from "~/domain/articles/get-all-articles.server";
import { bundlePost } from "~/domain/articles/services.server";
import type { Article } from "~/domain/models";
import type { Route } from "./+types/_main._index";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export async function loader() {
  return await Promise.all(
    getAllArticles().map(async (slug) => {
      const { frontmatter } = await bundlePost(slug);
      return {
        slug,
        title: frontmatter.title,
        category: frontmatter.category,
        abstract: frontmatter.abstract,
        writtenAt: new Date(frontmatter.writtenAt),
      } as Article;
    }),
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "Blog Posts" }];
};

function ArticleItem(props: { article: Article }) {
  return (
    <LinkToSheet to={`/articles/${props.article.slug}`} className="w-full">
      <SheetHeader category={props.article.category} title={props.article.title}>
        <WrittenAt date={props.article.writtenAt} />
      </SheetHeader>
    </LinkToSheet>
  );
}

function Spacer() {
  return <div className="h-24 w-24 hidden md:block" />;
}

export default function Page({ loaderData }: Route.ComponentProps) {
  loaderData.sort((a, b) => b.writtenAt.getTime() - a.writtenAt.getTime());
  return (
    <CategoryTop title="Blog Posts">
      <ul>
        {loaderData.map((article, index) => (
          <li key={article.slug} className="flex my-12">
            {index % 2 === 1 && <Spacer />}
            <ArticleItem article={article} />
            {index % 2 === 0 && <Spacer />}
          </li>
        ))}
      </ul>
    </CategoryTop>
  );
}
