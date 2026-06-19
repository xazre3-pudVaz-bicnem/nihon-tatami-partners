import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { CITY_CONFIGS } from "@/config/cities";

export const metadata: Metadata = {
  title: "市区町村ページ管理 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminCitiesPage() {
  return (
    <AdminLayout currentPath="/admin/cities">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            市区町村ページ管理（{CITY_CONFIGS.length}件）
          </h1>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">市区町村</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">スラッグ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">SEO説明</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">人気カテゴリ</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {CITY_CONFIGS.map((c) => (
                <tr key={c.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3 text-sm text-sumi whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-sumi/50">/{c.slug}</td>
                  <td className="px-4 py-3 text-xs text-sumi/60 max-w-md line-clamp-2">{c.description}</td>
                  <td className="px-4 py-3 text-xs text-sumi/50">{c.popularCategories.length}件</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link href={`/saitama/${c.slug}`} className="text-xs text-ai hover:underline mr-3">表示</Link>
                    <button className="text-xs text-sumi/60 hover:text-ai">編集</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-sumi/40 mt-6">市区町村ページのSEO設定は config/cities.ts で管理されています。</p>
      </div>
    </AdminLayout>
  );
}
