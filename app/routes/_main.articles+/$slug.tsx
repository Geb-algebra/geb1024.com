import { getMDXComponent } from "mdx-bundler/client/index.js";
import React from "react";
import { bundlePost } from "~/services/mdx.server";
import type { Route } from "./+types/$slug";

import { isRouteErrorResponse, useLoaderData, useRouteError } from "react-router";
import Sheet from "~/components/Sheet";
import SheetHeader from "~/components/SheetHeader";
import Spacer from "~/components/Spacer";
import Switch from "~/components/Switch";
import WrittenAt from "~/components/WrittenAt";
import Header1 from "~/components/articles/Header1";
import Header2 from "~/components/articles/Header2";
import Header3 from "~/components/articles/Header3";
import Paragraph from "~/components/articles/Paragraph";
import Quote from "~/components/articles/Quote";
import BookIcon from "~/components/icons/BookIcon";

export async function loader({ request, params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  try {
    const { code, frontmatter } = await bundlePost(params.slug);
    return { code, frontmatter };
  } catch (e) {
    // Errors thrown when a file is not found actually have a code property but Error type doesn't
    // @ts-ignore - We will delete this route soon
    if (e instanceof Error && (e.code ?? "") === "ENOENT") {
      throw new Response(null, { status: 404, statusText: "Not Found" });
    }
    throw e;
  }
}

export const meta: Route.MetaFunction = ({ data, error }) => {
  if (isRouteErrorResponse(error)) {
    return [{ title: "Not Found" }, { description: "The page you requested could not be found." }];
  }
  return [{ title: data?.frontmatter.title }, { description: data?.frontmatter.description }];
};

export default function Article() {
  const loaderData = useLoaderData<typeof loader>();

  const { code, frontmatter } = loaderData;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const [summarized, setSummarized] = React.useState(false);
  return (
    <Sheet>
      <SheetHeader Icon={BookIcon} title={frontmatter.title}>
        <div className="flex justify-between items-end mt-2">
          <WrittenAt date={new Date(frontmatter.writtenAt)} />
          <Switch
            actionName="Summarize"
            state={summarized}
            onSwitch={(state: boolean) => setSummarized(state)}
          />
        </div>
      </SheetHeader>
      <div className="px-4 md:px-8 pb-16">
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
      </div>
    </Sheet>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>
        {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unknown Error"}
      </pre>
    </div>
  );
}
