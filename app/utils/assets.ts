const ASSETS_BASE_URL = "https://assets.geb1024.com/";

export type ContentAssetKind = "articles" | "knowledge-pieces";

export function normalizeContentAssetPath(pathname: string) {
  return pathname
    .split(/[/\\]+/)
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.replace(/^\[D\]/, ""))
    .join("/");
}

export function contentAsset(kind: ContentAssetKind, dirname: string, imageName: string) {
  return new URL(normalizeContentAssetPath(`${kind}/${dirname}/${imageName}`), ASSETS_BASE_URL)
    .href;
}

export function createContentAsset(kind: ContentAssetKind, dirname: string) {
  return (imageName: string) => contentAsset(kind, dirname, imageName);
}

export function createArticleAsset(dirname: string) {
  return createContentAsset("articles", dirname);
}

export function createKnowledgePieceAsset(dirname: string) {
  return createContentAsset("knowledge-pieces", dirname);
}
