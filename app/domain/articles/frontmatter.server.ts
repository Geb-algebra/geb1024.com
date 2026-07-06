import type { Article, ArticleCategory, ArticleKind } from "~/domain/models";

export type ArticleFrontmatter = {
  title: string;
  category: ArticleCategory;
  abstract: string;
  writtenAt: string;
  kind: ArticleKind;
};

type RawArticleFrontmatter = Partial<ArticleFrontmatter>;

export function normalizeArticleFrontmatter(frontmatter: unknown): ArticleFrontmatter {
  const raw = (frontmatter ?? {}) as RawArticleFrontmatter;
  return {
    title: String(raw.title ?? ""),
    category: (raw.category ?? "tech") as ArticleCategory,
    abstract: String(raw.abstract ?? ""),
    writtenAt: String(raw.writtenAt ?? ""),
    kind: raw.kind === "note" ? "note" : "article",
  };
}

export function articleFromFrontmatter(slug: string, frontmatter: unknown): Article {
  const normalized = normalizeArticleFrontmatter(frontmatter);
  return {
    slug,
    title: normalized.title,
    category: normalized.category,
    abstract: normalized.abstract,
    writtenAt: new Date(normalized.writtenAt),
    kind: normalized.kind,
  };
}
