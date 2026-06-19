import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_THREADS } from "@/data/messages";
import { MOCK_REVIEWS } from "@/data/reviews";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

// TODO: Auth.js / Supabase から認証業者情報を取得
const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.providerId === MOCK_PROVIDER_ID);
  const threads = MOCK_THREADS.filter((t) => t.providerId === MOCK_PROVIDER_ID);
  const reviews = MOCK_REVIEWS.filter((r) => r.providerId === MOCK_PROVIDER_ID);

  const stats = [
    { label: "今月の予約", value: bookings.filter((b) => b.status === "confirmed").length.toString(), unit: "件" },
    { label: "未読メッセージ", value: threads.reduce((acc, t) => acc + (t.unreadProvider || 0), 0).toString(), unit: "件" },
    { label: "口コミ件数", value: reviews.length.toString(), unit: "件" },
    { label: "平均評価", value: reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "—", unit: "" },
  ];

  return (
    <DashboardLayout currentPath="/dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>ダッシュボード</h1>
          <p className="text-xs text-sumi/50">さいたま市の田中畳店 ・ 最終ログイン：2分前</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-border p-4">
              <p className="text-xs text-sumi/50 mb-1">{s.label}</p>
              <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {s.value}<span className="text-sm text-sumi/50 ml-0.5">{s.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>最近の予約</h2>
              <Link href="/dashboard/bookings" className="text-xs text-ai hover:underline">すべて見る →</Link>
            </div>
            {bookings.length === 0 ? (
              <p className="text-sm text-sumi/50 py-4 text-center">まだ予約はありません</p>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 5).map((b) => (
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
              <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>最近のメッセージ</h2>
              <Link href="/dashboard/messages" className="text-xs text-ai hover:underline">すべて見る →</Link>
            </div>
            {threads.length === 0 ? (
              <p className="text-sm text-sumi/50 py-4 text-center">メッセージはありません</p>
            ) : (
              <div className="space-y-3">
                {threads.slice(0, 5).map((t) => (
                  <Link key={t.id} href={`/dashboard/messages/${t.id}`} className="flex items-start justify-between border-b border-kiji pb-3 last:border-0 last:pb-0 hover:opacity-70 transition-opacity">
                    <p className="text-sm text-sumi line-clamp-1">{t.lastMessage}</p>
                    {t.unreadProvider! > 0 && (
                      <span className="w-5 h-5 bg-do text-white text-xs flex items-center justify-center shrink-0 ml-2">{t.unreadProvider}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="bg-white border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>最近の口コミ</h2>
            <Link href="/dashboard/reviews" className="text-xs text-ai hover:underline">すべて見る →</Link>
          </div>
          {reviews.length === 0 ? (
            <p className="text-sm text-sumi/50 py-4 text-center">まだ口コミはありません</p>
          ) : (
            <div className="space-y-3">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.id} className="border-b border-kiji pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-kincya text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    <span className="text-xs text-sumi/40">{formatDate(r.createdAt)}</span>
                  </div>
                  <p className="text-sm text-sumi line-clamp-2">{r.body}</p>
                  {!r.reply && (
                    <Link href="/dashboard/reviews" className="text-xs text-kincya hover:underline mt-1 inline-block">返信する →</Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-kiji/50 border border-kiji p-5">
          <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>プロフィール完成度</h2>
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-sumi/60 mb-1">
              <span>80%完成</span>
              <span>残り1項目</span>
            </div>
            <div className="bg-white border border-border h-2">
              <div className="bg-igusa h-full w-4/5" />
            </div>
          </div>
          <p className="text-xs text-sumi/70 mb-3">施工事例を登録するとプロフィールが完成します</p>
          <Link href="/dashboard/workcases/new" className="text-xs text-ai border border-ai px-3 py-1.5 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
            施工事例を追加する
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
}
