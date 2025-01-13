// You can't import mdx files here as it causes errors when executing react-router.config.ts at build time.
// I'm not sure but I think mdx files cant be imported at build time.

import fs from "node:fs";

export function getAllArticles() {
  return fs.readdirSync(`${process.cwd()}/app/contents/articles`);
}
