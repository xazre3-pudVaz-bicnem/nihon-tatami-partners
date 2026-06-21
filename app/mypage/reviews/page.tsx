import type { Metadata } from "next";
import Link from "next/link";
import SampleBadge from "@/components/common/SampleBadge";

export const metadata: Metadata = {
  title: "口コミ投稿一覧 | マイページ | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

interface MyReview {
  id: string;
  providerName: string;
  service: string;
  rating: number;
  status: "published" | "pending" | "rejected";
  createdAt: string;
}

const SAMPLE_MY_REVIEWS: MyReview[] = [
  {
    id: "rev-001",
    providerName: "山田畳店",
    service: "畳表替え",
    rating: 5,
    status: "published",
    createdAt: "2026-05-20",
  },
  {
    id: "rev-002",
    providerName: "川越畳工房 和心",
    service: "ふすま張替え",
    rating: 4,
    status: "published",
    createdAt: "2026-04-10",
  },
];

const STATUS_MAP: Record<MyReview["status"], { label: string; classes: string }> = {
  published: {
    label: "公開中",
    classes: "bg-igusa/10 text-igusa border border-igusa/30",
  },
  pending: {
    label: "審査中",
    classes: "bg-kincya/10 text-kincya border border-kincya/30",
  },
  rejected: {
    label: "非公開",
    classes: "bg-sumi/10 text-sumi/60 border border-border",
  },
};

export default function MypageReviewsPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* ページヘッダー */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">
              マイページ
            </Link>
            {" "}/ 口コミ
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            口コミ投稿一覧
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2 mb-6">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            掲載イメージです。実際の口コミ履歴はログイン後に表示されます。
          </p>
        </div>

        {/* 新規投稿CTA */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-sumi">
            投稿した口コミ（<span className="text-ai font-medium">{SAMPLE_MY_REVIEWS.length}</span>件）
          </p>
          <Link
            href="/mypage/reviews/new"
            className="text-sm bg-kincya text-white px-5 py-2 hover:bg-do transition-colors"
          >
            口コミを投稿する
          </Link>
        </div>

        {SAMPLE_MY_REVIEWS.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-2">まだ口コミがありません</p>
            <p className="text-xs text-sumi/40 mb-6">
              施工完了後に口コミを投稿すると、次の方の参考になります
            </p>
            <Link
              href="/mypage/reviews/new"
              className="text-sm text-white bg-kincya px-6 py-2 hover:bg-do transition-colors inline-block"
            >
              口コミを投稿する
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_MY_REVIEWS.map((review) => {
              const statusConfig = STATUS_MAP[review.status];
              return (
                <div key={review.id} className="bg-white border border-border p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h2
                        className="text-base text-sumi"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {review.providerName}
                      </h2>
                      <p className="text-xs text-sumi/50">{review.service}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 shrink-0 ${statusConfig.classes}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-kincya text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="text-xs text-sumi/40">{review.rating}.0</span>
                    <span className="text-xs text-sumi/30">・</span>
                    <span className="text-xs text-sumi/40">{review.createdAt}</span>
                  </div>

                  {review.status === "published" && (
                    <Link
                      href={`/providers/${review.id}`}
                      className="text-xs text-ai hover:underline"
                    >
                      業者ページで確認 →
                    </Link>
                  )}
                  {review.status === "rejected" && (
                    <p className="text-xs text-sumi/40">
                      ガイドライン上の理由により非公開となっています
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
