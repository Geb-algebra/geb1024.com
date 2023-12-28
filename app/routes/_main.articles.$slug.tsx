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
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { code, frontmatter } = await bundlePost(params.slug);
    return json({ code, frontmatter });
  } catch (e) {
    // Errors thrown when a file is not found actually have a code property but Error type doesn't
    if (e instanceof Error && (e as any).code === 'ENOENT') {
      throw new Response(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }
    throw e;
  }
}

export default function Article(props: {}) {
  const loaderData = useLoaderData<typeof loader>();
  if (loaderData.status === 404) {
    return <h1>404 - Not Found</h1>;
  }

  const { code, frontmatter } = loaderData;
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

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>
        {isRouteErrorResponse(error) && error instanceof Response
          ? `${error.status} ${error.statusText}`
          : 'Unknown Error'}
      </pre>
    </div>
  );
}
