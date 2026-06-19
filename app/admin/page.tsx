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

export default function AdminPage() {
  const stats = [
    { label: "掲載業者数", value: MOCK_PROVIDERS.length, suffix: "社", href: "/admin/providers" },
    { label: "総予約数", value: MOCK_BOOKINGS.length, suffix: "件", href: "/admin/bookings" },
    { label: "見積依頼数", value: MOCK_QUOTE_REQUESTS.length, suffix: "件", href: "/admin/quotes" },
    { label: "口コミ数", value: MOCK_REVIEWS.length, suffix: "件", href: "/admin/reviews" },
    { label: "審査待ち業者", value: MOCK_PROVIDERS.filter((p) => p.status === "pending").length, suffix: "社", href: "/admin/providers/review" },
    { label: "未承認口コミ", value: 0, suffix: "件", href: "/admin/reviews" },
  ];

  const pendingProviders = MOCK_PROVIDERS.filter((p) => p.status === "pending");

  return (
    <AdminLayout currentPath="/admin">
      <div className="space-y-6">
        <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>管理画面</h1>

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
