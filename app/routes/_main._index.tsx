import type { HeadersFunction } from "react-router";
import LinkToSheet from "~/components/LinkToSheet";
import CategoryTop from "~/components/layouts/CategoryTop";
import SheetHeader from "~/components/SheetHeader";
import SocialMetadata from "~/components/SocialMetadata";
import WrittenAt from "~/components/WrittenAt";
import { getAllArticles } from "~/domain/articles/get-all-articles.server";
import { bundlePost } from "~/domain/articles/services.server";
import type { Article } from "~/domain/models";
import { SITE_DESCRIPTION, SITE_NAME } from "~/utils/social";
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

function ArticleItem(props: { article: Article }) {
  return (
    <LinkToSheet to={`/articles/${props.article.slug}`} className="w-full">
      <SheetHeader category={props.article.category} title={props.article.title}>
        <WrittenAt date={props.article.writtenAt} />
      </SheetHeader>
    </LinkToSheet>
  );
}

export default function Page({ loaderData }: Route.ComponentProps) {
  loaderData.sort((a, b) => b.writtenAt.getTime() - a.writtenAt.getTime());
  return (
    <>
      <SocialMetadata title={SITE_NAME} description={SITE_DESCRIPTION} pathname="/" />
      <CategoryTop title="Blog Posts">
        <ul className="flex flex-col gap-12">
          {loaderData.map((article, index) => (
            <li key={article.slug} className={index % 2 === 0 ? "md:pr-24 flex" : "md:pl-24 flex"}>
              <ArticleItem article={article} />
            </li>
          ))}
        </ul>
      </CategoryTop>
    </>
  );
}
