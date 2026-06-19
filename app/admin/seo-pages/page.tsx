import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { SAITAMA_CITIES } from "@/data/cities";
import { SERVICE_CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "SEOページ管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminSeoPagesPage() {
  const popularCategories = SERVICE_CATEGORIES.filter((c) => c.popular);

  return (
    <AdminLayout currentPath="/admin/seo-pages">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>SEOページ管理</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-border p-4">
            <p className="text-xs text-sumi/50 mb-1">市区町村ページ</p>
            <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{SAITAMA_CITIES.length}<span className="text-sm text-sumi/50 ml-0.5">ページ</span></p>
          </div>
          <div className="bg-white border border-border p-4">
            <p className="text-xs text-sumi/50 mb-1">市区町村×カテゴリページ</p>
            <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{SAITAMA_CITIES.length * popularCategories.length}<span className="text-sm text-sumi/50 ml-0.5">ページ</span></p>
          </div>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <div className="px-5 py-4 border-b border-kiji">
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>市区町村SEOページ一覧</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">市区町村</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">URL</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">サブページ数</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {SAITAMA_CITIES.slice(0, 10).map((city) => (
                <tr key={city.slug} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3 text-sm text-sumi">{city.name}</td>
                  <td className="px-4 py-3 text-xs text-sumi/50 font-mono">/saitama/{city.slug}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{popularCategories.length}ページ</td>
                  <td className="px-4 py-3">
                    <Link href={`/saitama/${city.slug}`} target="_blank" className="text-xs text-ai hover:underline">
                      確認
                    </Link>
                  </td>
                </tr>
              ))}
              {SAITAMA_CITIES.length > 10 && (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-xs text-sumi/40 text-center">
                    他 {SAITAMA_CITIES.length - 10} 市区町村
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
