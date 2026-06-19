import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_QUOTE_REQUESTS } from "@/data/bookings";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "見積依頼管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminQuotesPage() {
  return (
    <AdminLayout currentPath="/admin/quotes">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>見積依頼管理（{MOCK_QUOTE_REQUESTS.length}件）</h1>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">工事種別</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">エリア</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">希望時期</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">現地確認</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">ステータス</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">依頼日</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUOTE_REQUESTS.map((q) => (
                <tr key={q.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3 text-xs text-sumi">{q.workType}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{q.address}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{q.desiredPeriod || "未定"}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{q.needsSiteVisit ? "必要" : "不要"}</td>
                  <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                  <td className="px-4 py-3 text-xs text-sumi/50">{formatDate(q.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
