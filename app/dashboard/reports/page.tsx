import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "レポート | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_STATS = {
  pageViews: 1248,
  profileViews: 342,
  messageReceived: 18,
  quoteRequests: 7,
  conversationRate: 2.05,
};

export default function DashboardReportsPage() {
  return (
    <DashboardLayout currentPath="/dashboard/reports">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>レポート</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "ページビュー（30日）", value: MOCK_STATS.pageViews.toLocaleString(), suffix: "PV" },
            { label: "プロフィール閲覧", value: MOCK_STATS.profileViews.toLocaleString(), suffix: "件" },
            { label: "メッセージ受信", value: MOCK_STATS.messageReceived, suffix: "件" },
            { label: "見積依頼受信", value: MOCK_STATS.quoteRequests, suffix: "件" },
            { label: "成約率（概算）", value: `${MOCK_STATS.conversationRate}`, suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-border p-4">
              <p className="text-xs text-sumi/50 mb-1">{stat.label}</p>
              <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {stat.value}<span className="text-sm text-sumi/50 ml-0.5">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-border p-5 mb-4">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>流入キーワード（TODO: 本実装）</h2>
          <div className="space-y-2">
            {["さいたま市 畳 表替え", "川口市 畳職人", "埼玉 畳 安い", "浦和 畳 張替え"].map((kw, i) => (
              <div key={kw} className="flex items-center gap-3 text-xs">
                <span className="text-sumi/40 w-4 text-right">{i + 1}</span>
                <span className="text-sumi">{kw}</span>
                <div className="flex-1 bg-kiji h-1.5">
                  <div className="bg-ai h-1.5" style={{ width: `${(4 - i) * 20}%` }} />
                </div>
                <span className="text-sumi/50 w-8 text-right">{(4 - i) * 12}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/30 mt-3">
            {/* TODO: Google Search Console API 連携 */}
            実データはSearch Console連携後に表示されます
          </p>
        </div>

        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>月別アクセス推移（TODO: 本実装）</h2>
          <div className="h-32 flex items-end gap-2">
            {[40, 55, 48, 62, 78, 92, 88, 105, 98, 115, 124, 108].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-ai/20 relative" style={{ height: `${(v / 124) * 100}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-ai" style={{ height: "30%" }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/30 mt-2">
            {/* TODO: 実際のアクセスログDBから集計 */}
            実データは分析機能実装後に表示されます
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
