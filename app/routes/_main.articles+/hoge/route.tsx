import Article from "~/components/articles/Article";
import Content, { title, writtenAt } from "./hoge.mdx";
import type { HeadersFunction } from "@remix-run/cloudflare";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export default function Page() {
  return <Article title={title} writtenAt={writtenAt} Content={Content} />;
}
