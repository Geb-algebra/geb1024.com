import React from 'react';
import { bundlePost } from '~/services/mdx.server.ts';
import { getMDXComponent } from 'mdx-bundler/client';
import { type LoaderFunctionArgs, json } from '@remix-run/node';

import Switch from '~/components/Switch.tsx';
import Header1 from '~/components/articles/Header1.tsx';
import Header2 from '~/components/articles/Header2.tsx';
import Header3 from '~/components/articles/Header3.tsx';
import Paragraph from '~/components/articles/Paragraph.tsx';
import Quote from '~/components/articles/Quote.tsx';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const { code, frontmatter } = await bundlePost('example');
  return json({ code, frontmatter });
}

export default function Article(props: {}) {
  const { code, frontmatter } = useLoaderData<typeof loader>();
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const [summarized, setSummarized] = React.useState(false);
  return (
    <>
      <div className="flex justify-between items-center my-24">
        <h1 className="text-geb-blue font-bold text-3xl">{frontmatter.title}</h1>
        <Switch
          actionName="Summarize"
          state={summarized}
          onSwitch={(state: boolean) => setSummarized(state)}
        />
      </div>
      <Component
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
