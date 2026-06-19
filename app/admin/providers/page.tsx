import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "業者管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminProvidersPage() {
  return (
    <AdminLayout currentPath="/admin/providers">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>業者管理（{MOCK_PROVIDERS.length}社）</h1>
          <div className="flex gap-3">
            <input type="text" placeholder="業者名・エリアで検索" className="border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai w-48" />
            <select className="border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai">
              <option>すべてのステータス</option>
              <option value="active">掲載中</option>
              <option value="pending">審査待ち</option>
              <option value="suspended">停止中</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者名</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">エリア</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">評価</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">ステータス</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">プラン</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">登録日</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_PROVIDERS.map((p) => (
                <tr key={p.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-sumi">{p.tradeName || p.companyName}</p>
                    <p className="text-xs text-sumi/40">{p.id}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi">{p.city}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{p.averageRating?.toFixed(1)} ({p.reviewCount}件)</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 ${p.plan === "premium" ? "bg-kincya/10 text-kincya" : p.plan === "standard" ? "bg-ai/10 text-ai" : "bg-kiji text-sumi/60"}`}>
                      {p.plan || "free"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi/50">{p.createdAt ? formatDate(p.createdAt) : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/providers/${p.id}`} className="text-xs text-ai hover:underline">詳細</Link>
                      <button className="text-xs text-do hover:underline">停止</button>
                    </div>
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
