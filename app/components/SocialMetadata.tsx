import {
  absoluteSiteUrl,
  defaultSocialImageUrl,
  SITE_NAME,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_TYPE,
  SOCIAL_IMAGE_WIDTH,
} from "~/utils/social";

type SocialPageType = "website" | "article";

type SocialMetadataProps = {
  title: string;
  description: string;
  pathname: string;
  type?: SocialPageType;
  imageUrl?: string;
  imageAlt?: string;
};

export default function SocialMetadata({
  title,
  description,
  pathname,
  type = "website",
  imageUrl = defaultSocialImageUrl(),
  imageAlt = `Preview image for ${title}`,
}: SocialMetadataProps) {
  const url = absoluteSiteUrl(pathname);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:type" content={SOCIAL_IMAGE_TYPE} />
      <meta property="og:image:width" content={SOCIAL_IMAGE_WIDTH} />
      <meta property="og:image:height" content={SOCIAL_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </>
  );
}
