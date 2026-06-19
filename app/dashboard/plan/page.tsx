import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "プラン管理 | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const PLANS = [
  { id: "free", name: "無料プラン", price: "0円", isCurrentPlan: true, features: ["基本プロフィール", "月3件まで問い合わせ受信", "サービス1カテゴリ"] },
  { id: "standard", name: "スタンダード", price: "3,980円/月", isCurrentPlan: false, features: ["全機能利用可", "問い合わせ無制限", "全カテゴリ掲載", "上位表示", "写真10枚"] },
  { id: "premium", name: "プレミアム", price: "9,800円/月", isCurrentPlan: false, features: ["スタンダード全機能", "最上位表示（固定）", "バッジ表示", "写真30枚", "施工事例10件"] },
];

export default function DashboardPlanPage() {
  return (
    <DashboardLayout currentPath="/dashboard/plan">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>プラン管理</h1>

        <div className="bg-kiji/50 border border-kiji p-4 mb-6">
          <p className="text-sm text-sumi">現在のプラン：<span className="font-medium text-ai">無料プラン</span></p>
          <p className="text-xs text-sumi/60 mt-1">今月の問い合わせ受信数：1 / 3件</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`border p-5 ${plan.isCurrentPlan ? "border-ai bg-ai/5" : "border-border"}`}>
              {plan.isCurrentPlan && <p className="text-xs text-ai mb-2">現在のプラン</p>}
              <h2 className="text-base text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.name}</h2>
              <p className="text-xl text-kincya mb-4">{plan.price}</p>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-sumi/70 flex items-center gap-1.5">
                    <span className="text-igusa">✓</span> {f}
                  </li>
                ))}
              </ul>
              {!plan.isCurrentPlan && (
                <button className="w-full text-xs border border-kincya text-kincya py-2 hover:bg-kincya hover:text-white transition-colors">
                  このプランに変更
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>請求履歴</h2>
          <p className="text-sm text-sumi/50 py-4 text-center">無料プランのため請求履歴はありません</p>
          {/* TODO: 有料プランへの支払い履歴を Stripe から取得 */}
        </div>
      </div>
    </DashboardLayout>
  );
}
