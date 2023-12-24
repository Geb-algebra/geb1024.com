/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  serverDependenciesToBundle: [],
  tailwind: true,
  browserNodeBuiltinsPolyfill: { modules: { crypto: true } },
  mdx: async (filename) => {
    const [rehypePrettyCode] = await Promise.all([
      import('rehype-pretty-code').then((mod) => mod.default),
    ]);

    return {
      rehypePlugins: [[rehypePrettyCode, { theme: 'nord' }]],
    };
  },
};
