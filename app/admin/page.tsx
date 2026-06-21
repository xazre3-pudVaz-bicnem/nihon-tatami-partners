import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_PROVIDERS } from "@/data/providers";
import { MOCK_BOOKINGS, MOCK_QUOTE_REQUESTS } from "@/data/bookings";
import { MOCK_REVIEWS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

// ─── KPI 計算ヘルパー（mock） ───────────────────────────────────────────────
function getThisMonthCount<T extends { createdAt: string }>(items: T[]): number {
  const now = new Date();
  return items.filter((item) => {
    const d = new Date(item.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
}

export default function AdminPage() {
  const stats = [
    { label: "掲載業者数", value: MOCK_PROVIDERS.length, suffix: "社", href: "/admin/providers" },
    { label: "総予約数", value: MOCK_BOOKINGS.length, suffix: "件", href: "/admin/bookings" },
    { label: "見積依頼数", value: MOCK_QUOTE_REQUESTS.length, suffix: "件", href: "/admin/quotes" },
    { label: "口コミ数", value: MOCK_REVIEWS.length, suffix: "件", href: "/admin/reviews" },
    { label: "審査待ち業者", value: MOCK_PROVIDERS.filter((p) => p.status === "pending").length, suffix: "社", href: "/admin/providers/review" },
    { label: "未承認口コミ", value: 0, suffix: "件", href: "/admin/reviews" },
  ];

  // KPI 計算（mock値を含む）
  const thisMonthRequests = getThisMonthCount(MOCK_QUOTE_REQUESTS);
  const thisMonthBookings = getThisMonthCount(MOCK_BOOKINGS);
  const activeProviders = MOCK_PROVIDERS.filter((p) => p.status === "active");
  const sampleProviders = MOCK_PROVIDERS.filter((p) => p.id.startsWith("prov-"));
  // 未返信業者（mock: 見積依頼に対して5営業日以内に返信していない業者を想定）
  const noReplyProviderCount = 2; // mock
  // 成約率（completed / total bookings）
  const completedBookings = MOCK_BOOKINGS.filter((b) => b.status === "completed").length;
  const conversionRate =
    MOCK_BOOKINGS.length > 0
      ? Math.round((completedBookings / MOCK_BOOKINGS.length) * 100)
      : 0;
  // Q&A 件数（mock）
  const qaCount = 4; // mock
  // 写真見積もり件数（mock）
  const photoEstimateCount = 7; // mock

  const kpiCards: {
    label: string;
    value: string | number;
    suffix: string;
    note?: string;
    alert?: boolean;
    href: string;
  }[] = [
    {
      label: "新規依頼数（今月）",
      value: thisMonthRequests,
      suffix: "件",
      href: "/admin/quotes",
    },
    {
      label: "見積送信数（今月）",
      value: thisMonthBookings,
      suffix: "件",
      href: "/admin/bookings",
    },
    {
      label: "未返信業者数",
      value: noReplyProviderCount,
      suffix: "社",
      alert: noReplyProviderCount > 0,
      note: "5営業日以上返信なし",
      href: "/admin/providers",
    },
    {
      label: "成約率（概算）",
      value: conversionRate,
      suffix: "%",
      note: `完了${completedBookings}件 / 全${MOCK_BOOKINGS.length}件`,
      href: "/admin/bookings",
    },
    {
      label: "掲載業者数",
      value: activeProviders.length,
      suffix: "社",
      note: `サンプル含む全${sampleProviders.length}社`,
      href: "/admin/providers",
    },
    {
      label: "Q&A 質問数",
      value: qaCount,
      suffix: "件",
      href: "/admin/faqs",
    },
    {
      label: "写真見積もり数",
      value: photoEstimateCount,
      suffix: "件",
      href: "/admin/quotes",
    },
  ];

  const pendingProviders = MOCK_PROVIDERS.filter((p) => p.status === "pending");

  return (
    <AdminLayout currentPath="/admin">
      <div className="space-y-6">
        <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>管理画面</h1>

        {/* ─── KPIダッシュボード ─── */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            KPIダッシュボード
            <span className="text-xs text-sumi/40 ml-2 font-normal">（掲載イメージ・mock値を含む）</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {kpiCards.map((kpi) => (
              <Link
                key={kpi.label}
                href={kpi.href}
                className={`border p-4 hover:border-ai transition-colors ${
                  kpi.alert ? "border-do/50 bg-do/5" : "border-border bg-white"
                }`}
              >
                <p className={`text-xs mb-1 ${kpi.alert ? "text-do/70" : "text-sumi/50"}`}>
                  {kpi.label}
                  {kpi.alert && <span className="ml-1 text-do">!</span>}
                </p>
                <p
                  className={`text-2xl ${kpi.alert ? "text-do" : "text-sumi"}`}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {kpi.value}
                  <span className={`text-sm ml-0.5 ${kpi.alert ? "text-do/70" : "text-sumi/50"}`}>
                    {kpi.suffix}
                  </span>
                </p>
                {kpi.note && (
                  <p className="text-[10px] text-sumi/40 mt-1">{kpi.note}</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── 既存の基本統計 ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="bg-white border border-border p-4 hover:border-ai transition-colors">
              <p className="text-xs text-sumi/50 mb-1">{s.label}</p>
              <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {s.value}<span className="text-sm text-sumi/50 ml-0.5">{s.suffix}</span>
              </p>
            </Link>
          ))}
        </div>

        {pendingProviders.length > 0 && (
          <section className="bg-white border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                審査待ちの業者（{pendingProviders.length}社）
              </h2>
              <Link href="/admin/providers/review" className="text-xs text-ai hover:underline">すべて見る →</Link>
            </div>
            <div className="space-y-3">
              {pendingProviders.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between border-b border-kiji pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm text-sumi">{p.tradeName || p.companyName}</p>
                    <p className="text-xs text-sumi/50">{p.city}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-igusa text-white px-3 py-1 hover:opacity-80 transition-opacity">承認</button>
                    <button className="text-xs border border-do text-do px-3 py-1 hover:bg-do hover:text-white transition-colors">拒否</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="bg-white border border-border p-5">
            <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>クイックアクセス</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "業者一覧", href: "/admin/providers" },
                { label: "業者審査", href: "/admin/providers/review" },
                { label: "カテゴリ管理", href: "/admin/categories" },
                { label: "SEOページ", href: "/admin/seo-pages" },
                { label: "口コミ管理", href: "/admin/reviews" },
                { label: "お問い合わせ", href: "/admin/contacts" },
                { label: "ランキング設定", href: "/admin/ranking" },
                { label: "データエクスポート", href: "/admin/export" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="text-xs border border-border text-sumi/70 px-3 py-2 text-center hover:border-ai hover:text-ai transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-white border border-border p-5">
            <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>最近の予約</h2>
            {MOCK_BOOKINGS.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center justify-between border-b border-kiji pb-2 mb-2 last:border-0 last:mb-0 last:pb-0">
                <div>
                  <p className="text-xs text-sumi">{b.serviceCategory}</p>
                  <p className="text-xs text-sumi/40">{b.address}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 ${b.status === "confirmed" ? "bg-igusa/10 text-igusa" : b.status === "completed" ? "bg-ai/10 text-ai" : "bg-kiji text-sumi/60"}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
