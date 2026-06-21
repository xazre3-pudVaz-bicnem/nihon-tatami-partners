import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_BOOKINGS, MOCK_QUOTE_REQUESTS } from "@/data/bookings";
import { MOCK_THREADS } from "@/data/messages";
import StatusBadge from "@/components/common/StatusBadge";
import { getHighRatedProviders } from "@/data/providers";
import { formatDate, formatRating } from "@/lib/utils";
import SampleBadge from "@/components/common/SampleBadge";

export const metadata: Metadata = {
  title: "マイページ | 日本畳パートナー",
  description: "予約履歴・見積履歴・メッセージ・お気に入り業者を管理できます。",
  robots: "noindex,nofollow",
};

// TODO: 本番では Auth.js / Supabase から認証ユーザー情報を取得
const MOCK_USER = { id: "user-001", name: "田中 美咲", email: "tanaka@example.com" };

export default function MypagePage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.userId === MOCK_USER.id);
  const quotes = MOCK_QUOTE_REQUESTS.filter((q) => q.userId === MOCK_USER.id);
  const threads = MOCK_THREADS.filter((t) => t.userId === MOCK_USER.id);
  const unread = threads.reduce((acc, t) => acc + (t.unreadUser || 0), 0);
  const recommended = getHighRatedProviders(3);
  // 口コミ投稿待ち（施工完了したが口コミ未投稿の予約）
  const pendingReviews = bookings.filter((b) => b.status === "completed");

  return (
    <div className="min-h-screen bg-cloud">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ウェルカム */}
        <div className="mb-8">
          <h1 className="text-2xl text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>マイページ</h1>
          <p className="text-sm text-sumi/60">ようこそ、{MOCK_USER.name}さん</p>
        </div>

        {/* ナビゲーション */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "メッセージ", href: "/mypage/messages", badge: unread },
            { label: "予約履歴", href: "/mypage/bookings", badge: 0 },
            { label: "見積履歴", href: "/mypage/quotes", badge: 0 },
            { label: "お気に入り", href: "/mypage/favorites", badge: 0 },
            { label: "口コミ投稿", href: "/mypage/reviews/new", badge: 0 },
            { label: "通知", href: "/mypage/notifications", badge: 0 },
            { label: "プロフィール", href: "/mypage/profile", badge: 0 },
            { label: "設定", href: "/mypage/settings", badge: 0 },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative bg-white border border-border hover:border-ai text-center p-4 transition-all duration-300"
            >
              <span className="text-sm text-sumi">{item.label}</span>
              {item.badge > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-do text-white text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 最近の予約 */}
          <div className="lg:col-span-2 space-y-5">
            <section className="bg-white border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>最近の予約</h2>
                <Link href="/mypage/bookings" className="text-xs text-ai hover:underline">すべて見る →</Link>
              </div>
              {bookings.length === 0 ? (
                <p className="text-sm text-sumi/50 py-4 text-center">予約履歴はありません</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="flex items-start justify-between border-b border-kiji pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-xs text-sumi/40 mb-0.5">{formatDate(b.createdAt)}</p>
                        <p className="text-sm text-sumi">{b.serviceCategory}</p>
                        <p className="text-xs text-sumi/60">{b.address}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-white border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>見積依頼</h2>
                <Link href="/mypage/quotes" className="text-xs text-ai hover:underline">すべて見る →</Link>
              </div>
              {quotes.length === 0 ? (
                <p className="text-sm text-sumi/50 py-4 text-center">見積依頼はありません</p>
              ) : (
                <div className="space-y-3">
                  {quotes.map((q) => (
                    <div key={q.id} className="flex items-start justify-between border-b border-kiji pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-xs text-sumi/40 mb-0.5">{formatDate(q.createdAt)}</p>
                        <p className="text-sm text-sumi">{q.workType}</p>
                        <p className="text-xs text-sumi/60">{q.address || "—"}</p>
                      </div>
                      <StatusBadge status={q.status} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 口コミ投稿待ち */}
            <section className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>口コミ投稿のお願い</h2>
              {pendingReviews.length === 0 ? (
                <p className="text-sm text-sumi/50 py-2">口コミ投稿待ちの施工はありません。</p>
              ) : (
                <div className="space-y-3">
                  {pendingReviews.map((b) => (
                    <div key={b.id} className="flex items-center justify-between border-b border-kiji pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm text-sumi">{b.serviceCategory}</p>
                        <p className="text-xs text-sumi/50">{formatDate(b.createdAt)} ・ 施工完了</p>
                      </div>
                      <Link href="/mypage/reviews/new" className="text-xs bg-kincya text-white px-3 py-1.5 hover:bg-do transition-colors shrink-0">
                        口コミを書く
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* お気に入り・最近見た業者 */}
            <section className="bg-white border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>お気に入り・最近見た業者</h2>
                <Link href="/mypage/favorites" className="text-xs text-ai hover:underline">お気に入り一覧 →</Link>
              </div>
              <p className="text-sm text-sumi/50 py-2">
                お気に入りに追加した業者や最近見た業者がここに表示されます。気になる業者は詳細ページのハートマークから登録できます。
              </p>
              <Link href="/search" className="inline-block text-xs text-ai border border-ai px-3 py-1.5 mt-2 hover:bg-ai hover:text-white transition-all">
                業者を探す →
              </Link>
            </section>

            {/* おすすめ業者 */}
            <section className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>あなたへのおすすめ業者</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommended.map((p) => (
                  <Link key={p.id} href={`/providers/${p.id}`} className="block border border-border p-3 hover:border-ai transition-colors">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm text-sumi font-medium truncate">{p.tradeName || p.companyName}</span>
                      {p.isSample && <SampleBadge label={p.isSampleLabel || "掲載イメージ"} />}
                    </div>
                    <p className="text-xs text-sumi/50 mb-1">{p.city}</p>
                    <p className="text-xs text-kincya">★ {formatRating(p.averageRating)}（{p.reviewCount}件）</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>メッセージ</h2>
              {threads.length === 0 ? (
                <p className="text-xs text-sumi/50">メッセージはありません</p>
              ) : (
                <div className="space-y-2">
                  {threads.map((t) => (
                    <Link key={t.id} href={`/mypage/messages/${t.id}`} className="block border-b border-kiji pb-2 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs text-sumi line-clamp-2">{t.lastMessage}</p>
                        {t.unreadUser! > 0 && (
                          <span className="w-4 h-4 bg-do text-white text-xs flex items-center justify-center shrink-0">
                            {t.unreadUser}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/mypage/messages" className="block text-center text-xs text-ai hover:underline mt-3">
                メッセージ一覧を見る →
              </Link>
            </div>

            <div className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>アカウント情報</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-sumi/50">お名前</span>
                  <span className="text-sumi">{MOCK_USER.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sumi/50">メール</span>
                  <span className="text-sumi text-xs truncate max-w-[120px]">{MOCK_USER.email}</span>
                </div>
              </div>
              <Link href="/mypage/profile" className="block text-center text-xs text-ai border border-ai px-3 py-1.5 mt-3 hover:bg-ai hover:text-white transition-all duration-300">
                プロフィール編集
              </Link>
            </div>

            <div className="bg-kiji/50 border border-kiji p-4">
              <p className="text-xs text-sumi/70 leading-relaxed mb-3">
                工事が完了したら口コミを投稿してください。次の方の参考になります。
              </p>
              <Link href="/mypage/reviews/new" className="block text-center text-xs bg-kincya text-white px-3 py-2 hover:bg-do transition-colors">
                口コミを投稿する
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
