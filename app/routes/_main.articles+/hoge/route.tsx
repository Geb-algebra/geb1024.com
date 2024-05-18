import Header1 from "~/components/articles/Header1";
import Content, { title, category, writtenAt } from "./hoge.mdx";
import Header2 from "~/components/articles/Header2";
import Header3 from "~/components/articles/Header3";
import Paragraph from "~/components/articles/Paragraph";
import Quote from "~/components/articles/Quote";
import Switch from "~/components/Switch";
import React from "react";
export default function Page() {
  const [summarized, setSummarized] = React.useState(false);
  return (
    <>
      <div className="flex justify-between items-center mt-24">
        <h1 className="text-text-main font-bold text-3xl">{title}</h1>
        <Switch
          actionName="Summarize"
          state={summarized}
          onSwitch={(state: boolean) => setSummarized(state)}
        />
      </div>
      <div className="text-text-sub text-lg mt-6 mb-24">{writtenAt}</div>
      <Content
        components={{
          h1: (props) => <Header1 {...props} />,
          h2: (props) => <Header2 {...props} />,
          h3: (props) => <Header3 {...props} />,
          p: (props) => <Paragraph {...{ ...props, summarized }} />,
          pre: (props) => <pre {...props} className="p-4 rounded-lg overflow-auto" />,
          blockquote: (props) => <Quote {...props} />,
        }}
      />
    </>
  );
}
