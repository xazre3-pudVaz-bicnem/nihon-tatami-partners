import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_THREADS } from "@/data/messages";
import { MOCK_REVIEWS } from "@/data/reviews";
import { getProviderById } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

// TODO: Auth.js / Supabase から認証業者情報を取得
const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardPage() {
  const provider = getProviderById(MOCK_PROVIDER_ID);
  const providerName = provider?.tradeName || provider?.companyName || "業者";
  const bookings = MOCK_BOOKINGS.filter((b) => b.providerId === MOCK_PROVIDER_ID);
  const threads = MOCK_THREADS.filter((t) => t.providerId === MOCK_PROVIDER_ID);
  const reviews = MOCK_REVIEWS.filter((r) => r.providerId === MOCK_PROVIDER_ID);

  const unreadMessages = threads.reduce((acc, t) => acc + (t.unreadProvider || 0), 0);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  // 掲載ステータス（mock）
  const publishStatus: "pending" | "published" | "suspended" =
    provider?.status === "active" ? "published" : provider?.status === "pending" ? "pending" : "suspended";
  const statusMeta = {
    pending: { label: "審査中", cls: "bg-kincya/10 text-kincya border-kincya/30" },
    published: { label: "公開中", cls: "bg-igusa/10 text-igusa border-igusa/30" },
    suspended: { label: "停止中", cls: "bg-do/10 text-do border-do/30" },
  }[publishStatus];

  // プロフィール充実度（入力済み項目の割合）
  const checks: { ok: boolean; label: string; href: string }[] = [
    { ok: !!provider?.introduction, label: "自己紹介を入力", href: "/dashboard/profile" },
    { ok: (provider?.licenses?.length ?? 0) > 0, label: "保有資格を登録", href: "/dashboard/profile" },
    { ok: (provider?.photos?.length ?? 0) > 0, label: "施工写真を登録", href: "/dashboard/photos" },
    { ok: !!provider?.businessHours, label: "営業時間を設定", href: "/dashboard/profile" },
    { ok: (provider?.serviceAreas?.length ?? 0) > 0, label: "対応エリアを設定", href: "/dashboard/areas" },
    { ok: reviews.length > 0, label: "施工事例を登録", href: "/dashboard/workcases/new" },
  ];
  const completed = checks.filter((c) => c.ok).length;
  const completeness = Math.round((completed / checks.length) * 100);
  const todoItems = checks.filter((c) => !c.ok);

  const stats = [
    { label: "未対応の見積", value: pendingBookings.toString(), unit: "件" },
    { label: "未読メッセージ", value: unreadMessages.toString(), unit: "件" },
    { label: "今月の閲覧数", value: "1,284", unit: "" },
    { label: "今月の問い合わせ", value: "18", unit: "件" },
  ];

  return (
    <DashboardLayout currentPath="/dashboard">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>ダッシュボード</h1>
            <p className="text-xs text-sumi/50">{provider?.city}の{providerName} ・ 最終ログイン：2分前</p>
          </div>
          <span className={`text-xs px-3 py-1.5 border ${statusMeta.cls} shrink-0`}>掲載：{statusMeta.label}</span>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "プロフィール編集", href: "/dashboard/profile" },
            { label: "サービスを追加", href: "/dashboard/services/new" },
            { label: "施工事例を登録", href: "/dashboard/workcases/new" },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="bg-white border border-border p-3 text-center text-xs sm:text-sm text-sumi hover:border-ai hover:text-ai transition-colors">
              {a.label}
            </Link>
          ))}
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
          <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>プロフィール充実度</h2>
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-sumi/60 mb-1">
              <span>{completeness}%完成</span>
              <span>残り{todoItems.length}項目</span>
            </div>
            <div className="bg-white border border-border h-2">
              <div className="bg-igusa h-full transition-all" style={{ width: `${completeness}%` }} />
            </div>
          </div>
          {todoItems.length > 0 ? (
            <>
              <p className="text-xs text-sumi/70 mb-2">次の項目を入力すると、検索結果での表示が改善されます：</p>
              <ul className="space-y-1.5">
                {todoItems.map((t) => (
                  <li key={t.label}>
                    <Link href={t.href} className="text-xs text-ai hover:underline flex items-center gap-1.5">
                      <span className="text-sumi/30">○</span>{t.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-xs text-igusa">プロフィールはすべて入力済みです。</p>
          )}
        </section>

        {/* ─── 未返信アラート ─── */}
        {unreadMessages >= 3 && (
          <section className="bg-do/5 border border-do/40 p-5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-do text-white flex items-center justify-center text-xs shrink-0 mt-0.5">!</div>
              <div className="flex-1">
                <h2 className="text-base text-do mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  未返信アラート
                </h2>
                <p className="text-xs text-sumi/70 mb-3">
                  {unreadMessages}件の未読メッセージがあります。48時間以内に返信することで成約率が向上します。
                </p>
                <Link
                  href="/dashboard/messages"
                  className="text-xs bg-do text-white px-4 py-1.5 hover:opacity-80 transition-opacity inline-block"
                >
                  メッセージを確認する
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ─── 口コミ返信待ち ─── */}
        {reviews.some((r) => !r.reply) && (
          <section className="bg-white border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                口コミ返信待ち
                <span className="ml-2 text-xs bg-kincya/10 text-kincya border border-kincya/30 px-1.5 py-0.5">
                  {reviews.filter((r) => !r.reply).length}件
                </span>
              </h2>
              <Link href="/dashboard/reviews" className="text-xs text-ai hover:underline">
                すべて見る →
              </Link>
            </div>
            <div className="space-y-3">
              {reviews
                .filter((r) => !r.reply)
                .slice(0, 2)
                .map((r) => (
                  <div key={r.id} className="border-b border-kiji pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-kincya text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                      <span className="text-xs text-sumi/40">{formatDate(r.createdAt)}</span>
                    </div>
                    <p className="text-sm text-sumi line-clamp-2 mb-2">{r.body}</p>
                    <Link
                      href="/dashboard/reviews"
                      className="text-xs bg-kincya text-white px-3 py-1 hover:bg-do transition-colors inline-block"
                    >
                      返信する
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ─── 改善提案 ─── */}
        {(() => {
          const suggestions: { icon: string; message: string; href: string }[] = [];
          if ((provider?.photos?.length ?? 0) < 3) {
            suggestions.push({
              icon: "📷",
              message: "施工写真が少なめです。3枚以上登録すると問い合わせが増加します。",
              href: "/dashboard/photos",
            });
          }
          if ((provider?.introduction?.length ?? 0) < 100) {
            suggestions.push({
              icon: "📝",
              message: "自己紹介文が短いです。100文字以上書くと信頼性が高まります。",
              href: "/dashboard/profile",
            });
          }
          if (!provider?.businessHours) {
            suggestions.push({
              icon: "🕐",
              message: "営業時間が未設定です。設定するとお客様が連絡しやすくなります。",
              href: "/dashboard/profile",
            });
          }
          if ((provider?.serviceAreas?.length ?? 0) < 3) {
            suggestions.push({
              icon: "📍",
              message: "対応エリアが少なめです。対応可能な市区町村を追加しましょう。",
              href: "/dashboard/areas",
            });
          }
          if (suggestions.length === 0) return null;
          return (
            <section className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                改善提案
              </h2>
              <div className="space-y-2">
                {suggestions.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-start gap-3 border border-kiji p-3 hover:border-ai transition-colors group"
                  >
                    <span className="text-lg shrink-0">{s.icon}</span>
                    <p className="text-xs text-sumi/70 flex-1 group-hover:text-sumi transition-colors">
                      {s.message}
                    </p>
                    <span className="text-xs text-ai shrink-0">設定する →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </DashboardLayout>
  );
}
