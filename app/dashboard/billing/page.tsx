import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "請求・支払い | ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

const PLANS = [
  {
    id: "free",
    name: "無料プラン",
    price: "0円",
    current: true,
    features: ["基本プロフィール掲載", "月3件まで問い合わせ受信", "サービス1カテゴリ", "口コミの受付・返信"],
  },
  {
    id: "standard",
    name: "スタンダード",
    price: "3,980円 / 月",
    current: false,
    features: ["問い合わせ無制限", "全カテゴリ掲載", "検索の上位表示", "写真10枚まで", "反響レポート"],
  },
  {
    id: "premium",
    name: "プレミアム",
    price: "9,800円 / 月",
    current: false,
    features: ["スタンダードの全機能", "最上位表示（固定枠）", "認定バッジ表示", "写真30枚まで", "施工事例10件掲載", "優先サポート"],
  },
];

export default function DashboardBillingPage() {
  return (
    <DashboardLayout currentPath="/dashboard/billing">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>請求・支払い</h1>

        {/* 現在のプラン */}
        <div className="bg-kiji/50 border border-kiji p-5 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-sumi/60 mb-1">現在のプラン</p>
              <p className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>無料プラン</p>
              <p className="text-xs text-sumi/50 mt-1">今月の問い合わせ受信数：1 / 3件</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-sumi/60">月額</p>
              <p className="text-2xl font-bold text-sumi">0円</p>
            </div>
          </div>
        </div>

        {/* プラン一覧 */}
        <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>プランのアップグレード</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {PLANS.map((p) => (
            <div key={p.id} className={`border p-5 flex flex-col ${p.current ? "border-ai bg-ai/5" : "border-border"}`}>
              {p.current && <span className="text-xs text-ai mb-2">利用中</span>}
              <h3 className="text-base text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{p.name}</h3>
              <p className="text-lg font-bold text-sumi mb-3">{p.price}</p>
              <ul className="space-y-1.5 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-xs text-sumi/70 flex items-start gap-1.5">
                    <span className="text-igusa mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={p.current}
                className={`w-full py-2.5 text-sm transition-colors ${
                  p.current ? "border border-border text-sumi/40 cursor-default" : "bg-kincya text-white hover:bg-do"
                }`}
              >
                {p.current ? "利用中のプラン" : "このプランにする"}
              </button>
            </div>
          ))}
        </div>

        {/* 支払い履歴 */}
        <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>支払い履歴</h2>
        <div className="bg-white border border-border p-8 text-center">
          <p className="text-sm text-sumi/50">支払い履歴はまだありません。</p>
          <p className="text-xs text-sumi/40 mt-1">有料プランに登録すると、ここに請求書が表示されます。</p>
        </div>

        <p className="text-xs text-sumi/40 mt-6">
          ※ プラン・料金は予告なく変更される場合があります。詳細は
          <Link href="/pro" className="text-ai hover:underline">掲載プランのご案内</Link>
          をご覧ください。
        </p>
      </div>
    </DashboardLayout>
  );
}
