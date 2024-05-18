import Article from "~/components/articles/Article";
import Content, { title, writtenAt } from "./hoge.mdx";

export default function Page() {
  return <Article title={title} writtenAt={writtenAt} Content={Content} />;
}
