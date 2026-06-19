import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_REVIEWS } from "@/data/reviews";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "口コミ管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminReviewsPage() {
  return (
    <AdminLayout currentPath="/admin/reviews">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          口コミ管理（{MOCK_REVIEWS.length}件）
        </h1>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">評価</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">口コミ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">投稿日</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">返信</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_REVIEWS.map((review) => {
                const provider = MOCK_PROVIDERS.find((p) => p.id === review.providerId);
                return (
                  <tr key={review.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-xs text-sumi">{provider?.tradeName || provider?.companyName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-kincya text-sm">{"★".repeat(review.rating)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-sumi line-clamp-2 max-w-xs">{review.body}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-sumi/50">{formatDate(review.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 ${review.reply ? "bg-igusa/10 text-igusa" : "bg-kiji text-sumi/40"}`}>
                        {review.reply ? "返信あり" : "未返信"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-do hover:underline">削除</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
