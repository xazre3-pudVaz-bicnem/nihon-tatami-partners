import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";

export const metadata: Metadata = {
  title: "データエクスポート | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const EXPORT_ITEMS = [
  { title: "業者データ", desc: "掲載中の全業者の情報（ID・会社名・エリア・評価・プラン）をCSVでエクスポート", endpoint: "/api/admin/export/providers" },
  { title: "予約データ", desc: "全予約の一覧（ID・サービス・業者・ユーザー・ステータス・日付）をCSVでエクスポート", endpoint: "/api/admin/export/bookings" },
  { title: "口コミデータ", desc: "全口コミ（ID・業者・評価・内容・日付）をCSVでエクスポート", endpoint: "/api/admin/export/reviews" },
  { title: "ユーザーデータ", desc: "全会員ユーザーの一覧（個人情報含む・取扱注意）をCSVでエクスポート", endpoint: "/api/admin/export/users" },
  { title: "見積依頼データ", desc: "全見積依頼の一覧（ID・工事種別・エリア・希望時期・ステータス）をCSVでエクスポート", endpoint: "/api/admin/export/quotes" },
];

export default function AdminExportPage() {
  return (
    <AdminLayout currentPath="/admin/export">
      <div>
        <h1 className="text-xl text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>データエクスポート</h1>
        <p className="text-xs text-sumi/50 mb-6">エクスポートされたデータには個人情報が含まれる場合があります。厳重に管理してください。</p>

        <div className="space-y-4">
          {EXPORT_ITEMS.map((item) => (
            <div key={item.title} className="bg-white border border-border p-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm text-sumi mb-1">{item.title}</h2>
                <p className="text-xs text-sumi/50">{item.desc}</p>
              </div>
              <a
                href={item.endpoint}
                className="text-xs bg-ai text-white px-4 py-2 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
                download
              >
                CSV出力
              </a>
              {/* TODO: /api/admin/export/* エンドポイントを実装 */}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
