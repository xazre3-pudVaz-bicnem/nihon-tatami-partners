import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { COLUMN_ARTICLES } from "@/data/columns";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "記事管理 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminArticlesPage() {
  return (
    <AdminLayout currentPath="/admin/articles">
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            記事管理（{COLUMN_ARTICLES.length}件）
          </h1>
          <button className="bg-kincya text-white px-5 py-2.5 text-sm hover:bg-do transition-colors">＋ 記事を作成</button>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">タイトル</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">カテゴリ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">公開日</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">読了時間</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {COLUMN_ARTICLES.map((a) => (
                <tr key={a.slug} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-sumi line-clamp-1">{a.title}</p>
                    <p className="text-xs text-sumi/40">/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-sumi whitespace-nowrap">{a.category}</td>
                  <td className="px-4 py-3 text-xs text-sumi/60 whitespace-nowrap">{formatDate(a.publishedAt)}</td>
                  <td className="px-4 py-3 text-xs text-sumi/60">{a.readTime ? `${a.readTime}分` : "—"}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link href={`/articles/${a.slug}`} className="text-xs text-ai hover:underline mr-3">表示</Link>
                    <button className="text-xs text-sumi/60 hover:text-ai">編集</button>
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
