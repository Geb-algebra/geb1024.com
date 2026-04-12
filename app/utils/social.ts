export const SITE_NAME = "Geb's Lab";
export const SITE_DESCRIPTION =
  "An engineer's knowledges about tech, communication, team building, etc.";
export const SITE_URL = "https://geb1024.com";
export const DEFAULT_SOCIAL_IMAGE_PATH = "/ogp.png";
export const SOCIAL_IMAGE_WIDTH = "1200";
export const SOCIAL_IMAGE_HEIGHT = "630";
export const SOCIAL_IMAGE_TYPE = "image/png";

export function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, `${SITE_URL}/`).href;
}

export function defaultSocialImageUrl() {
  return absoluteSiteUrl(DEFAULT_SOCIAL_IMAGE_PATH);
}
