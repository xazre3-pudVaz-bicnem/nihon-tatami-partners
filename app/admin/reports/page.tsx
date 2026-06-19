import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_PROVIDERS } from "@/data/providers";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_REVIEWS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "レポート | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminReportsPage() {
  const topProviders = [...MOCK_PROVIDERS]
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 5);

  return (
    <AdminLayout currentPath="/admin/reports">
      <div className="space-y-6">
        <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>レポート</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "今月の予約", value: MOCK_BOOKINGS.length, suffix: "件" },
            { label: "今月の口コミ", value: MOCK_REVIEWS.length, suffix: "件" },
            { label: "アクティブ業者", value: MOCK_PROVIDERS.filter((p) => p.status === "active").length, suffix: "社" },
            { label: "月間PV（TODO）", value: "—", suffix: "" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border p-4">
              <p className="text-xs text-sumi/50 mb-1">{s.label}</p>
              <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {s.value}<span className="text-sm text-sumi/50 ml-0.5">{s.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>口コミ数ランキング TOP5</h2>
          <div className="space-y-3">
            {topProviders.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs text-sumi/40 w-4 text-right">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-sumi">{p.tradeName || p.companyName}</p>
                    <p className="text-xs text-sumi/50">{p.reviewCount}件</p>
                  </div>
                  <div className="h-1.5 bg-kiji">
                    <div className="h-1.5 bg-ai" style={{ width: `${((p.reviewCount || 0) / (topProviders[0]?.reviewCount || 1)) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>売上・収益レポート（TODO）</h2>
          <p className="text-xs text-sumi/40">
            プレミアム/スタンダードプランの月次収益レポートは、決済システム連携後に表示されます。
            {/* TODO: Stripe webhooks → DB集計 */}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
