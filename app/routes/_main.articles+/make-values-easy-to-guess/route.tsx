import Article from "~/components/articles/Article";
import Content, { title, writtenAt } from "./content.mdx";
import type { HeadersFunction, MetaFunction } from "@remix-run/cloudflare";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: title },
    {
      name: "description",
      content:
        "良いコードとは「他の人が読みやすいコード」であると広く言われています。しかし、コードを書いているその時に、「他の人」の目線に立って「最短時間で理解できる」かを判断するのはなかなか難しいです。「もう少し具体的な原則が欲しいな」と考えてコードを書き続けて、「変数の値を推測しやすくする」という原則に辿り着きました。",
    },
  ];
};

export default function Page() {
  return <Article title={title} writtenAt={writtenAt} Content={Content} />;
}
