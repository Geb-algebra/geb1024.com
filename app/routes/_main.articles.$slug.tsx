import React from 'react';
import { bundlePost } from '~/services/mdx.server.ts';
import { getMDXComponent } from 'mdx-bundler/client/index.js';
import { type LoaderFunctionArgs, json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';

import Switch from '~/components/Switch.tsx';
import Header1 from '~/components/articles/Header1.tsx';
import Header2 from '~/components/articles/Header2.tsx';
import Header3 from '~/components/articles/Header3.tsx';
import Paragraph from '~/components/articles/Paragraph.tsx';
import Quote from '~/components/articles/Quote.tsx';
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import Spacer from '~/components/Spacer';

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.slug) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }
  try {
    const { code, frontmatter } = await bundlePost(params.slug);
    return json({ code, frontmatter });
  } catch (e) {
    // Errors thrown when a file is not found actually have a code property but Error type doesn't
    if (e instanceof Error && (e as any).code === 'ENOENT') {
      throw new Response(null, { status: 404, statusText: 'Not Found' });
    }
    throw e;
  }
}

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  if (isRouteErrorResponse(error)) {
    return [{ title: 'Not Found' }, { description: 'The page you requested could not be found.' }];
  }
  return [{ title: data?.frontmatter.title }, { description: data?.frontmatter.description }];
};

export default function Article(props: {}) {
  const loaderData = useLoaderData<typeof loader>();

  const { code, frontmatter } = loaderData;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const [summarized, setSummarized] = React.useState(false);
  return (
    <>
      <div className="flex justify-between items-center mt-24">
        <h1 className="text-text-main font-bold text-3xl">{frontmatter.title}</h1>
        <Switch
          actionName="Summarize"
          state={summarized}
          onSwitch={(state: boolean) => setSummarized(state)}
        />
      </div>
      <div className="text-text-sub text-lg mt-6 mb-24">{frontmatter.writtenAt}</div>
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
      <Spacer h={24} />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>
        {isRouteErrorResponse(error)
          ? `${(error as any).status} ${(error as any).statusText}`
          : 'Unknown Error'}
      </pre>
    </div>
  );
}
