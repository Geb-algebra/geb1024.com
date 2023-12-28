import { bundleMDX } from 'mdx-bundler';
import rehypePrettyCode from 'rehype-pretty-code';

export async function bundlePost(slug: string) {
  const path = `${process.cwd()}/app/articles/${slug}`;
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
