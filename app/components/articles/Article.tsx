import Header1 from "~/components/articles/Header1";
import Header2 from "~/components/articles/Header2";
import Header3 from "~/components/articles/Header3";
import Paragraph from "~/components/articles/Paragraph";
import Quote from "~/components/articles/Quote";
import Switch from "~/components/Switch";
import React from "react";
import Sheet from "../Sheet";
import BookIcon from "../icons/BookIcon";

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
    <Sheet className="border-t-2 border-r-0 border-sub-color">
      <div className="flex w-full h-28 rounded-iconic-3xl sticky top-0 backdrop-blur-sm blur-mask">
        <div className="aspect-square h-[90px] rounded-iconic-2xl bg-sub-color ring-2 ring-offset-2 mx-1 mt-[2px] ring-sub-color ">
          <BookIcon className="w-18 h-18 text-base-color m-6" type="solid" />
        </div>
        <div className="m-6 w-full">
          <h1 className="text-text-main font-bold text-2xl">{props.title}</h1>
          <div className="flex justify-between">
            <div className="text-text-sub text-lg mt-2">{props.writtenAt}</div>
            <Switch
              actionName="Summarize"
              state={summarized}
              onSwitch={(state: boolean) => setSummarized(state)}
              className="ml-auto"
            />
          </div>
        </div>
      </div>
      <div className="px-8 pb-16">
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
