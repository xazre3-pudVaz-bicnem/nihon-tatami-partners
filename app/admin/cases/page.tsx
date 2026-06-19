import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_WORK_CASES } from "@/data/workcases";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "施工事例管理 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminCasesPage() {
  return (
    <AdminLayout currentPath="/admin/cases">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            施工事例管理（{MOCK_WORK_CASES.length}件）
          </h1>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">タイトル</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">カテゴリ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">エリア</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">公開日</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">注目</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_WORK_CASES.map((c) => (
                <tr key={c.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-sumi line-clamp-1">{c.title}</p>
                    <p className="text-xs text-sumi/40">{c.id}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi">{c.categoryName}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{c.providerName}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{c.cityName ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-sumi/60">{formatDate(c.publishedAt)}</td>
                  <td className="px-4 py-3">
                    {c.featured ? <span className="text-xs text-kincya">★ 注目</span> : <span className="text-xs text-sumi/30">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/cases/${c.id}`} className="text-xs text-ai hover:underline mr-3">表示</Link>
                    <button className="text-xs text-do hover:underline">非公開</button>
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
