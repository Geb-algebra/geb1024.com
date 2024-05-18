import config from "../playwright.config.ts";

export function ignoreQueryRegExp(url: string) {
  return new RegExp(`^${config.use?.baseURL}${url}(?:\\?.*)?$`, "i");
}
