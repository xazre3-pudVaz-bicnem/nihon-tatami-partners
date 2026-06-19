import type { Review } from "@/lib/types";
import { formatDate, timeAgo } from "@/lib/utils";

interface Props {
  review: Review;
  showProviderReply?: boolean;
  variant?: "default" | "compact";
}

export default function ReviewCard({ review, showProviderReply = true, variant = "default" }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(review.rating));

  if (variant === "compact") {
    return (
      <div className="border-b border-kiji py-4 last:border-0">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-ai/10 shrink-0 flex items-center justify-center text-xs text-ai font-medium">
            {review.userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-sumi">{review.userName}</span>
              <div className="flex">
                {stars.map((f, i) => (
                  <span key={i} className={`text-xs ${f ? "text-kincya" : "text-border"}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-sumi/40">{timeAgo(review.createdAt)}</span>
            </div>
            <p className="text-xs text-sumi/70 line-clamp-2">{review.body}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border p-5">
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ai/10 shrink-0 flex items-center justify-center text-sm text-ai font-medium">
            {review.userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-sumi">{review.userName}</p>
            <p className="text-xs text-sumi/40">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="flex justify-end mb-0.5">
            {stars.map((f, i) => (
              <span key={i} className={`text-base ${f ? "text-kincya" : "text-border"}`}>★</span>
            ))}
          </div>
          <p className="text-lg font-medium text-sumi">{review.rating.toFixed(1)}</p>
        </div>
      </div>

      {/* 利用サービス */}
      {review.usedService && (
        <div className="mb-3">
          <span className="text-xs bg-kiji text-sumi/70 px-2 py-1">利用サービス：{review.usedService}</span>
        </div>
      )}

      {/* タイトル */}
      {review.title && (
        <h4 className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          {review.title}
        </h4>
      )}

      {/* 本文 */}
      <p className="text-sm text-sumi/70 leading-relaxed mb-3">{review.body}</p>

      {/* 評価内訳 */}
      {review.ratingBreakdown && (
        <div className="grid grid-cols-4 gap-2 mb-3 py-3 border-t border-kiji">
          {[
            { label: "品質", value: review.ratingBreakdown.quality },
            { label: "料金", value: review.ratingBreakdown.price },
            { label: "対応速度", value: review.ratingBreakdown.speed },
            { label: "コミュニケーション", value: review.ratingBreakdown.communication },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xs text-sumi/50 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-sumi">{item.value.toFixed(1)}</p>
              <div className="flex justify-center mt-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-xs ${i < item.value ? "text-kincya" : "text-border"}`}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 参考になった */}
      {review.helpful !== undefined && (
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-sumi/40">参考になった</span>
          <button className="text-xs text-ai border border-ai/20 px-3 py-1 hover:bg-ai/5 transition-colors">
            役立った（{review.helpful}）
          </button>
        </div>
      )}

      {/* 業者返信 */}
      {showProviderReply && review.reply && (
        <div className="mt-4 bg-kiji/50 border-l-2 border-kincya/30 p-4">
          <p className="text-xs text-kincya mb-2 font-medium">業者からの返信</p>
          <p className="text-xs text-sumi/70 leading-relaxed">{review.reply.body}</p>
          <p className="text-xs text-sumi/40 mt-2">{formatDate(review.reply.createdAt)}</p>
        </div>
      )}
    </div>
  );
}
