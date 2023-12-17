/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  serverDependenciesToBundle: [],
  tailwind: true,
  browserNodeBuiltinsPolyfill: { modules: { crypto: true } },
};
