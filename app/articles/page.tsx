import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { COLUMN_ARTICLES } from "@/data/columns";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

interface Props {
  searchParams: Promise<{ category?: string; page?: string }>;
}

const PER_PAGE = 9;

export const metadata: Metadata = createMetadata({
  title: "畳・和室のお役立ちコラム｜選び方・費用・メンテナンス",
  description:
    "畳の表替え・新調の違い、素材の選び方、費用相場、メンテナンス方法など、畳・和室に関する役立つ情報を専門家がわかりやすく解説します。",
  path: "/articles",
});

export default async function ArticlesPage({ searchParams }: Props) {
  const { category, page } = await searchParams;
  const categories = Array.from(new Set(COLUMN_ARTICLES.map((a) => a.category)));
  const filtered = category ? COLUMN_ARTICLES.filter((a) => a.category === category) : COLUMN_ARTICLES;

  const sorted = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paged = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const qs = (p: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `/articles?${s}` : "/articles";
  };

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "コラム" }]} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            畳・和室のお役立ちコラム
          </h1>
          <p className="text-sm text-white/60 max-w-2xl">
            畳の選び方・費用・メンテナンスから法人向けの情報まで、専門家が役立つ知識をわかりやすく解説します。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリタブ */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/articles"
            className={`text-sm px-4 py-2 border transition-colors ${
              !category ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
            }`}
          >
            すべて
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/articles?category=${encodeURIComponent(c)}`}
              className={`text-sm px-4 py-2 border transition-colors ${
                category === c ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* 記事カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paged.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group bg-white border border-border overflow-hidden hover:shadow-sm hover:border-kincya/40 transition-all"
            >
              <div className="aspect-[16/9] bg-kiji/50 tatami-pattern" />
              <div className="p-5">
                <span className="text-xs text-ai">{a.category}</span>
                <h2 className="text-base text-sumi mt-1.5 mb-2 group-hover:text-ai transition-colors line-clamp-2 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                  {a.title}
                </h2>
                <p className="text-xs text-sumi/60 line-clamp-2 mb-3">{a.description}</p>
                <div className="flex items-center gap-2 text-xs text-sumi/40">
                  <span>{formatDate(a.publishedAt)}</span>
                  {a.readTime && <span>・約{a.readTime}分で読めます</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-1.5 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={qs(p)}
                className={`px-3.5 py-2 text-xs border transition-colors ${
                  p === currentPage ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
                }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
