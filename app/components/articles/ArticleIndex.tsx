import { FileTextIcon, NotebookPenIcon } from "lucide-react";
import * as React from "react";
import LinkToSheet from "~/components/LinkToSheet";
import CategoryTop from "~/components/layouts/CategoryTop";
import SheetHeader from "~/components/SheetHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/Tabs";
import WrittenAt from "~/components/WrittenAt";
import type { Article } from "~/domain/models";
import NoteDisclaimer from "./NoteDisclaimer";

function ArticleItem(props: { article: Article }) {
  return (
    <LinkToSheet to={`/articles/${props.article.slug}`} className="w-full">
      <SheetHeader category={props.article.category} title={props.article.title}>
        <WrittenAt date={props.article.writtenAt} />
      </SheetHeader>
    </LinkToSheet>
  );
}

function ArticleList(props: { articles: Article[]; emptyMessage: string }) {
  if (props.articles.length === 0) {
    return <p className="px-2 text-sm text-text-sub">{props.emptyMessage}</p>;
  }

  return (
    <ul className="flex flex-col gap-12">
      {props.articles.map((article, index) => (
        <li key={article.slug} className={index % 2 === 0 ? "flex md:pr-24" : "flex md:pl-24"}>
          <ArticleItem article={article} />
        </li>
      ))}
    </ul>
  );
}

function ArticleTabs() {
  return (
    <TabsList aria-label="Article categories">
      <TabsTrigger value="articles">
        <FileTextIcon />
        Articles
      </TabsTrigger>
      <TabsTrigger value="notes">
        <NotebookPenIcon />
        Notes
      </TabsTrigger>
    </TabsList>
  );
}

export default function ArticleIndex(props: { articles: Article[]; title?: string }) {
  const [tab, setTab] = React.useState<"articles" | "notes">("articles");
  const articles = props.articles.filter((article) => article.kind === "article");
  const notes = props.articles.filter((article) => article.kind === "note");

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as "articles" | "notes")}>
      <CategoryTop title={props.title ?? "Blog Posts"} headerRight={<ArticleTabs />}>
        <TabsContent
          value="articles"
          keepMounted
          className={tab === "articles" ? "block" : "hidden"}
        >
          <ArticleList articles={articles} emptyMessage="No articles yet." />
        </TabsContent>
        <TabsContent value="notes" keepMounted className={tab === "notes" ? "block" : "hidden"}>
          <NoteDisclaimer className="mb-8" />
          <ArticleList articles={notes} emptyMessage="No notes yet." />
        </TabsContent>
      </CategoryTop>
    </Tabs>
  );
}
