import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { ALL_FAQ } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ管理 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

const CATEGORY_LABELS: Record<string, string> = {
  general: "一般",
  business: "法人向け",
  price: "料金",
  process: "工程",
  provider: "業者向け",
  area: "エリア",
};

export default function AdminFaqsPage() {
  return (
    <AdminLayout currentPath="/admin/faqs">
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            FAQ管理（{ALL_FAQ.length}件）
          </h1>
          <button className="bg-kincya text-white px-5 py-2.5 text-sm hover:bg-do transition-colors">＋ FAQを追加</button>
        </div>

        <div className="space-y-3">
          {ALL_FAQ.map((f, i) => (
            <div key={i} className="bg-white border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {f.category && (
                      <span className="text-xs text-ai border border-ai/30 px-1.5 py-0.5">
                        {CATEGORY_LABELS[f.category] ?? f.category}
                      </span>
                    )}
                    <p className="text-sm text-sumi font-medium">{f.question}</p>
                  </div>
                  <p className="text-xs text-sumi/60 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="text-xs text-sumi/60 hover:text-ai">編集</button>
                  <button className="text-xs text-do hover:underline">削除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
