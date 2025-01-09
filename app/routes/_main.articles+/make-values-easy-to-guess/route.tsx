import type { HeadersFunction, MetaFunction } from "react-router";
import Article from "~/components/articles/Article";
import Content, { abstract, title, writtenAt } from "./content.mdx";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = () => {
  return [{ title: title }, { name: "description", content: abstract }];
};

export default function Page() {
  return <Article title={title} writtenAt={writtenAt} Content={Content} />;
}
