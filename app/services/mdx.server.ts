import { bundleMDX } from 'mdx-bundler';
import rehypePrettyCode from 'rehype-pretty-code';

export async function bundlePost(postName: string) {
  const path = `${process.cwd()}/app/routes/_main.articles.${postName}`;
  return await bundleMDX({
    file: path + '/page.mdx',
    cwd: path,

    esbuildOptions: (options) => {
      // Configuration to allow image loading
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.gif': 'dataurl',
      };
      return options;
    },
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrettyCode];
      return options;
    },
  });
}
