import Header1 from "~/components/articles/Header1";
import Header2 from "~/components/articles/Header2";
import Header3 from "~/components/articles/Header3";
import Paragraph from "~/components/articles/Paragraph";
import Quote from "~/components/articles/Quote";
import Switch from "~/components/Switch";
import React from "react";
import Sheet from "../Sheet";
import BookIcon from "../icons/BookIcon";
import ArticleMark from "../ArticleMark";

export default function Article(props: {
  title: string;
  writtenAt: string;
  Content: React.ComponentType<{
    components: {
      h1: React.ComponentType<{ children: React.ReactNode }>;
      h2: React.ComponentType<{ children: React.ReactNode }>;
      h3: React.ComponentType<{ children: React.ReactNode }>;
      p: React.ComponentType<{ children: React.ReactNode; summarized: boolean }>;
      pre: React.ComponentType<{ children: React.ReactNode }>;
      blockquote: React.ComponentType<{ children: React.ReactNode }>;
    };
  }>;
}) {
  const [summarized, setSummarized] = React.useState(false);
  return (
    <Sheet>
      <div className="flex w-full rounded-iconic-3xl border-sub-color border-t-2 md:pr-6">
        <ArticleMark Icon={BookIcon} />
        <div className="m-4 w-full">
          <h1 className="text-text-main font-bold text-md md:text-lg">{props.title}</h1>
          <div className="flex justify-between items-end mt-2">
            <div className="text-text-sub text-xs md:text-sm">{props.writtenAt}</div>
            <Switch
              actionName="Summarize"
              state={summarized}
              onSwitch={(state: boolean) => setSummarized(state)}
            />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 pb-16">
        <props.Content
          components={{
            h1: (props) => <Header1 {...props} />,
            h2: (props) => <Header2 {...props} />,
            h3: (props) => <Header3 {...props} />,
            p: (props) => <Paragraph {...{ ...props, summarized }} />,
            pre: (props) => <pre {...props} className="p-4 rounded-lg overflow-auto" />,
            blockquote: (props) => <Quote {...props} />,
          }}
        />
      </div>
    </Sheet>
  );
}
