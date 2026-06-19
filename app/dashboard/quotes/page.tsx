import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_QUOTE_REQUESTS } from "@/data/bookings";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "見積依頼 | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function DashboardQuotesPage() {
  const quotes = MOCK_QUOTE_REQUESTS;

  return (
    <DashboardLayout currentPath="/dashboard/quotes">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>見積依頼</h1>

        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="bg-white border border-border p-12 text-center">
              <p className="text-sm text-sumi/50">まだ見積依頼はありません</p>
            </div>
          ) : (
            quotes.map((quote) => (
              <div key={quote.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-sumi/40 mb-0.5">見積番号：{quote.id}</p>
                    <p className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{quote.workType}</p>
                    <p className="text-xs text-sumi/60">{quote.address}</p>
                  </div>
                  <StatusBadge status={quote.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-kiji pt-3 mb-3">
                  <div><span className="text-sumi/40 block mb-0.5">希望時期</span>{quote.desiredPeriod || "未定"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">予算</span>{quote.budget || "相談可"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">現地確認</span>{quote.needsSiteVisit ? "必要" : "不要"}</div>
                </div>

                {quote.notes && (
                  <div className="text-xs text-sumi/70 bg-kiji/30 p-3 mb-3">
                    <span className="text-sumi/40 block mb-0.5">備考</span>
                    {quote.notes}
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="text-xs bg-ai text-white px-4 py-1.5 hover:opacity-80 transition-opacity">
                    見積もりを送る
                  </button>
                  <button className="text-xs border border-border text-sumi/70 px-4 py-1.5 hover:border-ai hover:text-ai transition-colors">
                    辞退する
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
