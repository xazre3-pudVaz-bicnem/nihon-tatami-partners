import type { WordPressPost } from "./types";

const WP_API_URL =
  process.env.WP_API_URL || "https://blog.nihontatami.jp/wp-json/wp/v2";

export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  slug?: string;
  categories?: number[];
  search?: string;
}): Promise<WordPressPost[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "1");
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.slug) searchParams.set("slug", params.slug);
  if (params?.categories)
    searchParams.set("categories", params.categories.join(","));
  if (params?.search) searchParams.set("search", params.search);

  try {
    const res = await fetch(`${WP_API_URL}/posts?${searchParams}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  const posts = await getPosts({ slug, per_page: 1 });
  return posts[0] ?? null;
}

export async function getPostsCount(): Promise<number> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=1&_fields=id`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    return parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  } catch {
    return 0;
  }
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
