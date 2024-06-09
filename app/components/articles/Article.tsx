import React from "react";
import Switch from "~/components/Switch";
import Header1 from "~/components/articles/Header1";
import Header2 from "~/components/articles/Header2";
import Header3 from "~/components/articles/Header3";
import Paragraph from "~/components/articles/Paragraph";
import Quote from "~/components/articles/Quote";
import Sheet from "../Sheet";
import SheetHeader from "../SheetHeader";
import WrittenAt from "../WrittenAt";
import BookIcon from "../icons/BookIcon";

export default function Article(props: {
  title: string;
  writtenAt: Date;
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
      <SheetHeader Icon={BookIcon} title={props.title}>
        <div className="flex justify-between items-end mt-2">
          <WrittenAt date={props.writtenAt} />
          <Switch
            actionName="Summarize"
            state={summarized}
            onSwitch={(state: boolean) => setSummarized(state)}
          />
        </div>
      </SheetHeader>
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
