import { getMDXComponent } from "mdx-bundler/client/index.js";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import ArticleKindBadge from "~/components/ArticleKindBadge";
import NoteDisclaimer from "~/components/articles/NoteDisclaimer";
import Image from "~/components/Image";
import Sheet from "~/components/Sheet";
import SheetHeader from "~/components/SheetHeader";
import SocialMetadata from "~/components/SocialMetadata";
import Switch from "~/components/Switch";
import { floating, ringOnFocusVisible } from "~/components/styles";
import WrittenAt from "~/components/WrittenAt";
import { normalizeArticleFrontmatter } from "~/domain/articles/frontmatter.server";
import { getArticleOgImageUrl } from "~/domain/articles/get-og-image-url.server";
import { bundlePost } from "~/domain/articles/services.server";
import List from "~/routes/_main.articles+/$slug/List";
import Paragraph from "~/routes/_main.articles+/$slug/Paragraph";
import Quote from "~/routes/_main.articles+/$slug/Quote";
import { createContentAsset } from "~/utils/assets";
import { cn } from "~/utils/css";
import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  try {
    const { code, frontmatter: rawFrontmatter } = await bundlePost(params.slug);
    const frontmatter = normalizeArticleFrontmatter(rawFrontmatter);
    if (new Date(frontmatter.writtenAt).getTime() > Date.now()) {
      throw new Response(null, { status: 404, statusText: "Not Found" });
    }
    return { code, frontmatter, ogImageUrl: getArticleOgImageUrl(params.slug), slug: params.slug };
  } catch (e) {
    // Errors thrown when a file is not found actually have a code property but Error type doesn't
    // @ts-expect-error - We will delete this route soon
    if (e instanceof Error && (e.code ?? "") === "ENOENT") {
      throw new Response(null, { status: 404, statusText: "Not Found" });
    }
    throw e;
  }
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { code, frontmatter, slug } = loaderData;
  const contentAsset = React.useMemo(() => createContentAsset("articles", slug), [slug]);
  const Component = React.useMemo(
    () => getMDXComponent(code, { contentAsset, Image }),
    [code, contentAsset],
  );
  const [summarized, setSummarized] = React.useState(false);
  const MarkdownImage = React.useCallback(
    ({ src = "", alt = "", ...props }: React.ComponentPropsWithoutRef<"img">) => (
      <Image {...props} src={resolveMarkdownImageSrc(src, contentAsset)} alt={alt} />
    ),
    [contentAsset],
  );
  return (
    <>
      <SocialMetadata
        title={frontmatter.title}
        description={frontmatter.abstract}
        pathname={`/articles/${slug}`}
        type="article"
        imageUrl={loaderData.ogImageUrl}
        imageAlt={`Preview image for ${frontmatter.title}`}
      />
      <div className="grid gap-6">
        {frontmatter.kind === "note" ? <NoteDisclaimer /> : null}
        <Sheet className="grid gap-16">
          <SheetHeader title={frontmatter.title} category={frontmatter.category}>
            <div className="flex justify-between items-end mt-2">
              <div className="flex items-center gap-3">
                <WrittenAt date={new Date(frontmatter.writtenAt)} />
                <ArticleKindBadge kind={frontmatter.kind} />
              </div>
              <Switch
                actionName="Summarize"
                state={summarized}
                id="summarize-switch"
                onSwitch={(state: boolean) => setSummarized(state)}
              />
            </div>
          </SheetHeader>
          <div className="px-4 md:px-8 pb-16">
            <Component
              components={{
                h1: (props) => (
                  <h1 className="font-bold text-geb-blue text-2xl mt-24 mb-12">{props.children}</h1>
                ),
                h2: (props) => (
                  <h2 className="font-bold text-geb-blue text-xl mt-12 mb-9 w-full border-t border-border-color pt-4">
                    {props.children}
                  </h2>
                ),
                h3: (props) => (
                  <h3 className="font-bold text-geb-blue text-lg mt-9 mb-6">{props.children}</h3>
                ),
                p: (props) => <Paragraph {...{ ...props, summarized }} />,
                pre: (props) => <pre {...props} className="p-4 rounded-lg overflow-auto" />,
                a: (props) => (
                  <a
                    {...props}
                    target="_blank"
                    className={cn(
                      "text-blue-800 underline rounded-iconic-md p-1",
                      floating.hover,
                      floating.focusVisible,
                      ringOnFocusVisible,
                    )}
                  />
                ),
                blockquote: (props) => <Quote {...props} />,
                ul: (props) => <List {...props} ordered={false} />,
                ol: (props) => <List {...props} ordered={true} />,
                li: (props) => <li className="pl-2" {...props} />,
                img: MarkdownImage,
                Image,
              }}
            />
          </div>
        </Sheet>
      </div>
    </>
  );
}

function resolveMarkdownImageSrc(src: string, contentAsset: (imageName: string) => string) {
  if (src.startsWith("/") || src.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(src)) {
    return src;
  }
  return contentAsset(src);
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div role="alert">
      <title>Not Found</title>
      <meta name="description" content="The page you requested could not be found." />
      <p>Something went wrong:</p>
      <pre>
        {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unknown Error"}
      </pre>
    </div>
  );
}
