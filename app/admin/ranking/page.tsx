import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_PROVIDERS } from "@/data/providers";

export const metadata: Metadata = {
  title: "ランキング設定 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminRankingPage() {
  return (
    <AdminLayout currentPath="/admin/ranking">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>ランキング設定</h1>

        <div className="bg-white border border-border p-5 mb-4">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>ランキング算出ロジック</h2>
          <div className="space-y-3">
            {[
              { label: "平均評価（評価点）", weight: 40 },
              { label: "口コミ数", weight: 25 },
              { label: "施工件数", weight: 20 },
              { label: "プラン（premium/standard/free）", weight: 10 },
              { label: "レスポンス速度", weight: 5 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-xs text-sumi w-48 shrink-0">{item.label}</span>
                <div className="flex-1 h-2 bg-kiji">
                  <div className="h-2 bg-ai" style={{ width: `${item.weight * 2}%` }} />
                </div>
                <span className="text-xs text-sumi/50 w-8 text-right">{item.weight}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3">
            {/* TODO: 管理画面から重みを調整できるようにする */}
            ウェイトの変更はシステム管理者にお問い合わせください
          </p>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <div className="px-5 py-4 border-b border-kiji">
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>現在のランキング（全業者）</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">順位</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者名</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">評価</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">口コミ数</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">プラン</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">ピン留め</th>
              </tr>
            </thead>
            <tbody>
              {[...MOCK_PROVIDERS]
                .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
                .map((p, i) => (
                  <tr key={p.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-sumi/50">{i + 1}</td>
                    <td className="px-4 py-3 text-sm text-sumi">{p.tradeName || p.companyName}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{p.averageRating?.toFixed(1)}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{p.reviewCount}件</td>
                    <td className="px-4 py-3 text-xs text-sumi">{p.plan || "free"}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs border border-border text-sumi/60 px-2 py-0.5 hover:border-ai hover:text-ai transition-colors">
                        ピン留め
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
