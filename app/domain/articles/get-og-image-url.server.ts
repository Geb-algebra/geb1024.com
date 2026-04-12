import fs from "node:fs";
import { contentAsset } from "~/utils/assets";
import { defaultSocialImageUrl } from "~/utils/social";

export function getArticleOgImageUrl(slug: string) {
  const ogImagePath = `${process.cwd()}/app/contents/articles/${slug}/ogp.png`;

  if (fs.existsSync(ogImagePath)) {
    return contentAsset("articles", slug, "ogp.png");
  }

  return defaultSocialImageUrl();
}
