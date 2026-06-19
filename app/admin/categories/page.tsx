import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { SERVICE_CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "カテゴリ管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminCategoriesPage() {
  return (
    <AdminLayout currentPath="/admin/categories">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>カテゴリ管理</h1>
          <button className="text-sm bg-ai text-white px-4 py-2 hover:opacity-80 transition-opacity">
            カテゴリを追加
          </button>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">カテゴリ名</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">グループ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">説明文</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者数</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">スラッグ</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {SERVICE_CATEGORIES.map((cat) => (
                <tr key={cat.slug} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-sumi">{cat.name}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi/60">
                    {cat.group || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi/60 max-w-xs">
                    <p className="line-clamp-2">{cat.description || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi">
                    {/* TODO: 業者数をDBから集計 */}
                    <span className="text-sumi/40">—</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi/50 font-mono">{cat.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button className="text-xs text-ai hover:underline">編集</button>
                      <button className="text-xs text-do hover:underline">削除</button>
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
