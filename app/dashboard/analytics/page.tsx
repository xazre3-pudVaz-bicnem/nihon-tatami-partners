import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "反響レポート | ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

// TODO: Supabase移行後は実データを集計して表示
const MONTHLY_VIEWS = [
  { month: "1月", views: 320 },
  { month: "2月", views: 410 },
  { month: "3月", views: 680 },
  { month: "4月", views: 520 },
  { month: "5月", views: 590 },
  { month: "6月", views: 720 },
];

const REVIEW_TREND = [
  { month: "1月", count: 2 },
  { month: "2月", count: 1 },
  { month: "3月", count: 4 },
  { month: "4月", count: 3 },
  { month: "5月", count: 5 },
  { month: "6月", count: 3 },
];

const INQUIRY_TREND = [
  { month: "1月", count: 8 },
  { month: "2月", count: 11 },
  { month: "3月", count: 19 },
  { month: "4月", count: 14 },
  { month: "5月", count: 16 },
  { month: "6月", count: 18 },
];

const RANK_TREND = [
  { month: "1月", rank: 6 },
  { month: "2月", rank: 5 },
  { month: "3月", rank: 4 },
  { month: "4月", rank: 3 },
  { month: "5月", rank: 2 },
  { month: "6月", rank: 1 },
];

const CATEGORY_RESPONSE = [
  { name: "畳表替え", value: 48 },
  { name: "畳新調", value: 22 },
  { name: "ふすま張替え", value: 14 },
  { name: "原状回復", value: 10 },
  { name: "その他", value: 6 },
];

const KPIS = [
  { label: "月間閲覧数", value: "720", sub: "前月比 +22%" },
  { label: "問い合わせ数", value: "18", sub: "前月比 +5件" },
  { label: "予約転換率", value: "11%", sub: "問い合わせ→予約" },
  { label: "口コミ件数", value: "127", sub: "累計" },
];

export default function DashboardAnalyticsPage() {
  const maxViews = Math.max(...MONTHLY_VIEWS.map((m) => m.views));
  const maxReview = Math.max(...REVIEW_TREND.map((m) => m.count));
  const maxInquiry = Math.max(...INQUIRY_TREND.map((m) => m.count));
  const worstRank = Math.max(...RANK_TREND.map((m) => m.rank));

  return (
    <DashboardLayout currentPath="/dashboard/analytics">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          反響レポート
        </h1>

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-white border border-border p-4">
              <p className="text-xs text-sumi/50 mb-1">{k.label}</p>
              <p className="text-2xl font-bold text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{k.value}</p>
              <p className="text-xs text-igusa mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* 月間閲覧数（棒グラフ） */}
        <div className="bg-white border border-border p-5 mb-6">
          <h2 className="text-sm text-sumi mb-4 font-medium">月間閲覧数の推移</h2>
          <div className="flex items-end gap-3 h-48">
            {MONTHLY_VIEWS.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-sumi/60">{m.views}</span>
                <div className="w-full bg-ai/80 hover:bg-ai transition-colors" style={{ height: `${(m.views / maxViews) * 100}%` }} />
                <span className="text-xs text-sumi/40">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 口コミ件数推移（折れ線風） */}
          <div className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi mb-4 font-medium">口コミ件数の推移</h2>
            <div className="flex items-end gap-3 h-40">
              {REVIEW_TREND.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-sumi/60">{m.count}</span>
                  <div className="w-full bg-kincya/80 hover:bg-kincya transition-colors" style={{ height: `${(m.count / maxReview) * 100}%` }} />
                  <span className="text-xs text-sumi/40">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* カテゴリ別反響 */}
          <div className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi mb-4 font-medium">カテゴリ別の反響割合</h2>
            <div className="space-y-3">
              {CATEGORY_RESPONSE.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs text-sumi/70 mb-1">
                    <span>{c.name}</span>
                    <span>{c.value}%</span>
                  </div>
                  <div className="h-2 bg-cloud">
                    <div className="h-full bg-igusa" style={{ width: `${c.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* 問い合わせ数推移 */}
          <div className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi mb-4 font-medium">問い合わせ数の推移</h2>
            <div className="flex items-end gap-3 h-40">
              {INQUIRY_TREND.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-sumi/60">{m.count}</span>
                  <div className="w-full bg-do/70 hover:bg-do transition-colors" style={{ height: `${(m.count / maxInquiry) * 100}%` }} />
                  <span className="text-xs text-sumi/40">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 掲載順位の推移（順位は小さいほど上位） */}
          <div className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi mb-4 font-medium">掲載順位の推移</h2>
            <div className="flex items-end gap-3 h-40">
              {RANK_TREND.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-sumi/60">{m.rank}位</span>
                  <div className="w-full bg-kincya/70 hover:bg-kincya transition-colors" style={{ height: `${((worstRank - m.rank + 1) / worstRank) * 100}%` }} />
                  <span className="text-xs text-sumi/40">{m.month}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-sumi/40 mt-2">※ 順位が低いほど上位に表示されています。</p>
          </div>
        </div>

        <p className="text-xs text-sumi/40 mt-6">※ 表示データはサンプルです。実際の数値は集計後に反映されます。</p>
      </div>
    </DashboardLayout>
  );
}
