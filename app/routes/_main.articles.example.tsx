import React from 'react';
import Example from '~/articles/example.mdx';
import Switch from '~/components/Switch.tsx';
import Header1 from '~/components/articles/Header1.tsx';
import Header2 from '~/components/articles/Header2.tsx';
import Header3 from '~/components/articles/Header3.tsx';
import Paragraph from '~/components/articles/Paragraph.tsx';

export default function Article(props: {}) {
  const [summarized, setSummarized] = React.useState(false);
  return (
    <>
      <Switch
        actionName="Summarize"
        state={summarized}
        onSwitch={(state: boolean) => setSummarized(state)}
      />
      <Example
        components={{
          h1: (props) => <Header1 {...props} />,
          h2: (props) => <Header2 {...props} />,
          h3: (props) => <Header3 {...props} />,
          p: (props) => <Paragraph {...{ ...props, summarized }} />,
          pre: (props) => <pre {...props} className="p-4 rounded-lg overflow-auto" />,
        }}
      />
    </>
  );
}
