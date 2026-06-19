import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_QUOTE_REQUESTS } from "@/data/bookings";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "見積依頼 | マイページ | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_USER_ID = "user-001";

export default function MypageQuotesPage() {
  const quotes = MOCK_QUOTE_REQUESTS.filter((q) => q.userId === MOCK_USER_ID);

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">マイページ</Link>
            {" "}/ 見積依頼
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>見積依頼一覧</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {quotes.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">まだ見積依頼がありません</p>
            <Link href="/quote" className="text-sm text-white bg-ai px-6 py-2 hover:opacity-80 transition-opacity inline-block">
              見積もりを依頼する
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-sumi/40 mb-0.5">見積番号：{q.id}</p>
                    <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{q.workType}</h2>
                    <p className="text-xs text-sumi/60">{q.address}</p>
                  </div>
                  <StatusBadge status={q.status} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-kiji pt-3">
                  <div><span className="text-sumi/40 block mb-0.5">希望時期</span>{q.desiredPeriod || "未定"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">予算</span>{q.budget || "相談可"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">依頼日</span>{formatDate(q.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            &larr; マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
