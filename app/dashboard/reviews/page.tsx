"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_REVIEWS } from "@/data/reviews";
import { formatDate } from "@/lib/utils";

const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardReviewsPage() {
  const reviews = MOCK_REVIEWS.filter((r) => r.providerId === MOCK_PROVIDER_ID);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [repliedIds, setRepliedIds] = useState<string[]>([]);

  const handleReply = (reviewId: string) => {
    if (!replyInputs[reviewId]?.trim()) return;
    // TODO: Supabase に返信を保存
    setRepliedIds((prev) => [...prev, reviewId]);
  };

  return (
    <DashboardLayout currentPath="/dashboard/reviews">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>口コミ管理</h1>

        {reviews.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50">まだ口コミはありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const isReplied = repliedIds.includes(review.id) || !!review.reply;
              return (
                <div key={review.id} className="bg-white border border-border p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-kincya">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                        <span className="text-xs text-sumi/40">{formatDate(review.createdAt)}</span>
                      </div>
                      <p className="text-sm text-sumi mb-2">{review.body}</p>
                    </div>
                  </div>

                  {isReplied ? (
                    <div className="bg-kiji/50 border-l-2 border-ai p-3 mt-3">
                      <p className="text-xs text-sumi/50 mb-1">業者からの返信</p>
                      <p className="text-xs text-sumi">
                        {review.reply?.body || replyInputs[review.id]}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 border-t border-kiji pt-3">
                      <p className="text-xs text-sumi/50 mb-2">返信を投稿する</p>
                      <textarea
                        value={replyInputs[review.id] || ""}
                        onChange={(e) => setReplyInputs((prev) => ({ ...prev, [review.id]: e.target.value }))}
                        rows={3}
                        placeholder="お客様への感謝や補足をお書きください"
                        className="w-full border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai resize-none mb-2"
                      />
                      <button
                        onClick={() => handleReply(review.id)}
                        className="text-xs bg-ai text-white px-4 py-1.5 hover:opacity-80 transition-opacity"
                      >
                        返信する
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
