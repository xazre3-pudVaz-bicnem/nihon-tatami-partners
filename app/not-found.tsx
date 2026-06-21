import Link from "next/link";
import { POPULAR_CATEGORIES } from "@/data/categories";
import { SAITAMA_CITIES } from "@/data/cities";

export default function NotFound() {
  const popularCats = POPULAR_CATEGORIES.slice(0, 6);
  const cities = SAITAMA_CITIES.slice(0, 6);

  return (
    <div className="min-h-screen bg-shiro">
      {/* ヘッダーエリア */}
      <div className="bg-sumi py-16 text-center">
        <p className="text-kincya text-xs tracking-widest mb-3">404 NOT FOUND</p>
        <h1 className="text-3xl text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          ページが見つかりませんでした
        </h1>
        <p className="text-sm text-white/60 max-w-md mx-auto px-4">
          お探しのページは移動・削除されたか、URLが変更された可能性があります。
          以下から目的のページをお探しください。
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* メインCTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Link
            href="/request/start"
            className="flex flex-col items-center gap-2 bg-kincya text-white p-6 text-center hover:bg-do transition-colors"
          >
            <span className="text-2xl">📋</span>
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-serif)" }}>かんたん依頼診断</span>
            <span className="text-xs opacity-75">どの工事か迷っている方</span>
          </Link>
          <Link
            href="/bulk-quote"
            className="flex flex-col items-center gap-2 bg-ai text-white p-6 text-center hover:bg-ai/80 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-serif)" }}>一括見積もり</span>
            <span className="text-xs opacity-75">最大5社に同時依頼</span>
          </Link>
          <Link
            href="/search"
            className="flex flex-col items-center gap-2 bg-sumi text-white p-6 text-center hover:bg-sumi/80 transition-colors"
          >
            <span className="text-2xl">🔍</span>
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-serif)" }}>業者を探す</span>
            <span className="text-xs opacity-75">料金・口コミで比較</span>
          </Link>
        </div>

        {/* カテゴリから探す */}
        <section className="mb-10">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            カテゴリから探す
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularCats.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="border border-border bg-white hover:border-kincya/40 hover:shadow-sm transition-all p-4"
              >
                <p className="text-sm text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{cat.name}</p>
                {cat.priceFrom && (
                  <p className="text-xs text-kincya mt-0.5">{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Link href="/categories" className="text-sm text-ai hover:text-kincya transition-colors">
              すべてのカテゴリを見る →
            </Link>
          </div>
        </section>

        {/* 地域から探す */}
        <section className="mb-10">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            地域から探す
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/saitama/${city.slug}`}
                className="text-sm text-ai border border-ai/30 px-3 py-1.5 hover:bg-ai hover:text-white transition-all"
              >
                {city.name}
              </Link>
            ))}
            <Link
              href="/saitama"
              className="text-sm text-sumi/60 border border-border px-3 py-1.5 hover:border-ai hover:text-ai transition-all"
            >
              埼玉県一覧 →
            </Link>
          </div>
        </section>

        {/* その他のリンク */}
        <section className="mb-10">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            よく使われるページ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "料金相場", href: "/prices" },
              { label: "施工事例", href: "/cases" },
              { label: "コラム", href: "/articles" },
              { label: "業者を比較", href: "/compare" },
              { label: "写真で見積もり", href: "/photo-estimate" },
              { label: "コンシェルジュ", href: "/concierge" },
              { label: "Q&A", href: "/questions" },
              { label: "業者を掲載", href: "/pro" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-center text-sm text-sumi/70 border border-border p-3 hover:border-ai hover:text-ai transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* トップへ */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-sumi text-sumi px-8 py-3 hover:bg-sumi hover:text-white transition-all text-sm tracking-wide"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
